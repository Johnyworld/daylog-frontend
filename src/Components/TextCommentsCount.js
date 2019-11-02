import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Words from '../Lang/Words.json';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import TextSmall from './TextSmall.js';
import Theme from '../Styles/Theme.js';
import { getLangArray } from '../Util/Languages.js';

const Container = styled(Link)`
  
`;

const TextCommentsCount = ({ className, type, id, count, lang }) => {

    let view;
    let options = { 
        lang, 
        color: Theme.c_blue, 
        weight: "bold" 
    }

    if ( count === 1 ) {
        view = <TextSmall string={count+''} text={Words.aComment} { ...options } />
    } else if ( count === 0 ) {
        view = <TextSmall text={Words.newComment} { ...options } />
    } else {
        view = <TextSmall string={count+''} text={Words.commentsCount} { ...options } />
    }

    return (
        <Container className={className} to={`/${type}/${id}`}>
            {view}
        </Container>
    )
} 

TextCommentsCount.propTypes = {
    type: PropTypes.oneOf([ 'post', 'review' ]),
    id: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    lang: PropTypes.oneOf( getLangArray() ).isRequired

}

export default TextCommentsCount;