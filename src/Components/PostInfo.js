import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TextSmall from './TextSmall';
import TextLarge from './TextLarge';
import { blockToTimeStart, blockToTimeFor, scoreZero } from '../Util/Convertors';
import Words from '../Lang/Words.json';
import FeedUser from './FeedUser';
import Theme from '../Styles/Theme';
import { getLangArray } from '../Util/Languages';

const Container = styled.section`

`;

const Info = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 3px;
`;

const Heading = styled.div`
    margin-bottom: 20px;
`;

const DoingName = styled(TextLarge)`
    position: relative;
    display: inline-block;

    &::after {
        content: ${({ score })=> score && `"(${score})"` };
        position: absolute;
        right: -5px;
        top: 0;
        opacity: .5;
        transform: translateX(100%);
        ${({ theme })=> theme.f_regular }
    }
`;

const Likes = styled(TextSmall)`
    display: block;
    margin-top: 3px;
`;

const PostInfo = ({ 
    className, doing, color, score, category, startAt, blocks, lang, likesCountState,
    id, author, avatar, location, createdAt, toggleLike, isLikedState, disableComment = false
}) => {
    return (
        <Container className={className} >
            <Info>
                <p>
                    <TextSmall string={blockToTimeStart(startAt)} />
                    <TextSmall string={blockToTimeFor(blocks, lang, "isFor")} lang={lang} />
                </p>
                <TextSmall text={category} lang={lang} />
            </Info>
            <Heading>
                <DoingName string={doing} lang={lang} color={color} score={ score && scoreZero(score.toString()) } />
                { likesCountState !== 0 &&
                    <Likes string={likesCountState+''} text={Words.likes} lang={lang} color={Theme.c_black} />
                }
            </Heading>
            <FeedUser
                id={id}
                author={author}
                avatar={avatar}
                location={location}
                createdAt={createdAt}
                toggleLike={toggleLike}
                isLikedState={isLikedState}
                disableComment={disableComment}
                lang={lang}
            />
        </Container>
    )
}


PostInfo.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    doing: PropTypes.string,
    color: PropTypes.string,
    score: PropTypes.number,
    category: PropTypes.object,
    startAt: PropTypes.number,
    blocks: PropTypes.number,
    lang: PropTypes.oneOf( getLangArray() ),
    likesCountState: PropTypes.number,
    author: PropTypes.string,
    avatar: PropTypes.string,
    location: PropTypes.string,
    createdAt: PropTypes.string,
    toggleLike: PropTypes.func,
    isLikedState: PropTypes.bool,
}


export default PostInfo;