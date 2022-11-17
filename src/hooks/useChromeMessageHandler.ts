import { playListAtom, settingsAtom } from "@/atoms";
import { QUERY_KEYS } from "@/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";

const useChromeMessageHandler = () => {
  const queryClient = useQueryClient();
  const [playList, setPlayList] = useAtom(playListAtom);
  const settings = useAtomValue(settingsAtom);

  useEffect(() => {
    const handleChromeMessage: (
      message: any,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response?: any) => void
    ) => void = (message, sender, response) => {
      if (!sender.origin?.endsWith("lcms.skku.edu")) return;

      if (message.message === "end") {
        queryClient.invalidateQueries([QUERY_KEYS.ASSIGNMENTS, playList[0]?.course_id ?? null], {
          refetchType: "all",
        });

        setPlayList((prev) => {
          const next = [...prev];
          next.shift();
          return next;
        });
      } else if (message.message === "playrate") {
        response(settings.PLAYRATE);
      }
    };
    chrome.runtime.onMessage.addListener(handleChromeMessage);

    return () => chrome.runtime.onMessage.removeListener(handleChromeMessage);
  }, [playList, settings, queryClient, setPlayList]);
};

export default useChromeMessageHandler;
