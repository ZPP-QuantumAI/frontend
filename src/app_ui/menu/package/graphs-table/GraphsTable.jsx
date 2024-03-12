import { columns } from "./columns";
import { useQuery } from "react-query";
import { useState } from "react";
import { get } from "@/lib/requests";
import { SelectableDataTable } from "@/reusable/table/SelectableDataTable";

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
    },
  );
  return (
    <SelectableDataTable
      columns={columns}
      data={graphs.data}
      rowSelection={rowSelection}
      setRowSelection={setRowSelection}
      rowIdFun={(row) => row.id}
    >
      No graphs.
    </SelectableDataTable>
  );
}
