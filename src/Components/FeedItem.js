import React, { useState }from 'react';
import styled from 'styled-components';
import message from '../Lang/FeedItem.json';
import TextSmall from './TextSmall.js';
import TextLarge from './TextLarge.js';
import Theme from '../Styles/Theme.js';
import Icon from './Icon.js';
import Avatar from './Avatar.js';
import TextRegular from './TextRegular.js';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { SEE_POST } from '../Routes/Post.js';

const TOGGLE_LIKE = gql`
    mutation toggleLike( $postId: String! ) {
        toggleLike( postId: $postId ) 
    }
`;

const Container = styled.article`
    width: 100%;
    padding: 30px;
    background-color: white;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
`;

const Info = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
`;

const Heading = styled.div`
    margin-bottom: 20px;
    >p:last-child {
        margin-top: 5px;
    }
`;

const Meta = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
`;

const UserText = styled.div`
    margin-left: 10px;
`;

const Icons = styled.div`
    >*:not(:first-child) {
        margin-left: 20px;
    }
`;

export default ({
    id,
    doing,
    category,
    author,
    avatar,
    isLiked,
    location,
    likesCount,
    commentsCount,
    startAt,
    endAt,
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

    const toggleLike = () => {
        toggleLikeMutation();
        if ( !isLikedState ) {
            setIsLiked(true);
            setLikesCount(likesCountState+1);
        } else {
            setIsLiked(false);
            setLikesCount(likesCountState-1);
        }
    }
    
    return (
        (
        <Container>
            <Info>
                <TextSmall string={blocks*15+''} text={message.minute} lang={lang} />
                <TextSmall string={category} />
            </Info>
            <Heading>
                <TextLarge string={doing} text={message.ing} lang={lang} />
                { likesCountState !== 0 &&
                    <TextSmall string={likesCountState+''} text={message.likes} lang={lang} color={Theme.c_blue} weight="bold" />
                }
            </Heading>
            <Meta>
                <UserInfo>
                    <Avatar avatar={avatar} size="small" />
                    <UserText>
                        <p><TextRegular string={author} weight="bold" /></p>
                        <TextSmall string={location} />
                    </UserText>
                </UserInfo>
                <Icons>
                    <button onClick={toggleLike}>
                        <Icon icon="clap" size="medium" color={isLikedState ? Theme.c_blue : Theme.c_black } />
                    </button> 
                    { !disableComment && (
                        <Link to={`/post/${id}`}>
                            <Icon icon="bubble" size="medium" />
                        </Link>
                    )}
                </Icons>
            </Meta>
        </Container>
        )
    )
}