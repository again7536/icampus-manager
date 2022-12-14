import { useCourses, useAssignments } from "@/hooks";
import { Dispatch, SetStateAction } from "react";
import {
  customAssignmentIdsAtom,
  modalCloseAtom,
  modalOpenAtom,
  selectedCourseIdsAtom,
  settingsAtom,
} from "@/atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useIsRestoring, useQueryClient } from "@tanstack/react-query";
import { css } from "@emotion/react";
import { IconButton, Tooltip } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import CachedIcon from "@mui/icons-material/Cached";
import SelectCheck from "@/popup/components/SelectCheck/SelectCheck";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import TabIcon from "@mui/icons-material/Tab";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EstimatedDuration from "@/popup/components/EstimatedDuration/EstimatedDuration";
import CustomAssignmentModal from "@/popup/components/Modal/CustomAssignmentModal/CustomAssignmentModal";
import { PLAYRATE } from "@/constants";
import { AssignmentInfo, AssignmentShortInfo } from "@/types";
import * as S from "./MainControl.style";

const POPUP_URL = "popup.html";
const WINDOW_HEIGHT = 600;
const WINDOW_WIDTH = 510;
const DROPDOWN_LABEL = "표시할 과목";
const CUSTOM_ASSIGNMENT_TEXT = "사용자 추가 과제 선택";
const OPEN_TAB_BUTTON_TEXT = "새 탭에서 열기";
const OPEN_WINDOW_BUTTON_TEXT = "새 창에서 열기";
const CANCEL_BUTTON_TEXT = "선택 취소";
const CONFIRM_BUTTON_TEXT = "재생목록에 추가";
const ADD_PLAYLIST_BUTTON_TEXT = "재생목록 선택";
const UPDATE_BUTTON_TEXT = "강의 데이터 업데이트";

interface MainControlProps {
  isCheckable: boolean;
  setCheckable: Dispatch<SetStateAction<boolean>>;
  videoAssignments: AssignmentInfo[];
  assessmentAssignments: AssignmentShortInfo[][];
  checkedAssignmentIdSet: Set<number>;
  onConfirmSelect: () => void;
  onCancelSelect: () => void;
}

function MainControl({
  isCheckable,
  setCheckable,
  checkedAssignmentIdSet,
  videoAssignments,
  assessmentAssignments,
  onConfirmSelect,
  onCancelSelect,
}: MainControlProps) {
  // atoms
  const [selectedCourseIds, setselectedCourseIds] = useAtom(selectedCourseIdsAtom);
  const settings = useAtomValue(settingsAtom);
  const openModal = useSetAtom(modalOpenAtom);
  const closeModal = useSetAtom(modalCloseAtom);
  const [customAssignments, setCustomAssignments] = useAtom(customAssignmentIdsAtom);

  // queries
  const isRestoring = useIsRestoring();
  const queryClient = useQueryClient();
  const { data: courses } = useCourses();
  const results = useAssignments({
    courseIds: courses?.map((course) => course.id),
    userId: courses?.[0].enrollments[0].user_id,
  });

  // handlers
  const handleChange = (ids: number[]) => setselectedCourseIds([...ids]);
  const handleClickAddPlaylist = () => setCheckable(true);
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
  const handleModalConfirm = (checked: Set<number>) => {
    setCustomAssignments([...checked]);
    closeModal();
  };
  const handleModalOpen = () =>
    openModal({
      modalBody: (
        <CustomAssignmentModal
          assignments={assessmentAssignments}
          courses={courses ?? []}
          addedAssignmentIds={customAssignments}
          onConfirm={handleModalConfirm}
          onClose={closeModal}
        />
      ),
    });

  const checkedAssignments = videoAssignments.filter((assignment) =>
    checkedAssignmentIdSet.has(assignment.id ?? 0)
  );

  return (
    <S.ControlWrapper>
      <SelectCheck
        label={DROPDOWN_LABEL}
        courses={courses ?? []}
        onChange={handleChange}
        selected={selectedCourseIds}
        isLoading={isRestoring}
      />
      <Tooltip title={CUSTOM_ASSIGNMENT_TEXT}>
        <IconButton onClick={handleModalOpen}>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <div
        css={css`
          margin-left: auto;
        `}
      />

      {isCheckable && (
        <EstimatedDuration
          assignments={checkedAssignments}
          playrate={PLAYRATE[+settings.PLAYRATE]}
        />
      )}
      <Tooltip title={settings.WINDOW ? OPEN_WINDOW_BUTTON_TEXT : OPEN_TAB_BUTTON_TEXT}>
        <IconButton onClick={handleOpenTab}>
          <TabIcon />
        </IconButton>
      </Tooltip>
      {isCheckable ? (
        <>
          <Tooltip title={CANCEL_BUTTON_TEXT}>
            <IconButton onClick={onCancelSelect}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={CONFIRM_BUTTON_TEXT}>
            <IconButton onClick={onConfirmSelect}>
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
  );
}

export default MainControl;
