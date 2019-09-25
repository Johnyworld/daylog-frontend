import React from 'react';
import styled from 'styled-components';
import Header from '../Components/Header';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../Components/Loader';
import FeedItem from '../Components/FeedItem';
import { getLang } from '../Lang/Languages';

const FEED_QUERY = gql`
    {
        seeFeed {
            id
            doing {
                name
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
`;

export default () => {
    const { data, loading } = useQuery(FEED_QUERY);
    const lang = getLang();

    return (
        <>
            <Header page="feed" />
            { loading ? <Loader /> : (
                <Container>
                    { data.seeFeed.map(post => (
                        <FeedItem
                            id={post.id}
                            key={post.id}
                            doing={post.doing.name}
                            category={post.doing.category.name}
                            author={post.user.username}
                            avatar={post.user.avatar}
                            isLiked={post.isLiked}
                            location={post.location}
                            likesCount={post.likesCount}
                            commentsCount={post.commentsCount}
                            startAt={post.startAt}
                            endAt={post.endAt}
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