import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import UserListItem from './UserListItem';

const Container = styled.ul`
    max-height: 70vh;
    overflow: scroll;
`;

const UserList = ({ users, lang, thisUser }) => {
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
                />
            ))}
        </Container>
    )
}

UserList.propTypes = {
    users : PropTypes.array.isRequired,
    lang: PropTypes.string
}

export default UserList;