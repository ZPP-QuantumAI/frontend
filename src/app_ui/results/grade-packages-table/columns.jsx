import { Button } from "@/components/ui/button";
import { CollapsibleTrigger } from "@/components/ui/collapsible";
import { RowWithDescription } from "@/reusable/table/RowWithDescription";
import { SortableColumnButton } from "@/reusable/table/button";
import { Check, ChevronDown, Loader2, X } from "lucide-react";

export const columns = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      switch (row.getValue("status")) {
        case "SUCCESS":
          return <Check className="text-green-500" />;
        case "FAILED":
          return <X className="text-red-500" />;
        case "WAITING":
          return <Loader2 className="animate-spin" />;
        default:
          return row.getValue("status");
      }
    },
  },
  {
    accessorKey: "algorithmName",
    header: ({ column }) => (
      <SortableColumnButton column={column}>
        Algorithm name
      </SortableColumnButton>
    ),
  },
  {
    accessorKey: "graphPackage.name",
    header: ({ column }) => (
      <SortableColumnButton column={column}>Package name</SortableColumnButton>
    ),
    cell: ({ row }) => RowWithDescription(row.original.graphPackage),
  },
  {
    accessorKey: "graphPackage.graphIds.length",
    header: ({ column }) => (
      <SortableColumnButton column={column}>
        Number of graphs
      </SortableColumnButton>
    ),
  },
  {
    accessorKey: "runtimeInMs",
    header: ({ column }) => (
      <SortableColumnButton column={column}>Total runtime</SortableColumnButton>
    ),
    cell: ({ row }) =>
      row.getValue("runtimeInMs")
        ? row.getValue("runtimeInMs") + " ms"
        : row.getValue("runtimeInMs"),
  },
  {
    accessorKey: "finalGrade.finalGrade.sumOfWeights",
    header: ({ column }) => (
      <SortableColumnButton column={column}>
        Total distance
      </SortableColumnButton>
    ),
    cell: ({ row }) =>
      row.original.finalGrade?.finalGrade?.sumOfWeights?.toFixed(2),
  },
  {
    id: "expand",
    header: "Expand",
    cell: () => (
      <CollapsibleTrigger className="data-[state=open]:rotate-180" asChild>
        <Button variant="ghost">
          <ChevronDown className="h-4 w-4 shrink-0" />
        </Button>
      </CollapsibleTrigger>
    ),
  },
];
