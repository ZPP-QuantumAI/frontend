import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const SortableColumnButton = ({ column, children }) => (
  <Button
    variant="ghost"
    type="button"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    {children}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
);
