import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Pretendard', serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Pretendard';
          src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
          font-weight: 400;
          font-style: normal;
        }

        * {
          &::-webkit-scrollbar {
            width: 4px;
            height: 4px;
            background-color: #3c3c3c20;
          }
          
          &::-webkit-scrollbar-thumb {
            background: #3c3c3c80
          }
        }

        body {
          padding-right: 0px !important;
        }
      `,
    },
  },
});

export default theme;
