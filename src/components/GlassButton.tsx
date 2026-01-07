import { ReactNode, ButtonHTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "primary" | "secondary";
  iconPosition?: "left" | "right";
}

const GlassButton = ({ 
  children, 
  icon, 
  className, 
  variant = "primary",
  iconPosition = "right",
  disabled,
  ...props 
}: GlassButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-xl cursor-pointer",
        "transition-all duration-300 ease-out",
        variant === "secondary" && "flex-shrink-0",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? "translateY(-2px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: isHovered 
          ? "0 8px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
          : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
    >
      <div className="absolute z-0 inset-0 backdrop-blur-sm" />
      <div 
        className={cn(
          "z-10 absolute inset-0 transition-all duration-300",
          variant === "primary" 
            ? isHovered ? "gradient-button-hover" : "gradient-button" 
            : isHovered ? "bg-foreground/10" : "bg-foreground/5"
        )} 
      />
      <div
        className="absolute inset-0 z-20 transition-all duration-300"
        style={{
          boxShadow: variant === "primary" 
            ? isHovered
              ? `inset 2px 2px 2px 0 rgba(255, 255, 255, 0.6), inset -1px -1px 2px 1px rgba(255, 255, 255, 0.4)`
              : `inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.3)`
            : isHovered
              ? `inset 1px 1px 2px 0 rgba(255, 255, 255, 0.3), inset -1px -1px 2px 1px rgba(255, 255, 255, 0.15)`
              : `inset 1px 1px 1px 0 rgba(255, 255, 255, 0.2), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.1)`,
          borderRadius: "12px",
        }}
      />
      <button
        className={cn(
          "z-30 relative w-full border-none flex gap-2",
          "text-sm font-semibold text-foreground bg-transparent",
          "py-3 px-4 items-center justify-center",
          "transition-all duration-300",
          className
        )}
        disabled={disabled}
        {...props}
      >
        <span 
          className="transition-transform duration-300"
          style={{ transform: isHovered && iconPosition === "right" ? "translateX(-2px)" : "translateX(0)" }}
        >
          {iconPosition === "left" && icon}
        </span>
        <span>{children}</span>
        <span 
          className="transition-transform duration-300"
          style={{ transform: isHovered && iconPosition === "right" ? "translateX(3px)" : "translateX(0)" }}
        >
          {iconPosition === "right" && icon}
        </span>
      </button>
    </div>
  );
};

export default GlassButton;
