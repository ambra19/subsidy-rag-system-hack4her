
import { AlertCircle, Info, FlagTriangleRight } from "lucide-react";

const mockAIState = {
  steps: [
    "Reviewing eligibility: household income below threshold.",
    "Verifying number of qualifying children.",
    "Detected missing proof of employment document.",
    "Flagged for manual documentation check.",
    "Estimated decision: Recommend for further review."
  ],
  flags: [
    "Missing: Employment proof",
    "High childcare hours requested"
  ],
  explanation: "The application is flagged because required proof of employment is missing, and the requested childcare hours are above typical averages. Manual inspection recommended."
};

const AIPanel = () => (
  <section className="bg-secondary rounded-lg border border-border shadow-sm p-5 mb-4 animate-fade-in">
    <div className="flex items-center gap-2 mb-2">
      <Info className="w-5 h-5 text-blue-600" />
      <h2 className="font-semibold text-lg">AI Reasoning Steps</h2>
    </div>
    <ol className="list-decimal ml-5 text-sm text-muted-foreground space-y-1">
      {mockAIState.steps.map((step, i) => (
        <li key={i}>{step}</li>
      ))}
    </ol>
    <div className="mt-4 flex items-center gap-2 text-red-600 text-sm">
      <FlagTriangleRight className="w-5 h-5" />
      <div>
        <span className="font-medium">Flags: </span>
        {mockAIState.flags.join(" • ")}
      </div>
    </div>
    <div className="mt-2 flex items-start gap-2 text-sm text-primary">
      <AlertCircle className="h-4 w-4 mt-[2px]" />
      <span className="italic">{mockAIState.explanation}</span>
    </div>
  </section>
);

export default AIPanel;
