import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'
import { languages } from '../Util/Languages';

const Container = styled.input`
    ${({ theme })=> theme.f_regular };
    ${({ theme })=> theme.inputUnderline };
    background: none;
    transition: .5s;
    outline: none;
    width: 100%;
    padding: 10px 3px 9px;
    color: ${({ theme })=> theme.c_black};
    &.large {
        font-size: 20px;
    }
    ${({ color, theme }) => color === 'white' && `
        color: white;
        border-color: ${ theme.c_blueBrighter2 };
        &::placeholder {
            color: ${ theme.c_blueBrighter1 };
        }
        &:focus {
            border-color: white;
        }
    `}
    &::placeholder {
        font-weight: 300;
    }
`;

const Input = ({ placeholder, value, onChange, type, color, lang, required=true, id, name, accept, className }) => {
    const text = placeholder && languages( placeholder, lang );
    return <Container 
        placeholder={text} 
        value={value}
        onChange={onChange}
        type={type}
        color={color}
        id={id}
        name={name}
        accept={accept}
        required={required}
        className={className}
    />
}

Input.propTypes = {
    placeholder : PropTypes.object.isRequired,
    required : PropTypes.bool,
    value : PropTypes.any,
    onChange : PropTypes.func.isRequired,
    type : PropTypes.string,
    color : PropTypes.string,
    lang : PropTypes.string,
    id : PropTypes.string,
    name : PropTypes.string,
    accept : PropTypes.string,
}

export default Input;
