import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const getSize = (size) => {
    if ( size === "huge" ) return { width: 328, height: 80 };
    if ( size === "small" ) return { width: 123, height: 30 };
    if ( size === "tiny" ) return { width: 82, height: 20 };
    else return { width: 164, height: 40 };
}

const getColor = (color) => {
    if ( color === "positive" ) return {
        symbol: "#1A9DF9",
        logotype: "#3f6179"
    } 
    else return {
        symbol: "#FFFFFF",
        logotype: "#FFFFFF"
    }
}

export default ({ className, size, color }) => {
    const sizeNum = getSize( size );
    const colors = getColor( color );
        
    return (
        <Container className={className}>
            <svg xmlns="http://www.w3.org/2000/svg" 
                width={ sizeNum.width }
                height={ sizeNum.height }
                viewBox={`0 0 328 80`}>
                <g>
                    <path fill={colors.symbol} d="M33.4,75.7l2.4-5.8c12.5-30.4,34-38,53.5-41.6l1.3-0.2v1.4c0,12.6-5,28.1-28.9,30.5c-15.4,1.5-19.3,5.8-23,10
                        c-0.4,0.4-0.7,0.8-1.1,1.2L33.4,75.7z M88.4,30.8C71.2,34.1,52.7,41,40.7,64.7c3.6-3.1,9.1-5.9,20.9-7.1
                        C78.9,55.9,87.9,46.9,88.4,30.8z"/>
                    <path fill={colors.symbol} d="M68.8,35.5c0.6-3.4,0.8-7,0.7-10.9c-0.4-10.5-5.6-18.5-14.5-22c-12.5-4.8-33.7-3.7-43.1,9.6
                        c-2.8,3.9-2.2,6.1-0.9,8.6c1.4,2.7,8.4,3,6.2-3.7C15.6,12.5,21,9.5,28.4,8L14,53c-8.7-0.1-12,3-13.6,5.6c-1.5,2.3,1.4,3.6,4.4,1.7
                        c1.9-1.2,3.7-3.4,18.3-0.5c6.7,1.4,12.8,1.8,18.2,1.2C48.9,47.7,58.7,40.1,68.8,35.5z M35.4,55.5c-0.5,0-1,0-1.5,0l0,0
                        c-1.9-0.1-2.6-0.3-2-2.4l0,0L45.8,9.8c0.8-2.3,1.8-2.6,3.3-2.5c0.9,0.1,1.7,0.3,2.5,0.5c1.5,0.4,2.1,0.9,1.5,2.7l0,0L39.4,53.1
                        C38.7,55.3,37.7,55.5,35.4,55.5z"/>
                </g>
                <path fill={colors.symbol} d="M35,76.1c-1.6,2.2-5.3,3.9-5.3,3.9c7.6-20.8,22.4-31.8,34.1-36.7C59.4,46.1,40.1,61.6,35,76.1z"/>
                <path fill={colors.logotype} d="M143.4,37.1c0,5.3-1.5,9.4-4.4,12.3c-2.9,2.9-7,4.3-12.3,4.3h-10.3V21.9h11c5.1,0,9.1,1.3,11.8,3.9
                    C142,28.4,143.4,32.2,143.4,37.1z M134.5,37.4c0-2.9-0.6-5.1-1.7-6.5c-1.2-1.4-2.9-2.1-5.3-2.1H125v17.8h1.9c2.6,0,4.5-0.8,5.7-2.3
                    S134.5,40.5,134.5,37.4z"/>
                <path fill={colors.logotype} d="M174.9,53.7l-1.6-6H163l-1.6,6h-9.4l10.4-32h11.5l10.5,32H174.9z M171.5,40.7l-1.4-5.2
                    c-0.3-1.2-0.7-2.7-1.2-4.5s-0.8-3.2-0.9-4c-0.1,0.7-0.4,2-0.8,3.7c-0.4,1.7-1.2,5-2.6,10H171.5z"/>
                <path fill={colors.logotype} d="M205.3,33.7l5.5-11.8h9.3l-10.5,19.4v12.4H201V41.5l-10.5-19.7h9.4L205.3,33.7z"/>
                <path fill={colors.logotype} d="M231,53.7V21.9h8.6v24.9h12.3v6.9H231z"/>
                <path fill={colors.logotype} d="M291.8,37.7c0,5.4-1.3,9.4-3.9,12.2c-2.6,2.8-6.5,4.2-11.5,4.2c-5,0-8.8-1.4-11.5-4.2c-2.7-2.8-4-6.9-4-12.2
                    c0-5.3,1.3-9.3,4-12.1c2.6-2.8,6.5-4.2,11.5-4.2c5.1,0,8.9,1.4,11.5,4.2C290.5,28.3,291.8,32.4,291.8,37.7z M269.9,37.7
                    c0,6.2,2.1,9.2,6.4,9.2c2.2,0,3.8-0.7,4.8-2.2c1.1-1.5,1.6-3.8,1.6-7c0-3.2-0.5-5.5-1.6-7c-1.1-1.5-2.7-2.3-4.8-2.3
                    C272,28.4,269.9,31.5,269.9,37.7z"/>
                <path fill={colors.logotype} d="M314.3,35.1H328v17.2c-3.7,1.3-7.8,1.9-12.3,1.9c-4.9,0-8.7-1.4-11.4-4.3c-2.7-2.8-4-6.9-4-12.2
                    c0-5.1,1.5-9.1,4.4-12c2.9-2.9,7-4.3,12.3-4.3c2,0,3.9,0.2,5.7,0.6c1.8,0.4,3.3,0.9,4.6,1.4l-2.7,6.7c-2.3-1.1-4.8-1.7-7.6-1.7
                    c-2.5,0-4.5,0.8-5.8,2.4s-2.1,4-2.1,7c0,3,0.6,5.2,1.9,6.8c1.2,1.6,3,2.3,5.4,2.3c1.3,0,2.5-0.1,3.5-0.4v-5h-5.7V35.1z"/>
            </svg>
        </Container>
    )
}