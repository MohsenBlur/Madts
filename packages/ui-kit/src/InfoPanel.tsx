import * as React from "react";
import { Info } from "lucide-react";
import { cn } from "./cn";

export interface InfoPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

export function InfoPanel({ title, description, className, children, ...props }: InfoPanelProps): React.ReactElement {
  return (
    <div className={cn("rounded-md border bg-muted p-4", className)} {...props}>
      <div className="flex items-start gap-2">
        <Info className="h-5 w-5 text-muted-foreground" />
        <div className="space-y-1">
          {title && <h4 className="text-sm font-medium">{title}</h4>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}
