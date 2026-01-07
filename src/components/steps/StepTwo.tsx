import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import GlassDropdown from "@/components/GlassDropdown";
import GlassButton from "@/components/GlassButton";
import GlassCheckbox from "@/components/GlassCheckbox";

interface StepTwoData {
  teamSize: string;
  industry: string;
  notifications: {
    email: boolean;
    product: boolean;
    marketing: boolean;
  };
}

interface StepTwoProps {
  data: StepTwoData;
  errors: Record<string, string>;
  onChange: (field: keyof StepTwoData, value: string | StepTwoData["notifications"]) => void;
  onNext: () => void;
  onBack: () => void;
}

const teamSizeOptions = [
  { value: "1", label: "Just me" },
  { value: "2-10", label: "2-10 people" },
  { value: "11-50", label: "11-50 people" },
  { value: "51-200", label: "51-200 people" },
  { value: "200+", label: "200+ people" },
];

const industryOptions = [
  { value: "technology", label: "Technology" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "retail", label: "Retail" },
  { value: "other", label: "Other" },
];

const StepTwo = ({ data, errors, onChange, onNext, onBack }: StepTwoProps) => {
  const handleNotificationChange = (key: keyof StepTwoData["notifications"], value: boolean) => {
    onChange("notifications", {
      ...data.notifications,
      [key]: value,
    });
  };

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
          Set your preferences
        </h2>
        <p className="text-sm font-normal text-foreground/70">
          Step 2 of 3 • Help us tailor Mirrin to your needs
        </p>
      </motion.div>

      {/* Form */}
      <div className="flex-1 mb-6 space-y-4">
        {/* Team Size & Industry */}
        <motion.div 
          className="grid grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
        >
          <GlassDropdown
            label="Team size"
            placeholder="Select team size"
            options={teamSizeOptions}
            value={data.teamSize}
            onChange={(value) => onChange("teamSize", value)}
            error={errors.teamSize}
          />
          <GlassDropdown
            label="Industry"
            placeholder="Select industry"
            options={industryOptions}
            value={data.industry}
            onChange={(value) => onChange("industry", value)}
            error={errors.industry}
          />
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
        >
          <label className="block text-sm font-medium text-foreground mb-3">
            Notification preferences
          </label>
          <div className="space-y-3">
            <GlassCheckbox
              id="email-notifications"
              checked={data.notifications.email}
              onChange={(checked) => handleNotificationChange("email", checked)}
              label="Email notifications"
              description="Receive important updates via email"
            />
            <GlassCheckbox
              id="product-notifications"
              checked={data.notifications.product}
              onChange={(checked) => handleNotificationChange("product", checked)}
              label="Product updates"
              description="Get notified about new features and improvements"
            />
            <GlassCheckbox
              id="marketing-notifications"
              checked={data.notifications.marketing}
              onChange={(checked) => handleNotificationChange("marketing", checked)}
              label="Marketing communications"
              description="Receive tips, offers, and industry insights"
            />
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div 
          className="pt-4 flex gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
        >
          <GlassButton
            type="button"
            onClick={onBack}
            variant="secondary"
            icon={<ArrowLeft size={16} />}
            iconPosition="left"
          >
            Back
          </GlassButton>
          <GlassButton
            type="button"
            onClick={onNext}
            icon={<ArrowRight size={16} />}
            className="flex-1"
          >
            Complete Setup
          </GlassButton>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StepTwo;
