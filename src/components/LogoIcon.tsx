import { Star } from "lucide-react";

const LogoIcon = () => {
  return (
    <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-3 overflow-hidden">
      <div className="absolute z-0 inset-0 backdrop-blur-sm" />
      <div className="z-10 absolute inset-0 gradient-logo" />
      <div
        className="absolute inset-0 z-20"
        style={{
          boxShadow: `inset 3px 3px 2px 0 rgba(255, 255, 255, 0.6), 
                      inset -2px -2px 2px 2px rgba(255, 255, 255, 0.4)`,
          borderRadius: "16px",
        }}
      />
      <Star className="z-30 text-foreground" size={28} strokeWidth={0.75} />
    </div>
  );
};

export default LogoIcon;
