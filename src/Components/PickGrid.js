import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.section`
    ${({ theme })=> theme.popupContent }
    max-height: 65%;
    margin-bottom: 20px;
`;

const Items = styled.ul`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 20px;
    justify-content: space-evenly;
    align-items: center;
`;

const Item = styled.li`
    width: 20px;
    height: 20px;
    margin: auto;
    ${({ type, value })=> {
        if (type === "icon") return `
            background: url(${ value });
            width: 24px;
            height: 24px;
        `;
        else if (type === "color") return `
            background: ${ value };
            border-radius: 50%;
        `;
    }}
`;

const PickGrid = ({ type, array, onClick }) => {
    return (
        <Container>
            <Items>
                { array.map( item => (
                    <button onClick={onClick.bind(this, item.value)} key={item.value} >
                        <Item value={item.value} type={type} />
                    </button>
                ))}
            </Items>
        </Container>
    )
}

PickGrid.propTypes = {
    type: PropTypes.string,
    array: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired
}

export default PickGrid;