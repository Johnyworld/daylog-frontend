import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
`;

const Loader = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export default () => {
    return (
        <Container>
            <Loader>
                Loading ...
            </Loader>
        </Container>
    )
}