import React, { useState } from 'react';
import styled from 'styled-components';
import SmallButton from './SmallButton';
import TextLarge from './TextLarge';
import Words from '../Lang/Words.json';
import Theme from '../Styles/Theme';
import { getPrintDate } from '../Util/Languages';
import Daylog from './Daylog';
import Weeklog from './Weeklog';
import Monthlog from './Monthlog';
import Yearlog from './Yearlog';

const Container = styled.section`
    padding: 40px 30px;
    h2 {
        margin: 30px 0;
    }
`;

const DateTab = styled.div`
    button {
        margin-right: 20px;
    }
`;

export default ({ username, lang }) => {
    const [ theDay, setTheDay ] = useState(new Date());
    const [ logState, setLogState ] = useState("day");

    const clickDateTab = (e) => {
        setLogState( e.currentTarget.dataset.data );
    }
    
    const yyyymmdd = "2019-09-18";

    return (
        <Container>
            <DateTab>
                <SmallButton onClick={clickDateTab} text={Words.day} data="day" lang={"en"} color={ logState === "day" ? Theme.c_blue : undefined } />
                <SmallButton onClick={clickDateTab} text={Words.week} data="week" lang={"en"} color={ logState === "week" ? Theme.c_blue : undefined } />
                <SmallButton onClick={clickDateTab} text={Words.month} data="month" lang={"en"} color={ logState === "month" ? Theme.c_blue : undefined } />
                <SmallButton onClick={clickDateTab} text={Words.year} data="year" lang={"en"} color={ logState === "year" ? Theme.c_blue : undefined } />
            </DateTab>
            <TextLarge string={getPrintDate( theDay, lang, "withoutDow" )} color={Theme.c_blueDarker1} />
            { logState === "day" && <Daylog username={username} yyyymmdd={yyyymmdd} /> }
            { logState === "week" && <Weeklog username={username} yyyymmdd={yyyymmdd} /> }
            { logState === "month" && <Monthlog username={username} yyyymmdd={yyyymmdd} /> }
            { logState === "year" && <Yearlog username={username} yyyymmdd={yyyymmdd} /> }
        </Container>
    )
}