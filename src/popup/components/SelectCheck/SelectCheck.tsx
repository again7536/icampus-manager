import React, { useCallback } from "react";
import { Menu, IconButton, Skeleton, Tooltip, Typography, MenuItem } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Course } from "@/types";
import SelectCheckItem from "./SelectCheckItem/SelectCheckItem";

interface SelectCheckProps {
  label: string;
  courses: Course[];
  onChange: (ids: number[]) => void;
  selected: number[];
  isLoading?: boolean;
}

const MemoizedSelectCheckItem = React.memo(SelectCheckItem);

function SelectCheck({ label, courses, onChange, selected, isLoading }: SelectCheckProps) {
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
      <Menu
        id="lecture-checkbox-menu"
        sx={{ width: "350px" }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Typography variant="subtitle1" sx={{ px: 3, py: 1 }}>
          {label}
        </Typography>

        {isLoading
          ? Array.from({ length: 4 }, (_, v) => v).map((val) => (
              <MenuItem key={val}>
                <Skeleton width="100%" />
              </MenuItem>
            ))
          : courses.map(({ id, name }) => (
              <MemoizedSelectCheckItem
                key={id}
                itemKey={id}
                value={name}
                selected={selected.indexOf(id) > -1}
                onClick={handleSelectItem}
              />
            ))}
      </Menu>
    </div>
  );
}

export default SelectCheck;
