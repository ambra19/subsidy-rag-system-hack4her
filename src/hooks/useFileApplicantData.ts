
import { useState, useCallback } from "react";

type ApplicantRaw = Record<string, string | number | boolean>;
type FlaggedApplicant = {
  application_id: string;
  childcare_hours_requested: number;
  household_income: string;
  flagCount: number;
};

function parseCsv(csv: string): ApplicantRaw[] {
  // Parse CSV to array of objects using first row as keys
  const lines = csv.trim().split("\n").filter(line => !!line.trim());
  if (lines.length < 2) return [];
  const header = lines[0].split(",").map(h => h.trim());
  return lines.slice(1).map(line => {
    const vals = line.split(",").map(val => val.trim());
    const obj: ApplicantRaw = {};
    header.forEach((key, i) => {
      let v: any = vals[i] ?? "";
      // Try to auto-convert numbers/booleans
      if (v === "true" || v === "TRUE") v = true;
      else if (v === "false" || v === "FALSE") v = false;
      else if (!isNaN(Number(v)) && v !== "") v = Number(v);
      obj[key] = v;
    });
    return obj;
  });
}

// Find flagged cases and collect fields as specified
function extractFlaggedApplicants(data: ApplicantRaw[]): FlaggedApplicant[] {
  // Assume flag columns are named like flag_1, flag_2, etc and are boolean
  // The applicant id can be application_id or Application ID field
  return data
    .map(row => {
      const id =
        (row["application_id"] as string) ||
        (row["Application ID"] as string) ||
        "";
      const childcare_hours =
        Number(row["childcare_hours_requested"] ?? row["Childcare Hours"] ?? 0);
      const income =
        row["household_income"] ||
        row["Household Income"] ||
        "";

      // Count boolean flags
      const flagFields = Object.keys(row).filter((k) =>
        /^flag_/i.test(k) && typeof row[k] === "boolean"
      );
      const flagCount = flagFields.reduce(
        (acc, k) => acc + ((row[k] === true) ? 1 : 0),
        0
      );

      return {
        application_id: id,
        childcare_hours_requested: childcare_hours,
        household_income: typeof income === "number" ? `$${income.toLocaleString()}` : String(income),
        flagCount,
      };
    })
    .filter((a) => a.flagCount > 0 && a.application_id);
}

export function useFileApplicantData() {
  const [flagged, setFlagged] = useState<FlaggedApplicant[] | null>(null);
  const [raw, setRaw] = useState<ApplicantRaw[] | null>(null);

  const processFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || "");
      const data = parseCsv(text);
      setRaw(data);
      setFlagged(extractFlaggedApplicants(data));
    };
    reader.readAsText(file);
  }, []);

  const resetData = useCallback(() => {
    setFlagged(null);
    setRaw(null);
  }, []);

  return { flagged, raw, processFile, resetData };
}
