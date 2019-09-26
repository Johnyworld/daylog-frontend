import React from 'react';

export const getLang = () => {
    return "kr";
    // return window.navigator.language.substr(0, 2);
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

export const getPrintDate = ( fullDate, lang ) => {
    const Y = fullDate.getFullYear();
    let M = fullDate.getMonth();
    let D = fullDate.getDate();
    let dow = getDayOfWeek(fullDate.getDay(), lang);

    if (D < 10) D = `0${D}`;
    
    if ( lang === "kr" ) if (M < 9) M = `0${M+1}`;
    else M = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "Octorber", "November", "December"
    ][M];

    if ( lang === "kr" ) return `${Y}년 ${M}월 ${D}일 ${dow}요일`;
    else return `${dow}, ${D}, ${M} ${Y}`
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