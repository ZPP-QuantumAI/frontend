import { useQueries, useQueryClient } from "react-query";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { get } from "@/lib/requests";
import { Button } from "@/components/ui/button";

async function getGradePackage(i) {
  let grade = await get(`/grade/package?solutionId=${i}`);
  return grade;
}

export function GradePackagesTable({ keys }) {
  const data = useQueries(
    keys.map((i) => {
      return {
        queryKey: ["key", i],
        queryFn: () => getGradePackage(i),
        initialData: () => {
          return { status: "WAITING", solutionId: i, grades: [], graphPackage: {name: '', graphIds: {length: ''}}};
        },
        refetchInterval: (data) =>
          !data || data.status == "WAITING" ? 1000 : undefined,
      };
    })
  );

  return <DataTable columns={columns} data={data.map((res) => res.data)} />;
}
