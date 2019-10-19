import React from 'react';
import styled from 'styled-components';
import useInput from '../Hooks/useInput';
import Input from '../Components/Input';
import { getLang } from '../Util/Languages';
import Words from '../Lang/Words.json';
import { ME } from '../Components/TodayQueries';
import Loader from '../Components/Loader';
import { useQuery } from 'react-apollo-hooks';
import UserList from '../Components/UserList';
import { gql } from 'apollo-boost';
import LoaderRelative from '../Components/LoaderRelative';
import TextMedium from '../Components/TextMedium';

const SEARCH_USER = gql`
    query searchUser( $term: String! ) {
        searchUser( term: $term ) {
            id
            username
            fullname
            isFollowing
            avatar
        }
    }
`;

const Container = styled.main`
    ${({ theme })=> theme.wrapper };
    padding: 30px;
    .search-input {
        margin-bottom: 30px;
    }
`;

export default () => {
    const term = useInput("");
    const { data: meData, loading: meLoading } = useQuery(ME);
    const { data, loading } = useQuery( SEARCH_USER, { variables: { term: term.value }} );

    if ( !meLoading && meData && meData.me ) {
        const lang = getLang( meData.me.lang );
    
        return (
            <Container>
                <Input {...term} placeholder={Words.inputSearch} lang={lang} className="search-input" />
                { loading && <LoaderRelative /> }
                { !loading && data && data.searchUser && term.value !== "" &&
                    ( data.searchUser[0]
                        ? <UserList users={data.searchUser} thisUser={meData.me.username} lang={lang} meName={meData.me.username} />
                        : <TextMedium text={Words.noSearchResult} lang={lang} />
                    )
                }
            </Container>
        )
    } else return <Loader />
}