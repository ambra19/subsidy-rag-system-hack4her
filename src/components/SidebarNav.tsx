
import { Home, ListChecks, AlertTriangle, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Dashboard", icon: Home, active: true },
  { label: "Cases Review", icon: ListChecks, active: false },
  { label: "Escalations", icon: AlertTriangle, active: false },
  { label: "Settings", icon: Settings, active: false },
];

const SidebarNav = () => (
  <aside className="h-full bg-white shadow-md border-r border-sidebar-border flex flex-col min-w-[230px] w-56 z-20">
    <nav className="flex flex-col gap-2 mt-10">
      {nav.map((item) => (
        <a
          key={item.label}
          href="#"
          className={cn(
            "flex items-center gap-3 px-6 py-3 font-medium transition text-md rounded-lg mx-2",
            item.active
              ? "bg-secondary text-primary shadow-sm"
              : "text-muted-foreground hover:text-primary hover:bg-accent"
          )}
        >
          <item.icon className="w-5 h-5 shrink-0" aria-hidden />
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
    <div className="flex-1"></div>
    <div className="mb-6 px-6 text-xs text-muted-foreground">
      &copy; 2025 City of Example
    </div>
  </aside>
);

export default SidebarNav;
