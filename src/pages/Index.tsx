import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { toast } from "sonner";
import GlassCard from "@/components/GlassCard";
import StepIndicator from "@/components/StepIndicator";
import LogoIcon from "@/components/LogoIcon";
import StepOne from "@/components/steps/StepOne";
import StepTwo from "@/components/steps/StepTwo";
import StepThree from "@/components/steps/StepThree";
import FloatingParticles from "@/components/FloatingParticles";
import backgroundImage from "@/assets/background.jpg";

const steps = [
  { number: 1, label: "Personal" },
  { number: 2, label: "Preferences" },
  { number: 3, label: "Complete" },
];

interface StepOneData {
  firstName: string;
  lastName: string;
  company: string;
  role: string;
  password: string;
  agreed: boolean;
}

interface StepTwoData {
  teamSize: string;
  industry: string;
  notifications: {
    email: boolean;
    product: boolean;
    marketing: boolean;
  };
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepOneData, setStepOneData] = useState<StepOneData>({
    firstName: "",
    lastName: "",
    company: "",
    role: "",
    password: "",
    agreed: false,
  });
  const [stepTwoData, setStepTwoData] = useState<StepTwoData>({
    teamSize: "",
    industry: "",
    notifications: {
      email: true,
      product: true,
      marketing: false,
    },
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Parallax mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const backgroundX = useTransform(smoothX, [-0.5, 0.5], [15, -15]);
  const backgroundY = useTransform(smoothY, [-0.5, 0.5], [15, -15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const validateStepOne = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!stepOneData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (stepOneData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (!stepOneData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (stepOneData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    if (!stepOneData.company.trim()) {
      newErrors.company = "Company is required";
    }

    if (!stepOneData.role) {
      newErrors.role = "Please select your role";
    }

    if (!stepOneData.password) {
      newErrors.password = "Password is required";
    } else if (stepOneData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!stepOneData.agreed) {
      newErrors.agreed = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStepTwo = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!stepTwoData.teamSize) {
      newErrors.teamSize = "Please select your team size";
    }

    if (!stepTwoData.industry) {
      newErrors.industry = "Please select your industry";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStepOneChange = (field: keyof StepOneData, value: string | boolean) => {
    setStepOneData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleStepTwoChange = (
    field: keyof StepTwoData,
    value: string | StepTwoData["notifications"]
  ) => {
    setStepTwoData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleNextFromStepOne = () => {
    if (validateStepOne()) {
      setCurrentStep(2);
    }
  };

  const handleNextFromStepTwo = () => {
    if (validateStepTwo()) {
      setCurrentStep(3);
      toast.success("Account created successfully!", {
        description: "Welcome to Mirrin!",
      });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    setErrors({});
  };

  const handleComplete = () => {
    toast.info("Redirecting to dashboard...");
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden p-4">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          x: backgroundX,
          y: backgroundY,
          scale: 1.1,
        }}
      />
      
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Content */}
      <div className="relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <GlassCard>
          {/* Top Section - Welcome & Progress */}
          <motion.div
            className="flex flex-col relative text-center bg-black/10 p-8 items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {/* Logo & Brand */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <LogoIcon />
              <h1 className="leading-tight text-5xl font-normal text-foreground tracking-tighter mb-2">
                Welcome to Mirrin
              </h1>
              <p className="leading-relaxed text-sm font-light text-foreground/80">
                Let's get you set up with your brand new account in just a few simple steps.
              </p>
            </motion.div>

            {/* Progress Steps */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <StepIndicator steps={steps} currentStep={currentStep} />
            </motion.div>
          </motion.div>

          {/* Bottom Section - Onboarding Form */}
          <div className="flex flex-col p-8 justify-start overflow-y-auto min-h-[400px]">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <StepOne
                  key="step-1"
                  data={stepOneData}
                  errors={errors}
                  onChange={handleStepOneChange}
                  onNext={handleNextFromStepOne}
                />
              )}
              {currentStep === 2 && (
                <StepTwo
                  key="step-2"
                  data={stepTwoData}
                  errors={errors}
                  onChange={handleStepTwoChange}
                  onNext={handleNextFromStepTwo}
                  onBack={handleBack}
                />
              )}
              {currentStep === 3 && (
                <StepThree
                  key="step-3"
                  firstName={stepOneData.firstName}
                  onComplete={handleComplete}
                  onBack={handleBack}
                />
              )}
            </AnimatePresence>

            {/* Footer - Only show on steps 1 and 2 */}
            {currentStep < 3 && (
              <motion.div
                className="text-center mt-auto pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <p className="text-sm font-normal text-foreground/70 mb-3">
                  Already have an account?{" "}
                  <a
                    href="#"
                    className="text-foreground hover:opacity-80 transition-opacity font-semibold ml-1"
                  >
                    Sign in here
                  </a>
                </p>
                <div className="flex gap-4 text-xs font-normal text-foreground/50 items-center justify-center">
                  <a href="#" className="hover:text-foreground/70 transition-colors">
                    Help Center
                  </a>
                  <span>•</span>
                  <a href="#" className="hover:text-foreground/70 transition-colors">
                    Contact Support
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </GlassCard>
      </motion.div>
      </div>
    </div>
  );
};

export default Index;
