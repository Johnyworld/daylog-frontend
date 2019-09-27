import React from 'react';
import styled from 'styled-components';
import Header from '../Components/Header';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../Components/Loader';
import FeedItem from '../Components/FeedItem';
import { getLang } from '../Util/Languages';

const FEED_QUERY = gql`
    {
        seeFeed {
            id
            doing {
                name
                color
                category {
                    name
                }
            }
            user {
                username
                avatar
            }
            isLiked
            location
            likesCount
            commentsCount
            startAt
            endAt
            createdAt
            blocks
            comments {
                id
                text
                createdAt
                user {
                    username
                    avatar
                }
            }
        }
    }
`;

const Container = styled.main`
    padding-top: 1px;
    min-height: calc(100vh - 64px);
    background-color: ${({ theme })=> theme.c_lightGray };
    >*:not(:last-child) {
        margin-bottom: 10px;
    }
    article {
        ${({ theme })=> theme.wrap };
    }
    @media screen and ( min-width: 768px ) {
        padding-top: 30px;
    }
`;

export default () => {
    const { data, loading } = useQuery(FEED_QUERY);
    const lang = getLang();

    return (
        <>
            <Header page="feed" />
            { loading && <Loader />}
            { !loading && data && data.seeFeed && (
                <Container>
                    { data.seeFeed.map(post => (
                        <FeedItem
                            id={post.id}
                            key={post.id}
                            doing={post.doing.name}
                            color={post.doing.color}
                            category={post.doing.category.name}
                            author={post.user.username}
                            avatar={post.user.avatar}
                            isLiked={post.isLiked}
                            location={post.location}
                            likesCount={post.likesCount}
                            commentsCount={post.commentsCount}
                            startAt={post.startAt}
                            endAt={post.endAt}
                            createdAt={post.createdAt}
                            blocks={post.blocks}
                            lang={lang}
                            post={post}
                            FEED_QUERY={FEED_QUERY}
                        />
                    ))}
                </Container>
            )}
        </>
    )
};