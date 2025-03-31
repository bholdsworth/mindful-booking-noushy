import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Save, 
  Building,
  Clock,
  CreditCard,
  Database,
  Lock,
  Bell,
  Users,
  FileText,
  Plus,
  Edit
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  
  // Mock settings data
  const clinicSettings = {
    name: "Noushy Physiotherapy Clinic",
    address: "123 Main Street, Anytown, CA 94123",
    phone: "(555) 123-4567",
    email: "info@noushy.com",
    website: "www.noushy.com",
    logo: null
  };
  
  const scheduleSettings = {
    businessHours: [
      { day: "Monday", start: "08:00", end: "18:00", closed: false },
      { day: "Tuesday", start: "08:00", end: "18:00", closed: false },
      { day: "Wednesday", start: "08:00", end: "18:00", closed: false },
      { day: "Thursday", start: "08:00", end: "18:00", closed: false },
      { day: "Friday", start: "08:00", end: "18:00", closed: false },
      { day: "Saturday", start: "09:00", end: "14:00", closed: false },
      { day: "Sunday", start: "00:00", end: "00:00", closed: true }
    ],
    appointmentDuration: 60,
    bufferTime: 15,
    schedulingWindowDays: 60,
    reminderTiming: 24
  };
  
  const serviceSettings = [
    { id: 1, name: "Initial Assessment", duration: 60, price: 120.00, active: true },
    { id: 2, name: "Follow-up Session", duration: 45, price: 85.00, active: true },
    { id: 3, name: "Manual Therapy", duration: 60, price: 100.00, active: true },
    { id: 4, name: "Exercise Therapy", duration: 45, price: 80.00, active: true },
    { id: 5, name: "Sports Rehabilitation", duration: 60, price: 110.00, active: true },
    { id: 6, name: "Telehealth Consultation", duration: 30, price: 75.00, active: false }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500">Manage your clinic and application settings</p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-slate-100">
          <TabsTrigger value="general">
            <Building className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="schedule">
            <Clock className="h-4 w-4 mr-2" />
            Schedule
          </TabsTrigger>
          <TabsTrigger value="services">
            <FileText className="h-4 w-4 mr-2" />
            Services
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="h-4 w-4 mr-2" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="h-4 w-4 mr-2" />
            Users
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Database className="h-4 w-4 mr-2" />
            Integrations
          </TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Clinic Information</CardTitle>
                <CardDescription>
                  Basic information about your clinic that will be displayed to patients
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="clinicName">Clinic Name</Label>
                    <Input id="clinicName" defaultValue={clinicSettings.name} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue={clinicSettings.phone} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={clinicSettings.email} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" defaultValue={clinicSettings.website} />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" defaultValue={clinicSettings.address} />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="logo">Clinic Logo</Label>
                    <div className="border-2 border-dashed rounded-md p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                      <div className="text-sm text-slate-500">
                        <span>Click to upload or drag and drop</span>
                        <br />
                        <span>SVG, PNG or JPG (max. 800x400px)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
        
        {/* Schedule Settings */}
        <TabsContent value="schedule">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Business Hours</CardTitle>
                <CardDescription>
                  Set your regular business hours for scheduling appointments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {scheduleSettings.businessHours.map((day, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="w-36 font-medium">{day.day}</div>
                      <div className="flex items-center flex-1 gap-4">
                        <div className="flex gap-2 items-center">
                          <Label htmlFor={`${day.day}-closed`} className="text-sm">Closed</Label>
                          <Switch 
                            id={`${day.day}-closed`} 
                            checked={day.closed}
                          />
                        </div>
                        {!day.closed && (
                          <>
                            <div className="flex gap-2 items-center">
                              <Label htmlFor={`${day.day}-start`} className="text-sm">Start</Label>
                              <Select defaultValue={day.start}>
                                <SelectTrigger className="w-24">
                                  <SelectValue placeholder="Start time" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="08:00">8:00 AM</SelectItem>
                                  <SelectItem value="09:00">9:00 AM</SelectItem>
                                  <SelectItem value="10:00">10:00 AM</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex gap-2 items-center">
                              <Label htmlFor={`${day.day}-end`} className="text-sm">End</Label>
                              <Select defaultValue={day.end}>
                                <SelectTrigger className="w-24">
                                  <SelectValue placeholder="End time" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="17:00">5:00 PM</SelectItem>
                                  <SelectItem value="18:00">6:00 PM</SelectItem>
                                  <SelectItem value="19:00">7:00 PM</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="appointmentDuration">Default Appointment Duration (minutes)</Label>
                    <Select defaultValue={scheduleSettings.appointmentDuration.toString()}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="90">90 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bufferTime">Buffer Time Between Appointments (minutes)</Label>
                    <Select defaultValue={scheduleSettings.bufferTime.toString()}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select buffer time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">No buffer</SelectItem>
                        <SelectItem value="5">5 minutes</SelectItem>
                        <SelectItem value="10">10 minutes</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="schedulingWindow">Appointment Scheduling Window (days)</Label>
                    <Input 
                      id="schedulingWindow" 
                      type="number" 
                      defaultValue={scheduleSettings.schedulingWindowDays} 
                      min={1}
                    />
                    <p className="text-xs text-slate-500">
                      How far in advance patients can book appointments (e.g., 60 days)
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reminderTiming">Appointment Reminder Timing (hours)</Label>
                    <Input 
                      id="reminderTiming" 
                      type="number" 
                      defaultValue={scheduleSettings.reminderTiming} 
                      min={1}
                    />
                    <p className="text-xs text-slate-500">
                      How many hours before appointment to send reminders
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
        
        {/* Services Settings */}
        <TabsContent value="services">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle>Services</CardTitle>
                  <CardDescription>
                    Manage the services that your clinic offers
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Service
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service Name</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {serviceSettings.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">{service.name}</TableCell>
                        <TableCell>{service.duration} minutes</TableCell>
                        <TableCell>${service.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Switch checked={service.active} />
                            <span className="text-sm">{service.active ? "Active" : "Inactive"}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        {/* Other tabs would be implemented similarly */}
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Settings</CardTitle>
              <CardDescription>
                Configure payment methods, invoicing, and financial settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500">Billing settings content would go here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user accounts and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500">User management content would go here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure email and SMS notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500">Notification settings content would go here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500">Security settings content would go here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>
                Connect with other software and services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500">Integrations content would go here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
