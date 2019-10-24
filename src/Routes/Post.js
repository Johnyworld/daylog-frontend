import React, { useState } from 'react'; 
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
import { ME } from '../Components/TodayQueries';
import Comments from '../Components/Comments.js';
import PostInfo from '../Components/PostInfo.js';

const ADD_COMMENT = gql`
    mutation addComment( $postId: String!, $text: String! ) {
        addComment( postId: $postId, text: $text ) {
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

const PostInfoStyled = styled(PostInfo)`
    width: 100%;
    padding: 30px;
    margin-bottom: 10px;
    ${({ theme })=> theme.box };
`;

const Wrapper = styled.div`
    ${({ theme })=> theme.wrapper }
`;

const NoCommentMessage = styled.p`
    text-align: center;
    padding: 30px;
`

export default () => {
    const id = window.location.hash.split("/")[2];
    const newComment = useInput('');
    
    const [ newComments, setNewComments ] = useState([]);
    const [ newId, setNewId ] = useState(false);
    const [ randomId, setRandomId ] = useState( Math.floor(Math.random()*10000).toString() );
    const [ creating, setCreating ] = useState(false);
    
    const { data, loading } = useQuery(SEE_POST, { variables: { id }});
    const { data: meData, loading: meLoading } = useQuery(ME);
        
    const lang = getLang( !meLoading && meData && meData.me && meData.me.lang );
    const failToSend = languages(Words.failToSend, lang);

    const [ addCommentMutation ] = useMutation( ADD_COMMENT, { 
        variables: { postId: id, text: newComment.value }
    });

    const [ editCommentMutation ] = useMutation(EDIT_COMMENT);

    const onKeyPress = async e => {
        const { which } = e;
        if ( which === 13 ) {
            e.preventDefault();
            try {
                const newOne = {
                    id: randomId,
                    text: newComment.value,
                    createdAt: new Date().toISOString(),
                    post: { id },
                    isCreating: true,
                    user: {
                        id: meData && meData.me && meData.me.username, 
                        username: meData && meData.me && meData.me.username,
                        avatar: meData && meData.me && meData.me.avatar,
                    }
                }
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

    return <>
        { loading && <Loader />}
        { !loading && data && data.seePost && (
            <Container>
                <Wrapper>
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
                        disableComment={true}
                    />
                    { !meLoading && meData && meData.me &&
                        <>
                            { data.seePost.comments[0] || newComments[0]
                                ? 
                                <Comments
                                    comments={data.seePost.comments}
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