import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PopupHeader from './PopupHeader';
import Words from '../Lang/Words.json';
import TextRegular from './TextRegular';
import Theme from '../Styles/Theme';
import { blockToTimeFor, getToday } from '../Util/Convertors';
import TextLarge from './TextLarge';
import TextSmall from './TextSmall';
import Score from './Score';
import useInput from '../Hooks/useInput';
import LargeButton from './LargeButton';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import { SEE_POST } from '../Routes/Post';
import { getLangArray } from '../Util/Languages';

export const EDIT_POST = gql`
    mutation editPost( $id: String!, $doingId: String, $location: String, $score: Float, $startAt: Int, $endAt: Int, $yyyymmdd: String, $type: String! ) {
        editPost( id: $id, doingId: $doingId, location: $location, score: $score, startAt: $startAt, endAt: $endAt, yyyymmdd: $yyyymmdd, type: $type ) {
            id
            startAt
            endAt
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

const Title = styled.div`
    margin: 20px 0;
    border: 1px solid #ddd;
    padding: 10px 0;
`;

const Rating = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
`;

const RatingBar = styled.input`
    margin-bottom: 50px;
`;

const TextSmallStyled = styled(TextSmall)`
    margin-right: 20px;
`;

const LargeButtonStyled = styled(LargeButton)`
    display: block;
    margin-left: auto;
`;

const SetScore = ({ id, doing, closePopup, lang, blocks, color, scoreState, setScoreState }) => {
    const slider = useInput( scoreState ? scoreState : 2.5 );
    const scoreFloat = parseFloat(slider.value);
    const time = blockToTimeFor(blocks, lang, "isFor");

    const yyyymmdd = getToday();

    const [ editPostMutation ] = useMutation( EDIT_POST, {
        variables: { id, score: scoreFloat, type:"score" },
        refetchQueries: [{ query: SEE_POST, variables: { id, yyyymmdd } }]
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
                    <Title>
                        <TextSmall string={time} lang={lang} />
                        <TextLarge string={doing} color={color} lang={lang} />
                    </Title>
                    <Rating>
                        <TextSmallStyled text={Words.satisfaction} lang={lang} />
                        <Score score={scoreFloat} size="large" />
                    </Rating>
                    <RatingBar type="range" value={slider.value} onChange={slider.onChange} min={0} max={5} step={0.5} />
                </Doing>
                <LargeButtonStyled onClick={onClick} text={Words.okay} lang={lang} color={Theme.c_blue} />
            </Popup>
        </Container>
    )
}

SetScore.propTypes = {
    id: PropTypes.string,
    doing: PropTypes.string,
    color: PropTypes.string,
    blocks: PropTypes.number,
    lang: PropTypes.oneOf( getLangArray() ),
    scoreState: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    setScoreState: PropTypes.func,
    closePopup: PropTypes.func
}

export default SetScore;