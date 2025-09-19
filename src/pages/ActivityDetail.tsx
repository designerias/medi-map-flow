import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopBar from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Download, 
  Trash2, 
  FolderOpen, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Database,
  FileText,
  Calendar,
  User
} from "lucide-react";

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock activity data - in real app would fetch by id
  const [activity] = useState({
    id: id || "1",
    accountNumber: "ACC-2024-001",
    module: "Patient Master",
    status: "completed" as "completed" | "in-progress" | "pending",
    createdAt: "2024-01-15T10:30:00Z",
    completedAt: "2024-01-15T11:45:00Z",
    recordsProcessed: 1250,
    recordsTotal: 1250,
    description: "Patient demographic data mapping and validation",
    processingTime: "1h 15m",
    successRate: 98.4,
    errors: 20,
    warnings: 45,
    mappedFields: 24,
    unmappedFields: 3,
    validationsPassed: 1205,
    validationsFailed: 45
  });

  const getStatusIcon = (status: typeof activity.status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-warning" />;
      case "pending":
        return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: typeof activity.status) => {
    switch (status) {
      case "completed":
        return "bg-success-light text-success border-success/20";
      case "in-progress":
        return "bg-warning-light text-warning border-warning/20";
      case "pending":
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long", 
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const progressPercentage = (activity.recordsProcessed / activity.recordsTotal) * 100;

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/activities")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Activities
              </Button>
              <div>
                <div className="flex items-center space-x-3">
                  {getStatusIcon(activity.status)}
                  <h1 className="text-2xl font-bold text-foreground">{activity.module}</h1>
                  <Badge variant="secondary" className={getStatusColor(activity.status)}>
                    {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-1">{activity.description}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <FolderOpen className="w-4 h-4 mr-2" />
                Open
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Backup
              </Button>
              <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Clean
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Account</p>
                    <p className="font-semibold">{activity.accountNumber}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Database className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Records Processed</p>
                    <p className="font-semibold">{activity.recordsProcessed.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Processing Time</p>
                    <p className="font-semibold">{activity.processingTime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <div>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <p className="font-semibold text-success">{activity.successRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Processing Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Processing Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{progressPercentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Mapped Fields</p>
                    <p className="font-semibold text-success">{activity.mappedFields}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Unmapped Fields</p>
                    <p className="font-semibold text-warning">{activity.unmappedFields}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Validations Passed</p>
                    <p className="font-semibold text-success">{activity.validationsPassed}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Validations Failed</p>
                    <p className="font-semibold text-destructive">{activity.validationsFailed}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Errors:</span>
                    <span className="font-medium text-destructive">{activity.errors}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Warnings:</span>
                    <span className="font-medium text-warning">{activity.warnings}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Timeline</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-sm">Activity Created</p>
                      <p className="text-xs text-muted-foreground">{formatDate(activity.createdAt)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-sm">Processing Started</p>
                      <p className="text-xs text-muted-foreground">{formatDate(activity.createdAt)}</p>
                    </div>
                  </div>
                  
                  {activity.completedAt && (
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-sm">Processing Completed</p>
                        <p className="text-xs text-muted-foreground">{formatDate(activity.completedAt)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;