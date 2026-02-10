export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata?: {
      role?: "partner" | "borrower" | "admin";
    };
  }
}
