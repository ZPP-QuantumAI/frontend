import { useQueries } from "react-query";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { get } from "@/lib/requests";
import { REFRESH_RATE } from "@/lib/constants";

async function getGradePackage(i) {
  let grade = await get(`/grade/package?solutionId=${i}`);
  return grade;
}

export function GradePackagesTable({ keys, changeResult }) {
  const data = useQueries(
    keys.map((i) => {
      return {
        queryKey: ["key", i],
        queryFn: () => getGradePackage(i),
        initialData: () => {
          return {
            status: "WAITING",
            solutionId: i,
            finalGrade: { grades: [] },
            graphPackage: { name: "", graphIds: { length: "" } },
          };
        },
        refetchInterval: (data) =>
          !data || data.status == "WAITING" ? REFRESH_RATE : undefined,
      };
    }),
  );

  return (
    <DataTable
      columns={columns}
      changeResult={changeResult}
      data={data.map((res) => res.data)}
    />
  );
}
