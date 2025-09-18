import { Upload, File, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface UploadSectionProps {
  onFileUpload: (file: File) => void;
  uploadStatus?: 'idle' | 'uploading' | 'success' | 'error';
  uploadedFileName?: string;
  fieldCount?: number;
}

const UploadSection = ({ 
  onFileUpload, 
  uploadStatus = 'idle', 
  uploadedFileName,
  fieldCount 
}: UploadSectionProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <Card className="p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Data Upload</h2>
        {uploadStatus === 'success' && fieldCount && (
          <div className="flex items-center text-success">
            <CheckCircle className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">{fieldCount} fields uploaded</span>
          </div>
        )}
      </div>

      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center transition-colors hover:border-primary/50">
        <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        
        {uploadStatus === 'idle' && (
          <>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Upload your data file
            </h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop your CSV, Excel, or JSON file here
            </p>
            <Button 
              variant="outline" 
              className="relative"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              Choose File
            </Button>
            <input
              id="file-upload"
              type="file"
              accept=".csv,.xlsx,.xls,.json"
              onChange={handleFileChange}
              className="hidden"
            />
          </>
        )}

        {uploadStatus === 'uploading' && (
          <div className="space-y-2">
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
            <p className="text-sm text-muted-foreground">Uploading file...</p>
          </div>
        )}

        {uploadStatus === 'success' && uploadedFileName && (
          <div className="flex items-center justify-center space-x-2 text-success">
            <File className="w-5 h-5" />
            <span className="font-medium">{uploadedFileName}</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default UploadSection;