import { getPrintPastTime, getPrintDate, getPrintBlockTimes } from "./Languages";

const timeConvertor = ( milliseconds, lang, option ) => {
    const seconds = milliseconds / 1000;
    const w = Math.floor( seconds / 604800 );
    const d = Math.floor(( seconds - w * 604800 ) / 86400 );
    const h = Math.floor(( seconds - w * 604800 - d * 86400 ) / 3600 );
    const m = Math.floor(( seconds - w * 604800 - d * 86400 - h * 3600 ) / 60 );
    const s = Math.floor(( seconds - w * 604800 - d * 86400 - h * 3600 - m * 60 ));
    return getPrintPastTime( [ w, d, h, m, s ], lang, option );
}

export const dateConvertor = ( date, lang ) => {
    const fullDate = new Date(date);
    const now = Date.now();
    const past = now - fullDate.getTime();

    if ( past < 1382400000 ) return timeConvertor( past, lang, "only" );
    if ( past > 1382400000 ) return getPrintDate( fullDate, lang );
}

export const blockConvertor = ( blocks, lang ) => {
    blocks -= 1;
    const h = Math.floor( blocks / 4 );
    const m = (blocks - h*4) * 15;

    return getPrintBlockTimes( h, m, lang );
}

export const getYyyymmdd = ( year, month, date ) => {
    month += 1;
    return `${year}-${(month>9?'':"0")+month}-${(date>9?'':"0")+date}`;
}

const blockToTime = ( blocks ) => {
    const hours = Math.floor( blocks/4 );
    const minutes = blocks % 4 * 15;
    return { hours, minutes };
}

const timeZero = ( time ) => {
    if ( time > 9 ) return time;
    else return `0${time}`;
}

export const timePresenter = ( startAt, endAt ) => {
    const start = blockToTime( startAt );
    const end = blockToTime( endAt );
    const SH = timeZero( start.hours );
    const SM = timeZero( start.minutes );
    const EH = timeZero( end.hours );
    const EM = timeZero( end.minutes );
    return `${SH}:${SM} - ${EH}:${EM}`;
}