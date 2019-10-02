import React from 'react';

export const langList = [
    { value: "en", local: "English" },
    { value: "kr", local: "한국어" }
];

export const getLang = ( userlang ) => {
    if ( !userlang ) {
        return window.navigator.language.substr(0, 2);
    } else {
        return userlang;
    }
}

export const languages = ( text, lang ) => {
    if ( lang === 'kr' ) return text.kr;
    else return text.en;
}

export default ({ text, lang }) => {
    if ( lang === 'kr' ) return <>{text.kr}</>
    else return <>{text.en}</>
} 

const getDayOfWeek = ( dow, lang ) => {
    let array;
    if ( lang === "kr" ) array = [ "일", "월", "화", "수", "목", "금", "토" ];
    else array = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
    return array[dow];
}

export const getPrintDate = ( yyyymmdd, lang, option ) => {
    const fullDate = new Date( yyyymmdd );
    const Y = fullDate.getFullYear();
    let M = fullDate.getMonth();
    let D = fullDate.getDate();
    let dow = getDayOfWeek(fullDate.getDay(), lang);

    if ( lang === "kr" ) M += 1;
    else M = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "Octorber", "November", "December"
    ][M];

    switch(option) {
        case "withoutDow" :
            if ( lang === "kr" ) return `${Y}년 ${M}월 ${D}일`;
            else return `${D}, ${M} ${Y}`;
        case "withoutDate" :
            if ( lang === "kr" ) return `${Y}년 ${M}월`;
            else return `${M} ${Y}`; 
        case "onlyYear" :
            if ( lang === "kr" ) return `${Y}년`;
            else return `${Y}`;
        default :
            if ( lang === "kr" ) return `${Y}년 ${M}월 ${D}일 ${dow}요일`;
            else return `${dow}, ${D}, ${M} ${Y}`
    }
}

export const getPrintDateAuto = ( yyyymmdd, lang ) => {
    if ( yyyymmdd.includes("W") ) return getPrintWeek( yyyymmdd, lang, "yyyymmWeek" ); 
    if ( yyyymmdd.length === 10 ) return getPrintDate( yyyymmdd, lang )
    if ( yyyymmdd.length === 7 ) return getPrintDate( yyyymmdd, lang, "withoutDate" )
    if ( yyyymmdd.length === 4 ) return getPrintDate( yyyymmdd, lang, "onlyYear" )
}

export const getPrintPastTime = ( array, lang, option ) => {
    let string = [];
    let print;

    if ( lang === "kr" ) print = [ "주", "일", "시간", "분", "초", "전" ];
    else print = [ " week", " day", " hour", " minute", " second", " ago" ];

    array.some( (item, i) => {
        if ( item !== 0 ) {
            let unit;

            if ( lang === "kr" ) unit = print[i];
            else {
                if (item !== 1) unit = print[i] + "s"; 
                else unit = print[i];
            }

            string = [ ...string, `${ item + unit }` ];
            
            if ( option === "only" || i === array.length-1 ) {
                string = [ ...string, print[5] ];
                return true; 
            }
        }
        return false;
    });

    return string.join(' ');
}

export const getPrintBlockTimes = ( h, m, lang ) => {
    if ( lang === 'kr' ) {
        if ( h !== 0 && m === 0 ) return `${h}시간 동안`
        else if ( h !== 0 ) return `${h}시간 ${m}분 동안`;
        else if ( h === 0 && m === 0 ) return "15분 미만 동안";
        else return `${m}분 동안`;
    }
    else {
        if ( h !== 0 && m === 0 ) return `for ${h} hours`
        else if ( h !== 0 ) return `for ${h} hours ${m} minutes`;
        else if ( h === 0 && m === 0 ) return "for 15 minutes least";
        else return `for ${m} minutes`; 
    }
}

export const getPrintWeek = ( yyyymmdd, lang, option ) => {
    if ( option === "yyyymmWeek" ) {
        const split = yyyymmdd.split('-');
        const M = parseInt(split[1]);
        return `${split[0]}년 ${M}월 ${split[2].substr(1, 1)}주차`;
    }
    const thisDay = new Date(yyyymmdd);
    const Y = thisDay.getFullYear();
    const M = thisDay.getMonth();
    const D = thisDay.getDate();

    const whatFirstDay = new Date( Y, M, 1 ).getDay();
    const whatWeek = Math.floor(( D + whatFirstDay -1 ) / 7);

    if ( lang === "kr" ) return `${Y}년 ${M+1}월 ${whatWeek+1}주차`;
    else {
        const WW = [
            "first", "second", "third", "fourth", "fifth"
        ][whatWeek];
        const MM = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "Octorber", "November", "December"
        ][M]; 
        return `${WW} week, ${MM}, ${Y}`
    } 
}