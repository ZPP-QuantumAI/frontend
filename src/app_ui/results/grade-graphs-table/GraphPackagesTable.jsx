import { columns } from "./columns";
import { DataTable } from "./data-table";

export function GraphPackagesTable({ grades, setResult }) {
  return <DataTable columns={columns(setResult)} data={grades}></DataTable>;
}
