import React from 'react';
import styled from 'styled-components';
import Words from '../Lang/Words.json';
import Theme from '../Styles/Theme'
import TextRegular from './TextRegular.js';
import TextSmall from './TextSmall.js';
import { getPrintDate, getPrintWeek } from '../Util/Languages.js';

const Container = styled.div`
    margin-top: 20px;
`;

const Title = styled(TextRegular)`
    ${({ theme })=> theme.miniFeedTitle }
`;

const ReviewsContainer = styled.ul``;

const Review = styled.li`
    ${({ theme })=> theme.miniFeedBox };
    &:not(:last-child) {
        border-bottom: 1px solid ${({ theme })=> theme.c_lightGray };
    }
`;

export default ({ reviews, lang }) => {
    return (
        <Container>
            <Title text={Words.lastReviews} lang={lang} color={Theme.c_gray} />
            <ReviewsContainer>
                { reviews.map( review => (
                    <Review key={review.id}>
                        { review.yyyymmdd.includes('W')
                            ? <TextSmall string={getPrintWeek( review.yyyymmdd, lang, 'yyyymmWeek' )} />
                            : <TextSmall string={getPrintDate( review.yyyymmdd, lang )} />
                        }
                        <p>
                            <TextRegular string={review.text} />
                        </p>
                    </Review>
                ))}
            </ReviewsContainer>
        </Container>
    )
}