import { columns } from "./columns";
import { useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import { deleteReq, get } from "@/lib/requests";
import { SelectableDataTable } from "@/reusable/table/SelectableDataTable";

export function GraphsTable({ value, onChange }) {
  const [rowSelection, setRowSelectionLocal] = useState(value);
  const queryClient = useQueryClient();

  async function deleteGraph(row) {
    row.toggleSelected(false);
    await deleteReq(`/graph/?graphId=${row.id}`);
    queryClient.invalidateQueries({ queryKey: ["graphs"] });
  }

  function setRowSelection(selection) {
    setRowSelectionLocal(selection);
    onChange(rowSelection);
  }

  const graphs = useQuery(
    "graphs",
    async () => {
      return await get("/graph/all/new");
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
      rowIdFun={(row) => row.graph.id}
      meta={{ deleteRow: deleteGraph }}
    >
      No graphs.
    </SelectableDataTable>
  );
}
