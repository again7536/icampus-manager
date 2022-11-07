import { ERRORS } from "@/constants";
import { Button, Typography } from "@mui/material";
import * as S from "./AuthFallback.style";

function AuthFallback() {
  const handleClick = () => {
    chrome.tabs.create({
      url: "https://canvas.skku.edu/",
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
