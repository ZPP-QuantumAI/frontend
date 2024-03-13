import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

export const RowWithDescription = ({ name, description }) =>
  description ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {name}
          <Info size={15} className="ml-1 inline" />
        </TooltipTrigger>
        <TooltipContent>
          <div className="max-w-80 text-pretty">{description}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    name
  );
