import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const role = v.union(v.literal("partner"), v.literal("borrower"), v.literal("admin"));
const partnerTier = v.union(
  v.literal("bronze"),
  v.literal("silver"),
  v.literal("gold"),
  v.literal("platinum"),
);
const dealStatus = v.union(
  v.literal("submitted"),
  v.literal("in_review"),
  v.literal("accepted"),
  v.literal("in_progress"),
  v.literal("closing"),
  v.literal("closed"),
  v.literal("declined"),
);
const commissionStatus = v.union(v.literal("pending"), v.literal("earned"), v.literal("paid"));
const resourceType = v.union(
  v.literal("document"),
  v.literal("video"),
  v.literal("link"),
  v.literal("guide"),
);

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    role,
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_email", ["email"])
    .index("by_role", ["role"]),

  partners: defineTable({
    userId: v.id("users"),
    clerkId: v.optional(v.string()),
    company: v.string(),
    phone: v.string(),
    tier: partnerTier,
    isActive: v.boolean(),
    totalDeals: v.number(),
    totalCommissionCents: v.number(),
    pendingCommissionCents: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_clerkId", ["clerkId"]),

  borrowers: defineTable({
    userId: v.optional(v.id("users")),
    clerkId: v.optional(v.string()),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    inviteSent: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_clerkId", ["clerkId"]),

  deals: defineTable({
    partnerId: v.id("partners"),
    borrowerId: v.id("borrowers"),
    lenderId: v.optional(v.id("lenders")),
    dealNumber: v.string(),
    propertyType: v.string(),
    address: v.string(),
    city: v.string(),
    state: v.string(),
    zip: v.string(),
    lat: v.optional(v.number()),
    lng: v.optional(v.number()),
    loanAmountCents: v.number(),
    transactionType: v.string(),
    status: dealStatus,
    declineReason: v.optional(v.string()),
    notes: v.optional(v.string()),
    attachments: v.array(v.object({ storageId: v.id("_storage"), name: v.string() })),
    createdBy: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_partnerId", ["partnerId"])
    .index("by_borrowerId", ["borrowerId"])
    .index("by_status", ["status"])
    .index("by_dealNumber", ["dealNumber"])
    .index("by_status_createdAt", ["status", "createdAt"]),

  lenders: defineTable({
    name: v.string(),
    contactName: v.optional(v.string()),
    contactEmail: v.optional(v.string()),
    contactPhone: v.optional(v.string()),
    loanTypes: v.array(v.string()),
    propertyTypes: v.array(v.string()),
    states: v.array(v.string()),
    minLoanAmountCents: v.optional(v.number()),
    maxLoanAmountCents: v.optional(v.number()),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_name", ["name"])
    .index("by_isActive", ["isActive"]),

  commissions: defineTable({
    dealId: v.id("deals"),
    partnerId: v.id("partners"),
    amountCents: v.number(),
    status: commissionStatus,
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_dealId", ["dealId"])
    .index("by_partnerId", ["partnerId"])
    .index("by_status", ["status"])
    .index("by_partnerId_status", ["partnerId", "status"]),

  internalNotes: defineTable({
    dealId: v.id("deals"),
    authorId: v.id("users"),
    content: v.string(),
    createdAt: v.number(),
  }).index("by_dealId", ["dealId"]),

  statusHistory: defineTable({
    dealId: v.id("deals"),
    fromStatus: v.optional(dealStatus),
    toStatus: dealStatus,
    changedBy: v.id("users"),
    createdAt: v.number(),
  }).index("by_dealId", ["dealId"]),

  resources: defineTable({
    title: v.string(),
    category: v.string(),
    type: resourceType,
    url: v.optional(v.string()),
    storageId: v.optional(v.id("_storage")),
    isPublished: v.boolean(),
    sortOrder: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_category_isPublished", ["category", "isPublished"]),
});
