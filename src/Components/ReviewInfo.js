import React from 'react';
import styled from 'styled-components';
import TextRegular from './TextRegular';
import Theme from '../Styles/Theme';
import Words from '../Lang/Words.json';
import TextSmall from './TextSmall';
import { getPrintDateAuto } from '../Util/Languages';
import FeedUser from './FeedUser';

const Container = styled.section``;

const Text = styled.div`
    margin-bottom: 20px;
`;

const Date = styled(TextSmall)`
    display: inline-block;
    margin-bottom: 5px;
`;

const Article = styled(TextRegular)`
    display: block;
    margin-bottom: 5px;
`

const ReviewInfo = ({ className, id, yyyymmdd, likesCountState, text, author, avatar, createdAt, toggleLike, isLikedState, lang }) => {
    const datePrint = getPrintDateAuto(yyyymmdd, lang);
    return (
        <Container className={className}>
            <Text>
                <Date string={datePrint} text={Words.reviewWhen} lang={lang} color={Theme.c_gray} />
                <Article string={text} lang={lang} />
                { likesCountState !== 0 &&
                    <TextSmall string={likesCountState+''} text={Words.likes} lang={lang} color={Theme.c_black} />
                }
            </Text>
            <FeedUser
                id={id}
                author={author}
                avatar={avatar}
                createdAt={createdAt}
                toggleLike={toggleLike}
                isLikedState={isLikedState}
                lang={lang}
                type="review"
            />
        </Container>        
    )
}

export default ReviewInfo