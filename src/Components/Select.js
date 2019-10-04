import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
    width: 100%;
`;

const Select = styled.select`
    ${({ theme })=> theme.f_regular };
    ${({ theme })=> theme.inputUnderline };
    padding: 10px 0;
    background: none;
    width: 100%;
    outline: none;
    transition: .5s;
    option { margin-left: -1px; }
`;

const Icon = styled.div`
    position: absolute;
    right: 10px;
    top: 45%;
    width: 8px;
    height: 8px;
    transform: rotate(45deg) translateY(-50%);
    border-right: 1px solid;
    border-bottom: 1px solid;
    pointer-events: none;
`;

export default ({ list, value, onChange }) => {
    return (
        <Container className="select">
            <Select onChange={onChange} value={value} >
                { list.map( item => (
                    <option key={item.value} value={item.value}>{item.local}</option>
                ))}
            </Select>
            <Icon />
        </Container>
    )
}