import React, { useState } from 'react';
import styled from 'styled-components';
import { BreakPoint } from '../Styles/Theme';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import { SEE_MY_DOINGS } from '../Routes/EditDoings';
import { TODAY_QUERY, ME } from '../Routes/Today';
import TextLarge from './TextLarge';
import TextRegular from './TextRegular';
import IconButton from './IconButton';
import DoingList from './DoingList';
import AddDoing from './AddDoing';
import Words from '../Lang/Words.json';
import LoaderButton from './LoaderButton';
import { getToday } from '../Util/Convertors';

const ADD_DOING = gql`
    mutation addDoing( $name: String!, $color: String!, $icon: String!, $categoryId: String! ) {
        addDoing ( name: $name, color: $color, icon: $icon, categoryId: $categoryId ) {
            doing {
                id
            }
            pin {
                id
            }
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

const TOGGLE_FAVORITE = gql`
    mutation toggleFavorite( $pinId: String! ) {
        toggleFavorite( pinId: $pinId )
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

const updateMyDoings = ({ myDoings, setMyDoings, id, newId, create, icon, color, removeDoing }) => {
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

const updateMyPins = ({ myPins, setMyPins, pinId, newPinId, doingId, createPin, toggleFavorite }) => {
    const array = myPins.slice(); 

    if ( createPin ) {
        setMyPins([ ...array, createPin ]);

    } else {
        const target = array.find( pin => pin.id === pinId );
        if (toggleFavorite) target.isFavorite = !target.isFavorite;
        if (newPinId) target.id = newPinId;
        if (doingId) target.doing = { id: doingId };
        setMyPins(array);
    }
}

export default ({ data, me, categories, lang }) => {
    const [ addDoingPopup, setAddDoingPopup ] = useState(false);
    const [ myDoings, setMyDoings ] = useState(data);
    const [ myPins, setMyPins ] = useState(me.pins);
    const [ newId, setNewId ] = useState(false);
    const [ newPinId, setNewPinId ] = useState(false);
    const [ randomId, setRandomId ] = useState( Math.floor(Math.random()*10000).toString() );
    const [ randomPinId, setRandomPinId ] = useState( Math.floor(Math.random()*10000).toString() );
    const [ creating, setCreating ] = useState(false);

    const yyyymmdd = getToday();

    const [ addPinMutation ] = useMutation(PIN_DOING, { 
        refetchQueries: [{ query: SEE_MY_DOINGS }, { query: TODAY_QUERY, variables: { yyyymmdd }}]
    });

    const [ removePinMutation ] = useMutation(REMOVE_PIN, {
        refetchQueries: [{ query: SEE_MY_DOINGS }, { query: TODAY_QUERY, variables: { yyyymmdd }}]
    });

    const [ addDoingMutation ] = useMutation(ADD_DOING, {
        refetchQueries : [{ query: SEE_MY_DOINGS }, { query: TODAY_QUERY, variables: { yyyymmdd }}]
    });
    
    const [ editDoingMutation ] = useMutation(EDIT_DOING, {
        refetchQueries: [{ query: SEE_MY_DOINGS }, { query: TODAY_QUERY, variables: { yyyymmdd }}]
    });

    const [ toggleFavoriteMutation ] = useMutation(TOGGLE_FAVORITE, {
        refetchQueries: [{ query: ME }]
    });

    const addPin = ({ id, name, icon, color, authorId, authorName, category }) => {
        addPinMutation({ variables: { doingId: id }});
        const create = {
            id, name, icon, color, authorId, authorName, category,
            isCreating: false
        }
        updateMyDoings({ myDoings, setMyDoings, create });
        closePopup();
    }

    const removePin = ({ doingId }) => {
        removePinMutation({ variables: { doingId } })
        updateMyDoings({ myDoings, setMyDoings, id: doingId, removeDoing: true }); 
    }

    const addDoing = ({ name, icon, color, authorId, authorName, category }) => {
        setCreating(true);

        addDoingMutation({ 
            variables: { name, icon, color, categoryId: category.id },
            update: (_, { data: { addDoing }}) => {
                setNewId(addDoing.doing.id);
                setNewPinId(addDoing.pin.id);
            }
        });

        const create = {
            name, icon, color, authorId, authorName, category,
            id: randomId, 
            isCreating: true,
        }

        const createPin = {
            id: randomPinId,
            isFavorite: false,
            doing: { id: randomId },
            user: { id: authorId, name: authorName } 
        }

        updateMyDoings({ myDoings, setMyDoings, create });
        updateMyPins({ myPins, setMyPins, createPin });
    }

    const editDoing = ({ id, color, icon }) => {
        editDoingMutation({ variables: { id, color, icon } });
        updateMyDoings({ myDoings, setMyDoings, id, color, icon });
    }

    const toggleFavorite = ({ pinId }) => {
        toggleFavoriteMutation({ variables: { pinId }});
        updateMyPins({ myPins, setMyPins, pinId, toggleFavorite: true });
    }

    const onAddDoingPopup = () => {
        setAddDoingPopup(true);
    }

    const closePopup = () => {
        setAddDoingPopup(false);
    }

    if ( newId && newPinId ) {
        updateMyDoings({ myDoings, setMyDoings, id: randomId, newId });
        updateMyPins({ myPins, setMyPins, pinId: randomPinId, newPinId, doingId: newId });

        // 임시 ID 초기화
        setNewId(false);
        setNewPinId(false);
        setRandomId( Math.floor(Math.random()*10000).toString() );
        setRandomPinId( Math.floor(Math.random()*10000).toString() );

        // 새로 추가 클릭 금지 초기화
        setCreating(false);
    }

    return (
        <Container>
            <Wrapper>
                <Header>
                    <div>
                        <TextLarge text={Words.doingList} lang={lang} />
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
                                            pins={myPins}
                                            me={me}
                                            editDoing={editDoing}
                                            toggleFavorite={toggleFavorite}
                                            removePin={removePin}
                                            lang={lang}
                                        />
                    else return null;
                })}
                { addDoingPopup && 
                    <AddDoing
                        me={me}
                        categories={categories}
                        myDoings={myDoings}
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