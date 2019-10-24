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

    html, input, textarea, select, option, button {
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

    input, select, textarea {
        appearance:none;
        -webkit-appearance:none;
        -moz-appearance:none;
        -o-appearance:none;
    }

    .pop { animation-name: pop; }
    .unpop { animation-name: unpop; }

    .fadeIn { animation-name: fadeIn; opacity: 1; }
    .fadeOut { animation-name: fadeOut; opacity: 0; }

    @keyframes pop {
        0% { transform: scale(.6); }
        100% { transform: scale(1); }
    }

    @keyframes unpop {
        0% { transform: scale(.6); }
        100% { transform: scale(1); }
    }

    @keyframes fadeIn {
        0% { opacity: 0 }
        100% { opacity: 1 }
    }

    @keyframes fadeOut {
        0% { opacity: 1 }
        100% { opacity: 0 }
    }
`;