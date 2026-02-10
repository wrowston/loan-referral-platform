import { z } from "zod";
import {
  DEAL_STATUSES,
  PARTNER_TIERS,
  PROPERTY_TYPES,
  TRANSACTION_TYPES,
} from "@/lib/constants";

export const dealSubmissionSchema = z.object({
  propertyType: z.enum(PROPERTY_TYPES),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().length(2),
  zip: z.string().min(5).max(10),
  lat: z.number().optional(),
  lng: z.number().optional(),
  loanAmountCents: z.number().int().positive(),
  transactionType: z.enum(TRANSACTION_TYPES),
  notes: z.string().max(2000).optional(),
  borrowerFirstName: z.string().min(1),
  borrowerLastName: z.string().min(1),
  borrowerEmail: z.email(),
  borrowerPhone: z.string().min(10),
});

export const partnerProfileSchema = z.object({
  company: z.string().min(2),
  phone: z.string().min(10),
  tier: z.enum(PARTNER_TIERS).optional(),
});

export const statusUpdateSchema = z.object({
  toStatus: z.enum(DEAL_STATUSES),
  reason: z.string().max(500).optional(),
});

export type DealSubmissionInput = z.infer<typeof dealSubmissionSchema>;
