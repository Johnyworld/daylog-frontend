import React from 'react';

export default ({ icon, size, color="#222" }) => {
    let sizeNum;

    if ( size === "small" ) sizeNum = 16;
    if ( size === "medium" ) sizeNum = 24;

    if ( icon === "search" ) return (
        <svg xmlns="http://www.w3.org/2000/svg" 
            width={sizeNum} 
            height={sizeNum} 
            viewBox={`0 0 24 24`}>
            <path fill={color} d="M9.5,1C14.2,1,18,4.8,18,9.5S14.2,18,9.5,18S1,14.2,1,9.5S4.8,1,9.5,1 M9.5,0C4.3,0,0,4.3,0,9.5
                C0,14.7,4.3,19,9.5,19S19,14.7,19,9.5C19,4.3,14.7,0,9.5,0L9.5,0z"/>
            <line stroke={color} x1="15.5" y1="15.5" x2="23.2" y2="23.2"/>
        </svg>
    )

    if ( icon === "hamburger") return (
        <svg xmlns="http://www.w3.org/2000/svg" 
            width={sizeNum} 
            height={sizeNum} 
            viewBox={`0 0 24 24`}>
            <line stroke={color} x1="1.9" y1="1.9" x2="22.1" y2="13.9"/>
            <line stroke={color} x1="1.9" y1="10.1" x2="22.1" y2="22.1"/>
            <line stroke={color} x1="1.9" y1="18.3" x2="8.3" y2="22.1"/>
            <line stroke={color} x1="15.7" y1="1.9" x2="22.1" y2="5.7"/>
        </svg>
    )

    if ( icon === "clap" ) return (
        <svg xmlns="http://www.w3.org/2000/svg" 
            width={sizeNum} 
            height={sizeNum} 
            viewBox={`0 0 24 24`}>
            <g fill='none' stroke={color} strokeLinecap='round' strokeLinejoin='round' strokeMiterlimit={10}>
                <path d="M11.8,10l3.3-3.3c2-2,0-4-2-2c-1.3,1.3-7.3,6.7-7.3,6.7c3.3-3.3,2-6,0.7-4.7c-3,3-6.7,6-4.7,11.3"/>
                <path d="M16.5,1.3c-0.8-0.8-2-1.3-3.3,0c-1.3,1.3-4,3.3-4,3.3c0.7-1.3-0.7-3.3-2.7-1.3c-2.1,2.1-4.7,4-6,6"/>
                <path d="M14.5,11.3L17.8,8c2-2,0-4-2-2l-0.7,0.7"/>
                <path d="M17.2,8.6c2-2,4,0,2,2L15.8,14"/>
                <path d="M17.8,12c2-2,4,0,2,2l-3.3,3.3c-5.3,5.3-8,5.3-10.7,4"/>
                <line x1="20.4" y1="4.4" x2="22.4" y2="3.1"/>
                <line x1="18.5" y1="2.6" x2="19.8" y2="0.6"/>
                <line x1="21.3" y1="6.9" x2="22.8" y2="6.6"/>
            </g>
        </svg>
    )

    if ( icon === "bubble" ) return (
        <svg xmlns="http://www.w3.org/2000/svg" 
            width={sizeNum} 
            height={sizeNum} 
            viewBox={`0 0 ${sizeNum} ${sizeNum}`}>
            <path fill="none" stroke={color} strokeLinecap='round' strokeLinejoin='round' strokeMiterlimit={10} d="M14.5,0.5H8.1c-4.2,0-7.6,3.4-7.6,7.6v1.1c0,3.6,2.5,6.6,5.9,7.4c0,0-0.1,2.2-3.1,4.1c5.3,0.2,7.9-3.9,7.9-3.9
            h3.3c4.2,0,7.6-3.4,7.6-7.6V8.1C22.1,3.9,18.7,0.5,14.5,0.5z"/>
        </svg>
    )

    if ( icon === "back" ) return (
        <svg xmlns="http://www.w3.org/2000/svg" 
            width={sizeNum} 
            height={sizeNum} 
            viewBox={`0 0 24 24`}>
            <polyline fill="none" stroke={color} points="17.9,0.9 6.7,12 17.9,23.2 "/>
        </svg>
    )

    if ( icon === "next" ) return (
        <svg xmlns="http://www.w3.org/2000/svg" 
            width={sizeNum} 
            height={sizeNum} 
            viewBox={`0 0 24 24`}>
            <polyline fill="none" stroke={color} points="6.7,23.2 17.9,12 6.7,0.9 "/>
        </svg>
    )

    if ( icon === "x" ) return (
        <svg xmlns="http://www.w3.org/2000/svg" 
            width={sizeNum} 
            height={sizeNum} 
            viewBox={`0 0 24 24`}>
            <line fill="none" stroke={color} x1="22.4" y1="1.6" x2="1.6" y2="22.4"/>
            <line fill="none" stroke={color} x1="22.4" y1="22.4" x2="1.6" y2="1.6"/>
        </svg>
    )

    if ( icon === "check" ) return (
        <svg xmlns="http://www.w3.org/2000/svg" 
            width={sizeNum} 
            height={sizeNum} 
            viewBox={`0 0 24 24`}>
            <polyline fill="none" stroke={color} points="1.1,13.3 7.5,19.7 22.9,4.3 "/>
        </svg> 
    )
}