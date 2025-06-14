
import React from "react";

/**
 * Props:
 * - applicants: Array of objects, each with:
 *   - application_id: string
 *   - flags: Array<boolean>
 *   - childcare_hours_requested: number
 *   - household_income: number
 */
type Applicant = {
  application_id: string;
  flags: boolean[];
  childcare_hours_requested: number;
  household_income: number;
};

interface SummaryPartProps {
  applicants: Applicant[];
}

const SummaryPart: React.FC<SummaryPartProps> = ({ applicants }) => {
  // Only flagged applicants: at least one `true` in flags array
  const flagged = applicants?.filter(
    (a) => Array.isArray(a.flags) && a.flags.some((f) => f === true)
  );

  if (!flagged || flagged.length === 0) {
    return (
      <section className="bg-card rounded-lg p-4 border border-border mb-4">
        <h3 className="font-semibold text-base mb-2">Summary of Applicant:</h3>
        <p className="text-muted-foreground">No flagged cases found.</p>
      </section>
    );
  }

  return (
    <section className="bg-card rounded-lg p-4 border border-border mb-4">
      <h3 className="font-semibold text-base mb-2">Summary of Applicant:</h3>
      <ul className="space-y-1">
        {flagged.map((a) => (
          <li key={a.application_id} className="text-sm">
            - ID: {a.application_id} | Flags: {a.flags.filter(Boolean).length} | Childcare Hours: {a.childcare_hours_requested} | Income: $
            {typeof a.household_income === "number"
              ? a.household_income.toLocaleString()
              : a.household_income}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SummaryPart;

