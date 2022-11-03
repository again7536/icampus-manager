import mockedAssignmentInfosFactory from "@/__test__/mock/assignments";
import { screen, cleanup } from "@testing-library/react";
import { render } from "@/__test__/customRender";
import { LIST_SKELETON_COUNT } from "@/constants";
import mockStorage from "@/__test__/mock/storage";
import "@testing-library/jest-dom";
import AssignmentList from "./AssignmentList";

const ASSIGNMENT_LIST_TITLE = "test list";

describe("AssignmentList UI test", () => {
  const mockedVideos = mockedAssignmentInfosFactory({
    amount: { everlec: 1, mp4: 2, movie: 3, zoom: 4, youtube: 5 },
  });
  const TOTAL_COUNT = mockedVideos.length;

  const getAssignmentListItems = () => {
    const $assignmentList = screen.getByText(ASSIGNMENT_LIST_TITLE)?.parentElement;
    return $assignmentList?.querySelectorAll("li:not(:first-child)");
  };

  beforeEach(() => mockStorage());
  afterEach(() => cleanup());

  /* Test Starts */
  test("Check list items are shown", async () => {
    await render(
      <AssignmentList assignments={mockedVideos} courses={[]} title={ASSIGNMENT_LIST_TITLE} />
    );

    expect(getAssignmentListItems()?.length).toBe(TOTAL_COUNT);
  });

  test("Check skeletons are shown while loading", async () => {
    await render(
      <AssignmentList
        assignments={mockedVideos}
        courses={[]}
        title={ASSIGNMENT_LIST_TITLE}
        isLoading
      />
    );

    expect(getAssignmentListItems()?.length).toBe(LIST_SKELETON_COUNT);
  });
});
