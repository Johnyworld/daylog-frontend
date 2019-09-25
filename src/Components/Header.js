import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../Components/Icon';
import Theme from '../Styles/Theme';

const Container = styled.header`
    position: sticky;
    top: 0;
    background: white;
    height: 64px;
    padding: 20px;
    padding-bottom: 0;
    display: flex;
    justify-content: space-between;
`;

const Gnb = styled.nav`
    margin-top: 18px;
`;

const GnbLink = styled(Link)`
    padding-bottom: 4px;
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme })=> theme.c_grayBrighter1 };
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

export default ({ page="today" }) => {

    return (
        <Container>
            <HeaderIcon icon="search" size="medium" color={Theme.c_blue} />
            <Gnb>
                <GnbLink to="/feed" className={ page === "feed" && "selected" } >FEED</GnbLink>
                <GnbLink to="/" className={ page === "today" && "selected" } >TODAY</GnbLink>
                <GnbLink to="/log" className={ page === "log" && "selected" } >LOG</GnbLink>
            </Gnb>
            <HeaderIcon icon="hamburger" size="medium" color={Theme.c_blue} />
        </Container>
    )
};