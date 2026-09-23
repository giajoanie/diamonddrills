import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { PerformanceIndicator } from "@/generated/prisma/client";

/**
 * PIs to review for a given roleplay event, grouped by tier label (Core,
 * Cluster, "Pathway: <name>", or Standards for Personal Financial Literacy,
 * which isn't part of MBA Research's tier system at all).
 *
 * Per the source PI PDFs: Tier 1 (Core) always applies, drawn from the
 * Business Administration Core bank regardless of the event's own exam
 * bank; Tier 2 (Cluster) is the event's own exam bank; Tier 3 (Pathway)
 * only when the event names one (Event.roleplayPathway). A Principles
 * event's examBankId already points at the BA Core bank itself, so it
 * naturally ends up Core-only (there's no Cluster/Pathway content stored
 * there) without any special-casing here.
 */
export const getPerformanceIndicatorsForEvent = cache(
  async (examBankId: string, roleplayPathway: string | null) => {
    const bacBank = await prisma.examBank.findUnique({
      where: { slug: "business-administration-core" },
    });

    const rows: PerformanceIndicator[] = [];
    if (bacBank && bacBank.id !== examBankId) {
      rows.push(
        ...(await prisma.performanceIndicator.findMany({
          where: { examBankId: bacBank.id, tier: "Core" },
        })),
      );
    }
    rows.push(
      ...(await prisma.performanceIndicator.findMany({
        where: {
          examBankId,
          OR: [
            { tier: { in: ["Core", "Cluster", "Standards"] } },
            ...(roleplayPathway ? [{ tier: "Pathway" as const, pathway: roleplayPathway }] : []),
          ],
        },
      })),
    );

    rows.sort(
      (a, b) =>
        a.tier.localeCompare(b.tier) ||
        a.instructionalArea.localeCompare(b.instructionalArea) ||
        (a.code ?? "").localeCompare(b.code ?? ""),
    );

    const grouped = new Map<string, PerformanceIndicator[]>();
    for (const row of rows) {
      const key = row.tier === "Pathway" ? `Pathway: ${row.pathway}` : row.tier;
      const existing = grouped.get(key);
      if (existing) existing.push(row);
      else grouped.set(key, [row]);
    }
    // Core first, then Cluster, then Pathway, then Standards — a fixed
    // reading order rather than the incidental Map insertion order.
    const tierOrder = ["Core", "Cluster", "Standards"];
    return new Map(
      [...grouped.entries()].sort(([a], [b]) => {
        const ai = tierOrder.indexOf(a);
        const bi = tierOrder.indexOf(b);
        return (ai === -1 ? tierOrder.length : ai) - (bi === -1 ? tierOrder.length : bi);
      }),
    );
  },
);

/**
 * PIs narrowed to the specific instructional area(s) NorCal's district
 * table names for one event's roleplay scenario(s) — see
 * src/lib/norcal-district-areas.ts. Searches the event's own exam bank plus
 * the BA Core bank (same reasoning as getPerformanceIndicatorsForEvent: a
 * Core-tier area lives only in the BA Core bank). Matches by `contains`
 * rather than equality so PFL's roman-numeral-prefixed topic names (e.g.
 * "VI. Managing Risk") still match a plain "Managing Risk" area name.
 */
export const getNorCalPrepForEvent = cache(
  async (examBankId: string, areaName: string): Promise<PerformanceIndicator[]> => {
    const bacBank = await prisma.examBank.findUnique({
      where: { slug: "business-administration-core" },
    });
    const bankIds = [examBankId, ...(bacBank && bacBank.id !== examBankId ? [bacBank.id] : [])];

    const rows = await prisma.performanceIndicator.findMany({
      where: {
        examBankId: { in: bankIds },
        instructionalArea: { contains: areaName, mode: "insensitive" },
      },
    });

    rows.sort((a, b) => a.tier.localeCompare(b.tier) || (a.code ?? "").localeCompare(b.code ?? ""));
    return rows;
  },
);
