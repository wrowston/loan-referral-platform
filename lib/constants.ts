export const USER_ROLES = ["partner", "borrower", "admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const PARTNER_TIERS = ["bronze", "silver", "gold", "platinum"] as const;
export type PartnerTier = (typeof PARTNER_TIERS)[number];

export const PROPERTY_TYPES = [
  "multifamily",
  "office",
  "retail",
  "industrial",
  "mixed_use",
  "land",
  "hospitality",
  "other",
] as const;
export type PropertyType = (typeof PROPERTY_TYPES)[number];

export const TRANSACTION_TYPES = [
  "purchase",
  "refinance",
  "construction",
  "bridge",
] as const;
export type TransactionType = (typeof TRANSACTION_TYPES)[number];

export const DEAL_STATUSES = [
  "submitted",
  "in_review",
  "accepted",
  "in_progress",
  "closing",
  "closed",
  "declined",
] as const;
export type DealStatus = (typeof DEAL_STATUSES)[number];

export const COMMISSION_STATUSES = ["pending", "earned", "paid"] as const;
export type CommissionStatus = (typeof COMMISSION_STATUSES)[number];

export const RESOURCE_CATEGORIES = [
  "lending_basics",
  "documents",
  "training",
  "market_updates",
] as const;

export const RESOURCE_TYPES = ["document", "video", "link", "guide"] as const;
