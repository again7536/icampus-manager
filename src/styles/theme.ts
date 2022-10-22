import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Pretendard', serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&display=swap');
        @font-face {
          font-family: 'Pretendard';
          src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
          font-weight: 400;
          font-style: normal;
        }
      `,
    },
  },
});

export default theme;
