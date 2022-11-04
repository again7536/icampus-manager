import { ReactNode, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Chip, Box } from "@mui/material";

interface SelectCheckProps {
  label: string;
  items: Map<number, string>;
  onChange: (event: SelectChangeEvent<number[]>, child: ReactNode) => void;
  selected: number[];
  isLoading?: boolean;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

export default function SelectCheck({
  label,
  items,
  onChange,
  selected,
  isLoading,
}: SelectCheckProps) {
  const [isFocused, setFocused] = useState<boolean>(false);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="multiple-checkbox-label">{label}</InputLabel>
        <Select
          labelId="multiple-checkbox-label"
          id="multiple-checkbox"
          multiple
          value={[...selected]}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          input={<OutlinedInput label={label} />}
          renderValue={(values) =>
            isLoading || (
              <Box sx={{ display: "flex", flexWrap: isFocused ? "wrap" : undefined, gap: 0.5 }}>
                {values.map((value) => (
                  <Chip key={value} label={items.get(value)} />
                ))}
              </Box>
            )
          }
          MenuProps={MenuProps}
        >
          {[...items.entries()].map((item) => (
            <MenuItem key={item[0]} value={item[0]}>
              <Checkbox checked={selected.indexOf(item[0]) > -1} />
              <ListItemText primary={item[1]} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
