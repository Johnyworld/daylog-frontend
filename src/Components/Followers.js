import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import UserList from './UserList';
import TextRegular from './TextRegular';
import Words from '../Lang/Words.json';
import PopupHeader from './PopupHeader';
import LoaderRelative from './LoaderRelative';

export const SEE_FOLLOWERS = gql`
    query seeFollowers( $username: String! ) {
        seeFollowers( username: $username ) {
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
    const { data, loading } = useQuery(SEE_FOLLOWERS, { variables: { username } });
    
    return (
        <Container>
            <Popup>
                <PopupHeader text={Words.followers} closePopup={closePopup} lang={lang} />
                { loading && <LoaderRelative /> }
                { !loading && data && data.seeFollowers && (
                    data.seeFollowers[0]
                        ? <UserList users={data.seeFollowers} lang={lang} thisUser={username} />
                        : <TextRegular text={Words.noFollowers} lang={lang} />
                )}
            </Popup> 
        </Container>
    )
}