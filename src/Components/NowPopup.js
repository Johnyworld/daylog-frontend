import React, { useState } from 'react';
import styled from 'styled-components';
import PopupHeader from './PopupHeader';
import Words from '../Lang/Words.json'
import Icon from './Icon';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import DoingButton from './DoingButton';
import useInput from '../Hooks/useInput';
import Input from './Input';
import LargeButton from './LargeButton';
import Theme from '../Styles/Theme';
import { useMutation } from 'react-apollo-hooks';
import { UPLOAD } from './WhatNow';
import { TODAY_QUERY } from './TodayQueries';
import TextRegular from './TextRegular';
import { EDIT_POST } from './SetScore';
import { getStillEndAt, getPullStartAt } from '../Util/Util';

const Container = styled.div`
    ${({ theme })=> theme.popupContainer };
`;

const Popup = styled.div`
    ${({ theme })=> theme.popup };
`;

const PopupContent = styled.section`
   ${({ theme })=> theme.popupContent };
   max-height: 50vh;
   margin: 0 -30px 30px;
   padding: 0 30px;
`;

const LinkStyled = styled(Link)`
    position: absolute;
    top: 30px;
    right: 64px;
`;

const DoingGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 8px;
    padding-top: 10px;
    button {
        margin-right: 0;
    }

    @media screen and ( max-width: 374px ) {
        grid-template-columns: repeat(3, 1fr); 
    }
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const LocationText = styled(TextRegular)`
    width: 40%;
`

const LargeButtonStyled = styled(LargeButton)`
    display: block;
    margin-top: 30px;
    margin-left: auto;
`;

export default ({ doings, recent, closePopup, focused, focusedBlock, now, next, lang }) => {
    const [ selectedDoing, setSelectedDoing ] = useState(null);
    const [ isStill, setIsStill ] = useState(false);
    const [ isPull, setIsPull ] = useState(false);

    const location = useInput('');

    const stillEndAt = getStillEndAt( focusedBlock, recent ); 
    const pullStartAt = getPullStartAt( focusedBlock, next );

    const [ uploadMutation ] = useMutation( UPLOAD, {
        variables: { 
            doingId: selectedDoing, 
            location: location.value,
            startAt: focused - ( 95-now )
        },
        refetchQueries: [{ query: TODAY_QUERY }]
    });

    const [ stillMutation ] = useMutation( EDIT_POST, {
        variables: { 
            id: recent && recent.id, 
            endAt: stillEndAt,
            location: location.value,
            type: "endAt" 
        },
        refetchQueries: [{ query: TODAY_QUERY }]
    });

    const [ pullMutation ] = useMutation( EDIT_POST, {
        variables: { 
            id: next && next.id,
            startAt: pullStartAt,
            location: location.value,
            type: "startAt" 
        },
        refetchQueries: [{ query: TODAY_QUERY }]
    });

    const onClickButton = (e) => {
        const childNodes = e.currentTarget.parentNode.childNodes;
        setSelectedDoing(e.currentTarget.dataset.id);
        
        // Set classname for style
        childNodes.forEach( node => {
            node.classList.remove('selected');
        });
        e.currentTarget.classList.add('selected');

        // Set location value of recent (or next) post.
        if ( e.currentTarget.classList.contains('recent') ) {
            location.setValue(recent.location);
            setIsStill(true);
        } else if ( e.currentTarget.classList.contains('next') ) {
            location.setValue(next.location);
            setIsPull(true); 
        } else {
            location.setValue("");
            setIsStill(false); 
            setIsPull(false);
        }

    }

    const onClickSubmit = () => {
        if ( recent && recent.doing.id === selectedDoing && isStill ) {
            stillMutation();
            closePopup();
        } else if ( next && next.doing.id === selectedDoing && isPull ) {
            pullMutation();
            closePopup();
        } else {
            uploadMutation();
            closePopup();
        }
    }
    
    const recentDoingId = recent ? recent.doing.id : "";
    const nextDoingId = next ? next.doing.id : "";

    return (
        <Container>
            <Popup>
                <PopupHeader text={Words.whatNow} remark={Words.whatNowRemark} lang={lang} closePopup={closePopup} />
                <LinkStyled to={`/doing`}>
                    <Icon icon="nut" size="medium" />
                </LinkStyled>
                <PopupContent>
                    <DoingGrid>
                        { recent && recent.doing &&
                            <DoingButton
                                key={recent.doing.id}
                                id={recent.doing.id}
                                name={recent.doing.name}
                                icon={recent.doing.icon}
                                color={recent.doing.color}
                                onClick={onClickButton}
                                focused={focused}
                                lang={lang}
                                className="recent"
                            /> 
                        }
                        { next && next.doing &&
                            <DoingButton
                                key={next.doing.id}
                                id={next.doing.id}
                                name={next.doing.name}
                                icon={next.doing.icon}
                                color={next.doing.color}
                                lang={lang}
                                onClick={onClickButton}
                                focused={focused}
                                focusedBlock={focusedBlock}
                                now={now}
                                className="next"
                            /> 
                        }
                        { doings[0] && doings.map( doing => (
                            doing.id !== recentDoingId && doing.id !== nextDoingId &&
                            <DoingButton
                                key={doing.id}
                                id={doing.id}
                                name={doing.name}
                                icon={doing.icon}
                                color={doing.color}
                                onClick={onClickButton}
                                focused={focused}
                                lang={lang} 
                            />
                        ))}
                    </DoingGrid>
                </PopupContent>
                <Row>
                    <LocationText text={Words.location} lang={lang} />
                    <Input placeholder={Words.location} {...location} lang={lang} />
                </Row>
                <LargeButtonStyled text={Words.okay} lang={lang} onClick={onClickSubmit} color={Theme.c_blue} className={ !selectedDoing && "disabled" } />
            </Popup>
        </Container>
    )
}