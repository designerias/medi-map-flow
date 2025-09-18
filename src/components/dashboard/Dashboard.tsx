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

  // Different states for different tabs
  const getStepsForTab = (tab: string) => {
    if (tab === "fee-structure") {
      return [
        {
          id: "upload",
          title: "Data Upload",
          description: "127 fields uploaded successfully",
          status: 'completed' as 'completed' | 'current' | 'pending' | 'error'
        },
        {
          id: "mapping",
          title: "Auto Mapping",
          description: "Processing field mappings",
          status: 'current' as 'completed' | 'current' | 'pending' | 'error'
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
    }
    
    // Patient Master steps
    return [
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
  };

  // Sample field mappings data for Patient Master
  const patientMasterMappings = [
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

  // Sample field mappings data for Fee Structure
  const feeStructureMappings = [
    {
      id: "1",
      sourceField: "procedure_code",
      mappedField: "Procedure Code",
      status: "mapped" as const,
      confidence: 95,
      dataType: "TEXT",
      sampleData: "99213"
    },
    {
      id: "2",
      sourceField: "fee_amount",
      mappedField: "Fee Amount",
      status: "mapped" as const,
      confidence: 98,
      dataType: "CURRENCY",
      sampleData: "$150.00"
    },
    {
      id: "3",
      sourceField: "billing_code",
      mappedField: undefined,
      status: "unmapped" as const,
      dataType: "TEXT",
      sampleData: "BL001"
    },
    {
      id: "4",
      sourceField: "service_desc",
      mappedField: "Service Description",
      status: "partial" as const,
      confidence: 72,
      dataType: "TEXT",
      sampleData: "Office Visit"
    },
    {
      id: "5",
      sourceField: "insurance_rate",
      mappedField: undefined,
      status: "unmapped" as const,
      dataType: "CURRENCY",
      sampleData: "$120.00"
    },
    {
      id: "6",
      sourceField: "copay_amount",
      mappedField: "Copay Amount",
      status: "mapped" as const,
      confidence: 89,
      dataType: "CURRENCY",
      sampleData: "$25.00"
    },
    {
      id: "7",
      sourceField: "deductible_amt",
      mappedField: undefined,
      status: "unmapped" as const,
      dataType: "CURRENCY",
      sampleData: "$50.00"
    },
    {
      id: "8",
      sourceField: "provider_rate",
      mappedField: "Provider Rate",
      status: "partial" as const,
      confidence: 68,
      dataType: "CURRENCY",
      sampleData: "$145.00"
    }
  ];

  const getFieldMappingsForTab = (tab: string) => {
    return tab === "fee-structure" ? feeStructureMappings : patientMasterMappings;
  };

  const patientBaseFields = [
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

  const feeBaseFields = [
    "Procedure Code",
    "Fee Amount",
    "Service Description",
    "Copay Amount",
    "Provider Rate",
    "Insurance Rate",
    "Deductible Amount",
    "Billing Code",
    "Modifier Code",
    "Payment Terms"
  ];

  const getBaseFieldsForTab = (tab: string) => {
    return tab === "fee-structure" ? feeBaseFields : patientBaseFields;
  };

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
          <ProgressTracker steps={getStepsForTab(activeTab)} />
          
          {(activeTab === "patient-master" && (uploadStatus === 'idle' || uploadStatus === 'uploading')) ? (
            <UploadSection
              onFileUpload={handleFileUpload}
              uploadStatus={uploadStatus}
              uploadedFileName={uploadedFile || undefined}
              fieldCount={fieldCount}
            />
          ) : (
            <FieldMappingTable
              mappings={getFieldMappingsForTab(activeTab)}
              baseFields={getBaseFieldsForTab(activeTab)}
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