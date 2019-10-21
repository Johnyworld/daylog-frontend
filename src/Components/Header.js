import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../Components/Icon';
import Theme from '../Styles/Theme';
import TextMedium from './TextMedium';
import Words from '../Lang/Words.json';
import { getLang } from '../Util/Languages';
import SideMenu from './SideMenu';
import { ME } from './TodayQueries';
import { useQuery } from 'react-apollo-hooks';
import IconButton from './IconButton';

const Container = styled.header`
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 999;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 0;
    height: 64px;
    @media screen and (min-width: 768px) {
        position: fixed;
        width: 100%;
        background: none;
        padding: 50px;
        justify-content: flex-end;
        align-items: center;
    }
`;

const PageTitle = styled(TextMedium)`
    display: ${({ isDepth })=> isDepth? 'block' : 'none' };
    @media screen and (min-width: 768px) {
        display: none;
    }
    @media screen and (max-width: 767px) {
        position: absolute;
        text-align: center;
        width: 100%;
    }
`;

const Gnb = styled.nav`
    display: ${({ isDepth })=> isDepth? 'none' : 'block' };
    @media screen and (max-width: 767px) {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 18px;
    }
    @media screen and (min-width: 768px) {
        display: none;
        margin-right: 30px;
    }
    @media screen and (min-width: 1340px) {
        display: block;
    }
`;

const GnbLink = styled(Link)`
    padding-bottom: 4px;
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme })=> theme.c_gray };
    &:not(:last-child) {
        margin-right: 20px;
    }
    &.selected {
        border-bottom: 3px solid ${({ theme })=> theme.c_blue };
        color: ${({ theme })=> theme.c_black };
    }
    @media screen and (min-width: 768px) {
        padding-bottom: 2px;
        &.selected {
            border-width: 1px; 
        }
    }
`;

const SearchLink = styled(IconButton)`
    display: ${({ isDepth })=> isDepth? 'none' : 'block' };
    @media screen and (min-width: 768px) {
        display: block;
        margin-right: 20px
    }
`;

const BackButton = styled(IconButton)`
    display: ${({ isDepth })=> isDepth? 'block' : 'none' };
    @media screen and (min-width: 768px) {
        display: none;
    }
`;

const HamburgerMenu = styled(IconButton)`
    padding-bottom: 20px;
`

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
            <Container>
                {/* <Center> */}
                    <Gnb isDepth={isDepth}>
                        <GnbLink onClick={changeTab} to="/feed" className={ route === "feed" && "selected" } >FEED</GnbLink>
                        <GnbLink onClick={changeTab} to="/" className={ route === "" && "selected" } >TODAY</GnbLink>
                        <GnbLink onClick={changeTab} to={`/log/${data.me.username}`} className={ route === "log" && "selected" } >LOG</GnbLink>
                    </Gnb>
                    <PageTitle isDepth={isDepth} text={text} lang={lang} />
                {/* </Center> */}
                {/* <Side> */}
                    {/* <> */}
                        <SearchLink isDepth={isDepth} to="/search" icon="search" size="medium" color={Theme.c_blue} />
                        <BackButton isDepth={isDepth} onClick={onGoBack} icon="back" size="medium" color={Theme.c_blue} />
                    {/* </> */}
                    <HamburgerMenu onClick={callSideMenu} icon="hamburger" size="medium" color={Theme.c_blue} />
                {/* </Side> */}
                { sidemenu && <SideMenu closePopup={closeSideMenu} username={data.me.username} lang={lang} /> }
            </Container>
        )
    } else return null;
});