import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PreviewGraph } from "@/reusable/table/PreviewGraph";
import { SortableColumnButton } from "@/reusable/table/button";
import { SelectColumnCheckBox } from "@/reusable/table/checkbox";
import { Trash2 } from "lucide-react";

export const columns = [
  {
    id: "select",
    header: ({ table }) => <SelectColumnCheckBox table={table} />,
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onClick={row.getToggleSelectedHandler()}
      />
    ),
  },
  {
    accessorKey: "graph.name",
    header: ({ column }) => (
      <SortableColumnButton column={column}>Name</SortableColumnButton>
    ),
    cell: ({ row }) => <PreviewGraph row={row.original}></PreviewGraph>,
  },
  {
    accessorKey: "graph.nodes.length",
    header: ({ column }) => (
      <SortableColumnButton column={column}>
        Number of nodes
      </SortableColumnButton>
    ),
  },
  {
    accessorKey: "graphType",
    header: ({ column }) => (
      <SortableColumnButton column={column}>Type</SortableColumnButton>
    ),
  },
  {
    id: "delete",
    header: "Delete",
    cell: ({ row, table }) => (
      <Button
        type="button"
        variant="destructive"
        checked={row.getIsSelected()}
        onClick={async () => {
          table.options.meta.deleteRow(row);
        }}
      >
        <Trash2 />
      </Button>
    ),
  },
];
