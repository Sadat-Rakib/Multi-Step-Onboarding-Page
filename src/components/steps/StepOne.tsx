import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import GlassInput from "@/components/GlassInput";
import GlassDropdown from "@/components/GlassDropdown";
import GlassButton from "@/components/GlassButton";

interface StepOneData {
  firstName: string;
  lastName: string;
  company: string;
  role: string;
  password: string;
  agreed: boolean;
}

interface StepOneProps {
  data: StepOneData;
  errors: Record<string, string>;
  onChange: (field: keyof StepOneData, value: string | boolean) => void;
  onNext: () => void;
}

const roleOptions = [
  { value: "designer", label: "Designer" },
  { value: "developer", label: "Developer" },
  { value: "manager", label: "Manager" },
  { value: "founder", label: "Founder" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "other", label: "Other" },
];

const StepOne = ({ data, errors, onChange, onNext }: StepOneProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex flex-col"
    >
      {/* Header */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0, duration: 0.4, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-medium text-foreground mb-2">
          Tell us about yourself
        </h2>
        <p className="text-sm font-normal text-foreground/70">
          Step 1 of 3 • This helps us personalize your experience
        </p>
      </motion.div>

      {/* Form */}
      <div className="flex-1 mb-6 space-y-4">
        {/* Name Fields */}
        <motion.div 
          className="grid grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
        >
          <GlassInput
            label="First name"
            id="firstName"
            placeholder="John"
            value={data.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            error={errors.firstName}
          />
          <GlassInput
            label="Last name"
            id="lastName"
            placeholder="Doe"
            value={data.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            error={errors.lastName}
          />
        </motion.div>

        {/* Company & Role */}
        <motion.div 
          className="grid grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
        >
          <GlassInput
            label="Company"
            id="company"
            placeholder="Acme Corp"
            value={data.company}
            onChange={(e) => onChange("company", e.target.value)}
            error={errors.company}
          />
          <GlassDropdown
            label="Your role"
            placeholder="Select your role"
            options={roleOptions}
            value={data.role}
            onChange={(value) => onChange("role", value)}
            error={errors.role}
          />
        </motion.div>

        {/* Password */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
        >
          <GlassInput
            label="Create password"
            id="password"
            type="password"
            placeholder="Minimum 8 characters"
            value={data.password}
            onChange={(e) => onChange("password", e.target.value)}
            error={errors.password}
          />
        </motion.div>

        {/* Terms Checkbox */}
        <motion.div 
          className="flex gap-3 pt-2 items-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
        >
          <input
            type="checkbox"
            checked={data.agreed}
            onChange={(e) => onChange("agreed", e.target.checked)}
            className="w-4 h-4 mt-0.5 bg-foreground/20 border-foreground/30 rounded focus:ring-0 focus:ring-offset-0 accent-foreground"
          />
          <div>
            <p className="leading-relaxed text-sm font-normal text-foreground/70">
              I agree to the{" "}
              <a
                href="#"
                className="text-foreground hover:opacity-80 transition-opacity font-medium underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-foreground hover:opacity-80 transition-opacity font-medium underline"
              >
                Privacy Policy
              </a>
            </p>
            {errors.agreed && (
              <motion.p 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-400 mt-1"
              >
                {errors.agreed}
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div 
          className="pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
        >
          <GlassButton
            type="button"
            onClick={onNext}
            icon={<ArrowRight size={16} />}
          >
            Continue to Step 2
          </GlassButton>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StepOne;
