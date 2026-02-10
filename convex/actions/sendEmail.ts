"use node";

import { actionGeneric, anyApi } from "convex/server";
import { v } from "convex/values";
import { Resend } from "resend";
import {
  commissionEarnedTemplate,
  dealSubmittedTemplate,
  statusChangedTemplate,
} from "../lib/emailTemplates";

export const sendEmail = actionGeneric({
  args: {
    trigger: v.union(
      v.literal("deal_submitted"),
      v.literal("status_changed"),
      v.literal("commission_earned"),
    ),
    dealId: v.id("deals"),
    amountCents: v.optional(v.number()),
  },
  handler: async (ctx, { trigger, dealId, amountCents }) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return { ok: false, reason: "missing_api_key" };

    const payload = await ctx.runQuery(anyApi.actionsHelpers.getDealForAction, { dealId });
    if (!payload || !payload.partner || !payload.borrower) {
      return { ok: false, reason: "missing_deal_data" };
    }

    const dealNumber = payload.deal.dealNumber;
    const resend = new Resend(apiKey);

    let template: { subject: string; html: string };
    if (trigger === "deal_submitted") {
      template = dealSubmittedTemplate(dealNumber);
    } else if (trigger === "status_changed") {
      template = statusChangedTemplate(dealNumber, payload.deal.status);
    } else {
      template = commissionEarnedTemplate(dealNumber, amountCents ?? 0);
    }

    await resend.emails.send({
      from: "Loan Platform <notifications@updates.example.com>",
      to: [payload.borrower.email],
      subject: template.subject,
      html: template.html,
    });

    return { ok: true };
  },
});
