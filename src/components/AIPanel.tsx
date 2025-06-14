
import { Flag } from "lucide-react";

// Mock data for applicants, including some with no flags
const mockApplicants = [
  {
    application_id: "A024",
    flags: {
      "Missing: Employment proof": true,
      "High childcare hours requested": true,
      "Income discrepancy": false,
    },
    childcare_hours_requested: 125,
    household_income: 16897,
  },
  {
    application_id: "A025",
    flags: {
      "Missing: Employment proof": false,
      "High childcare hours requested": false,
      "Income discrepancy": false,
    },
    childcare_hours_requested: 40,
    household_income: 55000,
  },
  {
    application_id: "A027",
    flags: {
      "Missing: Employment proof": true,
      "High childcare hours requested": true,
      "Income discrepancy": true,
    },
    childcare_hours_requested: 55,
    household_income: 47560,
  },
  {
    application_id: "A028",
    flags: {
      "Missing: Employment proof": false,
      "High childcare hours requested": false,
      "Income discrepancy": false,
    },
    childcare_hours_requested: 30,
    household_income: 62000,
  },
];

const AIPanel = () => {
  const flaggedApplicants = mockApplicants
    .map((applicant) => ({
      ...applicant,
      flagCount: Object.values(applicant.flags).filter(Boolean).length,
    }))
    .filter((applicant) => applicant.flagCount > 0);

  return (
    <section className="bg-card rounded-xl p-6 border border-border shadow-md animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <Flag className="w-6 h-6 text-red-600" />
        <h2 className="text-xl font-semibold tracking-tight">
          Summary of Flagged Applicants
        </h2>
      </div>

      {flaggedApplicants.length > 0 ? (
        <ul className="space-y-2 list-disc list-inside">
          {flaggedApplicants.map((applicant) => (
            <li key={applicant.application_id}>
              <span>
                ID: <strong>{applicant.application_id}</strong>
              </span>
              <span className="text-muted-foreground mx-2">|</span>
              <span>
                Flags: <strong>{applicant.flagCount}</strong>
              </span>
              <span className="text-muted-foreground mx-2">|</span>
              <span>
                Childcare Hours:{" "}
                <strong>{applicant.childcare_hours_requested}</strong>
              </span>
              <span className="text-muted-foreground mx-2">|</span>
              <span>
                Income:{" "}
                <strong>
                  ${applicant.household_income.toLocaleString()}
                </strong>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">No flagged cases found.</p>
      )}
    </section>
  );
};

export default AIPanel;
