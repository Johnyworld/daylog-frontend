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

export const UPLOAD = gql`
    mutation upload( $doingId: String!, $location: String, $score: Float ) {
        upload( doingId: $doingId, location: $location, score: $score ) {
            id
        }
    }
`;

const Container = styled.div`
    padding: 30px 30px 50px;
    background-color: ${({ theme })=> theme.c_blueDarker1 };
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

const DoingButtons = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
`;

export default ({ doings, lang, recent }) => {
    const [ nowPopup, setNowPopup ] = useState(false);
    console.log(recent)
    
    const onClickNowPopup = () => {
        setNowPopup(true);
    }

    const closePopup = () => {
        setNowPopup(false);
    }

    return (
        <Container>
            <Header>
                <Column>
                    <TextLarge text={Words.whatNow} lang={lang} color="white" />
                    <TextSmall text={Words.whatNowRemark} lang={lang} />
                </Column>
                <Column>
                    <Link to={`/doing`}>
                        <Icon icon="nut" size="medium" color="white" />
                    </Link>
                    <button onClick={onClickNowPopup}>
                        <Icon icon="gridMenu" size="medium" color="white" />
                    </button>
                </Column>
            </Header>
            <DoingButtons>
                { doings[0] && doings.map( doing => (
                    <DoingButton
                        key={doing.id}
                        id={doing.id}
                        name={doing.name}
                        icon={doing.icon}
                        color={doing.color}
                        className="shadowed"
                    />
                ))}
            </DoingButtons>
            { nowPopup && <NowPopup doings={doings} closePopup={closePopup} lang={lang} /> }
        </Container>
    )
}