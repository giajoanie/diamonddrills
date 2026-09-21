/** Resource search (spec §11, Tier 3): case-insensitive keyword match on name or description. */
export function matchesSearchQuery(resource: { name: string; description: string | null }, query: string): boolean {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return true;

  return (
    resource.name.toLowerCase().includes(trimmed) ||
    (resource.description?.toLowerCase().includes(trimmed) ?? false)
  );
}
