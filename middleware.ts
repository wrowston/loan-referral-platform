import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPartnerRoute = createRouteMatcher(["/partner(.*)"]);
const isBorrowerRoute = createRouteMatcher(["/borrower(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isDashboardRoute = createRouteMatcher(["/partner(.*)", "/borrower(.*)", "/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isDashboardRoute(req)) {
    await auth.protect();
  }

  const { sessionClaims, userId } = await auth();
  const role = (sessionClaims?.metadata as { role?: string } | undefined)?.role;

  // Signed-in user without a role trying to access a dashboard → pick a role first
  if (isDashboardRoute(req) && userId && !role) {
    return NextResponse.redirect(new URL("/select-role", req.url));
  }

  if (isPartnerRoute(req) && role !== "partner" && role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (isBorrowerRoute(req) && role !== "borrower" && role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (isAdminRoute(req) && role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
