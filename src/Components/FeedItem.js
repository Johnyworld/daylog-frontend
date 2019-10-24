import React, { useState }from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import { SEE_POST } from '../Routes/Post.js';
import FeedItemComments from './FeedItemComments';
import PostInfo from './PostInfo.js';

export const TOGGLE_LIKE = gql`
    mutation toggleLike( $postId: String! ) {
        toggleLike( postId: $postId ) 
    }
`;

const Container = styled.li`
    width: 100%;
    padding: 30px;
    ${({ theme })=> theme.box };
`;

export default ({
    className,
    id,
    doing,
    color,
    category,
    author,
    avatar,
    isLiked,
    location,
    likesCount,
    comments,
    commentsCount,
    startAt,
    score,
    createdAt,
    lang,
    blocks,
}) => {
    useQuery( SEE_POST, {variables: {id}} );
    const [ isLikedState, setIsLiked ] = useState(isLiked);
    const [ likesCountState, setLikesCount ] = useState(likesCount);
    const [ toggleLikeMutation ] = useMutation( 
        TOGGLE_LIKE, { 
            variables: { postId : id },
            update: (cache, {data: { toggleLike }})=>{
                const { seePost } = cache.readQuery({ query: SEE_POST, variables: {id} })
                seePost.isLiked = toggleLike;
                if ( toggleLike ) seePost.likesCount += 1;
                else seePost.likesCount -= 1;
                cache.writeQuery({
                    query: SEE_POST,
                    variables: { id },
                    data: { seePost }
                })
            }
        }
    );

    const toggleLike = (e) => {
        toggleLikeMutation();
        if ( !isLikedState ) {
            e.currentTarget.classList.add('pop');
            e.currentTarget.classList.remove('unpop');
            setIsLiked(true);
            setLikesCount(likesCountState+1);
        } else {
            e.currentTarget.classList.remove('pop'); 
            e.currentTarget.classList.add('unpop'); 
            setIsLiked(false);
            setLikesCount(likesCountState-1);
        }
    }
    
    return (
        (
        <Container className={className}>
            <PostInfo 
                doing={doing}
                color={color}
                score={score}
                category={category}
                startAt={startAt}
                blocks={blocks}
                lang={lang}
                likesCountState={likesCountState}
                id={id}
                author={author}
                avatar={avatar}
                location={location}
                createdAt={createdAt}
                toggleLike={toggleLike}
                isLikedState={isLikedState}
            /> 
            { comments[0] && 
                <FeedItemComments
                    id={id}
                    comments={comments}
                    commentsCount={commentsCount}
                    lang={lang}
                />
            }
        </Container>
        )
    )
}