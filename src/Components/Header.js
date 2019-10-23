import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Theme from '../Styles/Theme';
import TextMedium from './TextMedium';
import Words from '../Lang/Words.json';
import { getLang } from '../Util/Languages';
import SideMenu from './SideMenu';
import { ME } from './TodayQueries';
import { useQuery } from 'react-apollo-hooks';
import IconButton from './IconButton';
import TextSmall from './TextSmall';
import GlobalNav from './GlobalNav';
import { HeaderBreakPointMax, HeaderBreakPoint } from '../Styles/Theme';
import Logo from './Logo';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const Container = styled.header`
    position: sticky;
    top: 0;
    background-color: white;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0;
    height: 64px;
    z-index: 999;
    @media screen and (${HeaderBreakPoint}) {
        position: fixed;
        width: 100%;
        padding: 40px;
        background: none;
        pointer-events: none;
    }
`;

const LogoContainer = styled.div`
    display: none;
    pointer-events: all;
    @media screen and (${HeaderBreakPoint}) {
        display: flex;
        align-items: center;
    } 
`;

const LogoStyled = styled(Logo)`
    display: inline-block;
`

const Slogan = styled(TextSmall)`
    display: inline-block;
    white-space: pre;
    font-size: 11px;
    margin-left: 12px;
    padding-left: 12px;
    border-left: 1px solid ${({ theme })=> theme.c_lightGrayDarker1 };
    @media screen and (max-width: 1339px) {
        display: none;
    }
`;

const Inner = styled.div`
    display: flex;
    justify-content: space-between;
    pointer-events: all;
    width: 100%;
    @media screen and (${HeaderBreakPoint}) {
        align-items: center;
        justify-content: center;
        width: auto;
    }
`;

const PageTitle = styled(TextMedium)`
    display: ${({ isDepth })=> isDepth? 'block' : 'none' };
    @media screen and (${HeaderBreakPoint}) {
        display: none;
    }
    @media screen and (${HeaderBreakPointMax}) {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
`;

const SearchLink = styled(IconButton)`
    display: ${({ isDepth })=> isDepth? 'none' : 'block' };
    @media screen and (${HeaderBreakPoint}) {
        display: block;
        margin-right: 20px
    }
`;

const BackButton = styled(IconButton)`
    display: ${({ isDepth })=> isDepth? 'block' : 'none' };
    @media screen and (${HeaderBreakPoint}) {
        display: none;
    }
`;

const HamburgerMenu = styled(IconButton)`
    padding-bottom: 20px;
`;

export default withRouter(({ history }) => {
    const [ sidemenu, setSidemenu ] = useState(false);
    const { data, loading } = useQuery(ME);

    if ( !loading && data && data.me ) {
        const route = history.location.pathname.split('/')[1];
        const action = history.location.pathname.split('/')[3];
        const lang = getLang( data.me.lang );
        let isDepth, text;
        
        if ( route === "log" && action && action === "edit" ) {
            isDepth = true;
            text = Words.editProfile;
        } else if ( route === "feed" || route === "log" || route === "" ) {
            isDepth = false;
        } else {
            isDepth = true;
            if ( route === "post" ) text = Words.comments;
            if ( route === "search" ) text = Words.search;
            if ( route === "doing" ) text = Words.editDoing;
        }

        const changeTab = (e) => {
            e.currentTarget.parentNode.childNodes.forEach( element => {
                element.classList.remove("selected");
            })
            e.currentTarget.classList.add("selected");
        }
    
        const onGoBack = (e) => {
            e.preventDefault();
            history.goBack();
        }
        
        const callSideMenu = () => {
            setSidemenu(true);
        }
    
        const closeSideMenu = (e) => {
            const popupContainer = e.target.parentNode.parentNode.parentNode.parentNode;
            popupContainer.classList.add("fadeOut");
            popupContainer.classList.remove("fadeIn");
            setTimeout(() => {
                setSidemenu(false);
                popupContainer.classList.remove("fadeOut"); 
            }, 500)
        }
    
        return (  
            <>
                <Container>
                    <LogoContainer>
                        <Link to='/'>
                            <LogoStyled size="small" color="positive" responsive="true" />
                        </Link>
                        <Slogan text={Words.tutorial00} lang={lang} color={Theme.c_gray} weight="bold" />
                    </LogoContainer>
                    <Inner>
                        <>
                            <GlobalNav isDepth={isDepth} onClick={changeTab} route={route} username={data.me.username} />
                            <PageTitle isDepth={isDepth} text={text} lang={lang} />
                        </>
                        
                        <>
                            <SearchLink isDepth={isDepth} to="/search" icon="search" size="medium" color={Theme.c_blue} />
                            <BackButton isDepth={isDepth} onClick={onGoBack} icon="back" size="medium" color={Theme.c_blue} />
                        </>
                        <HamburgerMenu onClick={callSideMenu} icon="hamburger" size="medium" color={Theme.c_blue} />
                    </Inner>
                </Container>
                { sidemenu && <SideMenu closePopup={closeSideMenu} username={data.me.username} avatar={data.me.avatar} route={route} lang={lang} /> }
            </>
        )
    } else return null;
});