import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const getFlashcardsForCluster = cache(async (clusterId: string) => {
  return prisma.flashcard.findMany({
    where: { clusterId },
    orderBy: { term: "asc" },
  });
});
