import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../Components/Loader';
import FeedItem from '../Components/FeedItem';
import { getLang } from '../Util/Languages';
import FeedReview from '../Components/FeedReview';

export const FEED_QUERY = gql`
    {
        seeFeed {
            posts {
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
            reviews {
                id
                text
                yyyymmdd
                createdAt
                isLiked
                likesCount
                user {
                    username
                    avatar
                }
            }
        }
    }
`;

const Container = styled.main`
    ${({ theme })=> theme.mainContainer };
    background-color: ${({ theme })=> theme.c_lightGray };
    padding-top: 1px;
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
    let Feed=[];

    if ( !loading && data && data.seeFeed ) {
        Feed = [ ...data.seeFeed.posts, ...data.seeFeed.reviews ];
        Feed.sort((a, b) => a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0 );
        console.log(Feed);
    }

    return <>
        <Container>
            { loading && <Loader />}
            { !loading && data && data.seeFeed && (
                <>
                    { Feed.map(post => (
                        post.blocks 
                        ?
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
                            />
                        :
                            <FeedReview
                                id={post.id}
                                key={post.id}
                                text={post.text}
                                yyyymmdd={post.yyyymmdd}
                                createdAt={post.createdAt}
                                isLiked={post.isLiked}
                                likesCount={post.likesCount}
                                author={post.user.username}
                                avatar={post.user.avatar}
                                lang={lang}
                            />
                    ))}
                </>
            )}
        </Container>
    </>
};