import React from "react";
import { Badge } from "@/components/ui/badge";
import { getStatusBadgeMeta, getPriorityBadgeMeta } from "@/utils/constants";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const meta = getStatusBadgeMeta(status);
  return (
    <Badge
      variant="outline"
      className={`text-xs font-medium ${meta.badgeClass}`}
    >
       Status: {meta.badgeLabel}
    </Badge>
  );
}

interface PriorityBadgeProps {
  priority: string;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const meta = getPriorityBadgeMeta(priority);
  return (
    <Badge
      variant="outline"
      className={`text-xs font-medium ${meta.badgeClass}`}
    >
      Priority : {meta.badgeLabel}
    </Badge>
  );
}