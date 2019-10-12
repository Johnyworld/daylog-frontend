import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'
import Input from './Input';
import TextRegular from './TextRegular';

const Container = styled.div`
    display: grid;
    grid-template-columns: 2fr 5fr;
    grid-gap: 20px;
    align-items: center;
`;

const InputLabel = ({
    label, placeholder, value, onChange, type, color, lang, 
    required, id, name, accept, className }) => {
    return (
        <Container>
            <TextRegular text={label} lang={lang} weight="bold" />
            <Input
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                type={type}
                color={color}
                lang={lang}
                required={required}
                id={id}
                name={name}
                accept={accept}
                className={className}
            />
        </Container>
    )
}

export default InputLabel;