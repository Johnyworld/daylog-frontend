import React from 'react';
import styled from 'styled-components';
import TextLarge from '../Components/TextLarge';
import Words from '../Lang/Words.json';
import { ME } from '../Components/TodayQueries';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../Components/Loader';
import { getLang } from '../Util/Languages';
import { gql } from 'apollo-boost';
import DoingList from '../Components/DoingList';

const SEE_MY_DOINGS = gql`
    {
        seeFollowedDoings {
            id
            name
            color
            icon
            author {
                id
                username
            }
            category {
                id
                name
                lang {
                    id
                    kr
                    en
                }
            }
            pinsCount
            postsCount
            blocksCount
        }
    }
`;

const Container = styled.main`
    padding: 30px;
`;

const Header = styled.header`
    margin-bottom: 50px;
`;

const getCategories = ( doings ) => {
    let categories = [];
    doings.forEach( doing => {
        categories = [ ...categories, { name: doing.category.name, lang: doing.category.lang } ];
    });
    return categories.filter((category, index) => {
        return categories.findIndex( item => {
            return category.name === item.name;
        }) === index;
    });
}

export default () => {
    const { data, loading } = useQuery(SEE_MY_DOINGS);
    const { data: meData, loading: meLoading } = useQuery(ME);
    
    if ( !loading && data && data.seeFollowedDoings && meData && meData.me && !meLoading ) {

        const categories = getCategories( data.seeFollowedDoings );
        console.log(data.seeFollowedDoings)
        const lang = getLang( meData.me.lang );
        return (
            <Container>
                <Header>
                    <TextLarge text={Words.editDoing} lang={lang} />
                </Header>
                { categories.map( category => (
                    <DoingList
                        key={category.name}
                        category={category}
                        doings={data.seeFollowedDoings}
                        me={meData.me}
                        lang={lang}
                    />
                ))}
            </Container>
        )
    } else return <Loader />
}