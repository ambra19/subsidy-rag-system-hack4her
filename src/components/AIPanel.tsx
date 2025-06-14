
import { Info } from "lucide-react";
import * as React from "react";
import { useFileApplicantData } from "@/hooks/useFileApplicantData";

const AIPanel = () => {
  const { flagged } = useFileApplicantDataContext();

  return (
    <section className="bg-secondary rounded-lg border border-border shadow-sm p-5 mb-4 animate-fade-in min-h-[140px]">
      <div className="flex items-center gap-2 mb-2">
        <Info className="w-5 h-5 text-blue-600" />
        <h2 className="font-semibold text-lg">
          Summary of Applicant
        </h2>
      </div>
      <div className="mt-1">
        {flagged === null ? (
          <span className="text-muted-foreground text-sm">
            No file uploaded. Please upload a file to view flagged cases.
          </span>
        ) : flagged.length === 0 ? (
          <span className="text-muted-foreground text-sm">
            No flagged cases found.
          </span>
        ) : (
          <ul className="space-y-2 text-sm mt-2 list-none pl-0 text-primary">
            {flagged.map((a) => (
              <li key={a.application_id} className="flex items-center">
                <span>
                  <span className="font-medium">ID:</span> {a.application_id}{" "}
                  | <span className="font-medium">Flags:</span> {a.flagCount}{" "}
                  | <span className="font-medium">Childcare Hours:</span> {a.childcare_hours_requested}{" "}
                  | <span className="font-medium">Income:</span> {a.household_income}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

// Context provider for file applicant data
const FileApplicantDataContext = React.createContext<ReturnType<typeof useFileApplicantData> | null>(null);
export function FileApplicantDataProvider({ children }: { children: React.ReactNode; }) {
  const val = useFileApplicantData();
  return (
    <FileApplicantDataContext.Provider value={val}>
      {children}
    </FileApplicantDataContext.Provider>
  );
}
export function useFileApplicantDataContext() {
  const ctx = React.useContext(FileApplicantDataContext);
  if (!ctx) throw new Error("useFileApplicantDataContext must be used within a FileApplicantDataProvider");
  return ctx;
}

export default AIPanel;
