import React, { useCallback } from "react";
import { Menu, IconButton, Skeleton, Tooltip, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SelectCheckItem from "./SelectCheckItem/SelectCheckItem";

interface SelectCheckProps {
  label: string;
  items: Map<number, string>;
  onChange: (ids: number[]) => void;
  selected: number[];
  isLoading?: boolean;
}

const MemoizedSelectCheckItem = React.memo(SelectCheckItem);

function SelectCheck({ label, items, onChange, selected, isLoading }: SelectCheckProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectItem = useCallback(
    (id: number) => {
      if (selected.indexOf(id) > -1) onChange(selected.filter((val) => val !== id));
      else onChange([...selected, id]);
    },
    [onChange, selected]
  );

  return (
    <div>
      <Tooltip title={label}>
        <IconButton onClick={handleClick} role="button">
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <Menu id="lecture-checkbox-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Typography variant="subtitle1" sx={{ px: 3, py: 1 }}>
          {label}
        </Typography>

        {isLoading ? (
          <Skeleton />
        ) : (
          [...items.entries()].map(([itemKey, value]) => (
            <MemoizedSelectCheckItem
              key={itemKey}
              itemKey={itemKey}
              value={value}
              selected={selected.indexOf(itemKey) > -1}
              onClick={handleSelectItem}
            />
          ))
        )}
      </Menu>
    </div>
  );
}

export default SelectCheck;
