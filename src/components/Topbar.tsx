
import { Bot } from "lucide-react";

const Topbar = () => (
  <header className="w-full bg-white border-b border-border flex items-center px-8 py-4 h-[72px] relative z-10 shadow-sm">
    {/* Logo + greeting */}
    <div className="flex items-center gap-5 flex-1">
      {/* ServiceNow Logo */}
      <img
        src="/servicenow-logo.svg"
        alt="ServiceNow"
        className="h-9 w-auto rounded bg-white"
        style={{ maxWidth: 110, objectFit: "contain" }}
      />
      {/* Greeting */}
      <span className="text-lg font-semibold text-primary">
        Hi, <span className="text-blue-700">Alex Morgan</span>, Welcome!
      </span>
    </div>

    {/* AI "thinking" indicator */}
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground mr-2 font-medium">
        AI Agent Active
      </span>
      <span className="rounded-full bg-green-400 animate-pulse w-3 h-3"></span>
      <Bot className="w-6 h-6 ml-3 text-green-500" />
    </div>
  </header>
);

export default Topbar;
