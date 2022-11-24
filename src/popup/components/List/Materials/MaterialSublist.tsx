import { Course, AssignmentInfo } from "@/types";
import {
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemButton,
  ListItemText,
  Collapse,
  List,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useCallback, useState, memo } from "react";
import MaterialSubitem from "./MaterialSubitem/MaterialSubitem";

interface MaterialListProps {
  courses: Course[];
  materials: AssignmentInfo[];
  checked: Set<number>;
  onCheck: (next: Set<number> | ((prev: Set<number>) => Set<number>)) => void;
}

const MemoizedMaterialSubitem = memo(MaterialSubitem);

function MaterialSublist({ courses, materials, checked, onCheck }: MaterialListProps) {
  const [open, setOpen] = useState<boolean>(false);
  const handleClickList = () => setOpen((prev) => !prev);
  const isChecked = materials.every((material) => checked.has(material.assignment_id));

  const handleCheck = () => {
    const materialIds = materials.map((material) => material.assignment_id);
    const next = new Set(checked);

    if (isChecked) materialIds.forEach((materialId) => next.delete(materialId));
    else materialIds.forEach((materialId) => next.add(materialId));

    onCheck(next);
  };

  const handleCheckItem = useCallback(
    (id: number) => {
      onCheck((prev) => {
        const next = new Set([...prev]);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    },
    [onCheck]
  );

  const courseId = materials[0].course_id;
  return (
    <>
      <ListItem>
        <ListItemIcon>
          <Checkbox checked={isChecked} tabIndex={-1} disableRipple onClick={handleCheck} />
        </ListItemIcon>
        <ListItemButton onClick={handleClickList}>
          <ListItemText primary={courses?.find((course) => course.id === courseId)?.name ?? ""} />
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List disablePadding dense>
          {materials.map((material) => (
            <MemoizedMaterialSubitem
              key={material.assignment_id}
              material={material}
              onCheck={handleCheckItem}
              checked={checked.has(material.assignment_id)}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
}

export default MaterialSublist;
