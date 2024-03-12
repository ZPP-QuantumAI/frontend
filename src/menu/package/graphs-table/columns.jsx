import { Button, SortableColumnButton } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export const columns = [
  {
    id: "select",
    header: "Select",
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
