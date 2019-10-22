import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { HeaderBreakPointMax, HeaderBreakPoint } from '../Styles/Theme';

const Container = styled.nav`
    display: ${({ isDepth })=> isDepth? 'none' : 'block' };
    @media screen and (${HeaderBreakPointMax}) {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 18px;
    }
    @media screen and (${HeaderBreakPoint}) {
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
    @media screen and (${HeaderBreakPoint}) {
        font-size: 14px;
        padding-bottom: 2px;
        &.selected {
            border-width: 1px; 
        }
    }
`;

const GlobalNav = ({ className, isDepth, onClick, route, username }) => {
    return (
        <Container className={className} isDepth={isDepth}>
            <GnbLink to="/feed" onClick={onClick} className={ route === "feed" && "selected" } >FEED</GnbLink>
            <GnbLink to="/" onClick={onClick} className={ route === "" && "selected" } >TODAY</GnbLink>
            <GnbLink to={`/log/${username}`} onClick={onClick} className={ route === "log" && "selected" } >LOG</GnbLink>
        </Container>
    )
}

GlobalNav.propTypes = {
    className: PropTypes.string,
    isDepth: PropTypes.bool,
    onClick: PropTypes.func,
    route: PropTypes.string,
    username: PropTypes.string
}

export default GlobalNav;