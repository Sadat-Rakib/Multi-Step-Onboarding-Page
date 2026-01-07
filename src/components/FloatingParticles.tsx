import { motion } from "framer-motion";
import { useMemo } from "react";

interface Particle {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  opacity: number;
}

const FloatingParticles = () => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 15 + 20,
      delay: Math.random() * -20,
      opacity: Math.random() * 0.3 + 0.1,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
            filter: `blur(${particle.size > 4 ? 1 : 0}px)`,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Larger glowing orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            width: 80 + i * 30,
            height: 80 + i * 30,
            left: `${15 + i * 18}%`,
            top: `${20 + (i % 3) * 25}%`,
            background: `radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)`,
          }}
          animate={{
            y: [0, -30 - i * 5, 0],
            x: [0, 20 - i * 8, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12 + i * 3,
            delay: i * -2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;