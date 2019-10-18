import React, { useState } from 'react';
import styled from 'styled-components';
import FeedUser from './FeedUser';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import TextRegular from './TextRegular';
import Theme from '../Styles/Theme';
import Words from '../Lang/Words.json';
import TextSmall from './TextSmall';
import { getPrintDateAuto } from '../Util/Languages';

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

const Container = styled.article`
    ${({ theme })=> theme.box }
    width: 100%;
    padding: 30px;
`;

const Text = styled.div`
    margin-bottom: 20px;
`;

const Date = styled(TextSmall)`
    display: inline-block;
    margin-bottom: 5px;
`;

const Article = styled(TextRegular)`
    display: block;
    margin-bottom: 5px;
`


export default ({ id, text, yyyymmdd, createdAt, isLiked, likesCount, author, avatar, lang }) => {
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
                <Date string={datePrint} text={Words.reviewWhen} lang={lang} color={Theme.c_gray} />
                <Article string={text} lang={lang} />
                { likesCountState !== 0 &&
                    <TextSmall string={likesCountState+''} text={Words.likes} lang={lang} color={Theme.c_black} />
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