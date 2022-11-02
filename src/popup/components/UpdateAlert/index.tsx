import { Alert, AlertTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { versionAtom } from "@/atoms";

function UpdateAlert() {
  const [updated, setUpdated] = useState<boolean>(false);
  const [version, setVersion] = useAtom(versionAtom);

  useEffect(() => {
    if (version && chrome.runtime.getManifest().version !== version) {
      setUpdated(true);
      setVersion(chrome.runtime.getManifest().version);
    } else if (!version) {
      setVersion(chrome.runtime.getManifest().version);
    }
  }, [version, setVersion]);

  return (
    updated && (
      <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
        새로운 버전으로 업데이트 되었습니다. — <strong>변경 사항 보기</strong>
      </Alert>
    )
  );
}

export default UpdateAlert;
