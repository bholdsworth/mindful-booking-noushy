
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Filter, 
  Download, 
  Search, 
  FileText, 
  CreditCard, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MoreHorizontal,
  User
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

// Mock invoices data
const invoices = [
  {
    id: "INV-001",
    patient: "Sarah Johnson",
    patientId: 1,
    date: new Date("2023-06-15"),
    dueDate: new Date("2023-06-30"),
    amount: 120.00,
    status: "Paid",
    items: [
      { description: "Initial Assessment", quantity: 1, rate: 120.00, total: 120.00 }
    ]
  },
  {
    id: "INV-002",
    patient: "Michael Brown",
    patientId: 2,
    date: new Date("2023-06-16"),
    dueDate: new Date("2023-07-01"),
    amount: 85.00,
    status: "Paid",
    items: [
      { description: "Follow-up Session", quantity: 1, rate: 85.00, total: 85.00 }
    ]
  },
  {
    id: "INV-003",
    patient: "Emily Davis",
    patientId: 3,
    date: new Date("2023-06-18"),
    dueDate: new Date("2023-07-03"),
    amount: 150.00,
    status: "Pending",
    items: [
      { description: "Manual Therapy", quantity: 1, rate: 100.00, total: 100.00 },
      { description: "Therapeutic Exercise", quantity: 1, rate: 50.00, total: 50.00 }
    ]
  },
  {
    id: "INV-004",
    patient: "James Wilson",
    patientId: 4,
    date: new Date("2023-06-20"),
    dueDate: new Date("2023-07-05"),
    amount: 85.00,
    status: "Pending",
    items: [
      { description: "Follow-up Session", quantity: 1, rate: 85.00, total: 85.00 }
    ]
  },
  {
    id: "INV-005",
    patient: "Sophia Martinez",
    patientId: 5,
    date: new Date("2023-06-22"),
    dueDate: new Date("2023-07-07"),
    amount: 100.00,
    status: "Overdue",
    items: [
      { description: "Exercise Therapy", quantity: 1, rate: 100.00, total: 100.00 }
    ]
  }
];

// Summary stats
const summaryStats = [
  { title: "Total Revenue", value: "$540.00", change: "+12.5%", icon: CreditCard },
  { title: "Pending Payments", value: "$335.00", change: "+3.2%", icon: Clock },
  { title: "Overdue Invoices", value: "$100.00", change: "-5.1%", icon: XCircle },
  { title: "Paid Invoices", value: "$205.00", change: "+18.3%", icon: CheckCircle }
];

const Invoicing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || invoice.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Invoicing</h1>
          <p className="text-slate-500">Manage patient invoices and payments</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Invoice
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {summaryStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-500">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-slate-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs flex items-center mt-1">
                <span className={`${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </span>
                <span className="ml-1 text-slate-500">from last month</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Invoices</CardTitle>
                <CardDescription>View and manage all patient invoices</CardDescription>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search invoices..."
                    className="pl-10 w-[200px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <TabsList>
                  <TabsTrigger 
                    value="all" 
                    onClick={() => setStatusFilter("all")} 
                    className={statusFilter === "all" ? "bg-slate-50" : ""}
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger 
                    value="pending" 
                    onClick={() => setStatusFilter("pending")}
                    className={statusFilter === "pending" ? "bg-slate-50" : ""}
                  >
                    Pending
                  </TabsTrigger>
                  <TabsTrigger 
                    value="paid" 
                    onClick={() => setStatusFilter("paid")}
                    className={statusFilter === "paid" ? "bg-slate-50" : ""}
                  >
                    Paid
                  </TabsTrigger>
                  <TabsTrigger 
                    value="overdue" 
                    onClick={() => setStatusFilter("overdue")}
                    className={statusFilter === "overdue" ? "bg-slate-50" : ""}
                  >
                    Overdue
                  </TabsTrigger>
                </TabsList>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-slate-500">
                      No invoices match your search. Try adjusting your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id} className="hover:bg-slate-50">
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="bg-noushy-100 rounded-full p-1">
                            <User className="h-4 w-4 text-noushy-600" />
                          </div>
                          {invoice.patient}
                        </div>
                      </TableCell>
                      <TableCell>{format(invoice.date, "MMM d, yyyy")}</TableCell>
                      <TableCell>{format(invoice.dueDate, "MMM d, yyyy")}</TableCell>
                      <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          invoice.status === "Paid" 
                            ? "bg-green-50 text-green-700" 
                            : invoice.status === "Pending"
                              ? "bg-yellow-50 text-yellow-700"
                              : "bg-red-50 text-red-700"
                        }`}>
                          {invoice.status}
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
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                            <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                            <DropdownMenuItem>Export PDF</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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

export default Invoicing;
