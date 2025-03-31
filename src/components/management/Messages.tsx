
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Inbox,
  Send,
  Archive,
  Trash2,
  Filter,
  StarIcon,
  ChevronRight,
  User,
  FileText,
  Calendar,
  Clock,
  MoreVertical,
  MessageSquare,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock conversation data
const conversations = [
  {
    id: 1,
    patient: {
      id: 1,
      name: "Sarah Johnson",
      avatar: null,
    },
    lastMessage: {
      content: "Yes, I've been doing the exercises as recommended. The pain has decreased significantly.",
      timestamp: new Date("2023-06-22T14:30:00"),
      sender: "patient",
    },
    unread: true,
  },
  {
    id: 2,
    patient: {
      id: 2,
      name: "Michael Brown",
      avatar: null,
    },
    lastMessage: {
      content: "I might need to reschedule my appointment next week due to a work conflict.",
      timestamp: new Date("2023-06-22T11:15:00"),
      sender: "patient",
    },
    unread: true,
  },
  {
    id: 3,
    patient: {
      id: 3,
      name: "Emily Davis",
      avatar: null,
    },
    lastMessage: {
      content: "Thank you for sending the exercise instructions. I'll follow them carefully.",
      timestamp: new Date("2023-06-21T16:45:00"),
      sender: "patient",
    },
    unread: false,
  },
  {
    id: 4,
    patient: {
      id: 4,
      name: "James Wilson",
      avatar: null,
    },
    lastMessage: {
      content: "Your cervical exercises should be performed twice daily, 10 repetitions each time.",
      timestamp: new Date("2023-06-20T09:30:00"),
      sender: "staff",
    },
    unread: false,
  },
  {
    id: 5,
    patient: {
      id: 5,
      name: "Sophia Martinez",
      avatar: null,
    },
    lastMessage: {
      content: "I've attached a PDF with instructions for the home exercises we discussed today.",
      timestamp: new Date("2023-06-19T15:20:00"),
      sender: "staff",
    },
    unread: false,
  },
];

// Mock message history for a conversation
const messageHistory = [
  {
    id: 101,
    content: "Hello Dr. Lee, I wanted to ask about the exercises you recommended for my shoulder.",
    timestamp: new Date("2023-06-22T10:30:00"),
    sender: "patient",
    read: true,
  },
  {
    id: 102,
    content: "Hi Sarah, of course. Which exercise specifically are you having trouble with?",
    timestamp: new Date("2023-06-22T10:45:00"),
    sender: "staff",
    read: true,
  },
  {
    id: 103,
    content: "The external rotation with the resistance band. I'm not sure if I'm doing it correctly.",
    timestamp: new Date("2023-06-22T11:00:00"),
    sender: "patient",
    read: true,
  },
  {
    id: 104,
    content: "I understand. Make sure your elbow is at a 90-degree angle and tucked close to your side. The movement should be slow and controlled, rotating outward against the band's resistance.",
    timestamp: new Date("2023-06-22T11:15:00"),
    sender: "staff",
    read: true,
  },
  {
    id: 105,
    content: "Would it help if I send you a video demonstrating the proper technique?",
    timestamp: new Date("2023-06-22T11:16:00"),
    sender: "staff",
    read: true,
  },
  {
    id: 106,
    content: "That would be very helpful, thank you!",
    timestamp: new Date("2023-06-22T11:30:00"),
    sender: "patient",
    read: true,
  },
  {
    id: 107,
    content: "I'll record one and send it to you shortly. In the meantime, remember to warm up before exercises and stop if you feel any sharp pain.",
    timestamp: new Date("2023-06-22T11:45:00"),
    sender: "staff",
    read: true,
  },
  {
    id: 108,
    content: "Yes, I've been doing the exercises as recommended. The pain has decreased significantly.",
    timestamp: new Date("2023-06-22T14:30:00"),
    sender: "patient",
    read: true,
  },
];

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const filteredConversations = conversations.filter(conversation =>
    conversation.patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // In a real app, this would send the message to the backend
    console.log("Sending message:", newMessage);
    
    // Clear the input
    setNewMessage("");
  };

  const formatMessageDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return format(date, "h:mm a");
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return format(date, "MMM d");
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-slate-900">Messages</h1>
        <p className="text-slate-500">Secure messaging with patients</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Conversations Sidebar */}
        <Card className="overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-slate-900">Conversations</h2>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Message
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search messages..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex border-b text-sm">
            <Button variant="ghost" className="flex-1 rounded-none py-2 h-auto">
              <Inbox className="h-4 w-4 mr-2" />
              Inbox
            </Button>
            <Button variant="ghost" className="flex-1 rounded-none py-2 h-auto">
              <Send className="h-4 w-4 mr-2" />
              Sent
            </Button>
            <Button variant="ghost" className="flex-1 rounded-none py-2 h-auto">
              <Archive className="h-4 w-4 mr-2" />
              Archived
            </Button>
          </div>
          
          <div className="overflow-y-auto max-h-[500px]">
            {filteredConversations.length === 0 ? (
              <div className="p-6 text-center text-slate-500">
                No conversations found
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-3 border-b cursor-pointer transition-colors ${
                    selectedConversation?.id === conversation.id
                      ? "bg-slate-100"
                      : "hover:bg-slate-50"
                  } ${conversation.unread ? "bg-blue-50 hover:bg-blue-100" : ""}`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center">
                      <div className="bg-noushy-100 rounded-full p-1.5 mr-3">
                        <User className="h-5 w-5 text-noushy-600" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">
                          {conversation.patient.name}
                          {conversation.unread && (
                            <span className="ml-2 inline-block w-2 h-2 bg-noushy-600 rounded-full"></span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-slate-500">
                      {formatMessageDate(conversation.lastMessage.timestamp)}
                    </div>
                  </div>
                  <div className="pl-9">
                    <p className="text-sm text-slate-600 truncate">
                      {conversation.lastMessage.sender === "staff" && "You: "}
                      {conversation.lastMessage.content}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Message Content */}
        <Card className="lg:col-span-2 flex flex-col h-[600px]">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-noushy-100 rounded-full p-2 mr-3">
                    <User className="h-5 w-5 text-noushy-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-slate-900">
                      {selectedConversation.patient.name}
                    </h2>
                    <div className="text-xs text-slate-500">
                      Patient ID: #{selectedConversation.patient.id}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    View Records
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Mark as Unread</DropdownMenuItem>
                      <DropdownMenuItem>Archive Conversation</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Delete Conversation</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messageHistory.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "staff" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "staff"
                          ? "bg-noushy-600 text-white"
                          : "bg-slate-100 text-slate-900"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className="text-xs mt-1 opacity-70 text-right">
                        {format(message.timestamp, "h:mm a")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Type your message here..."
                    className="min-h-[80px]"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Template
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      Attach File
                    </Button>
                  </div>
                  <Button onClick={handleSendMessage}>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-6">
                <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="font-medium text-slate-900 mb-1">No conversation selected</h3>
                <p className="text-slate-500 text-sm">
                  Select a conversation from the list to view the messages.
                </p>
              </div>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default Messages;
