
import React from "react";

type Applicant = {
  application_id: string;
  flags: boolean[];
  childcare_hours_requested: number;
  household_income: number;
};

interface SummaryPartProps {
  selectedApplicant?: Applicant | null;
}

const SummaryPart: React.FC<SummaryPartProps> = ({ selectedApplicant }) => {
  if (!selectedApplicant) {
    return (
      <section className="bg-card rounded-xl border border-border p-6 mb-4 text-center text-muted-foreground">
        Please select an applicant to view their summary.
      </section>
    );
  }

  const {
    application_id,
    flags,
    childcare_hours_requested,
    household_income,
  } = selectedApplicant;

  const flaggedCount = Array.isArray(flags)
    ? flags.filter(Boolean).length
    : 0;

  return (
    <section className="bg-card rounded-xl border border-border p-6 mb-4">
      <h2 className="text-lg font-semibold mb-4">Applicant Summary</h2>
      <dl className="grid grid-cols-1 gap-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="font-medium text-muted-foreground">Applicant ID</dt>
          <dd className="text-primary">{application_id}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium text-muted-foreground">Number of flagged issues</dt>
          <dd className="text-primary">{flaggedCount}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium text-muted-foreground">Childcare hours requested</dt>
          <dd className="text-primary">{childcare_hours_requested}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium text-muted-foreground">Household income</dt>
          <dd className="text-primary">{household_income}</dd>
        </div>
      </dl>
    </section>
  );
};

export default SummaryPart;
