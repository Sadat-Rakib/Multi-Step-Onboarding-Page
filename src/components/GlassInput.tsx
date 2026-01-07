import { forwardRef, InputHTMLAttributes } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ label, className, id, error, ...props }, ref) => {
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
        <div 
          className={cn(
            "relative overflow-hidden rounded-xl transition-all duration-200",
            error && "ring-1 ring-red-400/50"
          )}
        >
          <div className="absolute z-0 inset-0 backdrop-blur-sm" />
          <div className="z-10 absolute inset-0 bg-foreground/10" />
          <div className="absolute inset-0 z-20 glass-inset-input" />
          <input
            ref={ref}
            id={id}
            className={cn(
              "z-30 relative bg-transparent w-full px-4 py-3 text-sm",
              "placeholder:text-text-placeholder text-foreground",
              "border-none focus:outline-none focus:ring-0",
              className
            )}
            {...props}
          />
        </div>
        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -5, height: 0 }}
              transition={{ duration: 0.2 }}
              className="text-xs text-red-400 mt-1.5"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

GlassInput.displayName = "GlassInput";

export default GlassInput;
