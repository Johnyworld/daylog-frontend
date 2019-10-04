import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Languages from '../Util/Languages';

const Container = styled.button`
    cursor: pointer;
    font-size: 24px;
    padding: 0;
    padding-bottom: 4px;
    border-bottom: 1px solid;
    line-height: 1.2;
    transition: .5s;
    color: ${({ color }) => color };
    ${({ className })=> {
        if ( className === "disabled" ) {
            return `
                opacity: .3;
                border: 0;
                pointer-events: none;
            `;
        }
    }}
`;

const LargeButton = ({ text, lang, color, onClick, className }) => {
    return (
        <Container color={color} onClick={onClick} className={className}>
            <Languages text={text} lang={lang} />
        </Container>
    )
}

LargeButton.propTypes = {
    text : PropTypes.object.isRequired,
    lang : PropTypes.string.isRequired,
    color : PropTypes.string
}

export default LargeButton;