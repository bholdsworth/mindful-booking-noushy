
import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Calendar, 
  ClipboardCheck, 
  CreditCard, 
  Clock,
  ChevronRight,
  ArrowUpRight
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock data for the dashboard
const dashboardData = {
  stats: [
    { label: "Total Patients", value: 248, icon: Users, change: "+12%" },
    { label: "Appointments Today", value: 8, icon: Calendar, change: "+2" },
    { label: "Pending Notes", value: 4, icon: ClipboardCheck, change: "-2" },
    { label: "Unpaid Invoices", value: 15, icon: CreditCard, change: "+3" },
  ],
  upcomingAppointments: [
    { id: 1, patient: "Emily Johnson", time: "9:00 AM", service: "Initial Assessment" },
    { id: 2, patient: "James Wilson", time: "10:30 AM", service: "Follow-up" },
    { id: 3, patient: "Sophia Martinez", time: "1:00 PM", service: "Therapeutic Exercise" },
    { id: 4, patient: "Michael Brown", time: "3:30 PM", service: "Manual Therapy" },
  ],
  recentPatients: [
    { id: 101, name: "Olivia Davis", lastVisit: "Yesterday", condition: "Lower back pain" },
    { id: 102, name: "Noah Rodriguez", lastVisit: "2 days ago", condition: "Knee rehabilitation" },
    { id: 103, name: "Emma Thompson", lastVisit: "1 week ago", condition: "Shoulder impingement" },
  ],
};

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500">Overview of your clinic's performance and activities</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {dashboardData.stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <p className="text-xs text-slate-500 mt-1 flex items-center">
                <span className={stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                  {stat.change}
                </span>
                <span className="ml-1">from last week</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Today's Appointments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Today's Appointments</CardTitle>
              <Button variant="ghost" size="sm" className="text-noushy-600">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <CardDescription>Scheduled sessions for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.upcomingAppointments.map((appointment) => (
                <div 
                  key={appointment.id} 
                  className="flex items-center justify-between p-3 rounded-md border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-noushy-100 rounded-full p-2">
                      <Clock className="h-4 w-4 text-noushy-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{appointment.patient}</p>
                      <p className="text-sm text-slate-500">{appointment.service}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-slate-900">{appointment.time}</p>
                    <Button variant="ghost" size="sm" className="text-noushy-600 p-0 h-6">
                      Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Patients</CardTitle>
              <Button variant="ghost" size="sm" className="text-noushy-600">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <CardDescription>Latest patient visits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentPatients.map((patient) => (
                <div 
                  key={patient.id} 
                  className="flex items-center justify-between p-3 rounded-md border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-slate-900">{patient.name}</p>
                    <p className="text-sm text-slate-500">{patient.condition}</p>
                    <p className="text-xs text-slate-400">Last visit: {patient.lastVisit}</p>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    Profile
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;
