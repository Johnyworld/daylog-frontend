import React, { useEffect } from 'react';
import styled from 'styled-components';
import Theme from '../Styles/Theme';

const Container = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 100%;
`;

const Canvas = styled.canvas`
    position: absolute;
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
`;

const drawTimes = ( ctx, radius, start, end, color ) => {
    ctx.beginPath();
    ctx.moveTo( 0, 0 );
    ctx.arc( 0, 0, radius, start, end, false );
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}

const drawLines = ( ctx, radius ) => {
    let ang;
    let num;
    for(num = 1; num < 13; num++) {
        ang = (Math.PI / 6) * num;
        ctx.rotate(ang);
        ctx.beginPath();
        ctx.lineWidth = num%3 === 0 ? 2 : 1;
        ctx.moveTo( num === 12 ? 0 : radius*0.9, 0 );
        ctx.lineTo( radius, 0 );
        ctx.strokeStyle = num%3 === 0 ? Theme.c_black : Theme.c_blueDarker1;
        ctx.stroke();
        ctx.rotate(-ang);
    }
}

const Clock = ({ data, type }) => {
    const radius = 200;

    const canvasScript = () => {
        const canvas = document.getElementById(type);
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate( radius, radius );
        
        data.forEach(item => {
            const start = (Math.PI/24) * item.startAt;
            const end = (Math.PI/24) * item.endAt;
            drawTimes( ctx, radius*0.9, start, end, item.color );
        });
        drawLines(ctx, radius);
        ctx.translate( -radius, -radius );
    }

    useEffect(() => {
        canvasScript();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <Container>
            <Canvas id={type} width={radius*2} height={radius*2} />
        </Container>
    );
}

export default Clock;