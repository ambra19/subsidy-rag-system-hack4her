
import { UserCheck2, Flag, ArrowUpRight, Users, DollarSign } from "lucide-react";
import { useFileApplicantDataContext } from "./AIPanel";

// DashboardSummary now pulls applicant data for ID display
const DashboardSummary = () => {
  let firstApplicantId = "N/A";
  try {
    const { raw } = useFileApplicantDataContext();
    if (raw && raw.length > 0) {
      // ID could be in "application_id" or "Application ID"
      firstApplicantId =
        (raw[0]["application_id"] as string) ||
        (raw[0]["Application ID"] as string) ||
        "N/A";
    }
  } catch {
    // Not inside provider, fallback
    firstApplicantId = "N/A";
  }

  const metrics = [
    {
      title: "Applicant ID",
      value: firstApplicantId,
      icon: UserCheck2,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Flagged Cases",
      value: 12,
      icon: Flag,
      color: "bg-red-100 text-red-600",
    },
    {
      title: "Escalated to Human",
      value: 4,
      icon: ArrowUpRight,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Avg. Childcare Hours",
      value: 28.5,
      icon: Users,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Avg. Household Income",
      value: "$61,900",
      icon: DollarSign,
      color: "bg-gray-100 text-gray-700",
    }
  ];

  return (
    <section className="bg-card rounded-xl p-6 border border-border shadow-md mb-7 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4 tracking-tight">Summary</h2>
      <div className="grid lg:grid-cols-1 grid-cols-2 gap-5">
        {metrics.map((m) => (
          <div key={m.title} className="flex items-center gap-4 py-2">
            <div className={`rounded-lg p-2 shrink-0 ${m.color}`}>
              <m.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-lg font-bold">{m.value}</div>
              <div className="text-sm text-muted-foreground">{m.title}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DashboardSummary;
