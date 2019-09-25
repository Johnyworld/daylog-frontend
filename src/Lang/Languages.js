import React from 'react';

export const getLang = () => {
    return window.navigator.language.substr(0, 2);
}

export const languages = ( text, lang ) => {
    if ( lang === 'kr' ) return text.kr;
    if ( lang === 'en' ) return text.en;
}

export default ({ text, lang }) => (
    <>
        {lang==='kr' && text.kr}
        {lang==='en' && text.en}
    </>
)