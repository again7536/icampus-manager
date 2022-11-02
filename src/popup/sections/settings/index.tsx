import { settingsAtom, snackbarOpenAtom } from "@/atoms";
import { SETTINGS } from "@/constants";
import { SettingsKey, Settings } from "@/types";
import {
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Switch,
  TextField,
  Button,
} from "@mui/material";
import { useAtom, useSetAtom } from "jotai";
import { useState } from "react";
import * as S from "./styled";

const SETTINGS_SUBHEADER = "설정";
const SNACKBAR_MESSAGE = "설정이 저장되었습니다.";

function SettingsSection() {
  const [settings, setSettings] = useAtom(settingsAtom);
  const [temporalSettings, setTemporalSettings] = useState<Settings>(settings);
  const openSnackbar = useSetAtom(snackbarOpenAtom);

  const handleChange = (key: SettingsKey, value: boolean | string) => {
    setTemporalSettings({ ...settings, [key]: value });
  };
  const handleSubmit = () => {
    setSettings(temporalSettings);
    openSnackbar({ message: SNACKBAR_MESSAGE });
  };

  return (
    <>
      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        subheader={<ListSubheader>{SETTINGS_SUBHEADER}</ListSubheader>}
      >
        {Object.entries(SETTINGS).map(([key, val]) => (
          <ListItem key={val.title}>
            <ListItemText id={`switch-list-${key}`} primary={val.title} />
            <S.LinkerLine />
            {val.type === "switch" ? (
              <Switch
                edge="end"
                onChange={(e, checked) => handleChange(key as SettingsKey, checked)}
                checked={!!(temporalSettings[key as SettingsKey] ?? val.defaultValue)}
                inputProps={{
                  "aria-labelledby": `switch-list-${key}`,
                }}
              />
            ) : (
              <TextField
                sx={{ width: "80px" }}
                size="small"
                type="number"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                value={+temporalSettings[key as SettingsKey]}
                onChange={(e) => handleChange(key as SettingsKey, e.target.value)}
              />
            )}
          </ListItem>
        ))}
      </List>
      <S.ButtonGroup>
        <Button onClick={handleSubmit} variant="contained">
          설정 저장
        </Button>
      </S.ButtonGroup>
    </>
  );
}

export default SettingsSection;
