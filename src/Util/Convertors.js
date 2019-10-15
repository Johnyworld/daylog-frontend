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

const blockConvertor = ( blocks ) => {
    const h = Math.floor( blocks / 4 );
    const m = (blocks - h*4) * 15;
    return { h, m }
}
export const blockToTimeFor = ( blocks, lang, option ) => {
    const time = blockConvertor(blocks);
    return getPrintBlockTimes( time.h, time.m, lang, option );
}

export const blockToTimeStart = ( blocks ) => {
    const time = blockConvertor(blocks);
    return `${timeZero(time.h)}:${timeZero(time.m)} - `
}

export const blockToTimeFull = ( startAt, endAt ) => {
    const start = blockConvertor(startAt);
    const end = blockConvertor(endAt);
    return `
        ${timeZero(start.h)}:${timeZero(start.m)} - 
        ${timeZero(end.h)}:${timeZero(end.m)}`;
}

export const getYyyymmdd = ( year, month, date ) => {
    month += 1;
    return `${year}-${(month>9?'':"0")+month}-${(date>9?'':"0")+date}`;
}

export const getYesterday = (yyyymmdd) => {
    const today = new Date( yyyymmdd && yyyymmdd );
    today.setDate( today.getDate() -1 );
    return getYyyymmdd( today.getFullYear(), today.getMonth(), today.getDate() ); 
}

export const blockToTime = ( blocks ) => {
    const hours = Math.floor( blocks/4 );
    const minutes = blocks % 4 * 15;
    return { hours, minutes };
}

const timeToBlock = ( hour, minute ) => {
    return hour*4 + Math.floor(minute/15);
}

export const getEndAt = ( startAt ) => {
    const EndAt = timeToBlock( new Date().getHours(), new Date().getMinutes() ) + 1;
    if ( EndAt < startAt ) {
        return EndAt + 96;
    } else {
        return EndAt;
    }
}

export const getNowBlock = () => {
    const H = new Date().getHours();
    const M = new Date().getMinutes();
    return (H*4) + (Math.floor(M/15));
}

const timeZero = ( time ) => {
    if ( time > 9 ) return time;
    else return `0${time}`;
}

export const scoreZero = ( score ) => {
    return parseInt(score).toString() === score ? `${score}.0` : score;
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

export const getWeek = (yyyymmdd) => {
    const thisDay = new Date(yyyymmdd);
    const Y = thisDay.getFullYear();
    const M = thisDay.getMonth();
    const D = thisDay.getDate();

    const whatFirstDay = new Date( Y, M, 1 ).getDay();
    const whatWeek = Math.floor(( D + whatFirstDay -1 ) / 7);

    return `${Y}-${(M>9?'':"0")+(M+1)}-W${whatWeek}`;
}