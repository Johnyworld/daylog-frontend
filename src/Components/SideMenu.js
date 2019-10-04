import React from 'react';
import styled from 'styled-components';
import PopupHeader from './PopupHeader';

const Container = styled.div`
    ${({ theme })=> theme.popupContainer }
    animation-duration: .5s;
`;

const Box = styled.div`
    ${({ theme })=> theme.popup }
    height: 100%;
    width: 80%;
    right: 0;
`;

export default ({ closePopup, lang }) => {

    return (
        <Container className="fadeIn">
            <Box>
                <PopupHeader text={{ kr:"", en:"" }} closePopup={closePopup} lang={lang} />
                Hello
            </Box>
        </Container>
    )
}