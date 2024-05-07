import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CellWithDescription } from "@/reusable/table/CellWithDescription";
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
    cell: ({ row }) => CellWithDescription(row.original),
  },
  {
    accessorKey: "graphIds.length",
    header: ({ column }) => (
      <SortableColumnButton column={column}>
        Number of graphs
      </SortableColumnButton>
    ),
  },
  {
    id: "delete",
    header: "Delete",
    cell: ({ row, table }) => (
      <Button
        type="button"
        variant="destructive"
        className="text-black"
        checked={row.getIsSelected()}
        onClick={async () => {
          table.options.meta.deleteRow(row);
        }}
      >
        X
      </Button>
    ),
  },
];
