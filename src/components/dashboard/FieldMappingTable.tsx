import { Check, X, AlertTriangle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FieldMapping {
  id: string;
  sourceField: string;
  mappedField?: string;
  status: 'mapped' | 'unmapped' | 'partial' | 'error';
  confidence?: number;
  dataType?: string;
  sampleData?: string;
}

interface FieldMappingTableProps {
  mappings: FieldMapping[];
  baseFields: string[];
  onFieldMap: (mappingId: string, targetField: string) => void;
  onSaveTemplate: () => void;
  onValidateAndContinue: () => void;
}

const FieldMappingTable = ({ 
  mappings, 
  baseFields, 
  onFieldMap, 
  onSaveTemplate,
  onValidateAndContinue 
}: FieldMappingTableProps) => {
  const getStatusIcon = (status: FieldMapping['status']) => {
    switch (status) {
      case 'mapped':
        return <Check className="w-4 h-4 text-success" />;
      case 'partial':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'error':
        return <X className="w-4 h-4 text-destructive" />;
      default:
        return <X className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: FieldMapping['status'], confidence?: number) => {
    switch (status) {
      case 'mapped':
        return (
          <Badge variant="secondary" className="bg-success-light text-success border-success/20">
            Mapped {confidence && `(${confidence}%)`}
          </Badge>
        );
      case 'partial':
        return (
          <Badge variant="secondary" className="bg-warning-light text-warning border-warning/20">
            Partial {confidence && `(${confidence}%)`}
          </Badge>
        );
      case 'error':
        return (
          <Badge variant="secondary" className="bg-destructive-light text-destructive border-destructive/20">
            Error
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-muted-foreground">
            Unmapped
          </Badge>
        );
    }
  };

  const mappedCount = mappings.filter(m => m.status === 'mapped').length;
  const totalCount = mappings.length;

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground">Mapping Progress</h3>
            <p className="text-sm text-muted-foreground">
              {mappedCount} of {totalCount} fields mapped
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-success">{mappedCount}</div>
              <div className="text-xs text-muted-foreground">Mapped</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-muted-foreground">{totalCount - mappedCount}</div>
              <div className="text-xs text-muted-foreground">Remaining</div>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-success h-2 rounded-full transition-all duration-300"
              style={{ width: `${(mappedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Mapping Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Field Mappings</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">Source Field</th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">Data Type</th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">Sample Data</th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">Mapped Field</th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mappings.map((mapping, index) => (
                <tr 
                  key={mapping.id} 
                  className={cn(
                    "border-b border-border hover:bg-muted/30 transition-colors",
                    index % 2 === 0 ? "bg-background" : "bg-muted/10"
                  )}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(mapping.status)}
                      <span className="font-medium text-foreground">{mapping.sourceField}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <Badge variant="outline" className="text-xs">
                      {mapping.dataType || 'TEXT'}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-muted-foreground">
                      {mapping.sampleData || 'N/A'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {mapping.status === 'unmapped' ? (
                      <Select onValueChange={(value) => onFieldMap(mapping.id, value)}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Select target field" />
                        </SelectTrigger>
                        <SelectContent>
                          {baseFields.map((field) => (
                            <SelectItem key={field} value={field}>
                              {field}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <span className="font-medium text-foreground">
                        {mapping.mappedField}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {getStatusBadge(mapping.status, mapping.confidence)}
                  </td>
                  <td className="py-4 px-6">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4">
        <Button variant="outline" onClick={onSaveTemplate}>
          Save as Template
        </Button>
        <Button onClick={onValidateAndContinue} disabled={mappedCount === 0}>
          Validate & Continue
        </Button>
      </div>
    </div>
  );
};

export default FieldMappingTable;