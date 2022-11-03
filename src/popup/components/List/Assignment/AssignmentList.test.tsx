import mockedAssignmentInfosFactory from "@/__test__/mock/assignments";
import { screen, fireEvent, cleanup } from "@testing-library/react";
import { render } from "@/__test__/customRender";
import { LIST_SKELETON_COUNT } from "@/constants";
import mockStorage from "@/__test__/mock/storage";
import "@testing-library/jest-dom";
import AssignmentList from ".";

const ASSIGNMENT_LIST_TITLE = "test list";

describe("AssignmentList UI test", () => {
  const mockedVideos = mockedAssignmentInfosFactory({
    amount: { everlec: 1, mp4: 2, movie: 3, zoom: 4 },
  });

  const getAssignmentListItems = () => {
    const $assignmentList = screen.getByText(ASSIGNMENT_LIST_TITLE)?.parentElement;
    return $assignmentList?.querySelectorAll("li:not(:first-child)");
  };

  const getCheckBoxAll = () => {
    return screen.getAllByRole("checkbox");
  };
  const getCheckBox = (idx: number) => {
    const $checkBox = getCheckBoxAll()[idx];
    expect($checkBox).not.toBeUndefined();
    return $checkBox;
  };

  beforeEach(() => mockStorage());
  afterEach(() => cleanup());

  /* Test Starts */
  test("Check list items are shown", async () => {
    await render(
      <AssignmentList assignments={mockedVideos} courses={[]} title={ASSIGNMENT_LIST_TITLE} />
    );

    expect(getAssignmentListItems()?.length).toBe(10);
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

  test("List items could be checked", async () => {
    const renderList = await (async () => {
      const checked = new Set<number>();
      const { rerender } = await render(
        <AssignmentList
          assignments={mockedVideos}
          courses={[]}
          title={ASSIGNMENT_LIST_TITLE}
          checkable
          checked={checked}
          onCheck={(id) => (checked.has(id) ? checked.delete(id) : checked.add(id))}
        />
      );
      return () =>
        rerender(
          <AssignmentList
            assignments={mockedVideos}
            courses={[]}
            title={ASSIGNMENT_LIST_TITLE}
            checkable
            checked={checked}
            onCheck={(id) => (checked.has(id) ? checked.delete(id) : checked.add(id))}
          />
        );
    })();

    renderList();
    fireEvent.click(getCheckBox(0) as Element);
    renderList();
    expect(getCheckBox(0) as Element).toBeChecked();
  });
});
