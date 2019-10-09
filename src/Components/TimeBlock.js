import React, { useState } from 'react';
import styled from 'styled-components';
import TextRegular from './TextRegular';
import Score from './Score';
import SmallButton from './SmallButton';
import Words from '../Lang/Words.json';
import SetScore, { EDIT_POST } from './SetScore';
import Icon from './Icon';
import TextSmall from './TextSmall';
import Theme from '../Styles/Theme';
import { useMutation } from 'react-apollo-hooks';
import { TODAY_QUERY } from './TodayQueries';
import EditLocation from './EditLocation';

const Container = styled.li`
    position: relative;
    display: flex;
    padding: 0 5px;
    width: 55vw;
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
    &.selected .likes-and-comments {
        opacity: 0;
        pointer-events: none; 
    }
    &.selected.focused .cut-post {
        opacity: 1;
        pointer-events: all;
    }
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

const Side = styled.div`
    position: absolute;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    right: 0;
    transform: translateX(105%);
    height: 100%;
    width: 30vw;
    &.likes-and-comments {
        transition: .5s;
        background-color: white;
        .text-small:not(:last-child) {
            margin-right: 10px;
        }
    }

    &.cut-post {
        opacity: 0;
        pointer-events: none;
        transition: .3s;
    }

    &.cut-post,
    &.edit-and-delete {
        button {
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
        }
    }
`;


const TimeBlock = ({
    id, index, block, doing, color, score, location, blocks, likesCount, commentsCount, 
    lang, className, now, focused, setFocused }) => {

    const [ scoreState, setScoreState ] = useState(score ? score : null);
    const [ scorePopup, setScorePopup ] = useState(false);
    const [ locationPopup, setLocationPopup ] = useState(false);
    const [ confirmDelete, setConfirmDelete ] = useState(false);

    const [ deletePostMutation ] = useMutation( EDIT_POST, { 
        variables : { id, type: "delete" },
        refetchQueries: [{ query: TODAY_QUERY }]
    })

    const [ cutTopMutation ] = useMutation( EDIT_POST, { 
        variables : { 
            id,
            startAt:  focused - ( 95-now ),
            type: "startAt"
        },
        refetchQueries: [{ query: TODAY_QUERY }]
    })

    const [ cutBottomMutation ] = useMutation( EDIT_POST, { 
        variables : { 
            id,
            endAt:  focused - ( 95-now ),
            type: "endAt"
        },
        refetchQueries: [{ query: TODAY_QUERY }]
    })

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
        if ( confirmDelete ) { deletePostMutation(); } 
        else { setConfirmDelete(true); }
    }

    const onClickCutTop = () => {
        cutTopMutation();
    }

    const onClickCutBottom = () => {
        cutBottomMutation();
    }

    const selection = (e) => {
        const target = e.currentTarget;
        const parent = target.parentNode;
        const children = parent.childNodes;
        
        let first = true;
        let last = null;

        children.forEach((child, index) => { 
            child.classList.remove("selected", "focused", "first", "last");
            if ( target.dataset.id && child.dataset.id === target.dataset.id ) {
                child.classList.add("selected");
                if ( first ) {
                    child.classList.add("first"); 
                    first = false;
                }
                last = index;
            }
        });

        setFocused(index);

        if ( last ) { children[last].classList.add("last"); }
        else { target.classList.add("last", "first"); }
        target.classList.add("selected", "focused");      
    }

    return (
        <Container className={ `${className} ${block%4 === 0 ? "hour" : "" }` } color={color} doing={doing} data-id={id} data-index={index} onClick={selection} >
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
            { !doing && id &&
                <Side className="cut-post">
                    <button onClick={onClickCutTop} >
                        <Icon icon="cutTop" size="small" color={ Theme.c_blueDarker2 } />
                    </button>
                    <button onClick={onClickCutBottom} >
                        <Icon icon="cutBottom" size="small" color={ Theme.c_blueDarker2 } />
                    </button>
                </Side>
            }
            { doing && <>
                <Side className="edit-and-delete">
                    <button onClick={onLocationPopup}>
                        <Icon icon="location" size="small" color={Theme.c_blueDarker2} />
                    </button>
                    <button onClick={onClickDelete} className={`delete ${ confirmDelete && 'confirm-delete'}`} >
                        <Icon icon="x" size="small" color={ !confirmDelete ? Theme.c_blueDarker2 : "white" } />
                    </button>
                </Side>
                <Side className="likes-and-comments">
                    <Icon icon="clap" size="small" />
                    <TextSmall string={likesCount} />
                    <Icon icon="bubble" size="small" />
                    <TextSmall string={commentsCount} />
                </Side>
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

export default TimeBlock;