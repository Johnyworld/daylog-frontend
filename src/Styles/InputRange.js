import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    input[type=range] {
        width: 100%;
    }
    
    input[type=range] {
        -webkit-appearance: none;
    }

    input[type=range]:focus {
        outline: none;
    }

    input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 3px;
        border-radius: 3px;
        cursor: pointer;
        background: ${({ theme })=> theme.c_lightGrayDarker1};
    }

    input[type=range]::-webkit-slider-thumb {
        border: 3px solid white;
        box-sizing: content-box;
        height: 16px;
        width: 16px;
        border-radius: 16px;
        background: ${({ theme })=> theme.c_blue };
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -9px; /*chrome의 경우 margin-top값을 부여해야합니다.*/
    }
    input[type=range]:focus::-webkit-slider-runnable-track {
        background: ${({ theme })=> theme.c_lightGrayDarker1}; /*네모버튼에 포커스를 줬을때 뒤에 라인(ㅡ)의 효과*/
    }

    /*Firefox의 경우*/
    input[type=range]::-moz-range-track {
        width: 100%;
        height: 3px;
        cursor: pointer;
        background: ${({ theme })=> theme.c_lightGrayDarker1};
    }

    input[type=range]::-moz-range-thumb {
        border: 3px solid white;
        box-sizing: content-box;
        height: 16px;
        width: 16px;
        border-radius: 16px;
        background: ${({ theme })=> theme.c_blue };;
        cursor: pointer;
    }

    input[type=range]::-ms-track {
        width: 100%;
        height: 3px;
        cursor: pointer;
        background: transparent;
        border-color: transparent;
        color: transparent;
    }

    input[type=range]::-ms-fill-lower {
        background: ${({ theme })=> theme.c_lightGrayDarker1};
    }

    input[type=range]::-ms-fill-upper {
        background: ${({ theme })=> theme.c_lightGrayDarker1};
    }

    input[type=range]::-ms-thumb {
        margin-top: 1px;
        border: 3px solid white;
        box-sizing: content-box;
        height: 16px;
        width: 16px;
        border-radius: 16px;
        background: ${({ theme })=> theme.c_blue };;
        cursor: pointer;
    }

    input[type=range]:focus::-ms-fill-lower {
        background: ${({ theme })=> theme.c_lightGrayDarker1};/*네모버튼에 포커스를 줬을때 뒤에 라인(ㅡ)의 효과*/
    }

    input[type=range]:focus::-ms-fill-upper {
        background: ${({ theme })=> theme.c_lightGrayDarker1}; /*네모버튼에 포커스를 줬을때 뒤에 라인(ㅡ)의 효과*/
    }
`;