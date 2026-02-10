export function dealSubmittedTemplate(dealNumber: string) {
  return {
    subject: `New deal submitted: ${dealNumber}`,
    html: `<p>A new deal has been submitted.</p><p><strong>Deal:</strong> ${dealNumber}</p>`,
  };
}

export function statusChangedTemplate(dealNumber: string, status: string) {
  return {
    subject: `Deal ${dealNumber} moved to ${status.replaceAll("_", " ")}`,
    html: `<p>Your deal status changed.</p><p><strong>${dealNumber}</strong> is now <strong>${status}</strong>.</p>`,
  };
}

export function commissionEarnedTemplate(dealNumber: string, amountCents: number) {
  const amount = (amountCents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  return {
    subject: `Commission earned for ${dealNumber}`,
    html: `<p>Commission earned.</p><p><strong>${dealNumber}</strong>: <strong>${amount}</strong></p>`,
  };
}
