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
            <svg xmlns="http://www.w3.org/2000/svg" 
                width="40" 
                height="40"
                viewBox={`0 0 32 32`}>
                <defs>
                    <linearGradient id="logo-gradient" x1="50%" y1="0%" x2="50%" y2="100%" > 
                        <stop offset="0%" stopColor="#1a9df9">
                            <animate attributeName="stop-color" values="#1a9df9; #08436d; #1a9df9; #94d1fc; #1a9df9;" dur="8s" repeatCount="indefinite"></animate>
                        </stop>
                        <stop offset="100%" stopColor="#94d1fc">
                            <animate attributeName="stop-color" values="#94d1fc; #1a9df9; #08436d; #1a9df9; #94d1fc;" dur="8s" repeatCount="indefinite"></animate>
                        </stop>
                    </linearGradient> 
                </defs>
                <path fill="url('#logo-gradient')" d="M11.8,28.6l0.8-2.1c4.4-10.7,12-13.4,18.9-14.7l0.5-0.1v0.5c0,4.4-1.8,9.9-10.2,10.8c-5.4,0.5-6.8,2.1-8.1,3.5
                    c-0.1,0.1-0.3,0.3-0.4,0.4L11.8,28.6z M31.2,12.7c-6,1.2-12.6,3.6-16.8,12c1.3-1.1,3.2-2.1,7.4-2.5C27.8,21.6,31,18.4,31.2,12.7z"/>
                <path fill="url('#logo-gradient')" d="M24.3,14.4c0.2-1.2,0.3-2.5,0.2-3.9c-0.1-3.7-2-6.5-5.1-7.8C15,1.1,7.5,1.5,4.2,6.2c-1,1.4-0.8,2.2-0.3,3
                    c0.5,1,3,1.1,2.2-1.3c-0.6-1.6,1.4-2.7,4-3.2L5,20.6c-3.1,0-4.2,1.1-4.8,2c-0.5,0.8,0.5,1.3,1.6,0.6C2.4,22.7,3,21.9,8.2,23
                    c2.4,0.5,4.5,0.6,6.4,0.4C17.3,18.7,20.7,16,24.3,14.4z M12.5,21.5c-0.2,0-0.3,0-0.5,0l0,0c-0.7,0-0.9-0.1-0.7-0.8c0,0,0,0,0,0
                    l4.9-15.3c0.3-0.8,0.7-0.9,1.2-0.9c0.3,0,0.6,0.1,0.9,0.2c0.5,0.1,0.7,0.3,0.5,0.9c0,0,0,0,0,0l-4.8,15
                    C13.7,21.4,13.3,21.5,12.5,21.5z"/>
                <path fill="url('#logo-gradient')" d="M12.7,28.7c-0.6,0.8-1.9,1.4-1.9,1.4c2.8-7.6,8.1-11.5,12.4-13.3C21.6,17.8,14.5,23.5,12.7,28.7z"/>
            </svg>
        </Container>
    )
}