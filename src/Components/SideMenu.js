import React from 'react';
import styled from 'styled-components';
import PopupHeader from './PopupHeader';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import TextMedium from './TextMedium';
import Words from '../Lang/Words.json';
import TextRegular from './TextRegular';
import Theme from '../Styles/Theme';
import Avatar from './Avatar';

const Container = styled.div`
    ${({ theme })=> theme.popupContainer }
    animation-duration: .5s;
    pointer-events: all;
`;

const MenuHeader = styled(PopupHeader)`
    padding: 30px 30px 0 0;
    margin-bottom: 0;
    @media screen and (min-width: 768px) {
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
    @media screen and ( min-width: 768px ) {
        width: 50%; 
    }
`;

const User = styled.div`
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

const Gnb = styled.div`
    padding: 30px;
    border-bottom: 1px solid ${({ theme })=> theme.c_lightGray };
`;

const LinkGnb = styled(Link)`
    display: inline-block;
    &:not(:last-child) {
        margin-right: 30px;
    }
`

const Menu = styled.div`
    padding: 30px;
`;

const LinkStyled = styled(Link)`
    display: block;
    margin-bottom: 30px;
`;

export default ({ closePopup, username, avatar, lang }) => {

    return (
        <Container className="fadeIn">
            <Box>
                <MenuHeader text={{ kr:"", en:"" }} closePopup={closePopup} lang={lang} />
                <User>
                    <UserAvatar avatar={avatar} size="small" />
                    <Name string={username} text={Words.sir} lang={lang} weight="bold" />
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
                        <TextRegular text={Words.editDoing} weight="bold" lang={lang} color={Theme.c_blueDarker2} />
                    </LinkStyled>
                </Menu>
            </Box>
        </Container>
    )
}