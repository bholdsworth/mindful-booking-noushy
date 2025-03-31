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
  User,
  CalendarIcon,
  X,
  Eye
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InvoicePreview from "./InvoicePreview";
import { InvoiceData, BusinessInfo } from "./InvoiceTemplate";

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

const summaryStats = [
  { title: "Total Revenue", value: "$540.00", change: "+12.5%", icon: CreditCard },
  { title: "Pending Payments", value: "$335.00", change: "+3.2%", icon: Clock },
  { title: "Overdue Invoices", value: "$100.00", change: "-5.1%", icon: XCircle },
  { title: "Paid Invoices", value: "$205.00", change: "+18.3%", icon: CheckCircle }
];

const invoiceFormSchema = z.object({
  patientId: z.string().min(1, "Patient is required"),
  issueDate: z.date({
    required_error: "Issue date is required",
  }),
  dueDate: z.date({
    required_error: "Due date is required",
  }),
  items: z.array(
    z.object({
      description: z.string().min(1, "Description is required"),
      quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
      rate: z.coerce.number().min(0, "Rate must be a positive number"),
    })
  ).min(1, "At least one item is required"),
  notes: z.string().optional(),
});

type InvoiceFormValues = z.infer<typeof invoiceFormSchema>;

const mockPatients = [
  { id: "1", name: "Sarah Johnson" },
  { id: "2", name: "Michael Brown" },
  { id: "3", name: "Emily Davis" },
  { id: "4", name: "James Wilson" },
  { id: "5", name: "Sophia Martinez" },
];

const mockServices = [
  { id: "1", name: "Initial Assessment", rate: 120 },
  { id: "2", name: "Follow-up Session", rate: 85 },
  { id: "3", name: "Manual Therapy", rate: 100 },
  { id: "4", name: "Therapeutic Exercise", rate: 50 },
  { id: "5", name: "Exercise Therapy", rate: 100 },
];

const Invoicing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState([
    { id: 1, description: "", quantity: 1, rate: 0, total: 0 }
  ]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceData | null>(null);

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      items: [{ description: "", quantity: 1, rate: 0 }],
      notes: "",
    },
  });

  const onSubmit = (data: InvoiceFormValues) => {
    console.log("Form submitted:", data);
    setIsCreateDialogOpen(false);
    form.reset();
    setInvoiceItems([{ id: 1, description: "", quantity: 1, rate: 0, total: 0 }]);
  };

  const addInvoiceItem = () => {
    const newId = invoiceItems.length > 0 
      ? Math.max(...invoiceItems.map(item => item.id)) + 1 
      : 1;
    
    setInvoiceItems([
      ...invoiceItems,
      { id: newId, description: "", quantity: 1, rate: 0, total: 0 }
    ]);
    
    const currentItems = form.getValues("items") || [];
    form.setValue("items", [...currentItems, { description: "", quantity: 1, rate: 0 }]);
  };

  const removeInvoiceItem = (id: number) => {
    if (invoiceItems.length <= 1) return;
    
    const updatedItems = invoiceItems.filter(item => item.id !== id);
    setInvoiceItems(updatedItems);
    
    const formItems = form.getValues("items");
    const index = invoiceItems.findIndex(item => item.id === id);
    if (index !== -1) {
      const newFormItems = [...formItems];
      newFormItems.splice(index, 1);
      form.setValue("items", newFormItems);
    }
  };

  const handleServiceSelect = (index: number, serviceId: string) => {
    const service = mockServices.find(s => s.id === serviceId);
    if (service) {
      const updatedItems = [...invoiceItems];
      updatedItems[index] = {
        ...updatedItems[index],
        description: service.name,
        rate: service.rate,
        total: updatedItems[index].quantity * service.rate
      };
      setInvoiceItems(updatedItems);
      
      const formItems = form.getValues("items");
      formItems[index].description = service.name;
      formItems[index].rate = service.rate;
      form.setValue("items", formItems);
    }
  };

  const updateItemQuantity = (index: number, quantity: number) => {
    const updatedItems = [...invoiceItems];
    updatedItems[index] = {
      ...updatedItems[index],
      quantity,
      total: quantity * updatedItems[index].rate
    };
    setInvoiceItems(updatedItems);
  };

  const updateItemRate = (index: number, rate: number) => {
    const updatedItems = [...invoiceItems];
    updatedItems[index] = {
      ...updatedItems[index],
      rate,
      total: updatedItems[index].quantity * rate
    };
    setInvoiceItems(updatedItems);
  };

  const calculateTotal = () => {
    return invoiceItems.reduce((sum, item) => sum + (item.total || 0), 0);
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || invoice.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const businessInfo: BusinessInfo = {
    name: "Massage Therapy GCCC",
    practitioner: "Annouska Gregovich",
    qualification: "Remedial Massage Therapist",
    address: "123 South Gold Street\nSouthport, Queensland 4215",
    abn: "45896547635",
    providerNumber: "C164321"
  };

  const handleViewInvoice = (invoice: any) => {
    const formattedInvoice: InvoiceData = {
      id: invoice.id.replace("INV-", "").padStart(5, "0"),
      date: invoice.date,
      dueDate: invoice.dueDate,
      patientName: invoice.patient,
      patientAddress: "19 Lily Crescent\nNERANG QLD 4211",
      items: invoice.items.map((item: any) => ({
        item: item.description.split(" ")[0],
        description: item.description,
        quantity: item.quantity,
        rate: item.rate,
        tax: item.rate * 0.1,
        total: item.total
      })),
      payments: [
        {
          date: new Date(),
          method: "EFTPOS",
          amount: invoice.status === "Paid" ? invoice.amount : 0
        }
      ],
      nextAppointment: {
        date: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        practitioner: "Annouska Gregovich",
        service: "Massage Therapy"
      }
    };

    setSelectedInvoice(formattedInvoice);
    setIsPreviewOpen(true);
  };

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
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
              <DialogDescription>
                Enter the details below to create a new invoice
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="patientId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Patient</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a patient" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {mockPatients.map(patient => (
                              <SelectItem key={patient.id} value={patient.id}>
                                {patient.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="issueDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Issue Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Due Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Invoice Items</h3>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={addInvoiceItem}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Item
                    </Button>
                  </div>

                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[40%]">Description</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Rate ($)</TableHead>
                            <TableHead>Total ($)</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {invoiceItems.map((item, index) => (
                            <TableRow key={item.id}>
                              <TableCell>
                                <Select 
                                  onValueChange={(value) => handleServiceSelect(index, value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select service" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {mockServices.map(service => (
                                      <SelectItem key={service.id} value={service.id}>
                                        {service.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  min={1}
                                  value={item.quantity}
                                  onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    if (!isNaN(value)) {
                                      updateItemQuantity(index, value);
                                      const formItems = form.getValues("items");
                                      formItems[index].quantity = value;
                                      form.setValue("items", formItems);
                                    }
                                  }}
                                  className="w-20"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  min={0}
                                  step="0.01"
                                  value={item.rate}
                                  onChange={(e) => {
                                    const value = parseFloat(e.target.value);
                                    if (!isNaN(value)) {
                                      updateItemRate(index, value);
                                      const formItems = form.getValues("items");
                                      formItems[index].rate = value;
                                      form.setValue("items", formItems);
                                    }
                                  }}
                                  className="w-24"
                                />
                              </TableCell>
                              <TableCell className="font-medium">
                                ${(item.total || 0).toFixed(2)}
                              </TableCell>
                              <TableCell>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeInvoiceItem(item.id)}
                                  disabled={invoiceItems.length <= 1}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                    <CardFooter className="flex justify-end py-4">
                      <div className="text-right">
                        <div className="text-sm text-slate-500">Subtotal</div>
                        <div className="text-xl font-bold">${calculateTotal().toFixed(2)}</div>
                      </div>
                    </CardFooter>
                  </Card>
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Add any additional notes here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Create Invoice</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
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
                <Tabs defaultValue="all">
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
                </Tabs>
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
                            <DropdownMenuItem onClick={() => handleViewInvoice(invoice)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Invoice
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark as Paid
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" />
                              Send Reminder
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Export PDF
                            </DropdownMenuItem>
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

      {selectedInvoice && (
        <InvoicePreview
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          invoiceData={selectedInvoice}
          businessInfo={businessInfo}
        />
      )}
    </div>
  );
};

export default Invoicing;
