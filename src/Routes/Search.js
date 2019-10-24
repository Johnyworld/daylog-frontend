import React from 'react';
import styled from 'styled-components';
import useInput from '../Hooks/useInput';
import Input from '../Components/Input';
import { getLang } from '../Util/Languages';
import Words from '../Lang/Words.json';
import { ME } from './Today';
import Loader from '../Components/Loader';
import { useQuery } from 'react-apollo-hooks';
import UserList from '../Components/UserList';
import { gql } from 'apollo-boost';
import LoaderRelative from '../Components/LoaderRelative';
import TextMedium from '../Components/TextMedium';
import { BreakPoint } from '../Styles/Theme';

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
    @media screen and ( ${BreakPoint} ) {
        padding-top: 100px;
    }
`;

export default ({ className }) => {
    const term = useInput("");
    const { data: meData, loading: meLoading } = useQuery(ME);
    const { data, loading } = useQuery( SEARCH_USER, { variables: { term: term.value }} );

    if ( !meLoading && meData && meData.me ) {
        const lang = getLang( meData.me.lang );
    
        return (
            <Container className={className}>
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