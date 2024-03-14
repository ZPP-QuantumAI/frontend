import { columns } from "./columns";
import { DataTable } from "./data-table";

export function GraphPackagesTable({ grades, changeResult }) {
  return <DataTable columns={columns(changeResult)} data={grades}></DataTable>;
}
