import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../Components/Icon';
import Theme from '../Styles/Theme';
import TextMedium from './TextMedium';
import Words from '../Lang/Words.json';
import { getLang } from '../Util/Languages';
import SideMenu from './SideMenu';
import { ME } from '../Router';
import { useQuery } from 'react-apollo-hooks';

const Container = styled.header`
    position: sticky;
    top: 0;
    background-color: white;
    height: 64px;
    padding: 20px;
    padding-bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    z-index: 999;
`;

const Gnb = styled.nav`
    margin-top: 18px;
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
`;

const HeaderIcon = styled(Icon)`
    padding-bottom: 20px;
`

export default withRouter(({ history }) => {
    const [ sidemenu, setSidemenu ] = useState(false);
    const { data, loading } = useQuery(ME);

    if ( !loading && data && data.me ) {
        const route = history.location.pathname.split('/')[1];
        const action = history.location.pathname.split('/')[3];
        const lang = getLang();
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
                    { !isDepth ? 
                        <Link to="/search">
                            <HeaderIcon icon="search" size="medium" color={Theme.c_blue} />
                        </Link>
                        :
                        <button onClick={onGoBack}>
                            <HeaderIcon icon="back" size="medium" color={Theme.c_blue} />
                        </button>
                    }
                    { !isDepth ? 
                        <Gnb>
                            <GnbLink onClick={changeTab} to="/feed" className={ route === "feed" && "selected" } >FEED</GnbLink>
                            <GnbLink onClick={changeTab} to="/" className={ route === "" && "selected" } >TODAY</GnbLink>
                            <GnbLink onClick={changeTab} to={`/log/${data.me.username}`} className={ route === "log" && "selected" } >LOG</GnbLink>
                        </Gnb>
                        :
                        <TextMedium text={text} lang={lang} />
                    }
                    <button onClick={callSideMenu}>
                        <HeaderIcon icon="hamburger" size="medium" color={Theme.c_blue} />
                    </button>
                </Container>
                { sidemenu && <SideMenu closePopup={closeSideMenu} lang={lang} /> }
            </>
        )
    } else return null;
});