import React, { useState } from 'react';
import styled from 'styled-components';
import PopupHeader from './PopupHeader';
import Words from '../Lang/Words.json';
import TextRegular from './TextRegular';
import Theme from '../Styles/Theme';
import { blockConvertor, scoreZero } from '../Util/Convertors';
import TextLarge from './TextLarge';
import TextSmall from './TextSmall';
import Score from './Score';
import useInput from '../Hooks/useInput';

const Container = styled.div`
    ${({ theme })=> theme.popupContainer };
`;

const Popup = styled.div`
    ${({ theme })=> theme.popup };
`;

const Doing = styled.div`
    text-align: center;
`;

const Rating = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    .text-small {
        margin-right: 20px;
    }
`;

export default ({ doing, closePopup, lang, blocks, color, scoreState, setScoreState }) => {
    const slider = useInput( scoreState ? scoreState : 2.5 );
    const scoreWithZero = scoreZero(slider.value);
    const time = blockConvertor(blocks, lang);
    return (
        <Container>
            <Popup>
                <PopupHeader text={Words.setScoreTitle} closePopup={closePopup} lang={lang} />
                <TextRegular text={Words.setScoreDesc} lang={lang} color={Theme.c_gray} />
                <Doing>
                    <TextSmall string={time} lang={lang} />
                    <TextLarge string={doing} color={color} lang={lang} />
                    <Rating>
                        <TextSmall text={Words.satisfaction} lang={lang} />
                        <Score score={scoreWithZero} size="large" />
                    </Rating>
                    <input type="range" value={slider.value} onChange={slider.onChange} min="0" max="5" step="0.5" />
                </Doing>
            </Popup>
        </Container>
    )
}