import AssignmentList from "@/popup/components/List/Assignment/AssignmentList";
import { useCourses, useAssignments, useMemoAssignments } from "@/hooks";
import { useMemo, useState, memo, useCallback } from "react";
import { playListAtom, selectedCoursesAtom, settingsAtom } from "@/atoms";
import { useAtom, useSetAtom, useAtomValue } from "jotai";
import { useIsRestoring, useQueryClient } from "@tanstack/react-query";
import { css } from "@emotion/react";
import { IconButton, Tooltip, Typography } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import CachedIcon from "@mui/icons-material/Cached";
import SelectCheck from "@/popup/components/SelectCheck/SelectCheck";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import TabIcon from "@mui/icons-material/Tab";
import HelpIcon from "@mui/icons-material/Help";
import moment from "@/utils/momentKo";
import { PLAYRATE } from "@/constants";
import * as S from "./Main.style";

const MemoizedAssignmentList = memo(AssignmentList);

const POPUP_URL = "popup.html";
const WINDOW_HEIGHT = 600;
const WINDOW_WIDTH = 510;
const DROPDOWN_LABEL = "표시할 과목";
const OPEN_TAB_BUTTON_TEXT = "새 탭에서 열기";
const OPEN_WINDOW_BUTTON_TEXT = "새 창에서 열기";
const CANCEL_BUTTON_TEXT = "선택 취소";
const CONFIRM_BUTTON_TEXT = "재생목록에 추가";
const ADD_PLAYLIST_BUTTON_TEXT = "재생목록 선택";
const UPDATE_BUTTON_TEXT = "강의 데이터 업데이트";
const COURSE_LIST_SUBHEADER = "강의";
const HOMEWORK_LIST_SUBHEADER = "과제";
const PLAYTIME_HELP = "배속이 적용된 시간입니다.";

function Main() {
  const [selectedCourses, setSelectedCourses] = useAtom(selectedCoursesAtom);
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [isCheckable, setCheckable] = useState<boolean>(false);
  const isRestoring = useIsRestoring();
  const settings = useAtomValue(settingsAtom);

  const queryClient = useQueryClient();
  const setPlayList = useSetAtom(playListAtom);
  const { data: courses } = useCourses();
  const results = useAssignments({
    courseIds: courses?.map((course) => course.id),
    userId: courses?.[0].enrollments[0].user_id,
  });

  // data filtering
  const { assignments, videoAssignments, workAssignments } = useMemoAssignments({
    results,
    selectedCourses,
  });
  const coursesMap = useMemo(
    () => new Map(courses?.map((course) => [course.id, course.name]) ?? []),
    [courses]
  );
  const estimatedDuration = useMemo(
    () =>
      moment.duration(
        [...checked].reduce(
          (acc, id) =>
            acc +
            (videoAssignments.find((assignment) => assignment.assignment_id === id)?.commons_content
              ?.duration ?? 0),
          0
        ) / PLAYRATE[+settings.PLAYRATE],
        "seconds"
      ),
    [checked, settings.PLAYRATE, videoAssignments]
  );

  const handleCheck = useCallback(
    (id: number) =>
      setChecked((prev) => {
        const next = new Set(prev);
        if (prev.has(id)) next.delete(id);
        else next.add(id);
        return next;
      }),
    []
  );
  const handleChange = (ids: number[]) => {
    setSelectedCourses([...ids]);
  };
  const handleClickAddPlaylist = () => setCheckable(true);
  const handleConfirmSelect = () => {
    setPlayList(assignments.filter((assignment) => checked.has(assignment.assignment_id)));
    setCheckable(false);
  };
  const handleCancelSelect = () => {
    setCheckable(false);
    setChecked(new Set());
  };
  const handleOpenTab = () => {
    if (settings.WINDOW)
      chrome.windows.create({
        url: POPUP_URL,
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
        type: "panel",
      });
    else chrome.tabs.create({ url: POPUP_URL });
  };

  return (
    <>
      <S.ControlWrapper>
        <SelectCheck
          label={DROPDOWN_LABEL}
          items={coursesMap}
          onChange={handleChange}
          selected={selectedCourses}
          isLoading={isRestoring}
        />
        <div
          css={css`
            margin-left: auto;
          `}
        />

        {isCheckable && (
          <>
            <Tooltip title={PLAYTIME_HELP}>
              <HelpIcon sx={{ fontSize: "12pt", color: "#3c3c3ca0" }} />
            </Tooltip>
            <Typography variant="body2">{`예상 소요시간 : ${estimatedDuration.hours()}시간 ${estimatedDuration.minutes()}분`}</Typography>
          </>
        )}
        <Tooltip title={settings.WINDOW ? OPEN_WINDOW_BUTTON_TEXT : OPEN_TAB_BUTTON_TEXT}>
          <IconButton onClick={handleOpenTab}>
            <TabIcon />
          </IconButton>
        </Tooltip>
        {isCheckable ? (
          <>
            <Tooltip title={CANCEL_BUTTON_TEXT}>
              <IconButton onClick={handleCancelSelect}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={CONFIRM_BUTTON_TEXT}>
              <IconButton onClick={handleConfirmSelect}>
                <CheckIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip title={UPDATE_BUTTON_TEXT}>
              <IconButton onClick={() => queryClient.invalidateQueries()}>
                <CachedIcon
                  css={css`
                    ${results.some((result) => result.isFetching) && S.spin};
                  `}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title={ADD_PLAYLIST_BUTTON_TEXT}>
              <IconButton onClick={handleClickAddPlaylist}>
                <PlaylistAddIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </S.ControlWrapper>

      <MemoizedAssignmentList
        assignments={videoAssignments}
        courses={courses ?? []}
        title={COURSE_LIST_SUBHEADER}
        checkable={isCheckable}
        checked={checked}
        onCheck={handleCheck}
        isLoading={results.some((result) => result.isLoading) || isRestoring}
        timeAsLeft={!!settings.DDAY}
      />
      <MemoizedAssignmentList
        assignments={workAssignments}
        courses={courses ?? []}
        title={HOMEWORK_LIST_SUBHEADER}
        isLoading={results.some((result) => result.isLoading) || isRestoring}
        timeAsLeft={!!settings.DDAY}
      />
    </>
  );
}

export default Main;
