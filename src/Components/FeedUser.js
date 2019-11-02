import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import Username from './Username';
import TextSmall from './TextSmall';
import { dateConvertor } from '../Util/Convertors';
import Icon from './Icon';
import Theme from '../Styles/Theme';
import { getLangArray } from '../Util/Languages';

const Container = styled.div`
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
    button {
        animation-duration: .5s;
        animation-timing-function: cubic-bezier(.19,.52,.41,1.31);
    }
`;

const FeedUser = ({ id, author, avatar, location, createdAt, toggleLike, isLikedState, lang, type }) => {
    return (
        <Container>
            <UserInfo>
                <Avatar avatar={avatar} size="small" />
                <UserText>
                    <Username username={author} />
                    <TextSmall string={dateConvertor(createdAt, lang)} />
                    { location && <TextSmall string={`, ${location}`} /> }
                </UserText>
            </UserInfo>
            <Icons>
                { toggleLike && 
                    <button onClick={toggleLike} >
                        <Icon icon="clap" size="medium" color={isLikedState ? Theme.c_blue : Theme.c_black } />
                    </button> 
                }
                <Link to={`/${type}/${id}`}>
                    <Icon icon="bubble" size="medium" />
                </Link>
            </Icons>
        </Container>
    )
}

FeedUser.propTypes = {
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    location: PropTypes.string,
    createdAt: PropTypes.string,
    toggleLike: PropTypes.func,
    isLikedState: PropTypes.bool,
    lang: PropTypes.oneOf( getLangArray() ),
    type: PropTypes.oneOf([ "post", "review" ])
}

export default FeedUser;