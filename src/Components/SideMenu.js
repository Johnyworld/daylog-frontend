import React from 'react';
import styled from 'styled-components';
import PopupHeader from './PopupHeader';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import TextMedium from './TextMedium';
import Words from '../Lang/Words.json';
import TextRegular from './TextRegular';
import Theme from '../Styles/Theme';

const Container = styled.div`
    ${({ theme })=> theme.popupContainer }
    animation-duration: .5s;
`;

const Box = styled.div`
    position: absolute;
    right: 0;
    width: 80%;
    height: 100%;
    padding: 30px;
    background-color: white;
    overflow: hidden;
    @media screen and ( min-width: 768px ) {
        width: 50%; 
    }
`;

const Name = styled(TextMedium)`
    display: block;
    padding-bottom: 20px;
    margin-bottom: 10px;
    border-bottom: 1px solid ${({ theme })=> theme.c_lightGray };
    letter-spacing: 0;
`;

const Gnb = styled.div`
`;

const LinkGnb = styled(Link)`
    display: inline-block;
    &:not(:last-child) {
        margin-right: 30px;
    }
`

const Menu = styled.div`
    margin-top: 10px;
    padding-top: 50px;
    border-top: 1px solid ${({ theme })=> theme.c_lightGray };
`;

const LinkStyled = styled(Link)`
    display: block;
    margin-bottom: 30px;
`;

export default ({ closePopup, username, lang }) => {

    return (
        <Container className="fadeIn">
            <Box>
                <PopupHeader text={{ kr:"", en:"" }} closePopup={closePopup} lang={lang} />
                <Name string={username} text={Words.sir} lang={lang} weight="bold" />
                <Gnb>
                    <LinkGnb to={`/feed`} onClick={closePopup} >
                        <TextMedium text={Words.feed} weight="bold" /> 
                    </LinkGnb>
                    <LinkGnb to={`/`} onClick={closePopup} >
                        <TextMedium text={Words.today} weight="bold" /> 
                    </LinkGnb>
                    <LinkGnb to={`/log`} onClick={closePopup} >
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