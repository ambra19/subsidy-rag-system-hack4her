
// New main index page for AI Childcare Subsidy Review

import SidebarNav from "@/components/SidebarNav";
import Topbar from "@/components/Topbar";
import AIPanel from "@/components/AIPanel";
import DashboardSummary from "@/components/DashboardSummary";
import ChatbotPanel from "@/components/ChatbotPanel";

// Use CSS grid for full-width, multi-panel dashboard

const Index = () => {
  return (
    <div className="min-h-screen flex bg-muted">
      {/* Sidebar */}
      <SidebarNav />

      {/* Main section */}
      <div className="flex-1 flex flex-col min-h-screen w-0">
        {/* Topbar */}
        <Topbar />

        {/* Content grid */}
        <div className="flex-1 grid grid-cols-12 gap-6 px-10 py-7 max-w-full w-full">
          {/* Left main: Dashboard summary (col-span-3 on desktop) */}
          <div className="col-span-12 lg:col-span-3">
            <DashboardSummary/>
          </div>

          {/* Right main: AI panel + Chatbot (col-span-9 on desktop) */}
          <div className="col-span-12 lg:col-span-9 flex flex-col gap-4 h-full">
            <AIPanel />
            <div className="flex-1 flex min-h-0">
              <div className="flex-1 min-h-0">
                <ChatbotPanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
