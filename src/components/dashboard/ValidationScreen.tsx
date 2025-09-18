import { AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ValidationResult {
  id: string;
  field: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  suggestion?: string;
}

interface ValidationScreenProps {
  validationResults: ValidationResult[];
  onContinueToSummary: () => void;
  onBackToMapping: () => void;
}

const ValidationScreen = ({ validationResults, onContinueToSummary, onBackToMapping }: ValidationScreenProps) => {
  const errors = validationResults.filter(r => r.type === 'error');
  const warnings = validationResults.filter(r => r.type === 'warning');
  const infos = validationResults.filter(r => r.type === 'info');

  const getIcon = (type: ValidationResult['type']) => {
    switch (type) {
      case 'error':
        return <XCircle className="w-4 h-4 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'info':
        return <Info className="w-4 h-4 text-info" />;
    }
  };

  const getBadgeVariant = (type: ValidationResult['type']) => {
    switch (type) {
      case 'error':
        return 'destructive';
      case 'warning':
        return 'secondary';
      case 'info':
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Validation Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-success" />
            <span>Validation Complete</span>
          </CardTitle>
          <CardDescription>
            Field mapping validation has been completed. Please review the results below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-destructive-light rounded-lg">
              <div className="text-2xl font-bold text-destructive">{errors.length}</div>
              <div className="text-sm text-destructive">Errors</div>
            </div>
            <div className="text-center p-4 bg-warning-light rounded-lg">
              <div className="text-2xl font-bold text-warning">{warnings.length}</div>
              <div className="text-sm text-warning">Warnings</div>
            </div>
            <div className="text-center p-4 bg-info-light rounded-lg">
              <div className="text-2xl font-bold text-info">{infos.length}</div>
              <div className="text-sm text-info">Information</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Validation Results */}
      {validationResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Validation Results</CardTitle>
            <CardDescription>
              Review and address the following validation findings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {validationResults.map((result) => (
              <Alert key={result.id} className="border-l-4" style={{
                borderLeftColor: result.type === 'error' ? 'hsl(var(--destructive))' : 
                                result.type === 'warning' ? 'hsl(var(--warning))' : 
                                'hsl(var(--info))'
              }}>
                <div className="flex items-start space-x-3">
                  {getIcon(result.type)}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{result.field}</span>
                      <Badge variant={getBadgeVariant(result.type)} className="text-xs">
                        {result.type.toUpperCase()}
                      </Badge>
                    </div>
                    <AlertDescription className="text-sm">
                      {result.message}
                    </AlertDescription>
                    {result.suggestion && (
                      <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
                        <strong>Suggestion:</strong> {result.suggestion}
                      </div>
                    )}
                  </div>
                </div>
              </Alert>
            ))}
          </CardContent>
        </Card>
      )}

      {/* No Issues Found */}
      {validationResults.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-success mb-2">All Validations Passed!</h3>
            <p className="text-muted-foreground">
              No validation issues were found. Your field mappings are ready for processing.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4">
        <Button variant="outline" onClick={onBackToMapping}>
          Back to Mapping
        </Button>
        <Button 
          onClick={onContinueToSummary}
          disabled={errors.length > 0}
          className="min-w-32"
        >
          {errors.length > 0 ? 'Fix Errors First' : 'Continue to Summary'}
        </Button>
      </div>
    </div>
  );
};

export default ValidationScreen;