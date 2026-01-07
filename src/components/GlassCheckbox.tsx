import { cn } from "@/lib/utils";

interface GlassCheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}

const GlassCheckbox = ({
  id,
  checked,
  onChange,
  label,
  description,
}: GlassCheckboxProps) => {
  return (
    <div className="relative overflow-hidden rounded-xl">
      <div className="absolute z-0 inset-0 backdrop-blur-sm" />
      <div className="z-10 absolute inset-0 bg-foreground/5" />
      <div className="absolute inset-0 z-20 glass-inset-input" />
      <label
        htmlFor={id}
        className="z-30 relative flex items-start gap-3 p-3 cursor-pointer"
      >
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className={cn(
            "w-4 h-4 mt-0.5 rounded border-foreground/30",
            "bg-foreground/10 focus:ring-0 focus:ring-offset-0",
            "accent-foreground cursor-pointer"
          )}
        />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">{label}</p>
          {description && (
            <p className="text-xs text-foreground/60 mt-0.5">{description}</p>
          )}
        </div>
      </label>
    </div>
  );
};

export default GlassCheckbox;
