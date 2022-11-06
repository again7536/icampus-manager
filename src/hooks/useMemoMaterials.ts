import { AssignmentInfos } from "@/types";
import { UseQueryResult } from "@tanstack/react-query";
import { useMemo } from "react";

interface UseMemoMaterialsParams {
  results: UseQueryResult<AssignmentInfos[]>[];
}

function useMemoMaterials({ results }: UseMemoMaterialsParams) {
  const materials = useMemo(
    () =>
      results.map(
        (result) =>
          result.data?.filter((datum) => datum.commons_content?.content_type === "pdf") ?? []
      ),
    [results]
  );

  return materials;
}

export default useMemoMaterials;
