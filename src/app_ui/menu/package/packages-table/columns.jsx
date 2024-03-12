import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>{row.getValue("name")}</TooltipTrigger>
          <TooltipContent>
            <div className="max-w-80 text-pretty">
              {row.original.description}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "graphIds.length",
    header: ({ column }) => (
      <SortableColumnButton column={column}>
        Number of graphs
      </SortableColumnButton>
    ),
  },
];
