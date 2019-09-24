import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Languages from '../Lang/Languages';

const Container = styled.p`
    font-size: 24px;
    font-weight: 100;
    color: white;
    ${({ lang }) => lang === 'KR' && ` 
        letter-spacing: -.05em;
    `}
`;

const Message = ({ text, lang }) => {
    return (
        <Container lang={lang}>
            <Languages text={text} lang={lang} />
        </Container>
    )
}

Message.propTypes = {
    text : PropTypes.object.isRequired,
    lang : PropTypes.string.isRequired,
}

export default Message;