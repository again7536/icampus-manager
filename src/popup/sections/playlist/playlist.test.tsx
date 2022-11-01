import { ATOM_KEYS } from "@/constants";
import { render } from "@/__test__/customRender";
import mockedAssignmentInfosFactory from "@/__test__/mock/assignments";
import mockStorage from "@/__test__/mock/storage";
import mockedCoursesFactory from "@/__test__/mock/courses";
import { screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { chrome } from "jest-chrome";
import "@testing-library/jest-dom";
import "@/api";
import PlayListSection from ".";

function getConstants() {
  const COURSE_COUNT = 4;
  const STUDENT_ID = "123456789";

  return {
    COURSE_COUNT,
    STUDENT_ID,
  };
}

jest.mock("@/api", () => {
  const { COURSE_COUNT, STUDENT_ID } = getConstants();
  const courses = mockedCoursesFactory({ amount: COURSE_COUNT });
  return {
    __esmodule: true,
    fetchStudentId: jest.fn(() => STUDENT_ID),
    fetchCourses: jest.fn(() => Promise.resolve(courses)),
  };
});

describe("Playlist Section UI Test", () => {
  const ASSIGNMENT_COUNT = {
    movie: 4,
  };
  const TOTAL_COUNT = Object.values(ASSIGNMENT_COUNT).reduce((acc, val) => acc + val, 0);

  const getBlankPlaylist = () => screen.getByText("재생할 영상이 없어요..");
  const getPlaylistItems = (container: HTMLElement) => {
    const $playList = container.querySelectorAll("li");
    expect($playList.length).not.toBeLessThan(1);
    return $playList;
  };
  const initPlaylist = async () => {
    const assignments = mockedAssignmentInfosFactory({ amount: ASSIGNMENT_COUNT });
    await chrome.storage.local.set({ [ATOM_KEYS.PLAYLIST]: assignments });
  };
  const fireMessageEvent = () => {
    const event = new Event("message");
    Object.defineProperties(event, {
      origin: { value: "https://lcms.skku.edu" },
      data: { value: "end" },
    });
    fireEvent(window, event);
  };

  beforeEach(() => mockStorage());
  afterEach(() => cleanup());

  test("Playlist should be displayed", async () => {
    await initPlaylist();
    const { container } = await render(<PlayListSection />);
    await waitFor(() => expect(getPlaylistItems(container).length).toBe(TOTAL_COUNT));
  });

  test("Blank message should be shown properly", async () => {
    await render(<PlayListSection />);
    getBlankPlaylist();
  });

  test("Current item should be removed when message event fires", async () => {
    await initPlaylist();
    const { container } = await render(<PlayListSection />);

    fireMessageEvent();
    await waitFor(() => expect(getPlaylistItems(container).length).toBe(TOTAL_COUNT - 1));
  });
});
