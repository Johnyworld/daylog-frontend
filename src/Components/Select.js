import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { languages } from '../Util/Languages';

const Container = styled.div`
    position: relative;
    width: 100%;
    &.left-align {
        select { padding-left: 0; }
    }
`;

const SelectInput = styled.select`
    ${({ theme })=> theme.f_regular };
    ${({ theme })=> theme.inputUnderline };
    padding: 10px 3px;
    background: none;
    width: 100%;
    outline: none;
    transition: .5s;
    border-radius: 0;
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

const Select = ({ list, value, onChange, lang, className }) => {
    return (
        <Container className={`select ${className}`}>
            <SelectInput onChange={onChange} value={value} >
                { list.map( item => (
                    <option key={item.value} value={item.value}>{
                        item.lang ? languages(item.lang, lang) : item.name
                    }</option>
                ))}
            </SelectInput>
            <Icon />
        </Container>
    )
}

Select.propTypes = {
    list: PropTypes.array.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
    lang: PropTypes.string
}

export default Select;