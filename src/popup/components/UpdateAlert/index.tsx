import { Alert, AlertTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { versionAtom } from "@/atoms";
import * as S from "./styled";

const RELEASES_NOTE = "https://github.com/again7536/icampus-manager/releases";

function UpdateAlert() {
  const [updated, setUpdated] = useState<boolean>(false);
  const [version, setVersion] = useAtom(versionAtom);
  const handleClick = () => {
    chrome.tabs.create({ url: RELEASES_NOTE });
  };

  useEffect(() => {
    if (version && chrome.runtime.getManifest().version !== version) {
      setUpdated(true);
      setVersion(chrome.runtime.getManifest().version);
    } else if (!version) {
      setVersion(chrome.runtime.getManifest().version);
    }
  }, [version, setVersion]);

  return updated ? (
    <Alert sx={{ marginBottom: "5px" }} severity="info">
      <AlertTitle>Info</AlertTitle>
      새로운 버전으로 업데이트 되었습니다. —
      <S.ReleaseLink role="link" onClick={handleClick}>
        변경 사항 보기
      </S.ReleaseLink>
    </Alert>
  ) : null;
}

export default UpdateAlert;
