import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Words from '../Lang/Words'
import TextSmall from './TextSmall'
import Theme from '../Styles/Theme'
import TextRegular from './TextRegular';
import Username from './Username';
import { getLangArray } from '../Util/Languages';

const Container = styled.div`
    margin-top: 20px;
`;

const LinkStyled = styled(Link)`
`;

const Comments = styled.ul`
    margin-top: 10px;
`;

const SmallComment = styled.li`
    &:not(:last-child) { margin-bottom: 10px; }
`;

const MainText = styled(TextRegular)`
    display: inline;
`

const FeedItemComments = ({ id, comments, commentsCount, type, lang }) => {
    const limit = 2;

    return (
        <Container>
            { commentsCount > limit &&
                <LinkStyled to={`/${type}/${id}`}>
                    <TextSmall text={Words.view} lang={lang} color={Theme.c_blue} weight="bold" />
                    <TextSmall string={commentsCount-limit} lang={lang} color={Theme.c_blue} weight="bold" />
                    <TextSmall text={Words.moreComments} lang={lang} color={Theme.c_blue} weight="bold" />
                </LinkStyled>
            }
            <Comments>
                { comments.map(( comment, key ) => (
                    key < limit &&
                    <SmallComment key={comment.id} >
                        <Username username={comment.user.username} inline="true" />
                        <MainText string={comment.text} />
                    </SmallComment>
                ))}
            </Comments>
        </Container>
    )
}

FeedItemComments.propTypes = {
    id: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    commentsCount: PropTypes.number.isRequired,
    lang: PropTypes.oneOf( getLangArray() ).isRequired
}

export default FeedItemComments;