import React from 'react';
import styled from 'styled-components';
import PopupHeader from './PopupHeader';
import Words from '../Lang/Words.json';
import TextRegular from './TextRegular';
import Theme from '../Styles/Theme';
import { blockToTimeFor } from '../Util/Convertors';
import TextLarge from './TextLarge';
import TextSmall from './TextSmall';
import Score from './Score';
import useInput from '../Hooks/useInput';
import LargeButton from './LargeButton';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import { SEE_POST } from '../Routes/Post';

export const EDIT_POST = gql`
    mutation editPost( $id: String!, $doingId: String, $location: String, $score: Float, $startAt: Int, $endAt: Int, $type: String! ) {
        editPost( id: $id, doingId: $doingId, location: $location, score: $score, startAt: $startAt, endAt: $endAt, type: $type ) {
            id
        }
    }
`;

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
`;

const TextSmallStyled = styled(TextSmall)`
    margin-right: 20px;
`;

const LargeButtonStyled = styled(LargeButton)`
    display: block;
    margin-left: auto;
`;

export default ({ id, doing, closePopup, lang, blocks, color, scoreState, setScoreState }) => {
    const slider = useInput( scoreState ? scoreState : 2.5 );
    const scoreFloat = parseFloat(slider.value);
    const time = blockToTimeFor(blocks, lang, "isFor");

    const [ editPostMutation ] = useMutation( EDIT_POST, {
        variables: { id, score: scoreFloat, type:"score" },
        refetchQueries: [{ query: SEE_POST, variables: { id } }]
    })

    const onClick = () => {
        editPostMutation();
        setScoreState( scoreFloat );
        closePopup();
    }

    return (
        <Container>
            <Popup>
                <PopupHeader text={Words.setScoreTitle} closePopup={closePopup} lang={lang} />
                <TextRegular text={Words.setScoreDesc} lang={lang} color={Theme.c_gray} />
                <Doing>
                    <TextSmall string={time} lang={lang} />
                    <TextLarge string={doing} color={color} lang={lang} />
                    <Rating>
                        <TextSmallStyled text={Words.satisfaction} lang={lang} />
                        <Score score={scoreFloat} size="large" />
                    </Rating>
                    <input type="range" value={slider.value} onChange={slider.onChange} min={0} max={5} step={0.5} />
                </Doing>
                <LargeButtonStyled onClick={onClick} text={Words.okay} lang={lang} color={Theme.c_blue} />
            </Popup>
        </Container>
    )
}