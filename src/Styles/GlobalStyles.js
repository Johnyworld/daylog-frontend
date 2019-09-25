import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR:100,300,400,700&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Lobster&display=swap');

    ${reset}

    * {
        box-sizing: border-box;
    }

    html, input {
        font-family: 'Open Sans', 'Noto Sans KR', sans-serif;
    }

    a {
        text-decoration: none;
        color: inherit;
        cursor: pointer;
    }

    button {
        padding: 0;
        border: 0;
        background: none;
        outline: none;
        cursor: pointer;
    }

    textarea {
        padding: 0;
        border: 0;
        outline: none;
    }
`;