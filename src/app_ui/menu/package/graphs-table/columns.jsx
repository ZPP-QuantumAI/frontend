import { Checkbox } from "@/components/ui/checkbox";
import { PreviewGraph } from "@/reusable/table/PreviewGraph";
import { SortableColumnButton } from "@/reusable/table/button";
import { SelectColumnCheckBox } from "@/reusable/table/checkbox";

export const columns = [
  {
    id: "select",
    header: ({ table }) => <SelectColumnCheckBox table={table} />,
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
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
];
