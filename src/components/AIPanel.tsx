
import { AlertCircle, Info, FlagTriangleRight } from "lucide-react";

const mockAIState = {
  steps: [
    "Retrieve total daily applications from the database",
    "Retrieve incomplete applications",
    "Draft a letter / email to the applicant",
    "Check for inconsistencies between documents",
    "Auto-score risk flags",
  ],
  flags: [
    "The AI Agent can flag applications that are missing required documents, have high childcare hours requested, or are missing other information.",
  ],
  explanation: "The AI Agent does not have the functionality for all of the above tasks in this version of the demo. It is a work in progress."
};

const AIPanel = () => (
  <section className="bg-secondary rounded-lg border border-border shadow-sm p-5 mb-4 animate-fade-in">
    <div className="flex items-center gap-2 mb-2">
      <Info className="w-5 h-5 text-blue-600" />
      <h2 className="font-semibold text-lg">What the AI Agent can help you with</h2>
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
