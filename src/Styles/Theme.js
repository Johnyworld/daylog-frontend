export default {
    c_blue: "#1a9df9",
    c_blueBrighter1: "#61bffb",
    c_blueBrighter2: "#94d1fc",
    c_blueDarker1: "#567f9c",
    c_blueDarker2: "#3f6179",
    c_blueDarker3: "#08436d",
    c_black: "#222",
    c_red: "#eb3f3f",
    c_lightGrayBrighter1: "#f6f7f9",
    c_lightGray: "#edf1f5",
    c_lightGrayDarker1: "#dbe1e6",
    c_gray: "#a4b4c1",
    size_doingButton: 72,
    size_iconMedium: 24,
    size_iconSmall: 16,
    f_regular: `
        font-size: 14px;
        line-height: 1.4;
    `,
    f_medium: `
        font-size: 16px;
        line-height: 1.4; 
    `,
    f_small: `
        font-size: 12px;
        line-height: 1.2;  
    `,
    f_large: `
        font-size: 28px;
        line-height: 1.2;   
    `,
    box: `
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        background-color: white;
    `,
    wrap: `
        max-width: 768px;
        margin: 0 auto;
    `,
    popupContainer:`
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 9999;
        background-color: rgba(0, 0, 0, .8);
    `,
    popup:`
        position: absolute;
        padding: 30px;
        width: 100%;
        max-height: 90vh;
        margin: auto;
        top: 50%;
        transform: translateY(-50%);
        background-color: white;
    `,
    popupContent:`
        overflow-y: scroll;
        overscroll-behavior: contain;
        max-height: 60vh;
    `,
    sidePopup:`
        position: fixed;
        width: 100%;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1000;
        padding: 30px;
        background-color: white;
        transition: 1s;
        transform: translateX(100%);
        &.show {
            transform: translateX(0);
        }
    `,
    inputUnderline: `
        border: 0;
        border-bottom: 1px solid;
        border-color: #dbe1e6;
        transition: border-color .5s;
        &:focus {
            border-color: #1a9df9;
        }
    `,
    mainContainer: `
        position: relative;
        min-height: calc(100vh - 64px);
    `,
    miniFeedTitle: `
        display: inline-block;
        margin-bottom: 5px;
    `,
    miniFeedBox: `
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        background-color: white; 
        padding: 20px 30px;
        margin: 0 -30px;
    `
}