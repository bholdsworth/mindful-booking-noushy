
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Calendar as CalendarIcon,
  Home,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  UserCog,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ManagementLayoutProps {
  children: React.ReactNode;
}

const ManagementLayout: React.FC<ManagementLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  
  // Mock function for logging out - would connect to auth system in real implementation
  const handleLogout = () => {
    // Add actual logout logic here
    navigate("/");
  };

  const navItems = [
    { to: "/management/dashboard", icon: Home, label: "Dashboard" },
    { to: "/management/patients", icon: Users, label: "Patients" },
    { to: "/management/calendar", icon: CalendarIcon, label: "Calendar" },
    { to: "/management/invoicing", icon: FileText, label: "Invoicing" },
    { to: "/management/messages", icon: MessageSquare, label: "Messages" },
    { to: "/management/practitioners", icon: UserCog, label: "Practitioners" },
    { to: "/management/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar Navigation */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-white border-r border-slate-200 shadow-sm flex flex-col"
      >
        <div className="p-4 border-b border-slate-200">
          <h1 className="text-xl font-semibold text-noushy-900">Noushy Management</h1>
          <p className="text-sm text-slate-500">Physiotherapy System</p>
        </div>
        
        <nav className="flex-1 py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-noushy-50 text-noushy-900"
                        : "text-slate-600 hover:bg-slate-100"
                    )
                  }
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-slate-200">
          <Button
            variant="outline"
            className="w-full justify-start text-slate-600"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </motion.aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default ManagementLayout;
