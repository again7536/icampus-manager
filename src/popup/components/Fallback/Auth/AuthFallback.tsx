import { ERRORS } from "@/constants";
import { Button, Typography } from "@mui/material";
import * as S from "./AuthFallback.style";

function AuthFallback() {
  const handleClick = () => {
    chrome.tabs.create({
      url: "https://icampus.skku.edu/xn-sso/login.php?auto_login=true&sso_only=true&cvs_lgn=&return_url=https%3A%2F%2Ficampus.skku.edu%2Fxn-sso%2Fgw-cb.php%3Ffrom%3Dweb_redirect%26login_type%3Dstandalone%26return_url%3Dhttps%253A%252F%252Fcanvas.skku.edu%252Flearningx%252Flogin",
    });
  };

  return (
    <S.AuthFallbackContainer>
      <Typography role="alert" variant="h5" sx={{ color: "#3c3c3ca0" }}>
        {ERRORS.AUTH.message}
      </Typography>
      <Button onClick={handleClick} variant="outlined" size="large" color="secondary">
        새 탭에서 로그인 하기
      </Button>
    </S.AuthFallbackContainer>
  );
}

export default AuthFallback;
