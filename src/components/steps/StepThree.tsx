import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import GlassButton from "@/components/GlassButton";

interface StepThreeProps {
  firstName: string;
  onComplete: () => void;
  onBack: () => void;
}

const StepThree = ({ firstName, onComplete, onBack }: StepThreeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex flex-col items-center text-center py-8"
    >
      {/* Success Icon with Confetti */}
      <div className="relative mb-6">
        {/* Confetti particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0.8],
              y: [0, -20 - i * 5, -10],
              x: [0, (i % 2 === 0 ? 1 : -1) * (10 + i * 5), 0],
            }}
            transition={{
              duration: 1.5,
              delay: 0.3 + i * 0.1,
              ease: "easeOut",
            }}
            className="absolute top-1/2 left-1/2"
          >
            <Sparkles 
              size={12 + i * 2} 
              className="text-foreground/60"
              style={{
                transform: `rotate(${i * 60}deg)`,
              }}
            />
          </motion.div>
        ))}
        
        {/* Checkmark circle */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
          className="relative w-20 h-20 rounded-full flex items-center justify-center overflow-hidden"
        >
          <div className="absolute z-0 inset-0 backdrop-blur-sm" />
          <div className="z-10 absolute inset-0 bg-gradient-to-br from-emerald-500/40 to-emerald-600/20" />
          <div
            className="absolute inset-0 z-20"
            style={{
              boxShadow: `inset 3px 3px 2px 0 rgba(255, 255, 255, 0.5), 
                          inset -2px -2px 2px 2px rgba(255, 255, 255, 0.3)`,
              borderRadius: "100%",
            }}
          />
          <Check className="z-30 text-foreground" size={36} strokeWidth={2.5} />
        </motion.div>
      </div>

      {/* Success Message */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
        className="text-3xl font-medium text-foreground mb-2"
      >
        Welcome aboard, {firstName || "there"}!
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.5, ease: "easeOut" }}
        className="text-sm font-normal text-foreground/70 max-w-sm mb-8"
      >
        Your account is all set up. You're ready to explore everything Mirrin has to offer.
      </motion.p>

      {/* Features List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
        className="w-full space-y-3 mb-8"
      >
        {[
          "Access to all premium features",
          "Personalized dashboard",
          "24/7 priority support",
        ].map((feature, index) => (
          <motion.div
            key={feature}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
            className="flex items-center gap-3 text-sm text-foreground/80"
          >
            <div className="w-5 h-5 rounded-full bg-foreground/10 flex items-center justify-center">
              <Check size={12} className="text-foreground" />
            </div>
            <span>{feature}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }}
        className="w-full space-y-3"
      >
        <GlassButton
          type="button"
          onClick={onComplete}
          icon={<ArrowRight size={16} />}
        >
          Go to Dashboard
        </GlassButton>
        <GlassButton
          type="button"
          onClick={onBack}
          variant="secondary"
          icon={<ArrowLeft size={16} />}
          iconPosition="left"
        >
          Go Back
        </GlassButton>
      </motion.div>
    </motion.div>
  );
};

export default StepThree;
