import { useState } from "react";
import Sidebar from "./Sidebar";
import ProgressTracker from "./ProgressTracker";
import UploadSection from "./UploadSection";
import FieldMappingTable from "./FieldMappingTable";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("patient-master");
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [fieldCount, setFieldCount] = useState<number>(0);

  const steps = [
    {
      id: "upload",
      title: "Data Upload",
      description: uploadStatus === 'success' ? `${fieldCount} fields uploaded successfully` : "Select and upload your data file",
      status: (uploadStatus === 'success' ? 'completed' : uploadStatus === 'uploading' ? 'current' : 'pending') as 'completed' | 'current' | 'pending' | 'error'
    },
    {
      id: "mapping",
      title: "Auto Mapping",
      description: "75 matched, 25 unmapped",
      status: (uploadStatus === 'success' ? 'current' : 'pending') as 'completed' | 'current' | 'pending' | 'error'
    },
    {
      id: "validation",
      title: "Validation",
      description: "Awaiting validation",
      status: 'pending' as 'completed' | 'current' | 'pending' | 'error'
    },
    {
      id: "summary",
      title: "Summary",
      description: "Final review",
      status: 'pending' as 'completed' | 'current' | 'pending' | 'error'
    }
  ];

  // Sample field mappings data
  const fieldMappings = [
    {
      id: "1",
      sourceField: "patient_id",
      mappedField: "Patient ID",
      status: "mapped" as const,
      confidence: 98,
      dataType: "NUMBER",
      sampleData: "12345"
    },
    {
      id: "2",
      sourceField: "first_name",
      mappedField: "First Name",
      status: "mapped" as const,
      confidence: 95,
      dataType: "TEXT",
      sampleData: "John"
    },
    {
      id: "3",
      sourceField: "surname",
      mappedField: "Last Name",
      status: "partial" as const,
      confidence: 78,
      dataType: "TEXT",
      sampleData: "Smith"
    },
    {
      id: "4",
      sourceField: "dob",
      mappedField: undefined,
      status: "unmapped" as const,
      dataType: "DATE",
      sampleData: "1990-01-15"
    },
    {
      id: "5",
      sourceField: "phone_number",
      mappedField: "Phone",
      status: "mapped" as const,
      confidence: 92,
      dataType: "TEXT",
      sampleData: "+1-555-0123"
    },
    {
      id: "6",
      sourceField: "email_addr",
      mappedField: undefined,
      status: "unmapped" as const,
      dataType: "EMAIL",
      sampleData: "john.smith@email.com"
    }
  ];

  const baseFields = [
    "Patient ID",
    "First Name", 
    "Last Name",
    "Date of Birth",
    "Phone",
    "Email",
    "Address",
    "Insurance Number",
    "Emergency Contact",
    "Medical Record Number"
  ];

  const handleFileUpload = (file: File) => {
    setUploadStatus('uploading');
    setUploadedFile(file.name);
    
    // Simulate upload process
    setTimeout(() => {
      setUploadStatus('success');
      setFieldCount(Math.floor(Math.random() * 50) + 50); // Random field count between 50-100
    }, 2000);
  };

  const handleFieldMap = (mappingId: string, targetField: string) => {
    console.log(`Mapping field ${mappingId} to ${targetField}`);
    // In a real app, you'd update the mapping state here
  };

  const handleSaveTemplate = () => {
    console.log("Saving template...");
  };

  const handleValidateAndContinue = () => {
    console.log("Validating and continuing...");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <ProgressTracker steps={steps} />
          
          {uploadStatus === 'idle' || uploadStatus === 'uploading' ? (
            <UploadSection
              onFileUpload={handleFileUpload}
              uploadStatus={uploadStatus}
              uploadedFileName={uploadedFile || undefined}
              fieldCount={fieldCount}
            />
          ) : (
            <FieldMappingTable
              mappings={fieldMappings}
              baseFields={baseFields}
              onFieldMap={handleFieldMap}
              onSaveTemplate={handleSaveTemplate}
              onValidateAndContinue={handleValidateAndContinue}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;