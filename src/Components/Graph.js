import React, { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    border-radius: 50%;
    overflow: hidden;
`;

const Canvas = styled.canvas`
    position: absolute;
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
`;

const Graph = ({ data, colors }) => {
    const canvasScript = () => {
        const canvas = document.getElementById('jsGraph');
        const ctx = canvas.getContext('2d');
        let startAngle = 0;

        data.forEach((item, i) => {
            const start = (Math.PI/50) * startAngle;
            const end = Math.PI * 2;
    
            ctx.beginPath();
            ctx.moveTo( 200, 200 );
            ctx.arc( 200, 200, 200, start, end, false );
            ctx.closePath();
            ctx.fillStyle = colors[i];
            ctx.fill();
            startAngle += item.percent;
        });
    }

    useEffect(() => {
        canvasScript();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <Container>
            <Canvas id="jsGraph" width="400" height="400" />
        </Container>
    );
}

export default Graph;