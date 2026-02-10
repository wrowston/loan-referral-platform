import type { UserRole } from "@/lib/constants";

/**
 * Maps a Clerk org role string (e.g. "org:admin") to our app-level role.
 */
const ORG_ROLE_MAP: Record<string, UserRole> = {
  "org:admin": "admin",
  "org:partner": "partner",
  "org:borrower": "borrower",
};

export function getAppRole(orgRole: string | undefined | null): UserRole | null {
  if (!orgRole) return null;
  return ORG_ROLE_MAP[orgRole] ?? null;
}

export function hasRole(orgRole: string | undefined | null, expected: UserRole): boolean {
  return getAppRole(orgRole) === expected;
}

export function getDashboardPath(orgRole: string | undefined | null): string {
  const role = getAppRole(orgRole);
  switch (role) {
    case "admin":
      return "/admin";
    case "partner":
      return "/partner";
    case "borrower":
      return "/borrower";
    default:
      return "/";
  }
}
