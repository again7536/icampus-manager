import { useAssignments, useCourses } from "@/hooks";
import useMemoMaterials from "@/hooks/useMemoMaterials";
import CheckableSublist from "@/popup/components/List/CheckableSublist/CheckableSublist";
import { List, ListSubheader, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import JSZip from "jszip";
import * as S from "./LectureMaterials.style";

const MATERIALS_LIST_SUBHEADER = "강의 교안 및 PDF 목록";
const DOWNLOAD_BUTTON_TEXT = "다운로드";

function LectureMaterials() {
  const [progress, setProgress] = useState<number | false>(false);
  const [checked, setChecked] = useState(new Set<number>());
  const { data: courses } = useCourses({});
  const results = useAssignments({
    courseIds: courses?.map((course) => course.id),
    userId: courses?.[0].enrollments[0].user_id,
  });
  const materials = useMemoMaterials({ results });

  const handleClickDownload = async () => {
    if (checked.size < 1) return;

    const zip = new JSZip();
    (
      await Promise.all(
        materials
          .flat()
          .filter((material) => checked.has(material.assignment_id))
          .map(async (material) => ({
            ...material,
            pdf: await axios
              .get<ArrayBuffer>(
                `https://lcms.skku.edu/index.php?module=xn_media_content2013&act=dispXn_media_content2013DownloadWebFile&site_id=skku100001&content_id=${
                  material.commons_content?.content_id
                }&web_storage_id=31&file_subpath=contents%5Cweb_files%5Coriginal.pdf&file_name=${encodeURIComponent(
                  material.title
                )}`,
                { responseType: "arraybuffer" }
              )
              .then((res) => {
                setProgress((prev) => +prev + 100 / checked.size);
                return res.data;
              }),
          }))
      )
    ).forEach(({ pdf, course_id, title }) => {
      if (pdf.byteLength === 0) return;
      zip.file(`${courses?.find((course) => course.id === course_id)?.name}/${title}.pdf`, pdf, {
        binary: true,
      });
    });
    zip.generateAsync({ type: "blob" }).then((blob) => {
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      URL.revokeObjectURL(url);
      setProgress(false);
    });
  };

  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper", padding: "0 10px" }}
      component="nav"
      aria-labelledby="material-list-subheader"
      subheader={
        <ListSubheader component="div" id="material-list-subheader">
          {MATERIALS_LIST_SUBHEADER}
          <S.ButtonGroup>
            <Button
              type="button"
              variant="contained"
              onClick={handleClickDownload}
              disabled={checked.size < 1}
            >
              {DOWNLOAD_BUTTON_TEXT}
            </Button>
          </S.ButtonGroup>
        </ListSubheader>
      }
    >
      {progress !== false && <S.BorderLinearProgress variant="determinate" value={progress} />}
      {materials.map((materialsOfCourse) =>
        materialsOfCourse.length > 0 ? (
          <CheckableSublist
            key={materialsOfCourse[0].course_id}
            courses={courses ?? []}
            assignments={materialsOfCourse}
            checked={checked}
            onCheck={setChecked}
          />
        ) : null
      )}
    </List>
  );
}

export default LectureMaterials;
