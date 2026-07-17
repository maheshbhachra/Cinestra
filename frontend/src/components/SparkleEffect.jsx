
import { useEffect, useState } from 'react';

const SPARKLE_COUNT = 10;

const COLORS = [
  '#FFD700', // gold
  '#FF6B9D', // pink
  '#00E5FF', // cyan
  '#FF3131', // red
  '#B967FF', // purple
  '#39FF14', // green
  '#FFFFFF', // white
];

function SparkleEffect({ trigger }) {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    if (!trigger) return;

    const newSparkles = Array.from({ length: SPARKLE_COUNT }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      angle: (360 / SPARKLE_COUNT) * i + (Math.random() * 20 - 10),
      distance: 40 + Math.random() * 35,
      delay: Math.random() * 0.15,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 10 + Math.random() * 8,
    }));

    setSparkles(newSparkles);

    const timeout = setTimeout(() => setSparkles([]), 700);
    return () => clearTimeout(timeout);
  }, [trigger]);

  if (sparkles.length === 0) return null;

  return (
    <div className="absolute -inset-4 pointer-events-none overflow-visible">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute top-1/2 left-1/2 animate-sparkle-burst"
          style={{
            '--angle': `${s.angle}deg`,
            '--distance': `${s.distance}px`,
            animationDelay: `${s.delay}s`,
            color: s.color,
            fontSize: `${s.size}px`,
            textShadow: `0 0 6px ${s.color}`,
          }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}

export default SparkleEffect;
