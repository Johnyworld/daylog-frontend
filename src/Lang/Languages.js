import React from 'react';

export const languages = ( text, lang ) => {
    if ( lang === 'KR' ) return text.kr;
    if ( lang === 'EN' ) return text.en;
}

export default ({ text, lang }) => (
    <>
        {lang==='KR' && text.kr}
        {lang==='EN' && text.en}
    </>
)