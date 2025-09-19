import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "@/components/layout/TopBar";
import Sidebar from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, Plus, Calendar, User, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface Activity {
  id: string;
  accountNumber: string;
  module: string;
  status: "completed" | "in-progress" | "pending";
  createdAt: string;
  completedAt?: string;
  recordsProcessed: number;
  description: string;
}

const Activities = () => {
  const navigate = useNavigate();
  const [activities] = useState<Activity[]>([
    {
      id: "1",
      accountNumber: "ACC-2024-001",
      module: "Patient Master",
      status: "completed",
      createdAt: "2024-01-15T10:30:00Z",
      completedAt: "2024-01-15T11:45:00Z",
      recordsProcessed: 1250,
      description: "Patient demographic data mapping and validation"
    },
    {
      id: "2", 
      accountNumber: "ACC-2024-002",
      module: "Fee Structure",
      status: "completed",
      createdAt: "2024-01-16T09:15:00Z",
      completedAt: "2024-01-16T10:30:00Z",
      recordsProcessed: 785,
      description: "Billing and fee structure configuration"
    },
    {
      id: "3",
      accountNumber: "ACC-2024-003",
      module: "Patient Master",
      status: "in-progress",
      createdAt: "2024-01-17T14:20:00Z",
      recordsProcessed: 0,
      description: "Large dataset patient information processing"
    },
    {
      id: "4",
      accountNumber: "ACC-2024-001",
      module: "Insurance Claims",
      status: "pending",
      createdAt: "2024-01-18T08:00:00Z",
      recordsProcessed: 0,
      description: "Insurance claims data standardization"
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAccountNumber, setNewAccountNumber] = useState("");
  const [selectedModule, setSelectedModule] = useState("");

  const modules = [
    "Patient Master",
    "Fee Structure", 
    "Insurance Claims",
    "Provider Network",
    "Billing Codes",
    "Medical Records"
  ];

  const getStatusIcon = (status: Activity["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-warning" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: Activity["status"]) => {
    switch (status) {
      case "completed":
        return "bg-success-light text-success border-success/20";
      case "in-progress":
        return "bg-warning-light text-warning border-warning/20";
      case "pending":
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const handleAddModule = () => {
    if (!newAccountNumber || !selectedModule) return;
    
    // Check if activity exists for this account/module
    const existingActivity = activities.find(
      a => a.accountNumber === newAccountNumber && a.module === selectedModule
    );
    
    if (existingActivity) {
      navigate(`/activities/${existingActivity.id}`);
    } else {
      // In real app, would create new activity
      console.log("Creating new activity:", { accountNumber: newAccountNumber, module: selectedModule });
    }
    
    setIsAddDialogOpen(false);
    setNewAccountNumber("");
    setSelectedModule("");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short", 
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <div className="flex">
        <Sidebar activeTab="activities" onTabChange={() => {}} />
        
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Activities</h1>
                <p className="text-muted-foreground mt-1">Track and manage your data processing activities</p>
              </div>
              
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary-hover">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Module
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-popover">
                  <DialogHeader>
                    <DialogTitle>Add New Module</DialogTitle>
                    <DialogDescription>
                      Enter account number and select a module to process
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input
                        id="accountNumber"
                        placeholder="e.g., ACC-2024-001"
                        value={newAccountNumber}
                        onChange={(e) => setNewAccountNumber(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="module">Module</Label>
                      <Select value={selectedModule} onValueChange={setSelectedModule}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select a module" />
                        </SelectTrigger>
                        <SelectContent>
                          {modules.map((module) => (
                            <SelectItem key={module} value={module}>
                              {module}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleAddModule} className="w-full">
                      Continue
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {activities.map((activity) => (
                <Card key={activity.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(activity.status)}
                          <CardTitle className="text-lg">{activity.module}</CardTitle>
                        </div>
                        <Badge variant="secondary" className={getStatusColor(activity.status)}>
                          {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/activities/${activity.id}`)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                    <CardDescription>{activity.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-muted-foreground">Account</p>
                          <p className="font-medium">{activity.accountNumber}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-muted-foreground">Records</p>
                          <p className="font-medium">{activity.recordsProcessed.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-muted-foreground">Created</p>
                          <p className="font-medium">{formatDate(activity.createdAt)}</p>
                        </div>
                      </div>
                      {activity.completedAt && (
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-muted-foreground">Completed</p>
                            <p className="font-medium">{formatDate(activity.completedAt)}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;