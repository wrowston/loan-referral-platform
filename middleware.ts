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

  const { orgRole, orgId, userId } = await auth();

  // Signed-in user without an active org → they need to be invited to one
  if (isDashboardRoute(req) && userId && !orgId) {
    return NextResponse.redirect(new URL("/select-role", req.url));
  }

  // Enforce role-based route access
  if (isAdminRoute(req) && orgRole !== "org:admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (isPartnerRoute(req) && orgRole !== "org:partner" && orgRole !== "org:admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (isBorrowerRoute(req) && orgRole !== "org:borrower" && orgRole !== "org:admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
