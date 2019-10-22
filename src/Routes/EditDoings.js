import React, { useState } from 'react';
import styled from 'styled-components';
import TextLarge from '../Components/TextLarge';
import Words from '../Lang/Words.json';
import { ME, TODAY_QUERY } from '../Components/TodayQueries';
import { useQuery, useMutation } from 'react-apollo-hooks';
import Loader from '../Components/Loader';
import { getLang } from '../Util/Languages';
import { gql } from 'apollo-boost';
import DoingList from '../Components/DoingList';
import IconButton from '../Components/IconButton';
import AddDoing from '../Components/AddDoing';
import TextRegular from '../Components/TextRegular';
import { BreakPoint } from '../Styles/Theme';

export const SEE_MY_DOINGS = gql`
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

const ADD_DOING = gql`
    mutation addDoing( $name: String!, $color: String!, $icon: String!, $categoryId: String! ) {
        addDoing ( name: $name, color: $color, icon: $icon, categoryId: $categoryId ) {
            id
        }
    }
`;

const EDIT_DOING = gql`
    mutation editDoing( $id: String!, $color: String, $icon: String ) {
        editDoing( id: $id, color: $color, icon: $icon )
    }
`;

const PIN_DOING = gql`
    mutation addPin( $doingId: String! ) {
        addPin( doingId: $doingId )
    }
`;

const REMOVE_PIN = gql`
    mutation removePin( $doingId: String! ) {
        removePin( doingId: $doingId )
    }
`;

const Container = styled.main`
    ${({ theme })=> theme.mainContainer };
    @media screen and ( ${BreakPoint} ) {
        background-color: ${({ theme })=> theme.c_lightGray };
        padding: 30px 0 50px;
    }
`;

const Wrapper = styled.div`
    ${({ theme })=> theme.wrapper };
    padding: 30px;
`;

const Header = styled.header`
    margin-bottom: 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

const getCategories = ( doings ) => {
    let categories = [];
    doings.forEach( doing => {
        categories = [ 
            ...categories, 
            { 
                name: doing.category.name, 
                lang: doing.category.lang,
                id: doing.category.id
            }
        ];
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
    const [ addDoingPopup, setAddDoingPopup ] = useState(false);

    const [ addPinMutation ] = useMutation(PIN_DOING, { 
        refetchQueries: [{ query: SEE_MY_DOINGS }, { query: TODAY_QUERY }]
    });

    const [ removePinMutation ] = useMutation(REMOVE_PIN, {
        refetchQueries: [{ query: SEE_MY_DOINGS }, { query: TODAY_QUERY }]
    });

    const [ addDoingMutation ] = useMutation(ADD_DOING, {
        refetchQueries : [{ query: SEE_MY_DOINGS }, { query: TODAY_QUERY }]
    });
    
    const [ editDoingMutation ] = useMutation(EDIT_DOING, {
        refetchQueries: [{ query: SEE_MY_DOINGS }, { query: TODAY_QUERY }]
    });

    if ( !loading && data && data.seeFollowedDoings && meData && meData.me && !meLoading ) {
        const categories = getCategories( data.seeFollowedDoings );
        const lang = getLang( meData.me.lang );

        const onAddDoingPopup = () => {
            setAddDoingPopup(true);
        }

        const closePopup = () => {
            setAddDoingPopup(false);
        }

        const onSelectDoing = (doingId) => {
            closePopup();
            addPinMutation({ variables: { doingId }});
        }

        window.scrollTo( 0, 0 );
        return (
            <Container>
                <Wrapper>
                    <Header>
                        <div>
                            <TextLarge text={Words.editDoing} lang={lang} />
                            <TextRegular text={Words.editDoingSub} lang={lang} />
                        </div>
                        <IconButton icon="plus" size="medium" onClick={onAddDoingPopup} />
                    </Header>
                    { categories.map( category => (
                        <DoingList
                            key={category.name}
                            category={category}
                            doings={data.seeFollowedDoings}
                            me={meData.me}
                            editDoingMutation={editDoingMutation}
                            removePinMutation={removePinMutation}
                            lang={lang}
                        />
                    ))}
                    { addDoingPopup && 
                        <AddDoing
                            closePopup={closePopup}
                            onSelectDoing={onSelectDoing}
                            addDoingMutation={addDoingMutation}
                            lang={lang}
                        />
                    }
                </Wrapper>
            </Container>
        )
    } else return <Loader />
}