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
import { TODAY_QUERY } from '../Router';
import { blockToTime, blockConvertor } from '../Util/Convertors';

export const UPLOAD = gql`
    mutation upload( $doingId: String!, $location: String, $startAt: Int!, $score: Float ) {
        upload( doingId: $doingId, location: $location, startAt: $startAt, score: $score ) {
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

export default ({ doings, lang, recent, focused, now, className }) => {
    const [ nowPopup, setNowPopup ] = useState(false);

    const [ stillMutation ] = useMutation( EDIT_POST, {
        variables: { 
            id: recent && recent.id,
            endAt: focused.index - ( 95-now ) + 1,
            type: "endAt" 
        },
        refetchQueries: [{ query: TODAY_QUERY }]
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

    const width = (doings.length + 1) * (Theme.size_doingButton + 10);
    const recentDoingId = recent ? recent.doing.id : "";

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
                    { recent &&
                        <DoingButton
                            key={recent.doing.id}
                            id={recent.doing.id}
                            name={recent.doing.name}
                            icon={recent.doing.icon}
                            color={recent.doing.color}
                            lang={lang}
                            onClick={onClickStill}
                            focused={focused}
                            now={now}
                            className="recent"
                        /> 
                    } 
                    { doings[0] && doings.map( doing => (
                        doing.id !== recentDoingId && 
                        <DoingButton
                            key={doing.id}
                            id={doing.id}
                            name={doing.name}
                            icon={doing.icon}
                            color={doing.color}
                            lang={lang}
                            focused={focused}
                            now={now}
                        />
                    ))}
                </DoingButtons>
            </ScrollContainer>
            { nowPopup && <NowPopup doings={doings} recent={recent} closePopup={closePopup} lang={lang} focused={focused} now={now} /> }
        </Container>
    )
}