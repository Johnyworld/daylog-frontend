import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export default () => {
    return (
        <Container>
            Loading ...
        </Container>
    )
}