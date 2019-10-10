import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import TextRegular from './TextRegular';
import Theme from '../Styles/Theme';
import { getPrintDate } from '../Util/Languages';
import TextLarge from './TextLarge';
import TextSmall from './TextSmall';
import { timePresenter } from '../Util/Convertors';
import Words from '../Lang/Words.json';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const SEE_MY_POSTS = gql`
    query seeMyPosts( $username: String!, $yyyymmdd: String! ) {
        seeMyPosts( username: $username, yyyymmdd: $yyyymmdd ) {
            id
            doing {
                id
                name
                color
                category {
                    id
                    name
                    lang {
                        id
                        kr
                        en
                    }
                }
            }
            likesCount
            commentsCount
            startAt
            endAt
        }
    }
`;

const Container = styled.ul`
    ${({ theme })=> theme.miniFeedTitle }
    margin-top: 20px;
`;

const Box = styled.li`
    ${({ theme })=> theme.miniFeedBox }
    &:not(:last-child) {
        border-bottom: 1px solid ${({ theme })=> theme.c_lightGray };
    }
`;

const Info = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
`;

const LikesAndComments = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: row-reverse;
`;

const MiniFeed = ({ username, yyyymmdd, lang }) => {
    const { data, loading } = useQuery( SEE_MY_POSTS, { variables: { username, yyyymmdd } })

    if ( !loading && data && data.seeMyPosts && data.seeMyPosts[0] ) {
        return (
            <Container>
                <TextRegular string={ getPrintDate(yyyymmdd, lang) } color={ Theme.c_gray }/>
                { data.seeMyPosts.map( post => (
                    <Box key={post.id} >
                        <Info>
                            <p>
                                <TextSmall string={timePresenter( post.startAt, post.endAt )} />
                            </p>
                            <TextSmall text={post.doing.category.lang} lang={lang} />
                        </Info>
                        <TextLarge string={ post.doing.name } color={ post.doing.color } key={post.id} />
                        <LikesAndComments>
                            <Link to={`/post/${post.id}`}>
                                <TextSmall string={post.commentsCount+''} text={Words.commentsCount} lang={lang} color={Theme.c_blue} weight="bold" />
                            </Link>
                            { post.likesCount !== 0 &&
                                <TextSmall string={post.likesCount+''} text={Words.likes} lang={lang} color={Theme.c_black} />
                            }
                        </LikesAndComments>
                    </Box>
                ))}
            </Container>
        )
    } else return null;
}

MiniFeed.propTypes = {
    username: PropTypes.string.isRequired,
    yyyymmdd: PropTypes.string.isRequired
}

export default MiniFeed;