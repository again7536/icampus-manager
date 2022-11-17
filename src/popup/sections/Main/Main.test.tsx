import { render } from "@/__test__/customRender";
import mockStorage from "@/__test__/mock/storage";
import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import mockedAssignmentInfosFactory from "@/__test__/mock/assignments";
import mockedCoursesFactory from "@/__test__/mock/courses";
import { ATOM_KEYS, LIST_SKELETON_COUNT } from "@/constants";
import { chrome } from "jest-chrome";
import "@testing-library/jest-dom";
import "@/api";
import Main from "./Main";

function getConstants() {
  const COURSE_COUNT = 4;
  const ASSIGNMENT_COUNT = {
    everlec: 1,
    mp4: 1,
    movie: 1,
    zoom: 1,
  };
  const TOTAL_COUNT =
    COURSE_COUNT * Object.values(ASSIGNMENT_COUNT).reduce((acc, val) => acc + val, 0);
  return {
    COURSE_COUNT,
    ASSIGNMENT_COUNT,
    TOTAL_COUNT,
  };
}

jest.mock("@/api", () => {
  const { COURSE_COUNT, ASSIGNMENT_COUNT } = getConstants();
  const courses = mockedCoursesFactory({ amount: COURSE_COUNT });
  return {
    __esmodule: true,
    fetchCourses: jest.fn(() => Promise.resolve(courses)),
    fetchAndJoinAssignmentInfos: jest.fn(({ courseId }: { courseId: number }) => {
      return Promise.resolve(
        mockedAssignmentInfosFactory({
          amount: ASSIGNMENT_COUNT,
          courseId,
        })
      );
    }),
  };
});

describe("Main Section UI Test", () => {
  const { TOTAL_COUNT } = getConstants();

  const getAssignmentListItems = () => {
    const $assignmentList = screen.getByText("강의")?.parentElement;
    return $assignmentList?.querySelectorAll("li:not(:first-child)");
  };
  const getRefreshButton = (container: HTMLElement) => {
    const $button = container.querySelectorAll("button[type=button]")[2];
    expect($button).toBeTruthy();
    return $button as Element;
  };
  const getPlaylistButton = (container: HTMLElement) => {
    const $button = container.querySelectorAll("button[type=button]")[3];
    expect($button).toBeTruthy();
    return $button as Element;
  };
  const getCheckBoxAll = () => {
    return screen.getAllByRole("checkbox");
  };
  const getCheckBox = (idx: number) => {
    const $checkBox = getCheckBoxAll()[idx];
    expect($checkBox).not.toBeUndefined();
    return $checkBox;
  };
  const getPlaylistFromStorage = async () =>
    (await chrome.storage.local.get(ATOM_KEYS.PLAYLIST))[ATOM_KEYS.PLAYLIST];

  beforeEach(() => mockStorage());
  afterEach(() => cleanup());

  test("Playlist could be added", async () => {
    const { container } = await render(<Main />);

    // skeleton would be displayed first
    await waitFor(() => expect(getAssignmentListItems()?.length).toBe(LIST_SKELETON_COUNT));

    await waitFor(() => expect(getAssignmentListItems()?.length).toBe(TOTAL_COUNT));
    fireEvent.click(getPlaylistButton(container));
    expect(getCheckBoxAll().length).toBe(TOTAL_COUNT);

    fireEvent.click(getCheckBox(0));
    fireEvent.click(getCheckBox(1));
    fireEvent.click(getPlaylistButton(container));

    expect((await getPlaylistFromStorage()).length).toBe(2);
  });

  test("Refreshing animation should be shown", async () => {
    const { container } = await render(<Main />);
    const listener = jest.fn();
    getRefreshButton(container).addEventListener("animationEnd", listener);

    // data should be fetched at first time
    waitFor(() => expect(listener).toBeCalledTimes(1));

    fireEvent.click(getRefreshButton(container));
    waitFor(() => expect(listener).toBeCalledTimes(2));
  });
});
