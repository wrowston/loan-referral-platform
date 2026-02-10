import { Webhook } from "svix";
import { anyApi, httpActionGeneric, httpRouter } from "convex/server";

const http = httpRouter();

http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: httpActionGeneric(async (ctx, request) => {
    const secret = process.env.CLERK_WEBHOOK_SECRET;
    if (!secret) {
      return new Response("Missing CLERK_WEBHOOK_SECRET", { status: 500 });
    }

    const payload = await request.text();
    const headers = request.headers;
    const svixId = headers.get("svix-id");
    const svixTimestamp = headers.get("svix-timestamp");
    const svixSignature = headers.get("svix-signature");

    if (!svixId || !svixTimestamp || !svixSignature) {
      return new Response("Missing Svix headers", { status: 400 });
    }

    let event: Record<string, unknown>;
    try {
      event = new Webhook(secret).verify(payload, {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      }) as Record<string, unknown>;
    } catch {
      return new Response("Invalid signature", { status: 400 });
    }

    const type = event.type as string;
    const data = event.data as Record<string, unknown>;

    if (type === "user.deleted") {
      const clerkId = data.id as string;
      await ctx.runMutation(anyApi.users.deleteFromClerk, { clerkId });
      return new Response("ok", { status: 200 });
    }

    if (type === "user.created" || type === "user.updated") {
      const clerkId = data.id as string;
      const emailAddress = (data.email_addresses as Array<{ email_address: string }> | undefined)?.[0]
        ?.email_address;
      const firstName = (data.first_name as string | undefined) ?? "";
      const lastName = (data.last_name as string | undefined) ?? "";
      const role = (data.public_metadata as { role?: "partner" | "borrower" | "admin" } | undefined)
        ?.role;

      await ctx.runMutation(anyApi.users.upsertFromClerk, {
        clerkId,
        email: emailAddress ?? "",
        name: `${firstName} ${lastName}`.trim(),
        role,
      });
      return new Response("ok", { status: 200 });
    }

    return new Response("ignored", { status: 200 });
  }),
});

export default http;
