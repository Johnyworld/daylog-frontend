import React, { useState } from 'react'; 
import styled from 'styled-components';
import Header from '../Components/Header';
import Headers from '../Lang/Headers.json';
import CommentJson from '../Lang/Comment.json';
import { getLang, languages } from '../Util/Languages';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import Loader from '../Components/Loader';
import Comment from '../Components/Comment';
import NewComment from '../Components/newComment';
import useInput from '../Hooks/useInput';
import TextRegular from '../Components/TextRegular';
import TextLarge from '../Components/TextLarge';
import TextSmall from '../Components/TextSmall';
import { blockConvertor } from '../Util/Convertors';
import Theme from '../Styles/Theme';

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

export const SEE_POST = gql`
    query seePost( $id: String! ) {
        seePost( id : $id ) {
            id
            location
            startAt
            endAt
            createdAt
            blocks
            isLiked
            likesCount
            commentsCount
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
    background-color: ${({ theme })=> theme.c_lightGray };
    padding-bottom: 70px;
    min-height: calc(100vh - 70px);
`;

const Heading = styled.div`
    ${({ theme })=> theme.wrap };
    padding: 20px;
`;

const Comments = styled.ul`
    ${({ theme })=> theme.wrap };
    ${({ theme })=> theme.box };
    @media screen and ( max-width: 767px ) {
        margin: 0 10px;
    }
`;

export default () => {
    const lang = getLang();
    const id = window.location.hash.split("/")[2];
    const newComment = useInput('');
    const { data, loading } = useQuery(SEE_POST, { variables: { id }});
    const [ selfComments, setSelfComments ] = useState('');
    const [ addCommentMutation ] = useMutation( 
        ADD_COMMENT, { 
            variables: { postId: id, text: newComment.value },
            refetchQueries: [{ query: SEE_POST, variables: { id }}]
        }
    );
    
    const failToSend = languages(CommentJson.failToSend, lang);

    const onKeyPress = async e => {
        const { which } = e;
        if ( which === 13 ) {
            e.preventDefault();
            try {
                const { data: { addComment }} = await addCommentMutation();
                setSelfComments([...selfComments, addComment]);
                newComment.setValue("");
            } catch {
                alert(failToSend);
            }
        }
    }

    return (
    <>
        <Header isDepth={true} text={Headers.comments} lang={lang} />
        { loading && <Loader />}
        { !loading && data && data.seePost && (
            <Container>
                <Heading>
                    <TextSmall string={blockConvertor(data.seePost.blocks, lang)} />
                    <TextLarge string={data.seePost.doing.name} color={Theme.c_blueDarker2}/>
                    <TextRegular string={data.seePost.user.username} color={Theme.c_blueDarker1} />
                </Heading>
                <Comments>
                    { data.seePost.comments.map(comment => (
                        <Comment
                            key={comment.id}
                            id={comment.id}
                            postId={data.seePost.id}
                            text={comment.text}
                            author={comment.user.username}
                            avatar={comment.user.avatar}
                            createdAt={comment.createdAt}
                            lang={lang}
                        />
                    ))}
                </Comments>
                <NewComment
                    lang={lang}
                    onKeyPress={onKeyPress}
                    value={newComment.value}
                    onChange={newComment.onChange}
                />
            </Container>
        )}
    </>
    )
}