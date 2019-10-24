import React, { useState } from 'react';
import styled from 'styled-components';
import { BreakPoint } from '../Styles/Theme';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import { SEE_MY_DOINGS } from '../Routes/EditDoings';
import { TODAY_QUERY } from './TodayQueries';
import TextLarge from './TextLarge';
import TextRegular from './TextRegular';
import IconButton from './IconButton';
import DoingList from './DoingList';
import AddDoing from './AddDoing';
import Words from '../Lang/Words.json';
import LoaderButton from './LoaderButton';

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
        padding: 100px 0;
    }
`;

const Wrapper = styled.div`
    ${({ theme })=> theme.wrapper };
    padding: 30px;
    @media screen and ( ${BreakPoint} ) {
        padding: 0;
    }
`;

const Header = styled.header`
    margin-bottom: 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

export default ({ data, me, categories, lang }) => {
    const [ addDoingPopup, setAddDoingPopup ] = useState(false);
    const [ myDoings, setMyDoings ] = useState(data);
    const [ newId, setNewId ] = useState(false);
    const [ randomId, setRandomId ] = useState( Math.floor(Math.random()*10000).toString() );
    const [ creating, setCreating ] = useState(false);

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

    const updateMyDoings = ({ id, newId, create, icon, color, removeDoing }) => {
        const array = myDoings.slice();

        if (create) {
            const newOne = {
                id: create.id,
                name: create.name,
                icon: create.icon,
                color: create.color,
                isCreating: create.isCreating,
                author: {
                    id: create.authorId,
                    username: create.authorName
                },
                category: create.category
            }
            setMyDoings([ ...array, newOne ]);

        } else if ( removeDoing ) {
            setMyDoings( array.filter( doing => doing.id !== id ));

        } else {
            const target = array.find( doing => doing.id === id );
            if (newId) {
                target.id = newId;
                target.isCreating = false;
            }
            if (icon) target.icon = icon;
            if (color) target.color = color;
            setMyDoings(array);
        }
    }

    const addPin = ({ id, name, icon, color, authorId, authorName, category }) => {
        addPinMutation({ variables: { doingId: id }});
        const create = {
            id, name, icon, color, authorId, authorName, category,
            isCreating:false
        }
        updateMyDoings({ create });
        closePopup();
    }

    const removePin = ({ doingId }) => {
        removePinMutation({ variables: { doingId } })
        updateMyDoings({ id: doingId, removeDoing: true }); 
    }

    const addDoing = ({ name, icon, color, authorId, authorName, category }) => {
        setCreating(true);
        addDoingMutation({ 
            variables: { name, icon, color, categoryId: category.id },
            update: (_, { data: { addDoing }}) => {
                setNewId(addDoing.id);
            }
        });
        const create = {
            name, icon, color, authorId, authorName, category,
            id: randomId, 
            isCreating: true,
        }
        updateMyDoings({ create });
    }

    const editDoing = ({ id, color, icon }) => {
        editDoingMutation({ variables: { id, color, icon } })
        updateMyDoings({ id, color, icon });
    }

    const onAddDoingPopup = () => {
        setAddDoingPopup(true);
    }

    const closePopup = () => {
        setAddDoingPopup(false);
    }

    if ( newId ) {
        updateMyDoings({ id: randomId, newId });
        setNewId(false);
        setRandomId( Math.floor(Math.random()*10000).toString() );
        setCreating(false);
    }

    return (
        <Container>
            <Wrapper>
                <Header>
                    <div>
                        <TextLarge text={Words.editDoing} lang={lang} />
                        <TextRegular text={Words.editDoingSub} lang={lang} />
                    </div>
                    { !creating 
                        ? <IconButton icon="plus" size="medium" onClick={onAddDoingPopup} />
                        : <LoaderButton />
                    }
                    
                </Header>
                { categories.map( category => {
                    const exists = myDoings.find( doing => doing.category.id === category.id );
                    if ( exists ) return <DoingList
                                            key={category.name}
                                            category={category}
                                            doings={myDoings}
                                            me={me}
                                            editDoing={editDoing}
                                            removePin={removePin}
                                            lang={lang}
                                        />
                    else return null;
                })}
                { addDoingPopup && 
                    <AddDoing
                        me={me}
                        categories={categories}
                        closePopup={closePopup}
                        addPin={addPin}
                        addDoing={addDoing}
                        lang={lang}
                    />
                }
            </Wrapper>
        </Container>
    )
}