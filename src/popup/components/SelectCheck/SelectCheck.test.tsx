import { render } from "@/__test__/customRender";
import mockStorage from "@/__test__/mock/storage";
import { screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import mockedCoursesFactory from "@/__test__/mock/courses";
import SelectCheck from "./SelectCheck";

describe("SelectCheck UI test", () => {
  const SELECT_CHECK_LABEL = "선택";
  const ITEM_COUNT = 4;
  const mockedCourses = mockedCoursesFactory({ amount: ITEM_COUNT });

  const setupSelected = (initial?: number[]) => {
    let selected: number[] = initial ?? [];
    const onChange = (ids: number[]) => {
      selected = [...ids];
    };
    const getSelected = () => selected;

    return { getSelected, onChange };
  };

  const getDropdownItems = async () => {
    const $presentation = await screen.findByRole("presentation");
    const $dropdownItems = $presentation.querySelectorAll("li");
    expect($dropdownItems.length).not.toBeLessThan(1);
    return $dropdownItems;
  };

  const getCheckbox = async ($container: HTMLElement) => {
    const $checkbox = $container.querySelector("input[type='checkbox']");
    expect($checkbox).not.toBeNull();
    return $checkbox as HTMLInputElement;
  };

  const getMenuButton = () => screen.getByRole("button");

  beforeEach(() => mockStorage());
  afterEach(() => cleanup());

  test("Items in dropdown could be clicked", async () => {
    const { getSelected, onChange } = setupSelected();
    const { rerender } = await render(
      <SelectCheck
        label={SELECT_CHECK_LABEL}
        courses={mockedCourses}
        selected={getSelected()}
        onChange={onChange}
      />
    );

    fireEvent.click(getMenuButton());
    fireEvent.click((await getDropdownItems())[0]);

    rerender(
      <SelectCheck
        label={SELECT_CHECK_LABEL}
        courses={mockedCourses}
        selected={getSelected()}
        onChange={onChange}
      />
    );

    const $checkbox = await getCheckbox((await getDropdownItems())[0]);
    expect($checkbox).toBeChecked();
  });
});
