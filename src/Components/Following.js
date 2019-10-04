import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import UserList from './UserList';
import TextRegular from './TextRegular';
import Words from '../Lang/Words.json';
import PopupHeader from './PopupHeader';
import LoaderRelative from './LoaderRelative';

export const SEE_FOLLOWING = gql`
    query seeFollowing( $username: String! ) {
        seeFollowing( username: $username ) {
            id
            username
            fullname
            isFollowing
            avatar
        }
    }
`;

const Container = styled.div`
    ${({ theme })=> theme.popupContainer };
`;

const Popup = styled.div`
    ${({ theme })=> theme.popup };
`;

export default ({ username, closePopup, lang }) => {
    const { data, loading } = useQuery(SEE_FOLLOWING, { variables: { username } });
    
    return (
        <Container>
            <Popup>
                <PopupHeader text={Words.following} closePopup={closePopup} lang={lang} />
                { loading && <LoaderRelative /> }
                { !loading && data && data.seeFollowing && (
                    data.seeFollowing[0]
                        ? <UserList users={data.seeFollowing} lang={lang} thisUser={username} />
                        : <TextRegular text={Words.noFollowing} lang={lang} />
                )}
            </Popup> 
        </Container>
    )
}