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

export const FEED_POST = gql`
    query seeFeedPost( $limit: Int, $offset: Int ) {
        seeFeedPost( limit: $limit, offset: $offset ) {
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
`;

export const FEED_REVIEW = gql`
    query seeFeedReview( $limit: Int, $offset: Int ) {
        seeFeedReview( limit: $limit, offset: $offset ) {
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
    }
`;
 
const Container = styled.main`
    ${({ theme })=> theme.mainContainer };
    background-color: ${({ theme })=> theme.c_lightGray };
    padding-top: 1px;
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

// const getFeed = ( posts, reviews, offset, limit ) => {
//     let postsCount = 0;
//     let reviewsCount = 0;

//     const feed = [ ...posts, ...reviews ]
//         .sort((a, b) => a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0 )
//         .slice( 0, offset + limit )

//     for ( var i in feed ) {
//         if ( i < offset + limit ) {
//             feed[i].blocks ? postsCount += 1 : reviewsCount +=1;
//         } else {
//             break;
//         }
//     }

//     return { feed, postsCount, reviewsCount };
// }

const FeedItems = styled.ul`
    ${({ theme })=> theme.wrapper };
`;

const FeedItemStyled = styled(FeedItem)`
    margin-bottom: 10px;
`;

const FeedReviewStyled = styled(FeedReview)`
    margin-bottom: 10px;
`;

export default () => {
    const { data, loading, fetchMore } = useQuery(FEED_POST);
    // const { data: dataReviews, loading: loadingReviews, fetchMore: fetchMoreReviews } = useQuery(FEED_REVIEW);
    const { data: meData, loading: meLoading } = useQuery(ME);
    const [ loadedPost, setLoadedPost ] = useState(false);
    // const [ loadedReview, setLoadedReview ] = useState(false);

    useEffect(()=>{
        window.scrollTo(0, 0);
    }, []);
    
    if ( !loading && data && data.seeFeedPost ) {
        const lang = getLang( meData && meData.me && !meLoading && meData.me.lang );
        // const Feed = getFeed( data.seeFeedPost, dataReviews.seeFeedReview, prevData.offset, limit );
        // const Feed = [ ...data.seeFeedPost, ...dataReviews.seeFeedReview ]
        //     .sort((a, b) => a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0 )
        const Feed = data.seeFeedPost;

        let fetching = false

        // console.log("피드: ", Feed);
        // console.log("피드 길이: ", Feed.length, "전체 길이: ", data.seeFeedPost.length + dataReviews.seeFeedReview.length)
        // console.log("포스트 길이: ", data.seeFeedPost.length, "리뷰 길이: ", dataReviews.seeFeedReview.length)
        // console.log("로디드 포스트: ", loadedPost);
        // console.log("로디드 리뷰: ", loadedReview);
        
        const onLoadMore = () => {
            if ( !fetching ) {
                console.log("fetching more...");
                fetching = true;

                if ( !loadedPost ) {
                    fetchMore ({
                        variables: {
                            offset: data.seeFeedPost.length
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult.seeFeedPost[0] ) {
                                setLoadedPost(true);
                                console.log("POST DONE")
                                return prev;
                            }
                            return Object.assign({}, prev, {
                                seeFeedPost : [ ...prev.seeFeedPost, ...fetchMoreResult.seeFeedPost ]
                            });
                        }
                    });
                }

                // if ( !loadedReview ) {
                //     await fetchMoreReviews ({
                //         variables: {
                //             offset: dataReviews.seeFeedReview.length
                //         },
                //         updateQuery: (prev, { fetchMoreResult }) => {
                //             if (!fetchMoreResult.seeFeedReview[0] ) {
                //                 setLoadedReview(true);
                //                 console.log("REV DONE")
                //                 return prev;
                //             }
                //             return Object.assign({}, prev, {
                //                 seeFeedReview : [ ...prev.seeFeedReview, ...fetchMoreResult.seeFeedReview ]
                //             });
                //         }
                //     });
                // }
            }
        }
    
        const handleScroll = ({ currentTarget }) => {
            const scrollBottom = currentTarget.scrollTop + currentTarget.clientHeight >= currentTarget.scrollHeight;
            if ( scrollBottom ) {
                if ( !loadedPost ) {
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
                                        author={post.user.username}
                                        avatar={post.user.avatar}
                                        lang={lang}
                                    />
                            ))}
                            {!loadedPost ? <LoaderRelative /> : null}
                        </FeedItems>
                }
            </Container>
        </>
    } else return <Loader />
};