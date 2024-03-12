import { columns } from "./columns";
import { DataTable } from "./data-table";

export function GraphPackagesTable({ grades }) {
  return (
    <DataTable columns={columns} data={grades}></DataTable>
  );
}
