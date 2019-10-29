import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Languages from '../Util/Languages';

const Container = styled.p`
    font-size: 18px;
    font-weight: 100;
    line-height: 1.4;
    word-break: keep-all;
    color: white;
    ${({ lang }) => lang === 'kr' && ` 
        letter-spacing: -.03em;
    `}
    ${({ color }) => color && `color: ${color};` };
`;

const Message = ({ className, text, color, lang }) => {
    return (
        <Container className={className} lang={lang} color={color} >
            <Languages text={text} lang={lang} />
        </Container>
    )
}

Message.propTypes = {
    text : PropTypes.object.isRequired,
    lang : PropTypes.string.isRequired,
}

export default Message;