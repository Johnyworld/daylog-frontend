import React, { useState } from 'react';
import styled from 'styled-components';
import TextLarge from './TextLarge';
import Words from '../Lang/Words.json';
import TextSmall from './TextSmall';
import DoingButton from './DoingButton';
import Icon from './Icon';
import NowPopup from './NowPopup';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { gql } from 'apollo-boost';
import Theme from '../Styles/Theme';
import { useMutation } from 'react-apollo-hooks';
import { EDIT_POST } from './SetScore';
import { TODAY_QUERY } from './TodayQueries';
import { getStillEndAt, getPullStartAt } from '../Util/Util';
import { FEED_POST } from '../Routes/Feed';

export const UPLOAD = gql`
    mutation upload( $doingId: String!, $location: String, $startAt: Int!, $score: Float, $option: String ) {
        upload( doingId: $doingId, location: $location, startAt: $startAt, score: $score, option: $option ) {
            id
        }
    }
`;

const Container = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 30px;
    z-index: 999;
    background-color: white;
    transition: .5s;
    border-top: 1px solid ${({ theme })=> theme.c_lightGray };

    &.disabled {
        transform: translateY(100%);
    }
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
`;

const Column = styled.div`
    a {
        margin-right: 10px;
    }
`;

const ScrollContainer = styled.section`
    margin: 0 -30px -30px;
    padding: 30px;
    overflow-x: scroll;
    overflow-y: hidden;
    -ms-overflow-style: none; 
    &::-webkit-scrollbar { display:none; }
`;

const DoingButtons = styled.div`
    width: ${({ width })=> width + "px;" };
    display: flex;
    align-items: center;
`;

export default ({ doings, lang, recent, focusedBlock, next, className }) => {
    const [ nowPopup, setNowPopup ] = useState(false);

    const stillEndAt = getStillEndAt( focusedBlock, recent ); 
    const pullStartAt = getPullStartAt( focusedBlock, next );

    const [ uploadMutation ] = useMutation( UPLOAD, {
        variables: { 
            startAt: focusedBlock && focusedBlock.block,
            option: focusedBlock && focusedBlock.isYesterday ? "yesterday" : null
        },
        refetchQueries: [{ query: TODAY_QUERY }, { query: FEED_POST }]
    });

    const [ stillMutation ] = useMutation( EDIT_POST, {
        variables: { 
            id: recent && recent.id, 
            endAt: stillEndAt,
            type: "endAt" 
        },
        refetchQueries: [{ query: TODAY_QUERY }, { query: FEED_POST }]
    });

    const [ pullMutation ] = useMutation( EDIT_POST, {
        variables: { 
            id: next && next.id,
            startAt: pullStartAt,
            type: "startAt" 
        },
        refetchQueries: [{ query: TODAY_QUERY }, { query: FEED_POST }]
    });

    const onClickNowPopup = () => {
        setNowPopup(true);
    }

    const closePopup = () => {
        setNowPopup(false);
    }

    const onClickStill = () => {
        stillMutation();
    }

    const onClickPull = () => {
        pullMutation();
    }

    const onClickUpload = ({id, location}) => {
        uploadMutation({ variables: {
            doingId: id,
            location: location ? location : ""
        }});
    }

    const width = (doings.length + 1) * (Theme.size_doingButton + 10);
    const recentDoingId = recent ? recent.doing.id : "";
    const nextDoingId = next ? next.doing.id : "";

    return (
        <Container className={className} >
            <Header>
                <Column>
                    <TextLarge text={ Words.whatNow } lang={lang} />
                    <TextSmall text={Words.whatNowRemark} lang={lang} />
                </Column>
                <Column>
                    <Link to={`/doing`}>
                        <Icon icon="nut" size="medium" />
                    </Link>
                    <button onClick={onClickNowPopup}>
                        <Icon icon="gridMenu" size="medium" />
                    </button>
                </Column>
            </Header>
            <ScrollContainer>
                <DoingButtons width={width}>
                    { recent && recent.doing &&
                        <DoingButton
                            key={recent.doing.id}
                            id={recent.doing.id}
                            name={recent.doing.name}
                            icon={recent.doing.icon}
                            color={recent.doing.color}
                            lang={lang}
                            onClick={onClickStill}
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
                            onClick={onClickPull}
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
                            lang={lang}
                            onClick={onClickUpload}
                        />
                    ))}
                </DoingButtons>
            </ScrollContainer>
            { nowPopup && 
                <NowPopup 
                    doings={doings}
                    recent={recent}
                    closePopup={closePopup}
                    lang={lang}
                    focusedBlock={focusedBlock}
                    next={next}
                    recentDoingId={recentDoingId}
                    nextDoingId={nextDoingId}
                    stillMutation={stillMutation}
                    pullMutation={pullMutation}
                    onClickUpload={onClickUpload}
                /> }
        </Container>
    )
}