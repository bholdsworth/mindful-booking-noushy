
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  UserCog,
  Calendar,
  MessageSquare,
  Edit,
  UserX
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock practitioners data
const practitioners = [
  {
    id: 1,
    name: "Dr. Jessica Lee",
    specialty: "Orthopedic Physiotherapy",
    email: "jessica.lee@noushy.com",
    phone: "(555) 123-4567",
    schedule: "Mon-Fri, 8:00 AM - 4:00 PM",
    status: "Active",
    avatar: null,
    color: "#4f46e5"
  },
  {
    id: 2,
    name: "Dr. Marcus Chen",
    specialty: "Sports Rehabilitation",
    email: "marcus.chen@noushy.com",
    phone: "(555) 234-5678",
    schedule: "Mon-Wed, Fri, 9:00 AM - 5:00 PM",
    status: "Active",
    avatar: null,
    color: "#0ea5e9"
  },
  {
    id: 3,
    name: "Dr. Sarah Miller",
    specialty: "Neurological Rehabilitation",
    email: "sarah.miller@noushy.com",
    phone: "(555) 345-6789",
    schedule: "Tue-Sat, 10:00 AM - 6:00 PM",
    status: "Leave",
    avatar: null,
    color: "#16a34a"
  },
  {
    id: 4,
    name: "Dr. Robert Taylor",
    specialty: "Manual Therapy",
    email: "robert.taylor@noushy.com",
    phone: "(555) 456-7890",
    schedule: "Mon-Thu, 8:00 AM - 4:00 PM",
    status: "Active",
    avatar: null,
    color: "#eab308"
  },
  {
    id: 5,
    name: "Dr. Emily Johnson",
    specialty: "Pediatric Physiotherapy",
    email: "emily.johnson@noushy.com",
    phone: "(555) 567-8901",
    schedule: "Wed-Sun, 9:00 AM - 5:00 PM",
    status: "Inactive",
    avatar: null,
    color: "#ec4899"
  }
];

const Practitioners = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPractitioners = practitioners.filter((practitioner) =>
    practitioner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    practitioner.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    practitioner.email.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-2xl font-bold text-slate-900">Practitioners</h1>
          <p className="text-slate-500">Manage your clinic's practitioners</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Practitioner
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
            placeholder="Search practitioners..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead className="hidden md:table-cell">Contact</TableHead>
                  <TableHead className="hidden lg:table-cell">Schedule</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPractitioners.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-slate-500">
                      No practitioners found. Try adjusting your search.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPractitioners.map((practitioner) => (
                    <TableRow key={practitioner.id} className="hover:bg-slate-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div 
                            className="p-2 rounded-full" 
                            style={{ backgroundColor: `${practitioner.color}20` }}
                          >
                            <UserCog 
                              className="h-5 w-5" 
                              style={{ color: practitioner.color }}
                            />
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">{practitioner.name}</div>
                            <div className="text-xs text-slate-500">ID: #{practitioner.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{practitioner.specialty}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div>
                          <div className="text-sm">{practitioner.email}</div>
                          <div className="text-xs text-slate-500">{practitioner.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {practitioner.schedule}
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          practitioner.status === "Active" 
                            ? "bg-green-50 text-green-700" 
                            : practitioner.status === "Leave"
                              ? "bg-yellow-50 text-yellow-700"
                              : "bg-slate-100 text-slate-700"
                        }`}>
                          {practitioner.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Calendar className="h-4 w-4 text-slate-500" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MessageSquare className="h-4 w-4 text-slate-500" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Calendar className="h-4 w-4 mr-2" />
                                Edit Schedule
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <UserX className="h-4 w-4 mr-2" />
                                Deactivate
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Practitioners;
