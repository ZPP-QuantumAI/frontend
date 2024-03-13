import { Button } from "@/components/ui/button";
import { SortableColumnButton } from "@/reusable/table/button";
import { Check, Loader2, X } from "lucide-react";

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
      return row.getValue("status") != "SUCCESS" ? (
        <Button disabled>Show</Button>
      ) : (
        <Button onClick={() => setResult(row.original)}>Show</Button>
      );
    },
  },
];
