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
import TextLarge from '../Components/TextLarge';
import TextSmall from '../Components/TextSmall';
import { blockConvertor } from '../Util/Convertors';
import Theme from '../Styles/Theme';
import { ME } from '../Router';
import Comments from '../Components/Comments.js';

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
            score
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
`;

const Heading = styled.div`
    ${({ theme })=> theme.wrap };
    padding: 20px;
`;

export default () => {
    const lang = getLang();
    const id = window.location.hash.split("/")[2];
    const newComment = useInput('');

    const { data, loading } = useQuery(SEE_POST, { variables: { id }});
    const { data: meData, loading: meLoading } = useQuery(ME);


    const [ selfComments, setSelfComments ] = useState('');
    const [ addCommentMutation ] = useMutation( 
        ADD_COMMENT, { 
            variables: { postId: id, text: newComment.value },
            refetchQueries: [{ query: SEE_POST, variables: { id }}]
        }
    );
    
    const failToSend = languages(Words.failToSend, lang);

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

    return <>
        { loading && <Loader />}
        { !loading && data && data.seePost && (
            <Container>
                <Heading>
                    <TextSmall string={blockConvertor(data.seePost.blocks, lang)} />
                    <TextLarge string={data.seePost.doing.name} color={Theme.c_blueDarker2}/>
                    <TextRegular string={data.seePost.user.username} color={Theme.c_blueDarker1} />
                </Heading>
                { !meLoading && meData && meData.me &&
                    <>
                        <Comments comments={data.seePost.comments} me={meData.me} lang={lang} />
                        <NewComment
                            lang={lang}
                            onKeyPress={onKeyPress}
                            value={newComment.value}
                            onChange={newComment.onChange}
                            avatar={meData.me.avatar}
                        />
                    </>
                }
            </Container>
        )}
    </>
}