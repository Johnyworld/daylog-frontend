import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import IconImage from './IconImage';
import TextSmall from './TextSmall';
import { languages } from '../Util/Languages';
import Words from '../Lang/Words.json'
import Theme from '../Styles/Theme';
import { useMutation } from 'react-apollo-hooks';
import { TODAY_QUERY } from './TodayQueries';
import { UPLOAD } from './WhatNow';

const Container = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    padding: 8px 0 5px;
    min-width: 72px;
    height: 72px;
    margin-right: 10px;
    border: 1px solid ${({ theme })=> theme.c_gray };
    border-radius: 5px;
    background-color: white;

    &.shadowed {
        box-shadow: 0 3px 3px #0003;
        border: none;
    }

    &.selected {
        border: 3px solid ${({ theme })=> theme.c_blue };
    }

    &.next:after { content: ${({ lang })=> `"${languages(Words.pullUp, lang)}"` }; }
    &.recent:after { content: ${({ lang })=> `"${languages(Words.still, lang)}"` }; }

    &.next:after,
    &.recent:after {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        background-color: ${({ theme })=> theme.c_blue };
        background-color: #08436d;
        color: white;
        padding: 3px 8px;
        border-radius: 1em;
        transform: translate(-20%, -50%);
        font-size: 12px;
    }

    &.selected:after {
        top: -2px;
        left: -2px;
    }

    &.pinned:after {
        content: ' ';
        display: block;
        position: absolute;
        width: 16px;
        height: 16px;
        top: 0;
        right: 0;
        background-color: red;
        transform: translate(0, -50%);
    }

    .text-small {
        width: ${ Theme.size_doingButton - 4 }px;
        margin-top: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

const DoingButton = ({ id, name, icon, color, className, onClick, lang, focused, now }) => {

    const [ uploadMutation ] = useMutation( UPLOAD, {
        variables: { 
            doingId: id,
            startAt: focused - ( 95-now )
        },
        refetchQueries: [{ query: TODAY_QUERY }]
    });

    const onClickFast = () => {
        uploadMutation();
    }

    return (
        <Container className={className} onClick={ onClick ? onClick : onClickFast } data-id={id} lang={lang} >
            <IconImage url={icon} size="medium" />
            <TextSmall string={name} color={color} />
        </Container>
    )
}

DoingButton.propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.string,
    className: PropTypes.string
}

export default DoingButton;