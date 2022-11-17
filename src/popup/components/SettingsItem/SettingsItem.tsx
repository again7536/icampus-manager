import { SETTINGS_TYPE } from "@/constants";
import { SettingsItemInfo, SettingsKey } from "@/types";
import { ListItem, ListItemText, Switch, TextField, Select, MenuItem } from "@mui/material";
import * as S from "./SettingsItem.style";

interface SettingsItemProps {
  onChange: (listKey: SettingsKey, value: string | boolean) => void;
  temporalSetting: string | boolean;
  listKey: SettingsKey;
  setting: SettingsItemInfo;
}

function SettingsItem({
  onChange,
  temporalSetting,
  listKey,
  setting: { title, type, defaultValue, options },
}: SettingsItemProps) {
  if (type === SETTINGS_TYPE.SWITCH)
    return (
      <ListItem>
        <ListItemText id={`switch-list-${listKey}`} primary={title} />
        <S.LinkerLine />
        <Switch
          role="slider"
          edge="end"
          onChange={(e, checked) => onChange(listKey, checked)}
          checked={!!(temporalSetting ?? defaultValue)}
          inputProps={{
            "aria-labelledby": `switch-list-${listKey}`,
          }}
        />
      </ListItem>
    );
  if (type === SETTINGS_TYPE.NUMBER)
    <ListItem>
      <ListItemText id={`switch-list-${listKey}`} primary={title} />
      <S.LinkerLine />
      <TextField
        sx={{ width: "80px" }}
        size="small"
        type="number"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        value={+temporalSetting}
        onChange={(e) => onChange(listKey, e.target.value)}
      />
    </ListItem>;

  return (
    <ListItem>
      <ListItemText id={`switch-list-${listKey}`} primary={title} />
      <S.LinkerLine />
      <Select
        sx={{ width: "80px" }}
        size="small"
        value={temporalSetting ?? defaultValue}
        onChange={(e) => onChange(listKey, e.target.value.toString())}
      >
        {options?.map((option) => (
          <MenuItem key={option.name} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </ListItem>
  );
}

export default SettingsItem;
