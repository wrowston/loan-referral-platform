import type { UserRole } from "@/lib/constants";

export function getRoleFromClaims(metadata: unknown): UserRole | null {
  if (typeof metadata !== "object" || metadata === null) return null;
  const role = (metadata as { role?: string }).role;
  if (role === "partner" || role === "borrower" || role === "admin") {
    return role;
  }
  return null;
}

export function hasRole(role: UserRole | null, expected: UserRole): boolean {
  return role === expected;
}
