"use client";

import { useState } from "react";
import { AddressAutocomplete } from "@/components/shared/AddressAutocomplete";
import { CurrencyInput } from "@/components/shared/CurrencyInput";
import { FileUpload } from "@/components/shared/FileUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PROPERTY_TYPES, TRANSACTION_TYPES } from "@/lib/constants";
import { useRouter } from "next/navigation";

export default function NewDealPage() {
  const router = useRouter();
  const [loanAmountCents, setLoanAmountCents] = useState(0);
  const [address, setAddress] = useState("");
  const [propertyType, setPropertyType] = useState<string>(PROPERTY_TYPES[0]);
  const [transactionType, setTransactionType] = useState<string>(TRANSACTION_TYPES[0]);

  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle>Submit Deal</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            router.push("/partner/deals");
          }}
        >
          <div className="grid gap-2">
            <Label>Property Type</Label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PROPERTY_TYPES.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item.replaceAll("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Address</Label>
            <AddressAutocomplete value={address} onChange={setAddress} />
          </div>

          <div className="grid gap-2">
            <Label>Loan Amount</Label>
            <CurrencyInput valueCents={loanAmountCents} onChangeCents={setLoanAmountCents} />
          </div>

          <div className="grid gap-2">
            <Label>Transaction Type</Label>
            <Select value={transactionType} onValueChange={setTransactionType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TRANSACTION_TYPES.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2 md:grid-cols-2">
            <div className="grid gap-2">
              <Label>Borrower First Name</Label>
              <Input required />
            </div>
            <div className="grid gap-2">
              <Label>Borrower Last Name</Label>
              <Input required />
            </div>
          </div>

          <div className="grid gap-2 md:grid-cols-2">
            <div className="grid gap-2">
              <Label>Borrower Email</Label>
              <Input type="email" required />
            </div>
            <div className="grid gap-2">
              <Label>Borrower Phone</Label>
              <Input required />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Attachments</Label>
            <FileUpload onUploaded={() => undefined} />
          </div>

          <Button type="submit">Submit Deal</Button>
        </form>
      </CardContent>
    </Card>
  );
}
