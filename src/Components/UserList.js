import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import UserListItem from './UserListItem';
import { getLangArray } from '../Util/Languages';

const Container = styled.ul`
    ${ props => props.theme.popupContent }
`;

const UserList = ({ users, lang, thisUser, meName }) => {
    return (
        <Container>
            { users.map( user => (
                <UserListItem
                    key={user.id}
                    id={user.id}
                    username={user.username}
                    fullname={user.fullname}
                    avatar={user.avatar}
                    isFollowing={user.isFollowing}
                    thisUser={thisUser}
                    lang={lang}
                    meName={meName}
                />
            ))}
        </Container>
    )
}

UserList.propTypes = {
    users : PropTypes.array.isRequired,
    lang: PropTypes.oneOf( getLangArray() ),
    thisUser: PropTypes.string,
    meName: PropTypes.string
}

export default UserList;