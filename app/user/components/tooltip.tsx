import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { CircleHelp } from "lucide-react";

export interface InfoTooltipProps {
  title?: string;
  description?: React.ReactNode;
  icon?: any;
  className?: string;
}

export function InfoTooltip({
  title,
  description,
  icon: Icon = CircleHelp,
  className,
}: InfoTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="link"
          size="sm"
          className="!p-0.5 !h-fit"
          aria-label="Información adicional"
        >
          <Icon size={16} />
        </Button>
      </TooltipTrigger>
      <TooltipContent className={cn("py-3 max-w-[320px]", className)}>
        <div className="space-y-1">
          {title && <p className="text-[13px] font-medium">{title}</p>}
          <p className="text-muted-foreground text-xs">{description}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
