import { render } from "@/__test__/customRender";
import mockStorage from "@/__test__/mock/storage";
import mockedAssignmentInfosFactory from "@/__test__/mock/assignments";
import { cleanup, fireEvent, screen, queryByText } from "@testing-library/react";
import "@testing-library/jest-dom";
import AssignmentListItem from ".";

describe("ListItem UI Test", () => {
  const mockedVideo = mockedAssignmentInfosFactory({
    amount: { everlec: 1 },
  })[0];

  const getItem = () => screen.getByRole("listitem");
  const queryTime = ($item: HTMLElement) => queryByText($item, "-");

  const getClickableFromItem = (item: Element) => {
    const $clickable = item.querySelector("div:first-child");
    expect($clickable).not.toBeNull();
    return $clickable;
  };

  beforeEach(() => mockStorage());
  afterEach(() => cleanup());

  test("List items could be clicked", async () => {
    const spyClick = jest.spyOn(chrome.tabs, "create");
    await render(<AssignmentListItem assignment={mockedVideo} courseName="test" />);

    fireEvent.click(getClickableFromItem(getItem()) as Element);
    expect(spyClick).toBeCalledTimes(1);
  });

  test("Remaining time from deadline could optionally be shown", async () => {
    await render(<AssignmentListItem assignment={mockedVideo} courseName="test" timeAsLeft />);

    // '-'는 데드라인 시각을 표현할 때만 사용되므로...
    expect(queryTime(getItem())).toBeNull();
  });
});
