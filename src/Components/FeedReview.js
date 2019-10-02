import React, { useState } from 'react';
import styled from 'styled-components';
import FeedUser from './FeedUser';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import TextRegular from './TextRegular';
import Theme from '../Styles/Theme';
import Message from '../Lang/FeedItem.json';
import TextSmall from './TextSmall';
import { getPrintDate, getPrintDateAuto } from '../Util/Languages';

const SEE_REVIEW = gql`
    query seeReview( $id: String! ) {
        seeReview( id: $id ) {
            id
            text
            createdAt
            isLiked
            likesCount
            user {
                username
                avatar
            }
        }
    }
`;

export const TOGGLE_LIKE_REVIEW = gql`
    mutation toggleLikeReview( $reviewId: String! ) {
        toggleLikeReview( reviewId: $reviewId ) 
    }
`;

const Container = styled.article`
    ${({ theme })=> theme.box }
    width: 100%;
    padding: 30px;
`;

const Text = styled.div`
    margin-bottom: 20px;
    .text-small { display: inline-block; margin-bottom: 5px; }
    .text-regular { display: block; margin-bottom: 5px; }
`;


export default ({ id, text, yyyymmdd, createdAt, isLiked, likesCount, author, avatar, lang }) => {
    useQuery(SEE_REVIEW, {variables: {id}});
    const [ isLikedState, setIsLiked ] = useState(isLiked);
    const [ likesCountState, setLikesCount ] = useState(likesCount);

    const [ toggleLikeReviewMutation ] = useMutation( 
        TOGGLE_LIKE_REVIEW, {
            variables: { reviewId : id },
            refetchQueries: [{ query: SEE_REVIEW, variables: { id }}]
        }
    );

    const datePrint = getPrintDateAuto(yyyymmdd, lang);

    const toggleLike = (e) => {
        toggleLikeReviewMutation();
        if ( !isLikedState ) {
            e.currentTarget.classList.add('liked');
            e.currentTarget.classList.remove('unliked');
            setIsLiked(true);
            setLikesCount(likesCountState+1);
        } else {
            e.currentTarget.classList.remove('liked'); 
            e.currentTarget.classList.add('unliked'); 
            setIsLiked(false);
            setLikesCount(likesCountState-1);
        }
    }

    return (
        <Container>
            <Text>
                <TextSmall string={datePrint} text={Message.reviewWhen} lang={lang} color={Theme.c_gray} />
                <TextRegular string={text} lang={lang} />
                { likesCountState !== 0 &&
                    <TextSmall string={likesCountState+''} text={Message.likes} lang={lang} color={Theme.c_black} />
                }
            </Text>
            <FeedUser
                id={id}
                author={author}
                avatar={avatar}
                createdAt={createdAt}
                toggleLike={toggleLike}
                isLikedState={isLikedState}
                disableComment={true}
                lang={lang}
            />
        </Container>
       
    )
}