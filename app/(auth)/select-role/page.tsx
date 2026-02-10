"use client";

import { OrganizationList } from "@clerk/nextjs";

export default function SelectRolePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1 text-center">
        <h1 className="text-xl font-semibold">Join your organization</h1>
        <p className="text-sm text-muted-foreground">
          Accept a pending invitation or contact your admin to get access.
        </p>
      </div>

      <OrganizationList
        hidePersonal
        afterSelectOrganizationUrl="/"
        afterCreateOrganizationUrl="/"
      />
    </div>
  );
}
