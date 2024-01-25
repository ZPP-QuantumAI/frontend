import { API_URL } from "@/constants";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useQuery } from "react-query";
import { useState } from "react";

export function GraphsTable({value, onChange}) {
    const [rowSelection, setRowSelectionLocal] = useState(value);

    function setRowSelection(selection) {
        setRowSelectionLocal(selection);
        onChange(rowSelection);
    }

  const graphs = useQuery(
    "graphs",
    async () => {
      let result = await fetch(`${API_URL}/graph/all`);
      result = await result.json();
      return result;
    },
    {
      initialData: [],
    }
  );
  return <DataTable columns={columns} data={graphs.data} rowSelection={rowSelection} setRowSelection={setRowSelection} />;
}
