import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import LoaderRelative from './LoaderRelative';
import DoingItem from './DoingItem';
import TextMedium from './TextMedium';
import Words from '../Lang/Words.json';
import Button from './Button';

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


const Container = styled.div`
    margin-top: 30px;
    max-height: 50vh;
`;

const DoingItems = styled.ul`
    ${({ theme })=> theme.popupContent };
    border-bottom: 1px solid ${({ theme })=> theme.c_lightGray };
    margin: 0 -30px;
`;

const ButtonStyled = styled(Button)`
    display: block;
    width: 100%;
    margin-top: 30px;
    padding: 10px;
`;

const CategoryList = ({ term, category, lang, addPin, setAdding }) => {
    const { data, loading } = useQuery( SEARCH_DOING, { variables: { term, category }});
    
    const onClickAdd = () => {
        setAdding(true);
    }

    return (
        <Container>
            { loading && <LoaderRelative /> }
            { !loading && data && data.searchDoing && ( <>
                { data.searchDoing[0]
                    ?
                    <DoingItems>
                        { data.searchDoing.map( doing => (
                            <DoingItem
                                key={doing.id}
                                id={doing.id}
                                name={doing.name}
                                color={doing.color}
                                author={doing.author}
                                category={category}
                                addPin={addPin}
                                isAdding={true}
                                lang={lang}
                            />
                        ))}
                    </DoingItems>
                    : 
                    <TextMedium text={Words.noSearchResult} lang={lang} /> 
                }
                <ButtonStyled text={Words.addNew} lang={lang} onClick={onClickAdd} />
            </>)}
        </Container>
    )
}


export default CategoryList;