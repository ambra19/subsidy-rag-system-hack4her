
import { Bot } from "lucide-react";

const Topbar = () => (
  <header className="w-full bg-white border-b border-border flex items-center px-8 py-4 h-[72px] relative z-10 shadow-sm">
    {/* Logo + greeting */}
    <div className="flex items-center gap-5 flex-1">
      {/* Inline SVG logo placeholder */}
      {/* <span className="h-9 w-9 flex items-center justify-center rounded-full bg-blue-100">
        <svg width="28" height="28" viewBox="0 0 48 48" fill="none" className="h-7 w-7">
          <circle cx="24" cy="24" r="22" fill="#226CE1" />
          <text x="50%" y="56%" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" dy=".3em">AI</text>
        </svg>
      </span> */}
      <div className="mt-[-7px]">  {/* move up */}
        <img 
          src="https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/images/company-library/media/logo/sn-logo-color.png" 
          alt="ServiceNow Logo" 
          className="h-16 object-contain" 
        />
      </div>
      {/* Greeting */}
      <span className="text-lg font-semibold text-primary">
        Hello, <span className="text-blue-700">Alex!</span> Interact with Stix to get started on your tasks.
      </span>
    </div>

    {/* AI "thinking" indicator, optional fill */}
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
