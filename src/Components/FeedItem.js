import React, { useState }from 'react';
import styled from 'styled-components';
import Words from '../Lang/Words.json';
import TextSmall from './TextSmall.js';
import TextLarge from './TextLarge.js';
import Theme from '../Styles/Theme.js';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import { SEE_POST } from '../Routes/Post.js';
import { blockConvertor } from '../Util/Convertors.js';
import FeedUser from './FeedUser.js';

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
    span {
        display: inline-block;
        margin-top: 3px;
    }
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
    commentsCount,
    startAt,
    endAt,
    createdAt,
    lang,
    blocks,
    disableComment=false,
}) => {
    useQuery(SEE_POST, {variables: {id}});
    const [ isLikedState, setIsLiked ] = useState(isLiked);
    const [ likesCountState, setLikesCount ] = useState(likesCount);
    const [ toggleLikeMutation ] = useMutation( 
        TOGGLE_LIKE, { 
            variables: { postId : id },
            refetchQueries: [{ query: SEE_POST, variables: { id }}]
        }
    );

    const toggleLike = (e) => {
        toggleLikeMutation();
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
        (
        <Container>
            <Info>
                <TextSmall string={blockConvertor(blocks, lang)} lang={lang} />
                <TextSmall string={category} lang={lang} />
            </Info>
            <Heading>
                <TextLarge string={doing} lang={lang} color={color}/>
                { likesCountState !== 0 &&
                    <TextSmall string={likesCountState+''} text={Words.likes} lang={lang} color={Theme.c_black} />
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
        </Container>
        )
    )
}