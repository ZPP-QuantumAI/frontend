import { Button } from "@/components/ui/button";
import { CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
    accessorKey: "graphPackage.name",
    header: "Package name",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>{row.original.graphPackage.name}</TooltipTrigger>
          <TooltipContent>
            <div className="max-w-80 text-pretty">{row.original.graphPackage.description}</div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "graphPackage.graphIds.length",
    header: "Number of graphs",
  },
  {
    accessorKey: "runtimeInMs",
    header: "Total runtime",
    cell: ({ row }) => row.getValue("runtimeInMs") ? row.getValue("runtimeInMs") + " ms" : row.getValue("runtimeInMs")
  },
  {
    id: "expand",
    header: "Expand",
    cell: () => (
      <CollapsibleTrigger className="data-[state=open]:rotate-180" asChild>
        <Button variant="ghost"><ChevronDown className="h-4 w-4 shrink-0" /></Button>
      </CollapsibleTrigger>
    ),
  },
];
