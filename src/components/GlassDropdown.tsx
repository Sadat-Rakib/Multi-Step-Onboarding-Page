import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface DropdownOption {
  value: string;
  label: string;
}

interface GlassDropdownProps {
  label: string;
  placeholder: string;
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}

const GlassDropdown = ({
  label,
  placeholder,
  options,
  value,
  onChange,
  error,
}: GlassDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownOption | null>(
    options.find((opt) => opt.value === value) || null
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSelect = (option: DropdownOption) => {
    setSelected(option);
    onChange?.(option.value);
    setIsOpen(false);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">
        {label}
      </label>
      <div className="relative" ref={containerRef}>
        {/* Trigger */}
        <div
          className="relative overflow-hidden rounded-xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="absolute z-0 inset-0 backdrop-blur-sm" />
          <div className="z-10 absolute inset-0 bg-foreground/10" />
          <div className="absolute inset-0 z-20 glass-inset-input" />
          <div className="z-30 relative w-full px-4 py-3 text-sm flex items-center justify-between">
            <span className={selected ? "text-foreground" : "text-text-placeholder"}>
              {selected?.label || placeholder}
            </span>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-foreground/50 transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </div>
        </div>

        {/* Dropdown Menu */}
        <div
          className={cn(
            "absolute top-[calc(100%+8px)] left-0 right-0 z-50",
            "opacity-0 invisible -translate-y-2.5",
            "transition-dropdown max-h-[200px] overflow-y-auto scrollbar-thin",
            isOpen && "opacity-100 visible translate-y-0"
          )}
        >
          <div className="relative overflow-hidden rounded-xl">
            <div className="absolute z-0 inset-0 backdrop-blur-lg" />
            <div className="z-10 absolute inset-0 bg-foreground/15" />
            <div className="absolute inset-0 z-20 glass-inset-dropdown" />
            <div className="z-30 relative py-2">
              {options.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    "px-4 py-2 text-sm text-foreground bg-foreground/5",
                    "cursor-pointer transition-colors duration-150",
                    "hover:bg-foreground/15"
                  )}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>
        </div>
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
};

export default GlassDropdown;
