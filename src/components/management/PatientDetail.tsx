
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  File,
  MessageSquare,
  FileText,
  Clock,
  Edit,
  Clipboard,
  Download,
  FilePlus,
  Copy,
  User,
  Phone,
  Mail,
  MapPin,
  PlusCircle,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

// Mock patient data
const patientData = {
  1: {
    id: 1,
    name: "Sarah Johnson",
    dob: "05/12/1985",
    age: 38,
    email: "sarah.johnson@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, CA 94123",
    emergencyContact: "John Johnson (Husband) - (555) 987-6543",
    insurance: "HealthPlus - #H28374655",
    referredBy: "Dr. Andrew Miller",
    condition: "Lower back pain",
    notes: [
      {
        id: 101,
        date: "2023-06-15",
        provider: "Dr. Jessica Lee",
        type: "Initial Assessment",
        soap: {
          subjective: "Patient reports sharp lower back pain that started 2 weeks ago after lifting a heavy box. Pain is worse in the morning and when bending forward. Pain level: 7/10.",
          objective: "Limited range of motion in lumbar spine. Forward flexion limited to 60 degrees with pain. Positive straight leg raise test on right side. Tenderness over L4-L5 area. No neurological deficits noted.",
          assessment: "Acute lumbar strain with possible disc involvement at L4-L5 level.",
          plan: "Prescribed pain medication and muscle relaxers. Initial treatment to focus on pain reduction and gentle mobilization. Schedule for 2x/week for 3 weeks, then reassess."
        }
      },
      {
        id: 102,
        date: "2023-06-08",
        provider: "Dr. Jessica Lee",
        type: "Follow-up",
        soap: {
          subjective: "Patient reports mild improvement in pain (now 5/10). Morning stiffness persists but duration has decreased.",
          objective: "Improved range of motion - forward flexion to 70 degrees. Still tender over L4-L5 region but less intense. Normal gait observed.",
          assessment: "Improving lumbar strain, responding well to treatment.",
          plan: "Continue with current treatment plan. Add gentle core strengthening exercises. Continue 2x/week for 2 more weeks."
        }
      }
    ],
    appointments: [
      { id: 501, date: "2023-06-15", time: "09:00 AM", provider: "Dr. Jessica Lee", service: "Initial Assessment", status: "Completed" },
      { id: 502, date: "2023-06-08", time: "09:30 AM", provider: "Dr. Jessica Lee", service: "Follow-up", status: "Completed" },
      { id: 503, date: "2023-06-29", time: "10:00 AM", provider: "Dr. Jessica Lee", service: "Follow-up", status: "Scheduled" }
    ],
    invoices: [
      { id: 701, date: "2023-06-15", amount: 120, description: "Initial Assessment", status: "Paid" },
      { id: 702, date: "2023-06-08", amount: 85, description: "Follow-up Session", status: "Paid" },
      { id: 703, date: "2023-06-29", amount: 85, description: "Follow-up Session", status: "Pending" }
    ],
    messages: [
      { id: 301, date: "2023-06-16", sender: "Sarah Johnson", content: "Do I need to bring anything special for my next appointment?", read: true },
      { id: 302, date: "2023-06-16", sender: "Dr. Jessica Lee", content: "No need to bring anything special, just wear comfortable clothing that allows access to your lower back.", read: true },
      { id: 303, date: "2023-06-18", sender: "Sarah Johnson", content: "Should I continue with the stretches even if I'm feeling better?", read: true },
      { id: 304, date: "2023-06-18", sender: "Dr. Jessica Lee", content: "Yes, please continue with all prescribed exercises even as you improve. It's important for full recovery and preventing recurrence.", read: true }
    ]
  }
};

const PatientDetail = () => {
  const { id } = useParams();
  const patientId = parseInt(id || "0");
  const navigate = useNavigate();
  const patient = patientData[patientId as keyof typeof patientData];
  
  const [activeTab, setActiveTab] = useState("overview");
  const [newSoapNote, setNewSoapNote] = useState({
    subjective: "",
    objective: "",
    assessment: "",
    plan: ""
  });
  const [isAddingNote, setIsAddingNote] = useState(false);

  if (!patient) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-900">Patient Not Found</h2>
          <p className="text-slate-500 mt-2">The patient you're looking for doesn't exist or you don't have access.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => navigate("/management/patients")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Patients
          </Button>
        </div>
      </div>
    );
  }

  const duplicateNote = (note: typeof patient.notes[0]) => {
    setIsAddingNote(true);
    setNewSoapNote({
      subjective: note.soap.subjective,
      objective: note.soap.objective,
      assessment: note.soap.assessment,
      plan: note.soap.plan
    });
  };

  const handleSaveNote = () => {
    // In a real app, this would save to the backend
    console.log("Saving note:", newSoapNote);
    setIsAddingNote(false);
    setNewSoapNote({
      subjective: "",
      objective: "",
      assessment: "",
      plan: ""
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-4"
            onClick={() => navigate("/management/patients")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{patient.name}</h1>
            <div className="flex items-center text-slate-500 text-sm">
              <span>DOB: {patient.dob}</span>
              <span className="mx-2">•</span>
              <span>Age: {patient.age}</span>
              <span className="mx-2">•</span>
              <span>{patient.condition}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Schedule
          </Button>
          <Button variant="outline" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Message
          </Button>
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Create Invoice
          </Button>
        </div>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-slate-100">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="soap">SOAP Notes</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Patient Information */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Patient Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-slate-500" />
                      <span className="text-slate-500">Full Name:</span>
                      <span className="font-medium">{patient.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-slate-500" />
                      <span className="text-slate-500">Date of Birth:</span>
                      <span className="font-medium">{patient.dob} ({patient.age} years)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-slate-500" />
                      <span className="text-slate-500">Phone:</span>
                      <span className="font-medium">{patient.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-slate-500" />
                      <span className="text-slate-500">Email:</span>
                      <span className="font-medium">{patient.email}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-slate-500 mt-0.5" />
                      <span className="text-slate-500">Address:</span>
                      <span className="font-medium">{patient.address}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-sm">
                      <span className="text-slate-500 min-w-[130px]">Emergency Contact:</span>
                      <span className="font-medium">{patient.emergencyContact}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <span className="text-slate-500 min-w-[130px]">Insurance:</span>
                      <span className="font-medium">{patient.insurance}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <span className="text-slate-500 min-w-[130px]">Referred By:</span>
                      <span className="font-medium">{patient.referredBy}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <span className="text-slate-500 min-w-[130px]">Condition:</span>
                      <span className="font-medium">{patient.condition}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {patient.appointments.filter(a => a.status === "Scheduled").map(appointment => (
                  <div key={appointment.id} className="border rounded-md p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{appointment.service}</span>
                      <span className="text-noushy-600 text-sm">{appointment.status}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Calendar className="h-4 w-4" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock className="h-4 w-4" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <User className="h-4 w-4" />
                      <span>{appointment.provider}</span>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-2">
                      Reschedule
                    </Button>
                  </div>
                ))}

                <Button className="w-full" variant="outline">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Schedule New Appointment
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">Recent SOAP Notes</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("soap")}>
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patient.notes.slice(0, 2).map((note) => (
                    <div key={note.id} className="border rounded-md p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{note.type}</div>
                        <div className="text-sm text-slate-500">{note.date}</div>
                      </div>
                      <div className="text-sm text-slate-500 mb-2">Provider: {note.provider}</div>
                      <Separator className="my-2" />
                      <div className="grid grid-cols-1 gap-3 text-sm">
                        <div>
                          <div className="font-medium mb-1">Subjective</div>
                          <p className="text-slate-700">{note.soap.subjective.substring(0, 120)}...</p>
                        </div>
                        <div>
                          <div className="font-medium mb-1">Assessment</div>
                          <p className="text-slate-700">{note.soap.assessment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="soap" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-900">SOAP Notes</h2>
            <Button onClick={() => setIsAddingNote(true)}>
              <FilePlus className="h-4 w-4 mr-2" />
              Add New Note
            </Button>
          </div>
          
          {isAddingNote && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">New SOAP Note</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-medium mb-2">Subjective</div>
                  <Textarea 
                    placeholder="Patient's reported symptoms, concerns, and history..."
                    value={newSoapNote.subjective}
                    onChange={(e) => setNewSoapNote({...newSoapNote, subjective: e.target.value})}
                    className="min-h-[100px]"
                  />
                </div>
                <div>
                  <div className="font-medium mb-2">Objective</div>
                  <Textarea 
                    placeholder="Clinical observations, test results, measurements..."
                    value={newSoapNote.objective}
                    onChange={(e) => setNewSoapNote({...newSoapNote, objective: e.target.value})}
                    className="min-h-[100px]"
                  />
                </div>
                <div>
                  <div className="font-medium mb-2">Assessment</div>
                  <Textarea 
                    placeholder="Diagnosis, clinical impressions, problem list..."
                    value={newSoapNote.assessment}
                    onChange={(e) => setNewSoapNote({...newSoapNote, assessment: e.target.value})}
                    className="min-h-[100px]"
                  />
                </div>
                <div>
                  <div className="font-medium mb-2">Plan</div>
                  <Textarea 
                    placeholder="Treatment plan, goals, next steps..."
                    value={newSoapNote.plan}
                    onChange={(e) => setNewSoapNote({...newSoapNote, plan: e.target.value})}
                    className="min-h-[100px]"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddingNote(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveNote}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Note
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="space-y-4">
            {patient.notes.map((note) => (
              <Card key={note.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-medium">{note.type}</CardTitle>
                      <div className="text-sm text-slate-500">
                        {note.date} • Provider: {note.provider}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => duplicateNote(note)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="font-medium mb-2">Subjective</div>
                    <p className="text-slate-700 text-sm">{note.soap.subjective}</p>
                  </div>
                  <Separator />
                  <div>
                    <div className="font-medium mb-2">Objective</div>
                    <p className="text-slate-700 text-sm">{note.soap.objective}</p>
                  </div>
                  <Separator />
                  <div>
                    <div className="font-medium mb-2">Assessment</div>
                    <p className="text-slate-700 text-sm">{note.soap.assessment}</p>
                  </div>
                  <Separator />
                  <div>
                    <div className="font-medium mb-2">Plan</div>
                    <p className="text-slate-700 text-sm">{note.soap.plan}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="appointments" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-900">Appointments</h2>
            <Button>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Appointment
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patient.appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.service}</TableCell>
                      <TableCell>{appointment.provider}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          appointment.status === "Completed" 
                            ? "bg-green-50 text-green-700" 
                            : "bg-blue-50 text-blue-700"
                        }`}>
                          {appointment.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="invoices" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-900">Invoices</h2>
            <Button>
              <File className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patient.invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.description}</TableCell>
                      <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          invoice.status === "Paid" 
                            ? "bg-green-50 text-green-700" 
                            : "bg-yellow-50 text-yellow-700"
                        }`}>
                          {invoice.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="messages" className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Message History</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {patient.messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.sender === patient.name ? 'justify-start' : 'justify-end'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === patient.name 
                          ? 'bg-slate-100 text-slate-900' 
                          : 'bg-noushy-600 text-white'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-sm">{message.sender}</span>
                        <span className="text-xs opacity-70">{message.date}</span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Textarea placeholder="Type your message here..." className="mb-2" />
                <div className="flex justify-end">
                  <Button>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientDetail;
