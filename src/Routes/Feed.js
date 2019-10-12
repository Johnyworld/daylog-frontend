import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../Components/Loader';
import FeedItem from '../Components/FeedItem';
import { getLang } from '../Util/Languages';
import FeedReview from '../Components/FeedReview';
import { ME } from '../Components/TodayQueries';
import Search from './Search';
import Words from '../Lang/Words.json';
import TextSmall from '../Components/TextSmall';

export const FEED_QUERY = gql`
    query seeFeed {
        seeFeed {
            reviews {
                id
                text
                yyyymmdd
                createdAt
                isLiked
                likesCount
                user {
                    id
                    username
                    avatar
                }
            }
            posts {
                id
                doing {
                    id
                    name
                    color
                    category {
                        id
                        lang {
                            id
                            kr
                            en
                        }
                    }
                }
                user {
                    id
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
                        id
                        username
                        avatar
                    }
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

const NoFeed = styled.main``;
const NoFeedMessage = styled(TextSmall)`
    display: block;
    padding: 30px;
    padding-bottom: 0;
`

export default () => {
    const { data, loading } = useQuery(FEED_QUERY);
    const { data: meData, loading: meLoading } = useQuery(ME);
    window.scrollTo(0, 0);
    
    if ( !loading && data && data.seeFeed ) {
        const lang = getLang( meData && meData.me && !meLoading && meData.me.lang );
        let Feed=[];
        Feed = [ ...data.seeFeed.posts, ...data.seeFeed.reviews ];
        Feed.sort((a, b) => a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0 );

        return <>
            <Container>
                {
                    !Feed[0]
                    ?
                        <NoFeed>
                            <NoFeedMessage text={Words.noFeed} lang={lang} />
                            <Search />
                        </NoFeed>
                    : 
                        Feed.map(post => (
                            post.blocks // 리뷰인지 포스트인지 체트
                            ?
                                <FeedItem
                                    id={post.id}
                                    key={post.id}
                                    doing={post.doing.name}
                                    color={post.doing.color}
                                    category={post.doing.category.lang}
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
                        ))
                }
            </Container>
        </>
    } else return <Loader />
};