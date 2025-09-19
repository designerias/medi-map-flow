import { useState } from "react";
import { Users, Receipt, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const handleTabClick = (tabId: string) => {
    if (tabId === "activities") {
      window.location.href = "/activities";
    } else {
      onTabChange(tabId);
    }
  };
  const tabs = [
    {
      id: "activities",
      label: "Activities",
      icon: Activity,
      description: "Track processing activities"
    },
    {
      id: "patient-master",
      label: "Patient Master",
      icon: Users,
      description: "Manage patient demographic data"
    },
    {
      id: "fee-structure",
      label: "Fee Structure",
      icon: Receipt,
      description: "Configure billing and fee data"
    }
  ];

  return (
    <div className="w-72 bg-card border-r border-border min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Field Mapping</h1>
        <p className="text-sm text-muted-foreground">AI-Enabled Data Mapping System</p>
      </div>
      
      <nav className="space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                "w-full flex items-start p-4 rounded-lg border text-left transition-all duration-200",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-background border-border hover:bg-secondary hover:border-secondary"
              )}
            >
              <Icon className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <div className="font-medium text-sm mb-1">{tab.label}</div>
                <div className={cn(
                  "text-xs",
                  activeTab === tab.id ? "text-primary-foreground/80" : "text-muted-foreground"
                )}>
                  {tab.description}
                </div>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;