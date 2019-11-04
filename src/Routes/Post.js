import React, { useState, useEffect } from 'react'; 
import styled from 'styled-components';
import Words from '../Lang/Words.json';
import { getLang, languages } from '../Util/Languages';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import Loader from '../Components/Loader';
import NewComment from '../Components/NewComment';
import useInput from '../Hooks/useInput';
import TextRegular from '../Components/TextRegular';
import { BreakPoint } from '../Styles/Theme';
import { ME } from './Today';
import Comments from '../Components/Comments.js';
import PostInfo from '../Components/PostInfo.js';
import ReviewInfo from '../Components/ReviewInfo.js';

const ADD_COMMENT = gql`
    mutation addComment( $id: String!, $text: String!, $type: String! ) {
        addComment( id: $id, text: $text, type: $type ) {
            id
            text
            createdAt
            user {
                username
                avatar
            }
        }
    }
`;

const EDIT_COMMENT = gql`
    mutation editComment( $id:String!, $text:String, $action:String! ) {
        editComment( id: $id, text: $text, action: $action )
    }
`;

export const SEE_POST = gql`
    query seePost( $id: String! ) {
        seePost( id : $id ) {
            id
            location
            score
            startAt
            endAt
            createdAt
            blocks
            isLiked
            likesCount
            commentsCount
            doing {
                id
                name
                color
                category {
                    id
                    name
                }
            }
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
                post {
                    id
                }
            }
        }
    }
`;

export const SEE_REVIEW = gql`
    query seeReview( $id: String! ) {
        seeReview( id: $id ) {
            id
            text
            yyyymmdd
            isLiked
            likesCount
            createdAt
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
                post {
                    id
                }
            }
        }
    }
`;

const Container = styled.main`
    background-color: ${({ theme })=> theme.c_lightGray };
    padding-bottom: 70px;
    min-height: calc(100vh - 70px);
    padding-top: 1px;
    @media screen and ( ${BreakPoint} ) {
        padding-top: 100px;
        min-height: 100vh; 
    }
`;

const FeedItemBox = `
    width: 100%;
    padding: 30px;
    margin-bottom: 10px;
`

const PostInfoStyled = styled(PostInfo)`
    ${({ theme })=> theme.box };
    ${FeedItemBox}
`;

const ReviewInfoStyled = styled(ReviewInfo)`
    ${({ theme })=> theme.box };
    ${FeedItemBox}
`

const Wrapper = styled.div`
    ${({ theme })=> theme.wrapper }
`;

const NoCommentMessage = styled.p`
    text-align: center;
    padding: 30px;
`

export default () => {
    const split = window.location.hash.split("/");
    const type = split[1];
    const id = split[2];
    const newComment = useInput('');
    
    const [ newComments, setNewComments ] = useState([]);
    const [ newId, setNewId ] = useState(false);
    const [ randomId, setRandomId ] = useState( Math.floor(Math.random()*10000).toString() );
    const [ creating, setCreating ] = useState(false);
    
    const { data, loading } = type === 'post'
        ? useQuery(SEE_POST, { variables: { id }})
        : useQuery(SEE_REVIEW, { variables: { id }})

    const comments = type === 'post'
        ? data && data.seePost && data.seePost.comments
        : data && data.seeReview && data.seeReview.comments

    const { data: meData, loading: meLoading } = useQuery(ME);

    const lang = getLang( !meLoading && meData && meData.me && meData.me.lang );
    const failToSend = languages(Words.failToSend, lang);

    const [ addCommentMutation ] = useMutation( ADD_COMMENT, { 
        variables: { 
            id, 
            text: newComment.value,
            type
        }
    });

    const [ editCommentMutation ] = useMutation(EDIT_COMMENT);

    const submitNewComment = async() => {
        try {
            const newOne = {
                id: randomId,
                text: newComment.value,
                createdAt: new Date().toISOString(),
                isCreating: true,
                user: {
                    id: meData && meData.me && meData.me.username, 
                    username: meData && meData.me && meData.me.username,
                    avatar: meData && meData.me && meData.me.avatar,
                }
            }
            if ( type==="post" ) newOne.post = { id }
            if ( type==="review" ) newOne.review = { id }

            setNewComments([ ...newComments, newOne ]);

            newComment.setValue("");
            setCreating(true);

            await addCommentMutation({ 
                update: (_, { data: { addComment }}) => {
                    setNewId(addComment.id);
                }
            });

        } catch {
            alert(failToSend);
        }
    }

    const onKeyPress = e => {
        const { which } = e;
        if ( which === 13 ) {
            e.preventDefault();
            submitNewComment();
        }
    }

    const onClickSend = () => {
        submitNewComment();
    }

    const updateCommentId = (randomId, newId) => {
        const array = newComments.slice();
        const target = array.find( comment => comment.id === randomId );
        target.id = newId;
        target.isCreating = false;
        setNewComments(array);
    }

    if ( newId ) {
        updateCommentId(randomId, newId);
        setRandomId( Math.floor(Math.random()*10000).toString() );
        setNewId(false);
        setCreating(false);
    }

    useEffect(()=> {
        if ( creating ) {
            window.scrollTo(0, document.body.clientHeight );
        }
    }, [creating])

    return <>
        { loading && <Loader />}
        { !loading && data && (
            <Container>
                <Wrapper>

                    { type === 'post' && data.seePost &&
                        <PostInfoStyled
                            doing={data.seePost.doing.name}
                            color={data.seePost.doing.color}
                            category={data.seePost.doing.category}
                            score={data.seePost.score}
                            startAt={data.seePost.startAt}
                            blocks={data.seePost.blocks}
                            likesCountState={data.seePost.likesCount}
                            lang={lang}
                            id={id}
                            author={data.seePost.user.username}
                            avatar={data.seePost.user.avatar}
                            location={data.seePost.location}
                            createdAt={data.seePost.createdAt}
                        />
                    }

                    { type === 'review' && data.seeReview &&
                        <ReviewInfoStyled
                            yyyymmdd={data.seeReview.yyyymmdd}
                            likesCount={data.seeReview.likesCount}
                            text={data.seeReview.text}
                            id={id}
                            author={data.seeReview.user.username}
                            avatar={data.seeReview.user.avatar}
                            likesCountState={data.seeReview.likesCount}
                            createdAt={data.seeReview.createdAt}
                            lang={lang}
                        />
                    }

                    { !meLoading && meData && meData.me &&
                        <>
                            { comments[0] || newComments[0]
                                ? 
                                <Comments
                                    comments={comments}
                                    newComments={newComments}
                                    me={meData.me}
                                    lang={lang} 
                                    editCommentMutation={editCommentMutation}
                                />
                                : 
                                <NoCommentMessage>
                                    <TextRegular text={Words.noComments} lang={lang} />
                                </NoCommentMessage>
                            }
                            <NewComment
                                lang={lang}
                                onKeyPress={onKeyPress}
                                onClickSend={onClickSend}
                                value={newComment.value}
                                onChange={newComment.onChange}
                                avatar={meData.me.avatar}
                                creating={creating}
                            />
                        </>
                    }
                </Wrapper>
            </Container>
        )}
    </>
}