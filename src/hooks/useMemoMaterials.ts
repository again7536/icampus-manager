import { AssignmentInfo } from "@/types";
import { UseQueryResult } from "@tanstack/react-query";
import { useMemo } from "react";

interface UseMemoMaterialsParams {
  results: UseQueryResult<AssignmentInfo[]>[];
}

function useMemoMaterials({ results }: UseMemoMaterialsParams) {
  const materials = useMemo(
    () =>
      results.map(
        (result) =>
          result.data?.filter(
            (datum) =>
              datum.commons_content?.content_type === "pdf" &&
              // 학습 기간이 만료된 경우 (content_id === "not_open") 노출시키지 않음
              datum.commons_content?.content_id !== "not_open"
          ) ?? []
      ),
    [results]
  );

  return materials;
}

export default useMemoMaterials;
