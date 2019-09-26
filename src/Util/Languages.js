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
