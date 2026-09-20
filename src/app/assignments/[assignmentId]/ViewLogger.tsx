"use client";

import { useEffect } from "react";
import { logAssignmentViewed } from "@/lib/actions/submissions";

export function ViewLogger({ assignmentId, sawFeedback }: { assignmentId: string; sawFeedback: boolean }) {
  useEffect(() => {
    void logAssignmentViewed(assignmentId, sawFeedback);
  }, [assignmentId, sawFeedback]);

  return null;
}
