import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import LoaderRelative from './LoaderRelative';
import DoingItem from './DoingItem';
import TextMedium from './TextMedium';
import Words from '../Lang/Words.json';

const SEARCH_DOING = gql`
    query searchDoing( $term: String!, $category: String ) {
        searchDoing( term: $term, category: $category ) {
            id
            name
            color
            icon
            author {
                id
                username
            }
            pinsCount
            postsCount
            blocksCount
            isPinned
        }
    }
`;


const Container = styled.ul`
    margin-top: 30px;
    max-height: 50vh;
`;

const CategoryList = ({ term, category, list, lang, onSelectDoing }) => {
    const { data, loading } = useQuery( SEARCH_DOING, { variables: { term, category }});
    return (
        <Container>
            { loading && <LoaderRelative /> }
            { !loading && data && data.searchDoing && (
                data.searchDoing[0]
                ? 
                data.searchDoing.map( doing => (
                    <DoingItem
                        key={doing.id}
                        id={doing.id}
                        name={doing.name}
                        color={doing.color}
                        author={doing.author}
                        onSelectDoing={onSelectDoing}
                        lang={lang}
                    />
                ))
                : 
                <TextMedium text={Words.noSearchResult} lang={lang} />
            )}
        </Container>
    )
}


export default CategoryList;