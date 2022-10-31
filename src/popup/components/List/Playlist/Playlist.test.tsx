import mockedAssignmentsFactory from "@/__test__/mock/assignments";
import { fireEvent, cleanup } from "@testing-library/react";
import { render } from "@/__test__/customRender";
import mockStorage from "@/__test__/mock/storage";
import "@testing-library/jest-dom";
import Playlist from ".";

describe("Playlist UI test", () => {
  const mockedVideos = mockedAssignmentsFactory({
    amount: { everlec: 1, mp4: 2, video: 3, zoom: 4 },
  });

  const getPlaylistItems = (container: HTMLElement) => {
    const $playlist = container.querySelector("nav");
    expect($playlist).not.toBeNull();
    return $playlist?.querySelectorAll("li");
  };

  const getClickableFromItem = (item: Element) => {
    const $clickable = item.querySelector("div:first-child");
    expect($clickable).not.toBeNull();
    return $clickable as Element;
  };

  beforeEach(() => mockStorage());
  afterEach(() => cleanup());

  /* Test Starts */
  test("Check list items are shown", async () => {
    const { container } = await render(<Playlist assignments={mockedVideos} courses={[]} />);

    expect(getPlaylistItems(container)?.length).toBe(10);
  });

  test("Check first item is highlighted", async () => {
    const { container } = await render(<Playlist assignments={mockedVideos} courses={[]} />);

    expect(getPlaylistItems(container)?.[0]).toHaveStyle("background-color: #adebdc");
  });

  test("List items could be clicked", async () => {
    const spyClick = jest.spyOn(chrome.tabs, "create");
    const { container } = await render(<Playlist assignments={mockedVideos} courses={[]} />);

    fireEvent.click(getClickableFromItem(getPlaylistItems(container)?.[0] as Element));
    expect(spyClick).toBeCalledTimes(1);
  });
});
