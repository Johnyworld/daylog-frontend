import React from 'react';
import styled from 'styled-components';
import { version } from '../Util/Document';
import TextSmall from './TextSmall';

const Container = styled.div`
    opacity: .5;
`;

const Version = ({ className }) => {
    return (
        <Container className={className}>
            <TextSmall string={version} color="white" />
        </Container>
    )
}

export default Version;