import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,700&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR:100,300,400,700&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Lobster&display=swap');

    ${reset}

    * {
        box-sizing: border-box;
    }

    html, input {
        font-family: 'Open Sans', 'Noto Sans KR', sans-serif;
    }
`;