import { ROUTES } from "@/constants";
import { cleanup, fireEvent, screen } from "@testing-library/react";
import { render } from "@/__test__/customRender";
import mockStorage from "@/__test__/mock/storage";
import { Routes, Route } from "react-router";
import "@testing-library/jest-dom";
import Navigation from ".";

describe("Navigation UI test", () => {
  function TestElement() {
    return (
      <>
        <Navigation routes={ROUTES} />
        <Routes>
          {Object.values(ROUTES).map((val) => (
            <Route key={val.path} path={val.path} element={val.path} />
          ))}
        </Routes>
      </>
    );
  }

  const getTabButton = (idx: number) => {
    const $button = screen.queryAllByRole("tab")?.[idx];
    expect($button).not.toBeFalsy();
    return $button as Element;
  };

  const checkTabActive = (idx: number) => {
    const path = Object.values(ROUTES)?.[idx].path;
    expect(screen.queryByText(path));
  };

  const checkDefault = () => {
    const pathName = Object.values(ROUTES)?.find((route) => route.path === "/")?.path;
    expect(pathName).not.toBeNull();
    return screen.queryAllByText(pathName ?? "");
  };

  beforeEach(() => mockStorage());
  afterEach(() => cleanup());

  test("Check the index tab is shown as default", async () => {
    await render(<TestElement />);
    checkDefault();
  });

  test("Check the tab button could be clicked", async () => {
    await render(<TestElement />);
    fireEvent.click(getTabButton(1));
    checkTabActive(1);
  });
});
