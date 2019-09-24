import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'
import { languages } from '../Lang/Languages';

const Container = styled.input`
    background: none;
    border: none;
    border-bottom: 1px solid;
    padding: 10px;
    outline: none;
    width: 100%;
    font-size: 20px;
    ${({ color, theme }) => color === 'white' && `
        color: white;
        border-color: ${ theme.c_blueBrighter2 };
        &::placeholder {
            color: ${ theme.c_blueBrighter1 };
        }
    `}
    &::placeholder {
        font-weight: 300;
    }
`;

const Input = ({ placeholder, value, onChange, type, color, lang }) => {
    const text = languages( placeholder, lang );
    return <Container 
        placeholder={text} 
        value={value}
        onChange={onChange}
        type={type}
        color={color}
    />
}

Input.propTypes = {
    placeholder : PropTypes.object.isRequired,
    required : PropTypes.bool,
    value : PropTypes.string.isRequired,
    onChange : PropTypes.func.isRequired,
    type : PropTypes.string,
    color : PropTypes.string,
    lang : PropTypes.string.isRequired
}

export default Input;
