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
import TextSmall from './TextSmall';
import CommentJson from '../Lang/Comment.json';

const Container = styled.section`
    padding: 40px 30px;
    > div {
        margin-bottom: 20px;
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

    const colors = [ "#61bffb", "#1a9df9", "#1585d4", "#085fb9", "#1738c6", "#7047e5",
                     "#a55af8", "#db57fc", "#ff81ec", "#fac07b", "#f9dc84", "#c0d419",
                     "#8fb91f", "#428b15", "#176c1d", "#124f3e", "#198f88", "#24abc3" ];

    const clickDateTab = (e) => {
        setLogState( e.currentTarget.dataset.data );
    }

    const yyyymmdd = "2019-09-24";

    return (
        <Container>
            <DateTab>
                <SmallButton onClick={clickDateTab} text={Words.day} data="day" lang={"en"} color={ logState === "day" ? Theme.c_blue : undefined } />
                <SmallButton onClick={clickDateTab} text={Words.week} data="week" lang={"en"} color={ logState === "week" ? Theme.c_blue : undefined } />
                <SmallButton onClick={clickDateTab} text={Words.month} data="month" lang={"en"} color={ logState === "month" ? Theme.c_blue : undefined } />
                <SmallButton onClick={clickDateTab} text={Words.year} data="year" lang={"en"} color={ logState === "year" ? Theme.c_blue : undefined } />
            </DateTab>
            <div>
                <TextLarge string={getPrintDate( theDay, lang, "withoutDow" )} color={Theme.c_blueDarker1} />
                { logState === "week" && <TextSmall text={CommentJson.weekLog} lang={lang} /> }
            </div>
            { logState === "day" && <Daylog username={username} yyyymmdd={yyyymmdd} colors={colors} /> }
            { logState === "week" && <Weeklog username={username} yyyymmdd={yyyymmdd} colors={colors} lang={lang} /> }
            { logState === "month" && <Monthlog username={username} yyyymmdd={yyyymmdd} colors={colors} /> }
            { logState === "year" && <Yearlog username={username} yyyymmdd={yyyymmdd} colors={colors} /> }
        </Container>
    )
}