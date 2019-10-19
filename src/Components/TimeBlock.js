import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TextRegular from './TextRegular';
import Score from './Score';
import SmallButton from './SmallButton';
import Words from '../Lang/Words.json';
import SetScore from './SetScore';
import Icon from './Icon';
import TextSmall from './TextSmall';
import Theme from '../Styles/Theme';
import EditLocation from './EditLocation';
import { getLangArray } from '../Util/Languages';
import IconButton from './IconButton';

const Container = styled.li`
    position: relative;
    display: flex;
    width: 100%;
    height: 32px;
`;

const Inner = styled.div`
    padding: 0 5px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 64%;
    border-top: 1px solid white;
    background-color: ${({ theme })=> theme.c_lightGrayBrighter1 };
    ${({ color, doing })=> {
        if ( color && !doing ) return `
        border-color: #0000000f !important;
        background-color: ${color}; 
        `
        else if ( color ) return `background-color: ${color}; `
    }};
    ${({ hour })=> hour && `border-top: 3px solid white;` };
    &.focused:after {
        background-color: #fff3;
        pointer-events: none;
        border-top: 1px dashed #fffa;
    }
    &.selected:after {
        content: ' ';
        display: block;
        position: absolute;
        box-sizing: border-box;
        top: -3px;
        left: -3px;
        right: -3px;
        bottom: -3px;
        border-left: 2px solid ${({ theme })=> theme.c_black };
        border-right: 2px solid ${({ theme })=> theme.c_black };
        z-index: 99;
    }
    &.selected.first:after {
        border-top: 2px solid ${({ theme })=> theme.c_black };
    }
    &.selected.last:after {
        border-bottom: 2px solid ${({ theme })=> theme.c_black };
    }
`;

const ScoreButton = styled(SmallButton)`
    width: 30px;
`;

const Name = styled(TextRegular)`
    ${({ theme })=> theme.f_small };
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

const Side = styled.div`
    position: absolute;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    right: 0;
    height: 100%;
    width: 35%;
`;

const SideCutPost = styled(Side)`
    opacity: 0;
    pointer-events: none;
    transition: .3s;
    &.selected.focused {
        opacity: 1;
        pointer-events: all;
    }
`;

const SideLikesAndComments = styled(Side)`
    transition: .5s;
    background-color: white;
    &.selected {
        opacity: 0;
        pointer-events: none; 
    }
`;

const Column = styled.div`
    display: flex;
    align-items: center;
    svg {
        margin-right: 5px;
    }
`;

const EditButton = styled(IconButton)`
    display: flex;
    justify-content: center;
    width: 45%;
    height: 90%;
    border: 1px solid ${({ theme })=> theme.c_blueDarker2 };
    transition: .3s;
    &.confirm-delete {
        border: none;
        background-color: ${({ theme })=> theme.c_red };
    }
`;

const CountNum = styled(TextSmall)`
    &:not(:last-child) {
        margin-right: 10px;
    }
`;

const getSelectionClassName = (selection) => {
    let classNameString = "";
    selection.forEach( item => {
        classNameString = classNameString + ` ${item}`
    })
    return classNameString;
}

const TimeBlock = ({
    id, index, block, doing, color, score, location, blocks, 
    likesCount, commentsCount, lang, className, selection,
    deletePost, onClickCutTop, onClickCutBottom, setFocused }) => {

    const [ scoreState, setScoreState ] = useState(score ? score : null);
    const [ scorePopup, setScorePopup ] = useState(false);
    const [ locationPopup, setLocationPopup ] = useState(false);
    const [ confirmDelete, setConfirmDelete ] = useState(false);

    const onScorePopup = () => {
        setScorePopup(true);
    }

    const onLocationPopup = () => {
        setLocationPopup(true);
    }

    const closePopup = () => {
        setScorePopup(false);
        setLocationPopup(false);
    }

    const onClickDelete = () => {
        if ( confirmDelete ) { 
            deletePost(id);
        } 
        else { setConfirmDelete(true); }
    }

    const select = () => {
        setFocused(index);
    }

    const selectionClassName = selection ? getSelectionClassName(selection) : false;

    return (
        <Container className={className} onClick={select} >
            <Inner className={"inner" + (selectionClassName && selectionClassName)} color={color} doing={doing} hour={block%4 === 0} >
                { doing && (<>
                    <Name string={doing} color="white" />
                    { scoreState
                        ? <button onClick={onScorePopup}><Score score={scoreState} size="small" color="white" /></button>
                        : <ScoreButton onClick={onScorePopup} text={Words.setScore} lang={lang} color="white" />
                    }
                </>)}
            </Inner>
            <TimePrint>
                { block%4 === 0 && ( block/4 > 9 ? block/4 : `0${block/4}` )}
            </TimePrint>
            { !doing && id &&
                <SideCutPost className={selectionClassName}>
                    <EditButton onClick={onClickCutTop.bind(this, id)} icon="cutTop" size="small" color={ Theme.c_blueDarker2 } />
                    <EditButton onClick={onClickCutBottom.bind(this, id)} icon="cutBottom" size="small" color={ Theme.c_blueDarker2 } />
                </SideCutPost>
            }
            { doing && <>
                <Side className="edit-and-delete">
                    <EditButton onClick={onLocationPopup} icon="location" size="small" color={Theme.c_blueDarker2} />
                    <EditButton onClick={onClickDelete} icon="x" size="small" color={!confirmDelete ? Theme.c_blueDarker2 : "white"} className={`delete ${ confirmDelete && 'confirm-delete'}`} />
                </Side>
                <SideLikesAndComments className={selectionClassName}>
                    <Column>
                        <Icon icon="clap" size="small" />
                        <CountNum string={likesCount} />
                    </Column>
                    <Column>
                        <Icon icon="bubble" size="small" />
                        <CountNum string={commentsCount} />
                    </Column>
                </SideLikesAndComments>
            </> }
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
            { locationPopup && 
                <EditLocation id={id} location={location} lang={lang} closePopup={closePopup} />
            }
        </Container>
    )
}

TimeBlock.propTypes = {
    id: PropTypes.string,
    index: PropTypes.number,
    block: PropTypes.number,
    doing: PropTypes.string,
    color: PropTypes.string,
    score: PropTypes.number,
    location: PropTypes.string,
    blocks: PropTypes.number,
    likesCount: PropTypes.number,
    commentsCount: PropTypes.number,
    lang: PropTypes.oneOf( getLangArray() ),
    className: PropTypes.string,
    focusedBlock: PropTypes.object,
    recent: PropTypes.object,
    setFocused: PropTypes.func
}

export default TimeBlock;