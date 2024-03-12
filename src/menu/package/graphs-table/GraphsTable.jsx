import { columns } from "./columns";
import { useQuery } from "react-query";
import { useState } from "react";
import { get } from "@/lib/requests";
import { DataTable } from "../DataTable";

export function GraphsTable({ value, onChange }) {
  const [rowSelection, setRowSelectionLocal] = useState(value);

  function setRowSelection(selection) {
    setRowSelectionLocal(selection);
    onChange(rowSelection);
  }

  const graphs = useQuery(
    "graphs",
    async () => {
      return await get("/graph/all");
    },
    {
      initialData: [],
    }
  );
  return (
    <DataTable
      columns={columns}
      data={graphs.data}
      rowSelection={rowSelection}
      setRowSelection={setRowSelection}
      rowIdFun={(row) => row.id}
    />
  );
}
