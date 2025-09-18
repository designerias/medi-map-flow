import { CheckCircle, Clock, X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending' | 'error';
}

interface ProgressTrackerProps {
  steps: Step[];
}

const ProgressTracker = ({ steps }: ProgressTrackerProps) => {
  const getStepIcon = (status: Step['status'], index: number) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-success" />;
      case 'current':
        return <Clock className="w-6 h-6 text-warning" />;
      case 'error':
        return <X className="w-6 h-6 text-destructive" />;
      default:
        return (
          <div className="w-6 h-6 rounded-full bg-muted border-2 border-border flex items-center justify-center">
            <span className="text-sm font-medium text-muted-foreground">{index + 1}</span>
          </div>
        );
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex-1 relative">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center mb-2">
                {getStepIcon(step.status, index)}
              </div>
              <div className="text-center">
                <h3 className={cn(
                  "font-semibold text-sm mb-1",
                  step.status === 'completed' && "text-success",
                  step.status === 'current' && "text-warning",
                  step.status === 'error' && "text-destructive",
                  step.status === 'pending' && "text-muted-foreground"
                )}>
                  {step.title}
                </h3>
                <p className="text-xs text-muted-foreground max-w-[120px]">
                  {step.description}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="absolute top-3 left-1/2 w-full h-0.5 bg-border -z-10">
                <div 
                  className={cn(
                    "h-full transition-all duration-300",
                    steps[index + 1].status === 'completed' ? "bg-success" : "bg-border"
                  )}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;