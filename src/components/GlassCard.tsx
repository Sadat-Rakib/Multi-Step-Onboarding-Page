import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

const GlassCard = ({ children, className }: GlassCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden cursor-default",
        "max-w-2xl w-full font-semibold text-foreground rounded-3xl mx-4",
        "transition-all duration-500 ease-out",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: isHovered
          ? `0 4px 4px rgba(0, 0, 0, 0.04), 
             0 10px 8px rgba(0, 0, 0, 0.055), 
             0 18px 14px rgba(0, 0, 0, 0.07), 
             0 30px 24px rgba(0, 0, 0, 0.085), 
             0 55px 45px rgba(0, 0, 0, 0.1), 
             0 120px 100px rgba(0, 0, 0, 0.14)`
          : `0 2.8px 2.2px rgba(0, 0, 0, 0.034), 
             0 6.7px 5.3px rgba(0, 0, 0, 0.048), 
             0 12.5px 10px rgba(0, 0, 0, 0.06), 
             0 22.3px 17.9px rgba(0, 0, 0, 0.072), 
             0 41.8px 33.4px rgba(0, 0, 0, 0.086), 
             0 100px 80px rgba(0, 0, 0, 0.12)`,
        transform: isHovered ? "translateY(-4px) scale(1.005)" : "translateY(0) scale(1)",
      }}
    >
      {/* Backdrop blur layer */}
      <div className="absolute z-0 inset-0 backdrop-blur-md overflow-hidden isolate" />
      
      {/* White overlay with hover brightness */}
      <div 
        className={cn(
          "z-10 absolute inset-0 transition-all duration-500",
          isHovered ? "bg-foreground/18" : "bg-foreground/15"
        )} 
      />
      
      {/* Inset shadow border with hover glow */}
      <div
        className="absolute inset-0 z-20 overflow-hidden transition-all duration-500"
        style={{
          boxShadow: isHovered
            ? `inset 2px 2px 2px 0 rgba(255, 255, 255, 0.6), 
               inset -1px -1px 2px 1px rgba(255, 255, 255, 0.6)`
            : `inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5), 
               inset -1px -1px 1px 1px rgba(255, 255, 255, 0.5)`,
          borderRadius: "24px",
        }}
      />
      
      {/* Content */}
      <div className="relative z-30">{children}</div>
    </div>
  );
};

export default GlassCard;
