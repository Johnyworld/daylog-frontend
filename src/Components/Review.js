import React from 'react';
import styled from 'styled-components';
import Score from './Score';
import TextRegular from './TextRegular';
import Words from '../Lang/Words.json';
import Theme from '../Styles/Theme'

const Container = styled.div`
    ${({ theme })=> theme.miniFeedTitle }
    margin-top: 30px;
`;

const Box = styled.div`
    ${({ theme })=> theme.miniFeedBox };
    display: flex;
    > span:first-child {
        min-width: 30%;
    }
`;

export default ({ review, averageScore, lang }) => {
    return (
        <Container>
            <TextRegular text={Words.review} lang={lang} color={Theme.c_gray}/>
            <Box className="review">
                <Score score={ averageScore } size="medium" />
                { review 
                    ? <TextRegular string={ review.text } />
                    : <TextRegular text={ Words.noReview } color={Theme.c_gray} lang={lang} />
                }
            </Box>
        </Container>
    )
}