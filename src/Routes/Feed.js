import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../Components/Loader';
import FeedItem from '../Components/FeedItem';
import { getLang } from '../Util/Languages';
import FeedReview from '../Components/FeedReview';
import { ME } from './Today';
import Search from './Search';
import Words from '../Lang/Words.json';
import TextSmall from '../Components/TextSmall';
import LoaderRelative from '../Components/LoaderRelative';
import { BreakPoint } from '../Styles/Theme';
import TextLarge from '../Components/TextLarge';
import TextRegular from '../Components/TextRegular';

export const FEED_QUERY = gql`
    query seeFeed( $limit: Int, $offset: Int ) {
        seeFeed( limit: $limit, offset: $offset ) {
            reviews {
                id
                text
                yyyymmdd
                createdAt
                isLiked
                likesCount
                commentsCount
                user {
                    id
                    username
                    avatar
                }
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
                score
                createdAt
                updatedAt
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
    max-height: 100vh;
    overflow: scroll;
    ${({ theme })=> theme.scrollMobile };
    @media screen and ( ${BreakPoint} ) {
        padding-top: 100px;
    }
`;

const Header = styled.div`
    ${({ theme })=> theme.wrapper }
    display: none;
    @media screen and ( ${BreakPoint} ) {
        display: block;
        margin-bottom: 30px;
    }
`;

const NoFeedMessage = styled(TextSmall)`
    ${({ theme })=> theme.wrapper };
    display: block;
    padding: 30px;
    padding-bottom: 0;
`

const SearchStyled = styled(Search)`
    @media screen and ( ${BreakPoint} ) {
        padding-top: 30px;
    }
`

const FeedItems = styled.ul`
    ${({ theme })=> theme.wrapper };
    li:last-child { margin-bottom: 0; }
`;

const FeedItemStyled = styled(FeedItem)`
    margin-bottom: 10px;
`;

const FeedReviewStyled = styled(FeedReview)`
    margin-bottom: 10px;
`;

const getFeed = ( posts, reviews ) => {
    return [ ...posts, ...reviews ]
        .sort((a, b) => a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0 )
}

export default () => {
    const { data, loading, fetchMore } = useQuery(FEED_QUERY);
    const { data: meData, loading: meLoading } = useQuery(ME);
    const [ isFetching, setIsFetching ] = useState(false);
    const [ fetchingDone, setFetchingDone ] = useState(false);

    useEffect(()=>{
        window.scrollTo(0, 0);
    }, []);

    if ( !loading && data && data.seeFeed && meData && meData.me ) {
        const lang = getLang( meData && meData.me && !meLoading && meData.me.lang );
        const Feed = getFeed( data.seeFeed.posts, data.seeFeed.reviews );
        
        const onLoadMore = () => {
            if ( !isFetching ) {
                console.log("fetching more...");
                setIsFetching(true);
                fetchMore ({
                    variables: {
                        offset: data.seeFeed.posts.length + data.seeFeed.reviews.length
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                        const prevLastPost = prev.seeFeed.posts[prev.seeFeed.posts.length-1];
                        const resultLastPost = fetchMoreResult.seeFeed.posts[fetchMoreResult.seeFeed.posts.length-1];
                        const prevLastReview = prev.seeFeed.reviews[prev.seeFeed.reviews.length-1];
                        const resultLastReview = fetchMoreResult.seeFeed.reviews[fetchMoreResult.seeFeed.reviews.length-1];
                        if ( 
                            ( prevLastPost ? prevLastPost.id === resultLastPost.id : true ) && 
                            ( prevLastReview ? prevLastReview.id === resultLastReview.id : true ) 
                        ) {
                            setIsFetching(true);
                            setFetchingDone(true);
                            console.log("Fetching DONE");
                            return prev;
                        } else {
                            setIsFetching(false);
                            return Object.assign({}, prev, fetchMoreResult);
                        }
                    }
                });
            }
        }
    
        const handleScroll = ({ currentTarget }) => {
            const scrollBottom = currentTarget.scrollTop + currentTarget.clientHeight >= currentTarget.scrollHeight;
            if ( scrollBottom ) {
                if ( !fetchingDone ) {
                    onLoadMore();
                }
            }
        }

        return <>
            <Container onScroll={handleScroll}>
                <Header>
                    <TextLarge text={Words.feedTitle} lang={lang} />
                    <TextRegular text={Words.feedTitleRemark} lang={lang} />
                </Header>
                {
                    !Feed[0]
                    ?
                        <>
                            <NoFeedMessage text={Words.noFeed} lang={lang} />
                            <SearchStyled />
                        </>
                    :
                        <FeedItems>
                            { Feed.map(post => (
                                post.blocks // 리뷰인지 포스트인지 체트
                                ?
                                    <FeedItemStyled
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
                                        comments={post.comments}
                                        commentsCount={post.commentsCount}
                                        startAt={post.startAt}
                                        endAt={post.endAt}
                                        score={post.score}
                                        createdAt={post.createdAt}
                                        blocks={post.blocks}
                                        lang={lang}
                                    />
                                :
                                    <FeedReviewStyled
                                        id={post.id}
                                        key={post.id}
                                        text={post.text}
                                        yyyymmdd={post.yyyymmdd}
                                        createdAt={post.createdAt}
                                        isLiked={post.isLiked}
                                        likesCount={post.likesCount}
                                        comments={post.comments}
                                        commentsCount={post.commentsCount}
                                        author={post.user.username}
                                        avatar={post.user.avatar}
                                        lang={lang}
                                    />
                            ))}
                            {!fetchingDone && isFetching ? <LoaderRelative /> : null}
                        </FeedItems>
                }
            </Container>
        </>
    } else return <Loader />
};