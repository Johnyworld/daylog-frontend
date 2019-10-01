import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MiniFeed from './MiniFeed';

const Container = styled.div`

`;

const EachPosts = ({ posts, username, lang }) => (
    <Container>
        { posts.map( day => (
            <MiniFeed username={username} yyyymmdd={day.yyyymmdd} key={day.yyyymmdd} lang={lang} />
        ))}
    </Container>
)

EachPosts.propTypes = {
    posts : PropTypes.array.isRequired,
    username : PropTypes.string.isRequired,
    lang : PropTypes.string.isRequired
}

export default EachPosts;