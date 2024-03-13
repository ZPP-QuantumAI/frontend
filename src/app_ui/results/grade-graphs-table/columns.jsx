import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CellWithDescription } from "@/reusable/table/CellWithDescription";
import { SortableColumnButton } from "@/reusable/table/button";
import { Check, Info, Loader2, X } from "lucide-react";

export const columns = (setResult) => [
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
    accessorKey: "graphName",
    header: ({ column }) => (
      <SortableColumnButton column={column}>Graph name</SortableColumnButton>
    ),
  },
  {
    accessorKey: "runtimeInMs",
    header: ({ column }) => (
      <SortableColumnButton column={column}>Runtime</SortableColumnButton>
    ),
    cell: ({ row }) => {
      return row.getValue("runtimeInMs")
        ? row.getValue("runtimeInMs") + " ms"
        : row.getValue("runtimeInMs");
    },
  },
  {
    accessorKey: "result.sumOfWeights",
    header: ({ column }) => (
      <SortableColumnButton column={column}>Distance</SortableColumnButton>
    ),
    cell: ({ row }) => row.original.result?.sumOfWeights?.toFixed(2),
  },
  {
    id: "error",
    header: "Error info",
    cell: ({ row }) =>
      typeof row.original.result === "string" ? row.original.result : undefined,
  },
  {
    accessorKey: "result",
    header: "Show",
    cell: ({ row }) => {
      return row.getValue("status") === "SUCCESS" ? (
        <Button className="w-full" onClick={() => setResult(row.original)}>Show</Button>
      ) : row.getValue("status") === "FAILED" ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="bg-red-800 opacity-50 h-10 px-4 py-2 text-primary-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors">
                Error
                <Info size={15} className="ml-1 inline" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="max-w-80 text-pretty">{row.original.result}</div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <Button disabled>Show</Button>
      );
    },
  },
];
