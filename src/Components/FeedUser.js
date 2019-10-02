import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import Username from './Username';
import TextSmall from './TextSmall';
import { dateConvertor } from '../Util/Convertors';
import Icon from './Icon';
import Theme from '../Styles/Theme';

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
`;

export default ({ id, author, avatar, location, createdAt, toggleLike, isLikedState, disableComment, lang }) => {
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
                <button onClick={toggleLike} >
                    <Icon icon="clap" size="medium" color={isLikedState ? Theme.c_blue : Theme.c_black } />
                </button> 
                { !disableComment && (
                    <Link to={`/post/${id}`}>
                        <Icon icon="bubble" size="medium" />
                    </Link>
                )}
            </Icons>
        </Container>
    )
}