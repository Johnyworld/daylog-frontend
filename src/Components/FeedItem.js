import React, { useState }from 'react';
import styled from 'styled-components';
import Words from '../Lang/Words.json';
import TextSmall from './TextSmall.js';
import TextLarge from './TextLarge.js';
import Theme from '../Styles/Theme.js';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import { SEE_POST } from '../Routes/Post.js';
import { blockToTimeFor, blockToTimeStart, scoreZero } from '../Util/Convertors.js';
import FeedUser from './FeedUser.js';
import FeedItemComments from './FeedItemComments';

export const TOGGLE_LIKE = gql`
    mutation toggleLike( $postId: String! ) {
        toggleLike( postId: $postId ) 
    }
`;

const Container = styled.article`
    width: 100%;
    padding: 30px;
    ${({ theme })=> theme.box };
`;

const Info = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 3px;
`;

const Heading = styled.div`
    margin-bottom: 20px;
`;

const DoingName = styled(TextLarge)`
    position: relative;
    display: inline-block;

    &::after {
        content: ${({ score })=> score && `"(${score})"` };
        position: absolute;
        right: -5px;
        top: 0;
        opacity: .5;
        transform: translateX(100%);
        ${({ theme })=> theme.f_regular }
    }
`;

const Likes = styled(TextSmall)`
    display: block;
    margin-top: 3px;
`;

export default ({
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
        <Container>
            <Info>
                <p>
                    <TextSmall string={blockToTimeStart(startAt)} />
                    <TextSmall string={blockToTimeFor(blocks, lang, "isFor")} lang={lang} />
                </p>
                <TextSmall text={category} lang={lang} />
            </Info>
            <Heading>
                <DoingName string={doing} lang={lang} color={color} score={ score && scoreZero(score.toString()) } />
                { likesCountState !== 0 &&
                    <Likes string={likesCountState+''} text={Words.likes} lang={lang} color={Theme.c_black} />
                }
            </Heading>
            <FeedUser
                id={id}
                author={author}
                avatar={avatar}
                location={location}
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
                    lang={lang}
                />
            }
        </Container>
        )
    )
}