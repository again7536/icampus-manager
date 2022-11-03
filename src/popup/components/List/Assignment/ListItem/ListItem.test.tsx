import { render } from "@/__test__/customRender";
import mockStorage from "@/__test__/mock/storage";
import mockedAssignmentInfosFactory from "@/__test__/mock/assignments";
import { AssignmentInfos } from "@/types";
import { cleanup, fireEvent, screen, queryByText, queryByRole } from "@testing-library/react";
import "@testing-library/jest-dom";
import AssignmentListItem from ".";

describe("ListItem UI Test", () => {
  const COURSE_NAME = "TEST";
  const mockedVideo = mockedAssignmentInfosFactory({
    amount: { everlec: 1 },
  })[0];
  const mockedYoutube = mockedAssignmentInfosFactory({ amount: { youtube: 1 } })[0];

  const renderListItemWithState = async (assignment: AssignmentInfos) => {
    let checked = false;
    const onCheck = () => {
      checked = !checked;
    };

    const { rerender } = await render(
      <AssignmentListItem
        assignment={assignment}
        courseName={COURSE_NAME}
        checkable
        checked={checked}
        onCheck={onCheck}
      />
    );
    return () =>
      rerender(
        <AssignmentListItem
          assignment={assignment}
          courseName={COURSE_NAME}
          checkable
          checked={checked}
          onCheck={onCheck}
        />
      );
  };

  const getItem = () => screen.getByRole("listitem");
  const queryTime = ($item: HTMLElement) => queryByText($item, "-");
  const getClickableFromItem = (item: Element) => {
    const $clickable = item.querySelector("div:first-child");
    expect($clickable).not.toBeNull();
    return $clickable;
  };

  const queryCheckBox = ($item: HTMLElement) => queryByRole($item, "checkbox");

  beforeEach(() => mockStorage());
  afterEach(() => cleanup());

  test("Remaining time from deadline could optionally be shown", async () => {
    await render(<AssignmentListItem assignment={mockedVideo} courseName="test" timeAsLeft />);

    // '-'는 데드라인 시각을 표현할 때만 사용되므로...
    expect(queryTime(getItem())).toBeNull();
  });

  test("List items could be clicked", async () => {
    const spyClick = jest.spyOn(chrome.tabs, "create");
    await render(<AssignmentListItem assignment={mockedVideo} courseName="test" />);

    fireEvent.click(getClickableFromItem(getItem()) as Element);
    expect(spyClick).toBeCalledTimes(1);
  });

  test("List items could be checked", async () => {
    const rerender = await renderListItemWithState(mockedVideo);
    fireEvent.click(queryCheckBox(getItem()) as HTMLElement);
    rerender();
    expect(queryCheckBox(getItem()) as Element).toBeChecked();
  });

  test("Youtube items should not show checkbox", async () => {
    await render(
      <AssignmentListItem assignment={mockedYoutube} courseName={COURSE_NAME} checkable />
    );
    expect(queryCheckBox(getItem())).toBeNull();
  });
});
