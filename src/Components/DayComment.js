import React from 'react';
import styled from 'styled-components';
import PopupHeader from './PopupHeader';
import Words from '../Lang/Words.json';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import LoaderRelative from './LoaderRelative';
import Comment from './Comment';
import TextRegular from './TextRegular';
import { getToday } from '../Util/Convertors';

const SEE_DAY_COMMENTS = gql`
    query seeDayComments( $yyyymmdd: String! ) {
        seeDayComments( yyyymmdd: $yyyymmdd ) {
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
    ${({ theme })=> theme.popupContent }
    margin: 0 -30px;
    border-bottom: 1px solid ${({ theme })=> theme.c_lightGray };
`;

const DayComment = ({ lang, closePopup, me }) => {
    const yyyymmdd = getToday();
    const { data, loading } = useQuery(SEE_DAY_COMMENTS, { variables:{ yyyymmdd }});

    return (
        <Container>
            <Popup>
                <PopupHeader text={Words.dayComments} lang={lang} closePopup={closePopup} />
                { loading && <LoaderRelative /> }
                { !loading && data && data.seeDayComments && (
                    data.seeDayComments[0] 
                    ?
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
                    :
                    <TextRegular text={Words.noComments} lang={lang} />
                )}
            </Popup>
        </Container>
    )
}

export default DayComment;