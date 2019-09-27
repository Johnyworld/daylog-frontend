import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../Components/Icon';
import Theme from '../Styles/Theme';
import TextMedium from './TextMedium';

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

export default withRouter(({ history, page="today", isDepth, text, lang }) => {
    const onGoBack = (e) => {
        e.preventDefault();
        history.goBack();
    }
    return (
        <Container>
            { !isDepth ? 
                <HeaderIcon icon="search" size="medium" color={Theme.c_blue} />
                :
                <button onClick={onGoBack}>
                    <HeaderIcon icon="back" size="medium" color={Theme.c_blue} />
                </button>
            }
            { !isDepth ? 
                <Gnb>
                    <GnbLink to="/feed" className={ page === "feed" && "selected" } >FEED</GnbLink>
                    <GnbLink to="/" className={ page === "today" && "selected" } >TODAY</GnbLink>
                    <GnbLink to="/log" className={ page === "log" && "selected" } >LOG</GnbLink>
                </Gnb>
                :
                <TextMedium text={text} lang={lang} />
            }
            
            <HeaderIcon icon="hamburger" size="medium" color={Theme.c_blue} />
        </Container>
    )
});