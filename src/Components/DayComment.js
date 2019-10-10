import React from 'react';
import styled from 'styled-components';
import PopupHeader from './PopupHeader';
import Words from '../Lang/Words.json';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import LoaderRelative from './LoaderRelative';
import Comment from './Comment';

const SEE_DAY_COMMENTS = gql`
    {
        seeDayComments {
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
                doing {
                    id
                    name
                }
                startAt
                blocks
            }
        }
    }
`;

const Container = styled.section`
    ${({ theme })=> theme.popupContainer };
`;

const Popup = styled.div`
    ${({ theme })=> theme.popup };
`;

const Comments = styled.ul`
    overflow-y: scroll;
    li div {
        padding: 10px 0;
    }
`;

const DayComment = ({ lang, closePopup, me }) => {
    const { data, loading } = useQuery(SEE_DAY_COMMENTS);

    return (
        <Container>
            <Popup>
                <PopupHeader text={Words.comments} lang={lang} closePopup={closePopup} />
                { loading && <LoaderRelative /> }
                { !loading && data && data.seeDayComments &&
                    <Comments>
                        { data.seeDayComments.map( comment => (
                            <Comment
                                key={comment.id}
                                id={comment.id}
                                postId={comment.post.id}
                                text={comment.text}
                                author={comment.user.username}
                                avatar={comment.user.avatar}
                                createdAt={comment.createdAt}
                                lang={lang}
                                username={me.username}
                            />
                        ))}
                    </Comments>
                }
            </Popup>
        </Container>
    )
}

export default DayComment;