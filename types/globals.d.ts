export {};

declare global {
  interface ClerkAuthorization {
    role: "org:admin" | "org:partner" | "org:borrower";
    permission:
      | "org:sys_profile:manage"
      | "org:sys_profile:delete"
      | "org:sys_memberships:read"
      | "org:sys_memberships:manage"
      | "org:sys_domains:read"
      | "org:sys_domains:manage"
      | "org:sys_billing:read"
      | "org:sys_billing:manage";
  }
}
