import React, { useState } from 'react';
import styled from 'styled-components';
import Score from './Score';
import TextRegular from './TextRegular';
import Words from '../Lang/Words.json';
import Theme from '../Styles/Theme'
import SmallButton from './SmallButton';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import Icon from './Icon';
import TextLarge from './TextLarge';
import useInput from '../Hooks/useInput';
import LargeButton from './LargeButton';
import TextareaAutosize from 'react-autosize-textarea/lib';
import { languages } from '../Util/Languages';
import TextSmall from './TextSmall';
import { FEED_QUERY } from '../Routes/Feed';

const ADD_REVIEW = gql`
    mutation addReview( $text: String!, $yyyymmdd: String! ) {
        addReview( text: $text, yyyymmdd: $yyyymmdd ) {
            id
        }
    }
`;

const EDIT_REVIEW = gql`
    mutation editReview( $id: String!, $text: String! ) {
        editReview( id: $id, text: $text ) {
            id
        }
    }
`;

const DELETE_REVIEW = gql`
    mutation deleteReview( $id: String! ) {
        deleteReview( id: $id )
    }
`;

const Container = styled.div`
    ${({ theme })=> theme.miniFeedTitle }
    margin-top: 30px;
`;

const Box = styled.div`
    ${({ theme })=> theme.miniFeedBox };
    display: flex;
    > span:first-child {
        min-width: 30%;
    }
`;

const Inner = styled.div`
    
`;

const Buttons = styled.div`
    margin-top: 20px;
    button {
        &:not(:last-child) {
            margin-right: 20px;
        } 
    }
    .text-small {
        display: block;
        margin-top: 5px;
    }
`;

const InputPopup = styled.div`
    ${({ theme })=> theme.popupContainer };
`;

const Popup = styled.div`
    ${({ theme })=> theme.popup };
`;

const LargeButtonStyled = styled(LargeButton)`
    margin-top: 30px;
    display: block;
    margin-left: auto;
    cursor: pointer;
`;

const Textarea = styled(TextareaAutosize)`
    font-size: 14px;
    line-height: 1.4;
    padding: 5px;
    max-height: 5.2em;
    width: 100%;
    border-bottom: 1px solid ${({ theme })=> theme.c_gray };
`;

export default ({ review, averageScore, username, date, weekDate, lang, QUERY }) => {
    const [ onPopup, setOnPopup ] = useState(false);
    const [ confirmDelete, setConfirmDelete ] = useState(false);
    const reviewText = useInput(review ? review.text : "");
    const placeholder = languages(Words.inputReview);

    const [ addReviewMutation ] = useMutation(ADD_REVIEW, { 
        variables: { text: reviewText.value, yyyymmdd: weekDate ? weekDate : date },
        refetchQueries: [
            { query: QUERY, variables: { username, yyyymmdd: date }},
            { query: FEED_QUERY }
        ]
    });

    const [ editReviewMutation ] = useMutation(EDIT_REVIEW, { 
        variables: { text: reviewText.value, id: review ? review.id : "" },
        refetchQueries: [
            { query: QUERY, variables: { username, yyyymmdd: date }},
            { query: FEED_QUERY }
        ]
    });

    const [ deleteReviewMutation ] = useMutation(DELETE_REVIEW, {
        variables: { id: review ? review.id : "" }, 
        refetchQueries: [
            { query: QUERY, variables: { username, yyyymmdd: date }},
            { query: FEED_QUERY }
        ]
    })

    const onWrite = () => { setOnPopup("write") }
    const onEdit = () => { setOnPopup("edit") }
    const closePopup = () => { setOnPopup(false) }
    const cancelDelete = () => { setConfirmDelete(false); }
    const onDelete = () => {
        setConfirmDelete(true);
        if ( confirmDelete ) {
            deleteReviewMutation(); 
            setConfirmDelete(false);
            reviewText.setValue('');
        }
    }

    const onSubmit = () => {
        if ( onPopup === "write" ) {
            addReviewMutation();
            setOnPopup(false);
        }
        if ( onPopup === "edit" ) {
            editReviewMutation();
            setOnPopup(false);
        }
    }

    return (
        <Container>
            <TextRegular text={Words.review} lang={lang} color={Theme.c_gray}/>
            <Box className="review">
                <Score score={ averageScore } size="medium" />
                <Inner>
                    { reviewText.value
                        ? <TextRegular string={ reviewText.value } lang={lang} />
                        : <TextRegular text={ Words.noReview } color={Theme.c_gray} lang={lang} />
                    }
                    <Buttons>
                        { !review  
                            ? <SmallButton onClick={onWrite} text={Words.write} lang={lang} /> 
                            : (<>
                                <SmallButton onClick={onEdit} text={Words.edit} lang={lang} />
                                <SmallButton onClick={onDelete} text={Words.delete} lang={lang} />
                                { confirmDelete && <>
                                    <SmallButton onClick={cancelDelete} text={Words.cancel} lang={lang} />
                                    <TextSmall text={Words.confirmDelete} lang={lang} color={Theme.c_red} />
                                </>}
                            </>)
                        }
                    </Buttons>
                </Inner>
            </Box>
            { onPopup &&
                <InputPopup>
                    <Popup>
                        <div className="popup-firstline">
                            <TextLarge text={Words.review} lang={lang} color={Theme.c_blueDarker2} />
                            <button onClick={closePopup}>
                                <Icon icon="x" size="medium" />
                            </button>
                        </div>
                        <form onSubmit={onSubmit} >
                            <Textarea value={reviewText.value} onChange={reviewText.onChange} placeholder={placeholder} />
                            <LargeButtonStyled text={Words.okay} lang={lang} color={Theme.c_blue} />
                        </form>
                    </Popup>
                </InputPopup>
            }
        </Container>
    )
}