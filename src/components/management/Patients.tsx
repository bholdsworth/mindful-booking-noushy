
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Plus, Filter, Download, MoreHorizontal, User } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

// Mock patient data
const patients = [
  {
    id: 1,
    name: "Sarah Johnson",
    dob: "12/05/1985",
    email: "sarah.johnson@example.com",
    phone: "(555) 123-4567",
    lastVisit: "2023-06-15",
    nextAppointment: "2023-06-29",
    condition: "Lower back pain",
  },
  {
    id: 2,
    name: "Michael Brown",
    dob: "03/18/1978",
    email: "michael.brown@example.com",
    phone: "(555) 234-5678",
    lastVisit: "2023-06-10",
    nextAppointment: "2023-06-24",
    condition: "Shoulder rehabilitation",
  },
  {
    id: 3,
    name: "Emily Davis",
    dob: "07/22/1990",
    email: "emily.davis@example.com",
    phone: "(555) 345-6789",
    lastVisit: "2023-06-08",
    nextAppointment: "2023-06-22",
    condition: "Knee pain post-surgery",
  },
  {
    id: 4,
    name: "James Wilson",
    dob: "09/30/1965",
    email: "james.wilson@example.com",
    phone: "(555) 456-7890",
    lastVisit: "2023-06-05",
    nextAppointment: "2023-06-19",
    condition: "Cervical spine issues",
  },
  {
    id: 5,
    name: "Sophia Martinez",
    dob: "04/12/1982",
    email: "sophia.martinez@example.com",
    phone: "(555) 567-8901",
    lastVisit: "2023-06-01",
    nextAppointment: "2023-06-15",
    condition: "Ankle sprain",
  },
  {
    id: 6,
    name: "Robert Taylor",
    dob: "11/25/1970",
    email: "robert.taylor@example.com",
    phone: "(555) 678-9012",
    lastVisit: "2023-05-28",
    nextAppointment: "2023-06-11",
    condition: "Tennis elbow",
  },
  {
    id: 7,
    name: "Olivia Anderson",
    dob: "06/03/1988",
    email: "olivia.anderson@example.com",
    phone: "(555) 789-0123",
    lastVisit: "2023-05-25",
    nextAppointment: "2023-06-08",
    condition: "Hip pain",
  },
];

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Patients</h1>
          <p className="text-slate-500">Manage your patient records</p>
        </div>
        <Button 
          className="bg-noushy-600 hover:bg-noushy-700"
          onClick={() => navigate("/management/patients/new")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Patient
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search patients..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </motion.div>

      <Separator />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead className="hidden md:table-cell">Contact</TableHead>
                <TableHead className="hidden lg:table-cell">Last Visit</TableHead>
                <TableHead className="hidden lg:table-cell">Next Appointment</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-slate-500">
                    No patients found. Try adjusting your search.
                  </TableCell>
                </TableRow>
              ) : (
                filteredPatients.map((patient) => (
                  <TableRow key={patient.id} className="cursor-pointer hover:bg-slate-50" onClick={() => navigate(`/management/patients/${patient.id}`)}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <div className="bg-noushy-100 rounded-full p-1">
                        <User className="h-4 w-4 text-noushy-600" />
                      </div>
                      {patient.name}
                    </TableCell>
                    <TableCell>{patient.dob}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="text-sm">
                        <div>{patient.email}</div>
                        <div className="text-slate-500">{patient.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{patient.lastVisit}</TableCell>
                    <TableCell className="hidden lg:table-cell">{patient.nextAppointment}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-noushy-50 px-2.5 py-0.5 text-xs font-medium text-noushy-700">
                        {patient.condition}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/management/patients/${patient.id}`);
                          }}>
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/management/calendar?patient=${patient.id}`);
                          }}>
                            Schedule Appointment
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            Send Message
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </div>
  );
};

export default Patients;
