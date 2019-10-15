import React, {useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import TextRegular from './TextRegular';
import TextSmall from './TextSmall';
import { dateConvertor } from '../Util/Convertors';
import { useMutation } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import { SEE_POST } from '../Routes/Post';
import Icon from './Icon';
import Username from './Username';
import { getLangArray } from '../Util/Languages';

const EDIT_COMMENT = gql`
    mutation editComment( $id:String!, $text:String, $action:String! ) {
        editComment( id: $id, text: $text, action: $action )
    }
`;

const Container = styled.li`
    position: relative;
`;

const Box = styled.div`
    position: relative;
    padding: 10px 30px;
    border-top: 1px solid ${({ theme })=> theme.c_lightGray };
    background-color: white;
    display: flex;
    transition: .5s;
    right: 0;
    overflow-x: hidden;
    text-overflow: ellipsis;
    > div:first-child {
        margin-right: 20px;
    }
    &.open {
        right: 50px;
    }
`;

const Texts = styled.article``;
const UserAndText = styled.div`
    margin-bottom: 3px;
`;

const MainText = styled(TextRegular)`
    display: inline;
`

const Delete = styled.button`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: ${({ theme })=> theme.c_red };
    width: 50px;
    height: 100%;
`;

const Comment = ({
    id,
    postId,
    text,
    author,
    avatar,
    createdAt,
    lang,
    username
}) => {
    const [ isDelete, setIsDelete ] = useState(false);
    const [ editCommentMutation ] = useMutation(EDIT_COMMENT, { 
        variables: { id, action: "DELETE" },
        refetchQueries: [{ query: SEE_POST, variables: { id: postId }}]
    });

    const boxSlide = (e) => {
        if ( username === author ) {
            const hasClass = e.currentTarget.classList.contains('open'); 
            if ( !hasClass ) {
                e.currentTarget.classList.add('open');
            } else {
                e.currentTarget.classList.remove('open');
            }
        }
    }

    const deleteComment = async() => {
        setIsDelete(true);
        await editCommentMutation();
    }

    return ( !isDelete && (
        <Container>
            <Delete onClick={deleteComment}>
                <Icon icon="x" size="small" color="white" />
            </Delete>
            <Box onClick={username && boxSlide}>
                <Avatar avatar={avatar} size="small" />
                <Texts>
                    <UserAndText>
                        <Username username={author} inline="true" />
                        <MainText string={text} />
                    </UserAndText>
                    <TextSmall string={dateConvertor(createdAt, lang)} />
                </Texts>
            </Box>
        </Container>
    ))
}

Comment.propTypes = {
    id: PropTypes.string,
    postId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    lang: PropTypes.oneOf( getLangArray() ).isRequired,
    username: PropTypes.string
}

export default Comment;