type CsvRecord = Record<string, string | number | boolean | null | undefined>;

function escapeCsvValue(value: CsvRecord[string]) {
  const normalized = value == null ? "" : String(value);
  if (normalized.includes(",") || normalized.includes("\"") || normalized.includes("\n")) {
    return `"${normalized.replaceAll("\"", "\"\"")}"`;
  }
  return normalized;
}

export function toCsv(rows: CsvRecord[]): string {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const head = headers.join(",");
  const body = rows
    .map((row) => headers.map((header) => escapeCsvValue(row[header])).join(","))
    .join("\n");
  return `${head}\n${body}`;
}

export function downloadCsv(filename: string, rows: CsvRecord[]) {
  const csv = toCsv(rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
