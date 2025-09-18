import { CheckCircle, FileText, Users, DollarSign, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SummaryData {
  totalFields: number;
  mappedFields: number;
  unmappedFields: number;
  validationsPassed: number;
  validationsFailed: number;
  dataType: 'patient-master' | 'fee-structure';
  uploadDate: string;
  fileName: string;
}

interface SummaryScreenProps {
  summaryData: SummaryData;
  onFinalize: () => void;
  onBackToValidation: () => void;
}

const SummaryScreen = ({ summaryData, onFinalize, onBackToValidation }: SummaryScreenProps) => {
  const mappingPercentage = Math.round((summaryData.mappedFields / summaryData.totalFields) * 100);
  const validationPercentage = summaryData.validationsPassed + summaryData.validationsFailed > 0 
    ? Math.round((summaryData.validationsPassed / (summaryData.validationsPassed + summaryData.validationsFailed)) * 100)
    : 100;

  const getDataTypeIcon = () => {
    return summaryData.dataType === 'patient-master' ? <Users className="w-5 h-5" /> : <DollarSign className="w-5 h-5" />;
  };

  const getDataTypeLabel = () => {
    return summaryData.dataType === 'patient-master' ? 'Patient Master Data' : 'Fee Structure Data';
  };

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-success" />
            <span>Import Summary</span>
          </CardTitle>
          <CardDescription>
            Review the complete summary of your data import and field mapping
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Import Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <FileText className="w-5 h-5" />
              <span>Import Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Data Type:</span>
              <div className="flex items-center space-x-2">
                {getDataTypeIcon()}
                <span className="font-medium">{getDataTypeLabel()}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">File Name:</span>
              <span className="font-medium">{summaryData.fileName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Upload Date:</span>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">{summaryData.uploadDate}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Fields:</span>
              <Badge variant="outline" className="font-bold">
                {summaryData.totalFields}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Field Mapping Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Mapped Fields:</span>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-success text-success-foreground">
                    {summaryData.mappedFields}
                  </Badge>
                  <span className="text-sm text-muted-foreground">({mappingPercentage}%)</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Unmapped Fields:</span>
                <Badge variant="outline" className="text-muted-foreground">
                  {summaryData.unmappedFields}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Mapping Progress</span>
                <span>{mappingPercentage}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-success h-2 rounded-full transition-all duration-300"
                  style={{ width: `${mappingPercentage}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Validation Results */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Validation Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-success-light rounded-lg">
              <div className="text-2xl font-bold text-success">{summaryData.validationsPassed}</div>
              <div className="text-sm text-success">Validations Passed</div>
            </div>
            <div className="text-center p-4 bg-destructive-light rounded-lg">
              <div className="text-2xl font-bold text-destructive">{summaryData.validationsFailed}</div>
              <div className="text-sm text-destructive">Validations Failed</div>
            </div>
          </div>
          
          {summaryData.validationsPassed + summaryData.validationsFailed > 0 && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Validation Success Rate</span>
                <span>{validationPercentage}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-success h-2 rounded-full transition-all duration-300"
                  style={{ width: `${validationPercentage}%` }}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Ready to Process */}
      <Card>
        <CardContent className="py-8 text-center">
          <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-success mb-2">Ready to Process</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Your {getDataTypeLabel().toLowerCase()} import is complete and ready for processing. 
            Click "Finalize Import" to complete the process.
          </p>
          {summaryData.validationsFailed > 0 && (
            <div className="bg-warning-light border border-warning/20 rounded-lg p-4 mb-6 max-w-md mx-auto">
              <p className="text-warning text-sm">
                Note: Some validations failed. You may want to review and fix these issues before finalizing.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4">
        <Button variant="outline" onClick={onBackToValidation}>
          Back to Validation
        </Button>
        <Button onClick={onFinalize} className="min-w-32">
          Finalize Import
        </Button>
      </div>
    </div>
  );
};

export default SummaryScreen;