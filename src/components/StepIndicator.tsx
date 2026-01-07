import { cn } from "@/lib/utils";

interface Step {
  number: number;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex items-center gap-3">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center",
                "text-xs font-semibold backdrop-blur-sm transition-all duration-300",
                currentStep === step.number
                  ? "step-active"
                  : "bg-foreground/10"
              )}
            >
              {step.number}
            </div>
            <span
              className={cn(
                "text-xs font-medium hidden sm:block",
                currentStep === step.number
                  ? "text-foreground/90"
                  : "text-foreground/60"
              )}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="w-6 h-px bg-foreground/30" />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
