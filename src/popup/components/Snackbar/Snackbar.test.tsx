import { snackbarOpenAtom } from "@/atoms";
import { render } from "@/__test__/customRender";
import mockStorage from "@/__test__/mock/storage";
import { cleanup, fireEvent, screen } from "@testing-library/react";
import { useSetAtom } from "jotai";
import "@testing-library/jest-dom";
import GlobalSnackbar from "./Snackbar";

describe("Global snackbar UI test", () => {
  const TEST_SNACKBAR_MESSAGE = "Test";

  function TestTarget() {
    const openSnackbar = useSetAtom(snackbarOpenAtom);

    return (
      <>
        <GlobalSnackbar />
        <button type="button" onClick={() => openSnackbar({ message: TEST_SNACKBAR_MESSAGE })}>
          open
        </button>
      </>
    );
  }

  const getButton = () => screen.getByRole("button");
  const getSnackbar = () => screen.getByText(TEST_SNACKBAR_MESSAGE);

  beforeEach(() => mockStorage());
  afterEach(() => cleanup());

  test("Check global snackbar is displayed normally", async () => {
    await render(<TestTarget />);
    fireEvent.click(getButton());
    getSnackbar();
  });
});
