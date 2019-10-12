import React, { useState } from 'react';
import styled from 'styled-components';
import Score from './Score';
import TextRegular from './TextRegular';
import Words from '../Lang/Words.json';
import Theme from '../Styles/Theme'
import SmallButton from './SmallButton';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import useInput from '../Hooks/useInput';
import LargeButton from './LargeButton';
import TextareaAutosize from 'react-autosize-textarea/lib';
import { languages } from '../Util/Languages';
import TextSmall from './TextSmall';
import { FEED_QUERY } from '../Routes/Feed';
import PopupHeader from './PopupHeader';

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
    margin-top: 30px;
`;

const Title = styled(TextRegular)`
    ${({ theme })=> theme.miniFeedTitle }
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
`;

const ConfirmDeleteMessage = styled(TextSmall)`
    display: block;
    margin-top: 5px;
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
    const [ reviewTextDone, SetReviewTextDone ] = useState(review ? review.text : "");

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
            SetReviewTextDone(false)
            setConfirmDelete(false);
            reviewText.setValue('');
        }
    }

    const onSubmit = () => {
        if ( onPopup === "write" ) {
            addReviewMutation();
            SetReviewTextDone(reviewText.value);
            setOnPopup(false);
        }
        if ( onPopup === "edit" ) {
            editReviewMutation();
            SetReviewTextDone(reviewText.value);
            setOnPopup(false);
        }
    }

    return (
        <Container>
            <Title text={Words.review} lang={lang} color={Theme.c_gray}/>
            <Box className="review">
                <Score score={ averageScore } size="medium" />
                <Inner>
                    { reviewTextDone
                        ? <TextRegular string={ reviewTextDone } lang={lang} />
                        : <TextRegular text={ Words.noReview } color={Theme.c_gray} lang={lang} />
                    }
                    <Buttons>
                        { !reviewTextDone
                            ? <SmallButton onClick={onWrite} text={Words.write} lang={lang} /> 
                            : (<>
                                <SmallButton onClick={onEdit} text={Words.edit} lang={lang} />
                                <SmallButton onClick={onDelete} text={Words.delete} lang={lang} />
                                { confirmDelete && <>
                                    <SmallButton onClick={cancelDelete} text={Words.cancel} lang={lang} />
                                    <ConfirmDeleteMessage text={Words.confirmDelete} lang={lang} color={Theme.c_red} />
                                </>}
                            </>)
                        }
                    </Buttons>
                </Inner>
            </Box>
            { onPopup &&
                <InputPopup>
                    <Popup>
                        <PopupHeader text={Words.review} lang={lang} closePopup={closePopup} />
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