import { render } from "@/__test__/customRender";
import mockStorage from "@/__test__/mock/storage";
import { faker } from "@faker-js/faker";
import { SelectChangeEvent } from "@mui/material";
import { screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SelectCheck from "./SelectCheck";

describe("SelectCheck UI test", () => {
  const SELECT_CHECK_LABEL = "선택";
  const ITEM_COUNT = 4;
  const itemsMap = new Map(
    Array.from({ length: ITEM_COUNT }).map(() => [+faker.random.numeric(7), faker.random.words(3)])
  );

  const setupSelected = (initial?: number[]) => {
    let selected: number[] = initial ?? [];
    const onChange = (e: SelectChangeEvent<number[]>) => {
      expect(typeof e.target.value).not.toBe("string");
      selected = [...(e.target.value as number[])];
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

  const getSelect = () => {
    const $control = screen.getByRole("button");
    return $control as Element;
  };

  const getChips = (container: HTMLElement) => {
    const $chips = container.querySelectorAll(".MuiChip-root");
    expect($chips.length).not.toBeLessThan(1);
    return $chips;
  };

  beforeEach(() => mockStorage());
  afterEach(() => cleanup());

  test("Chips should be rendered according to selected items", async () => {
    const { getSelected, onChange } = setupSelected([...itemsMap.keys()]);
    const { container } = await render(
      <SelectCheck
        label={SELECT_CHECK_LABEL}
        items={itemsMap}
        selected={getSelected()}
        onChange={onChange}
      />
    );

    expect(getChips(container).length).toBe(ITEM_COUNT);
  });

  test("Items in dropdown could be clicked", async () => {
    const { getSelected, onChange } = setupSelected();
    const { rerender } = await render(
      <SelectCheck
        label={SELECT_CHECK_LABEL}
        items={itemsMap}
        selected={getSelected()}
        onChange={onChange}
      />
    );

    fireEvent.mouseDown(getSelect());
    fireEvent.click((await getDropdownItems())[0]);

    rerender(
      <SelectCheck
        label={SELECT_CHECK_LABEL}
        items={itemsMap}
        selected={getSelected()}
        onChange={onChange}
      />
    );

    expect((await getDropdownItems())[0]).toHaveAttribute("aria-selected", "true");
  });
});
