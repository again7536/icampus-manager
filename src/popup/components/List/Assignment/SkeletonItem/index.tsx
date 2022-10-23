import { ListItem, ListItemButton, ListItemText, Skeleton } from "@mui/material";

function AssignmentSkeletonItem() {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemText primary={<Skeleton />} secondary={<Skeleton width="40%" />} />
      </ListItemButton>
    </ListItem>
  );
}

export default AssignmentSkeletonItem;
