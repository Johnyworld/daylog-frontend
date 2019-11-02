import React, { useState } from 'react';
import styled from 'styled-components';
import FeedUser from './FeedUser';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import ReviewInfo from './ReviewInfo';
import FeedItemComments from './FeedItemComments';

const SEE_REVIEW = gql`
    query seeReview( $id: String! ) {
        seeReview( id: $id ) {
            id
            text
            createdAt
            isLiked
            likesCount
            user {
                id
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

const Container = styled.li`
    ${({ theme })=> theme.box }
    width: 100%;
    padding: 30px;
`;

export default ({ className, id, text, yyyymmdd, createdAt, isLiked, likesCount, comments, commentsCount, author, avatar, lang }) => {
    useQuery(SEE_REVIEW, {variables: {id}});
    const [ isLikedState, setIsLiked ] = useState(isLiked);
    const [ likesCountState, setLikesCount ] = useState(likesCount);

    const [ toggleLikeReviewMutation ] = useMutation( 
        TOGGLE_LIKE_REVIEW, {
            variables: { reviewId : id },
            update: (cache, {data: { toggleLike }})=>{
                const { seeReview } = cache.readQuery({ query: SEE_REVIEW, variables: {id} })
                seeReview.isLiked = toggleLike;
                if ( toggleLike ) seeReview.likesCount += 1;
                else seeReview.likesCount -= 1;;
                cache.writeQuery({
                    query: SEE_REVIEW,
                    variables: { id },
                    data: { seeReview }
                })
            }
        }
    );

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
        <Container className={className} >
            <ReviewInfo
                yyyymmdd={yyyymmdd}
                likesCountState={likesCountState}
                text={text}
                id={id}
                author={author}
                avatar={avatar}
                createdAt={createdAt}
                toggleLike={toggleLike}
                isLikedState={isLikedState}
                lang={lang}
            />
            { comments[0] && 
                <FeedItemComments
                    id={id}
                    comments={comments}
                    commentsCount={commentsCount}
                    type="review"
                    lang={lang}
                />
            }
        </Container>
       
    )
}