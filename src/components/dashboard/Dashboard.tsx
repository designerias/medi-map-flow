import { useState } from "react";
import Sidebar from "./Sidebar";
import ProgressTracker from "./ProgressTracker";
import UploadSection from "./UploadSection";
import FieldMappingTable from "./FieldMappingTable";
import ValidationScreen from "./ValidationScreen";
import SummaryScreen from "./SummaryScreen";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("patient-master");
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [fieldCount, setFieldCount] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<'upload' | 'mapping' | 'validation' | 'summary'>('upload');

  // Update current step when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "fee-structure") {
      setCurrentStep('mapping'); // Fee Structure starts at mapping step
    } else {
      setCurrentStep('upload'); // Patient Master starts at upload step
    }
  };

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
          status: (currentStep === 'mapping' ? 'current' : 
                  currentStep === 'validation' || currentStep === 'summary' ? 'completed' : 'pending') as 'completed' | 'current' | 'pending' | 'error'
        },
        {
          id: "validation",
          title: "Validation",
          description: "Awaiting validation",
          status: (currentStep === 'validation' ? 'current' : 
                  currentStep === 'summary' ? 'completed' : 'pending') as 'completed' | 'current' | 'pending' | 'error'
        },
        {
          id: "summary",
          title: "Summary",
          description: "Final review",
          status: (currentStep === 'summary' ? 'current' : 'pending') as 'completed' | 'current' | 'pending' | 'error'
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
    setCurrentStep('validation');
  };

  const handleBackToMapping = () => {
    setCurrentStep('mapping');
  };

  const handleContinueToSummary = () => {
    setCurrentStep('summary');
  };

  const handleBackToValidation = () => {
    setCurrentStep('validation');
  };

  const handleFinalize = () => {
    console.log("Finalizing import...");
    // Reset to initial state or redirect
    setCurrentStep('upload');
    setActiveTab('patient-master');
  };

  // Sample validation results for Fee Structure
  const validationResults = [
    {
      id: "1",
      field: "billing_code",
      type: "error" as const,
      message: "Field is unmapped and required for billing processing",
      suggestion: "Map this field to 'Billing Code' or 'Procedure Code'"
    },
    {
      id: "2", 
      field: "insurance_rate",
      type: "warning" as const,
      message: "Field is unmapped but optional for fee structure",
      suggestion: "Consider mapping to 'Insurance Rate' for complete data coverage"
    },
    {
      id: "3",
      field: "deductible_amt", 
      type: "warning" as const,
      message: "Field contains currency values but is unmapped",
      suggestion: "Map to 'Deductible Amount' to track patient cost responsibility"
    },
    {
      id: "4",
      field: "service_desc",
      type: "info" as const,
      message: "Field has partial mapping with 72% confidence",
      suggestion: "Review mapping accuracy for 'Service Description'"
    }
  ];

  // Sample summary data
  const summaryData = {
    totalFields: 8,
    mappedFields: 4,
    unmappedFields: 4,
    validationsPassed: 4,
    validationsFailed: 1,
    dataType: activeTab as 'patient-master' | 'fee-structure',
    uploadDate: new Date().toLocaleDateString(),
    fileName: 'fee_structure_2024.xlsx'
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <ProgressTracker steps={getStepsForTab(activeTab)} />
          
          {(() => {
            // Patient Master flow
            if (activeTab === "patient-master") {
              if (uploadStatus === 'idle' || uploadStatus === 'uploading') {
                return (
                  <UploadSection
                    onFileUpload={handleFileUpload}
                    uploadStatus={uploadStatus}
                    uploadedFileName={uploadedFile || undefined}
                    fieldCount={fieldCount}
                  />
                );
              } else {
                return (
                  <FieldMappingTable
                    mappings={getFieldMappingsForTab(activeTab)}
                    baseFields={getBaseFieldsForTab(activeTab)}
                    onFieldMap={handleFieldMap}
                    onSaveTemplate={handleSaveTemplate}
                    onValidateAndContinue={handleValidateAndContinue}
                  />
                );
              }
            }
            
            // Fee Structure flow
            if (activeTab === "fee-structure") {
              if (currentStep === 'mapping') {
                return (
                  <FieldMappingTable
                    mappings={getFieldMappingsForTab(activeTab)}
                    baseFields={getBaseFieldsForTab(activeTab)}
                    onFieldMap={handleFieldMap}
                    onSaveTemplate={handleSaveTemplate}
                    onValidateAndContinue={handleValidateAndContinue}
                  />
                );
              } else if (currentStep === 'validation') {
                return (
                  <ValidationScreen
                    validationResults={validationResults}
                    onContinueToSummary={handleContinueToSummary}
                    onBackToMapping={handleBackToMapping}
                  />
                );
              } else if (currentStep === 'summary') {
                return (
                  <SummaryScreen
                    summaryData={summaryData}
                    onFinalize={handleFinalize}
                    onBackToValidation={handleBackToValidation}
                  />
                );
              }
            }
            
            return null;
          })()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;