export function generateDealNumber(sequence: number): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const tail = String(sequence).padStart(4, "0");
  return `DL-${yyyy}${mm}${dd}-${tail}`;
}
