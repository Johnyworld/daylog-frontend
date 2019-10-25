import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import LoaderRelative from './LoaderRelative';
import DoingItem from './DoingItem';
import TextMedium from './TextMedium';
import Words from '../Lang/Words.json';
import Button from './Button';
import TextSmall from './TextSmall';

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

const NoResult = styled(TextMedium)`
    display: block;
    margin-bottom: 5px;
`

const ButtonStyled = styled(Button)`
    display: block;
    width: 100%;
    margin-top: 30px;
    padding: 10px;
`;

const CategoryList = ({ term, category, myDoings, lang, addPin, setAdding }) => {
    const { data, loading } = useQuery( SEARCH_DOING, { variables: { term, category: category.name }});
    const onClickAdd = () => { setAdding(true); }
    
    if ( !loading && data && data.searchDoing ) {
        const doings = data.searchDoing.filter( doing => !myDoings.some( myDoing => myDoing.id === doing.id ));

        return (
            <Container>
                { doings[0]
                    ?
                    <DoingItems>
                        { doings.map( doing => (
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
                            ))
                        }
                    </DoingItems>
                    : <>
                        <NoResult text={Words.noSearchResult} lang={lang} /> 
                        <TextSmall text={Words.addDoingDesc} lang={lang} /> 
                    </>
                }
                <ButtonStyled text={Words.addNew} lang={lang} onClick={onClickAdd} />
            </Container>
        )
    } else return <LoaderRelative />;    
}


export default CategoryList;