import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';

const Container = styled.div`
    margin: 10px 20px;
    width: 24px;
    height: 24px;
    animation: spin 1s infinite;
    transform: rotate(0deg);
    transition: .5s;
    @keyframes spin {
        0% { transform: rotate(0deg) }
        50% { transform: rotate(180deg) }
        100% { transform: rotate(360deg) }
    }
`

export default ({ color }) => {
    return (
        <Container>
            <Icon icon="loading" size="medium" color={color} />
        </Container>
    )
}