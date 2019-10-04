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
import Icon from './Icon';

const Container = styled.section`
    padding: 40px 30px;
    > *:not(:last-child) {
        margin-bottom: 20px;
    }
`;

const DateTab = styled.div`
    button {
        margin-right: 20px;
    }
`;

const Heading = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
        height: 24px;
        button:last-child {
            margin-left: 20px;
        } 
    }
    
`;

export default ({ username, lang, yyyymmdd, setTheDate }) => {
    const [ logState, setLogState ] = useState("day");

    const colors = [ "#61bffb", "#1a9df9", "#1585d4", "#085fb9", "#1738c6", "#7047e5",
                     "#a55af8", "#db57fc", "#ff81ec", "#fac07b", "#f9dc84", "#c0d419",
                     "#8fb91f", "#428b15", "#176c1d", "#124f3e", "#198f88", "#24abc3" ];

    const clickDateTab = (e) => {
        setLogState( e.currentTarget.dataset.data );
    }

    const changeDatePrev = () => {
        switch(logState) {
            case "day" :
                setTheDate.setPrevDay();
                break;
            case "week" :
                setTheDate.setPrevWeek();
                break;
            case "month" :
                setTheDate.setPrevMonth();
                break;
            case "year" :
                setTheDate.setPrevYear();
                break;
            default :
                break;
        }
    }

    const changeDateNext = () => {
        switch(logState) {
            case "day" :
                setTheDate.setNextDay();
                break;
            case "week" :
                setTheDate.setNextWeek();
                break;
            case "month" :
                setTheDate.setNextMonth();
                break;
            case "year" :
                setTheDate.setNextYear();
                break;
            default :
                break;
        }
    }

    let printDate;
    
    if ( logState === "day" ) printDate = getPrintDate( yyyymmdd, lang, "withoutDow" );
    if ( logState === "week" ) printDate = getPrintWeek( yyyymmdd, lang );
    if ( logState === "month" ) printDate = getPrintDate( yyyymmdd, lang, "withoutDate" );
    if ( logState === "year" ) printDate = getPrintDate( yyyymmdd, lang, "onlyYear" );

    return (
        <Container>
            <DateTab>
                <SmallButton onClick={clickDateTab} text={Words.day} data="day" lang={"en"} color={ logState === "day" ? Theme.c_blue : undefined } />
                <SmallButton onClick={clickDateTab} text={Words.week} data="week" lang={"en"} color={ logState === "week" ? Theme.c_blue : undefined } />
                <SmallButton onClick={clickDateTab} text={Words.month} data="month" lang={"en"} color={ logState === "month" ? Theme.c_blue : undefined } />
                <SmallButton onClick={clickDateTab} text={Words.year} data="year" lang={"en"} color={ logState === "year" ? Theme.c_blue : undefined } />
            </DateTab>
            <Heading>
                <TextLarge string={printDate} color={Theme.c_blueDarker1} />
                <div>
                    <button onClick={changeDatePrev}><Icon icon="back" color={Theme.c_blue} size="medium" /></button>
                    <button onClick={changeDateNext}><Icon icon="next" color={Theme.c_blue} size="medium" /></button>
                </div>
            </Heading>
            { logState === "day" && <Daylog username={username} yyyymmdd={yyyymmdd} colors={colors} lang={lang} /> }
            { logState === "week" && <Weeklog username={username} yyyymmdd={yyyymmdd} colors={colors} lang={lang} /> }
            { logState === "month" && <Monthlog username={username} yyyymmdd={yyyymmdd} colors={colors} lang={lang} /> }
            { logState === "year" && <Yearlog username={username} yyyymmdd={yyyymmdd} colors={colors} lang={lang} /> }
        </Container>
    )
}