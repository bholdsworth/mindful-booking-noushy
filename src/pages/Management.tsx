
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ManagementLayout from "@/components/management/ManagementLayout";
import Dashboard from "@/components/management/Dashboard";
import Patients from "@/components/management/Patients";
import PatientDetail from "@/components/management/PatientDetail";
import Calendar from "@/components/management/Calendar";
import Invoicing from "@/components/management/Invoicing";
import Messages from "@/components/management/Messages";
import Settings from "@/components/management/Settings";
import Practitioners from "@/components/management/Practitioners";

const Management = () => {
  return (
    <ManagementLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/management/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="patients" element={<Patients />} />
        <Route path="patients/:id" element={<PatientDetail />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="invoicing" element={<Invoicing />} />
        <Route path="messages" element={<Messages />} />
        <Route path="practitioners" element={<Practitioners />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </ManagementLayout>
  );
};

export default Management;
