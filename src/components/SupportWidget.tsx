import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, Send, Paperclip, Minimize2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Message {
  id: string;
  sender: "user" | "atum";
  text: string;
  timestamp: Date;
}

interface Ticket {
  id: string;
  subject: string;
  status: "Open" | "In Progress" | "Resolved";
  lastUpdate: Date;
  messages: number;
}

const SupportWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "atum",
      text: "Hello! I'm Atum, your support assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "TICKET001",
      subject: "Payment Issue",
      status: "In Progress",
      lastUpdate: new Date(Date.now() - 2 * 60 * 60 * 1000),
      messages: 3,
    },
    {
      id: "TICKET002",
      subject: "Template Customization",
      status: "Resolved",
      lastUpdate: new Date(Date.now() - 24 * 60 * 60 * 1000),
      messages: 5,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate Atum's response
    setTimeout(() => {
      const atumResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "atum",
        text: "Thanks for your message! I'm processing your request. A human team member will respond shortly if needed.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, atumResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleCreateTicket = () => {
    if (!ticketSubject.trim() || !ticketDescription.trim()) return;

    const newTicket: Ticket = {
      id: `TICKET${String(tickets.length + 1).padStart(3, "0")}`,
      subject: ticketSubject,
      status: "Open",
      lastUpdate: new Date(),
      messages: 1,
    };

    setTickets([newTicket, ...tickets]);
    setTicketSubject("");
    setTicketDescription("");
    
    // Add confirmation message
    const confirmMessage: Message = {
      id: Date.now().toString(),
      sender: "atum",
      text: `Your ticket #${newTicket.id} has been created successfully. Our team will respond within 24 hours.`,
      timestamp: new Date(),
    };
    setMessages([...messages, confirmMessage]);
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <>
      {/* Support Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-glow hover:scale-110 transition-transform z-50 animate-scale-in"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Support Widget */}
      {isOpen && (
        <Card
          className={`fixed bottom-6 right-6 w-[400px] border-border shadow-glow z-50 transition-all duration-300 ${
            isMinimized ? "h-14" : "h-[600px]"
          } animate-scale-in`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-primary/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Atum Support</h3>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          {!isMinimized && (
            <Tabs defaultValue="chat" className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-2 rounded-none bg-muted/50">
                <TabsTrigger value="chat">Live Chat</TabsTrigger>
                <TabsTrigger value="tickets">My Tickets</TabsTrigger>
              </TabsList>

              {/* Chat Tab */}
              <TabsContent value="chat" className="flex-1 flex flex-col m-0 h-[490px]">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "user" ? "justify-end" : "justify-start"
                      } animate-fade-in`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {formatTimestamp(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start animate-fade-in">
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                          <div
                            className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                          <div
                            className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="flex-shrink-0">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} size="icon" className="flex-shrink-0">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Tickets Tab */}
              <TabsContent value="tickets" className="flex-1 flex flex-col m-0 h-[490px]">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* Create Ticket Form */}
                  <Card className="p-4 bg-muted/30 border-border">
                    <h4 className="font-semibold mb-3 text-sm">Create New Ticket</h4>
                    <div className="space-y-3">
                      <Input
                        value={ticketSubject}
                        onChange={(e) => setTicketSubject(e.target.value)}
                        placeholder="Subject"
                        className="text-sm"
                      />
                      <Textarea
                        value={ticketDescription}
                        onChange={(e) => setTicketDescription(e.target.value)}
                        placeholder="Describe your issue..."
                        className="text-sm min-h-[80px]"
                      />
                      <Button onClick={handleCreateTicket} size="sm" className="w-full">
                        Create Ticket
                      </Button>
                    </div>
                  </Card>

                  {/* Existing Tickets */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm mb-2">Your Tickets</h4>
                    {tickets.map((ticket) => (
                      <Card
                        key={ticket.id}
                        className="p-3 border-border hover:shadow-glow transition-all cursor-pointer animate-fade-in"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-semibold text-sm">{ticket.subject}</h5>
                          <Badge
                            variant="secondary"
                            className={
                              ticket.status === "Resolved"
                                ? "bg-green-500/20 text-green-700"
                                : ticket.status === "In Progress"
                                ? "bg-blue-500/20 text-blue-700"
                                : "bg-orange-500/20 text-orange-700"
                            }
                          >
                            {ticket.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <span>#{ticket.id}</span>
                          <span>{ticket.messages} messages</span>
                          <span>{formatTimestamp(ticket.lastUpdate)}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </Card>
      )}
    </>
  );
};

export default SupportWidget;

