import { Check, Loader2, X } from "lucide-react";

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
    accessorKey: "solutionId",
    header: "Solution id",
  },
  {
    accessorKey: "graphPackage.name",
    header: "Package name",
  },
  {
    accessorKey: "graphPackage.graphIds.length",
    header: "Number of graphs",
  },
  {
    id: "totalRuntime",
    header: "Total runtime",
    cell: ({ row }) => row.original.grades.reduce((a,v) => a = a + v.runtimeInMs, 0) + " ms"
  },
];
