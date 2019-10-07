import React, { useState } from 'react';
import styled from 'styled-components';
import TextRegular from './TextRegular';
import Score from './Score';
import SmallButton from './SmallButton';
import Words from '../Lang/Words.json';
import SetScore from './SetScore';
import { scoreZero } from '../Util/Convertors';

const Container = styled.li`
    position: relative;
    display: flex;
    padding: 0 5px;
    width: 60vw;
    height: 36px;
    background-color: ${({ theme })=> theme.c_lightGrayBrighter1 };
    &:not(:first-child) { border-top: 1px solid white; }
    &.hour { border-top: 3px solid white; }
    &.hour:first-child { border-top: 0; }
    ${({ color, doing })=> {
        if ( color && !doing ) return `
        border-color: #0000000f !important;
        background-color: ${color}; 
        `
        else if ( color ) return `background-color: ${color}; `
    }};
    &:last-child { border: 3px solid ${({ theme })=> theme.c_black } !important };
`;

const Inner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .small-button {
        .text-regular {
            ${({ theme })=> theme.f_small };
        }
        width: 30px;
    }
`;

const TimePrint = styled.div`
    ${({ theme })=> theme.f_regular };
    color: ${({ theme })=> theme.c_black };
    font-weight: 300;
    position: absolute;
    left: 0;
    top: 0;
    transform: translate( -150%, -50% );
`;


const TimeBlock = ({ id, block, doing, color, score, blocks, isLiked, likesCount, postsCount, lang }) => {
    const [ scoreState, setScoreState ] = useState(score ? score : null);
    const [ scorePopup, setScorePopup ] = useState(false);

    const onScorePopup = () => {
        setScorePopup(true);
    }

    const closePopup = () => {
        setScorePopup(false);
    }

    return (
        <Container className={ block%4 === 0 && "hour" } color={color} doing={doing} >
            { doing && (
                <Inner>
                    <TextRegular string={doing} color="white" />
                    { scoreState
                        ? <button onClick={onScorePopup}><Score score={scoreState} size="small" color="white" /></button>
                        : <SmallButton onClick={onScorePopup} text={Words.setScore} lang={lang} color="white" />
                    }
                </Inner>
            )}
            <TimePrint>
                { block%4 === 0 && ( block/4 > 9 ? block/4 : `0${block/4}` )}
            </TimePrint>
            { scorePopup && 
                <SetScore
                    id={id}
                    doing={doing}
                    closePopup={closePopup}
                    lang={lang}
                    blocks={blocks}
                    color={color}
                    scoreState={scoreState}
                    setScoreState={setScoreState}
            />}
        </Container>
    )
}

export default TimeBlock;