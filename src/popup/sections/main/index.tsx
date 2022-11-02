import AssignmentList from "@/popup/components/List/Assignment";
import { useCourses, useAssignments, useMemoAssignments } from "@/hooks";
import { useMemo, useState, memo } from "react";
import { playListAtom, selectedCoursesAtom } from "@/atoms";
import { useAtom, useSetAtom } from "jotai";
import { useQueryClient } from "@tanstack/react-query";
import { css } from "@emotion/react";
import { IconButton, SelectChangeEvent, Tooltip } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import CachedIcon from "@mui/icons-material/Cached";
import SelectCheck from "@/popup/components/SelectCheck";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import TabIcon from "@mui/icons-material/Tab";
import * as S from "./styled";

const MemoizedAssignmentList = memo(AssignmentList);

function Main() {
  const [selectedCourses, setSelectedCourses] = useAtom(selectedCoursesAtom);
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [isCheckable, setCheckable] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const setPlayList = useSetAtom(playListAtom);
  const { data: courses } = useCourses({
    onSuccess: (data) =>
      selectedCourses.length === 0 && setSelectedCourses(data.map((course) => course.id)),
  });
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

  const handleCheck = (id: number) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (prev.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const handleSelectChange = (e: SelectChangeEvent<number[]>) =>
    setSelectedCourses([...(e.target.value as number[])]);

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
    chrome.tabs.create({ url: "popup.html" });
  };

  return (
    <>
      <S.ControlWrapper>
        <SelectCheck
          label="표시할 과목"
          items={coursesMap}
          onChange={handleSelectChange}
          selected={selectedCourses}
        />

        {/* button groups */}
        <div
          css={css`
            margin-left: auto;
          `}
        >
          <Tooltip title="새 탭에서 열기">
            <IconButton onClick={handleOpenTab}>
              <TabIcon />
            </IconButton>
          </Tooltip>
          {isCheckable ? (
            <>
              <Tooltip title="선택 취소">
                <IconButton onClick={handleCancelSelect}>
                  <ClearIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="재생 목록에 추가">
                <IconButton onClick={handleConfirmSelect}>
                  <CheckIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="강의 데이터 업데이트">
                <IconButton onClick={() => queryClient.invalidateQueries()}>
                  <CachedIcon
                    css={css`
                      ${results.some((result) => result.isFetching) && S.spin};
                    `}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="재생 목록 선택">
                <IconButton onClick={handleClickAddPlaylist}>
                  <PlaylistAddIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </div>
      </S.ControlWrapper>

      <MemoizedAssignmentList
        assignments={videoAssignments}
        courses={courses ?? []}
        title="강의"
        checkable={isCheckable}
        checked={checked}
        onCheck={handleCheck}
        isLoading={results.some((result) => result.isLoading)}
      />
      <MemoizedAssignmentList
        assignments={workAssignments}
        courses={courses ?? []}
        title="과제"
        isLoading={results.some((result) => result.isLoading)}
      />
    </>
  );
}

export default Main;
