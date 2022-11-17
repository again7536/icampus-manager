import { MenuItem, Checkbox, ListItemText } from "@mui/material";

interface SelectCheckItemProps {
  itemKey: number;
  value: string;
  selected: boolean;
  onClick: (id: number) => void;
}

function SelectCheckItem({ itemKey, value, selected, onClick }: SelectCheckItemProps) {
  return (
    <MenuItem key={itemKey} onClick={() => onClick(itemKey)}>
      <Checkbox checked={selected} />
      <ListItemText primary={value} />
    </MenuItem>
  );
}

export default SelectCheckItem;
