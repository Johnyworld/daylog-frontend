import React, { useState } from 'react';
import styled from 'styled-components';
import PopupHeader from './PopupHeader';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import TextMedium from './TextMedium';
import Words from '../Lang/Words.json';
import TextRegular from './TextRegular';
import Theme, { BreakPoint } from '../Styles/Theme';
import Avatar from './Avatar';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import SmallButton from './SmallButton';

const LOCAL_LOG_OUT = gql`
    mutation logUserOut {
        logUserOut @client
    }
`;

const TOGGLE_PRIVATE = gql`
    mutation togglePrivate( $username: String! ) {
        togglePrivate( username: $username )
    }
`;

const Container = styled.aside`
    ${({ theme })=> theme.popupContainer }
    animation-duration: .5s;
    pointer-events: all;
`;

const MenuHeader = styled(PopupHeader)`
    padding: 30px 30px 0 0;
    margin-bottom: 0;
    @media screen and ( ${BreakPoint} ) {
        padding: 50px 50px 0 0;
    }
`

const Box = styled.div`
    position: absolute;
    right: 0;
    width: 80%;
    height: 100%;
    background-color: white;
    overflow: hidden;
    @media screen and ( ${BreakPoint} ) {
        width: 50%; 
    }
`;

const User = styled.section`
    display: flex;
    align-items: center;
    padding: 30px;
    border-bottom: 1px solid ${({ theme })=> theme.c_lightGray };
`;

const UserAvatar = styled(Avatar)`
    margin-right: 10px;
`

const Name = styled(TextMedium)`
    letter-spacing: 0;
`;

const Gnb = styled.nav`
    padding: 30px;
    border-bottom: 1px solid ${({ theme })=> theme.c_lightGray };
`;

const LinkGnb = styled(Link)`
    display: inline-block;
    &:not(:last-child) {
        margin-right: 30px;
    }
`

const Menu = styled.section`
    padding: 30px;
`;

const LinkStyled = styled(Link)`
    display: block;
    margin-bottom: 25px;
`;

const MenuButton = styled(SmallButton)`
    display: block;
    margin-bottom: 25px;
`;

export default ({ closePopup, username, avatar, isPrivate, lang }) => {
    const [ localLogOutMutation ] = useMutation( LOCAL_LOG_OUT );
    const [ privateState, setPrivateState ] = useState( isPrivate );
    const isPrivateWord = privateState ? Words.setPublic : Words.setPrivate;

    const [ togglePrivateMutation ] = useMutation( TOGGLE_PRIVATE, { variables: { username }});

    const localLogOut = () => {
        localLogOutMutation();
        closePopup();
    }

    const togglePrivate = () => {
        setPrivateState( !privateState );
        togglePrivateMutation();
    }

    return (
        <Container className="fadeIn">
            <Box>
                <MenuHeader text={{ ko:"", en:"" }} closePopup={closePopup} lang={lang} />
                <User>
                    <UserAvatar avatar={avatar} size="small" />
                    <Name string={username} text={Words.sir} lang={lang} weight="bold" />
                    { privateState ? " 🔒" : "" }
                </User>
                <Gnb>
                    <LinkGnb to={`/feed`} onClick={closePopup} >
                        <TextMedium text={Words.feed} weight="bold" /> 
                    </LinkGnb>
                    <LinkGnb to={`/`} onClick={closePopup} >
                        <TextMedium text={Words.today} weight="bold" /> 
                    </LinkGnb>
                    <LinkGnb to={`/log/${username}`} onClick={closePopup} >
                        <TextMedium text={Words.log} weight="bold" /> 
                    </LinkGnb>
                </Gnb>
                <Menu>
                    <LinkStyled to={`/log/${username}/edit`} onClick={closePopup} >
                        <TextRegular text={Words.editProfile} weight="bold" lang={lang} color={Theme.c_blueDarker2} /> 
                    </LinkStyled>
                    <LinkStyled to={`/doing`} onClick={closePopup} >
                        <TextRegular text={Words.doingList} weight="bold" lang={lang} color={Theme.c_blueDarker2} />
                    </LinkStyled>
                    <MenuButton onClick={togglePrivate} text={isPrivateWord} lang={lang} color={Theme.c_blueDarker2} />
                    <MenuButton onClick={localLogOut} text={Words.logOut} lang={lang} color={Theme.c_red} />
                </Menu>
            </Box>
        </Container>
    )
}