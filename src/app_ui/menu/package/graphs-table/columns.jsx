import { Checkbox } from "@/components/ui/checkbox";
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
    accessorKey: "name",
    header: ({ column }) => (
      <SortableColumnButton column={column}>Name</SortableColumnButton>
    ),
  },
  {
    accessorKey: "nodes.length",
    header: ({ column }) => (
      <SortableColumnButton column={column}>
        Number of nodes
      </SortableColumnButton>
    ),
  },
];
