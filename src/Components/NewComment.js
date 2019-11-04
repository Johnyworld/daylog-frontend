import React from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea'
import Avatar from './Avatar';
import Words from '../Lang/Words.json';
import { languages } from '../Util/Languages';
import Theme, { BreakPoint } from '../Styles/Theme';
import LoaderButton from './LoaderButton';
import IconButton from './IconButton';

const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    width: 100%;
    bottom: 0;
    border-top: 1px solid ${({ theme })=> theme.c_lightGray };
    background-color: white;
    padding: 10px 20px 10px 15px;
    > div:first-child {
        margin-right: 15px;
    }
    @media screen and ( ${BreakPoint} ) {
        ${({ theme })=> theme.wrap };
        ${({ theme })=> theme.box };
        position: sticky;
        margin-top: 10px;
        left: 0;
        right: 0;
    }
`;

const Textarea = styled(TextareaAutosize)`
    font-size: 14px;
    max-height: 3.7em;
    width: 100%;
    resize: none;
`;

const SendButton = styled(IconButton)`
    opacity: 1;
    transition: opacity .5s;
    margin-left: 10px;
    ${({ disable })=> disable && `
        opacity: .3;
    `};
`

const NewComment = ({ lang, onKeyPress, value, onChange, onClickSend, avatar, creating }) => {
     const placeholder = languages(Words.newComment, lang);

    return (
        <Form>
            <>
                <Avatar avatar={avatar} size="medium" />
                { !creating ? 
                    <Textarea
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        onKeyPress={onKeyPress}
                    />
                : <LoaderButton /> }
                <SendButton
                    disable={value === ""}
                    icon="arrow"
                    size="medium"
                    onClick={value !== "" && onClickSend}
                    color={Theme.c_blue}
                />
            </>
        </Form>
    )
}

export default NewComment;