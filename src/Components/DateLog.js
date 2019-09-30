import React, { useState } from 'react';
import styled from 'styled-components';
import SmallButton from './SmallButton';
import TextLarge from './TextLarge';
import Words from '../Lang/Words.json';
import Theme from '../Styles/Theme';
import { getPrintDate, getPrintWeek } from '../Util/Languages';
import Daylog from './Daylog';
import Weeklog from './Weeklog';
import Monthlog from './Monthlog';
import Yearlog from './Yearlog';

const Container = styled.section`
    padding: 40px 30px;
    > * {
        margin-bottom: 20px;
    }
`;

const DateTab = styled.div`
    button {
        margin-right: 20px;
    }
`;

export default ({ username, lang, me, yyyymmdd }) => {
    const [ theDay, setTheDay ] = useState( yyyymmdd );
    const [ logState, setLogState ] = useState("day");

    const colors = [ "#61bffb", "#1a9df9", "#1585d4", "#085fb9", "#1738c6", "#7047e5",
                     "#a55af8", "#db57fc", "#ff81ec", "#fac07b", "#f9dc84", "#c0d419",
                     "#8fb91f", "#428b15", "#176c1d", "#124f3e", "#198f88", "#24abc3" ];

    const clickDateTab = (e) => {
        setLogState( e.currentTarget.dataset.data );
    }

    let printDate;
    
    if ( logState === "day" ) printDate = getPrintDate( theDay, lang, "withoutDow" );
    if ( logState === "week" ) printDate = getPrintWeek( theDay, lang );
    if ( logState === "month" ) printDate = getPrintDate( theDay, lang, "withoutDate" );
    if ( logState === "year" ) printDate = getPrintDate( theDay, lang, "onlyYear" );

    return (
        <Container>
            <DateTab>
                <SmallButton onClick={clickDateTab} text={Words.day} data="day" lang={"en"} color={ logState === "day" ? Theme.c_blue : undefined } />
                <SmallButton onClick={clickDateTab} text={Words.week} data="week" lang={"en"} color={ logState === "week" ? Theme.c_blue : undefined } />
                <SmallButton onClick={clickDateTab} text={Words.month} data="month" lang={"en"} color={ logState === "month" ? Theme.c_blue : undefined } />
                <SmallButton onClick={clickDateTab} text={Words.year} data="year" lang={"en"} color={ logState === "year" ? Theme.c_blue : undefined } />
            </DateTab>
            <div>
                <TextLarge string={printDate} color={Theme.c_blueDarker1} />
            </div>
            { logState === "day" && <Daylog username={username} yyyymmdd={theDay} colors={colors} lang={lang} /> }
            { logState === "week" && <Weeklog username={username} yyyymmdd={theDay} colors={colors} lang={lang} /> }
            { logState === "month" && <Monthlog username={username} yyyymmdd={theDay} colors={colors} lang={lang} /> }
            { logState === "year" && <Yearlog username={username} yyyymmdd={theDay} colors={colors} lang={lang} /> }
        </Container>
    )
}