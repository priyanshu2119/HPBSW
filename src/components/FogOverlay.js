import React from 'react';

const fogLayers = [
  { opacity: 0.18, blur: 18, speed: 60, top: '0%', left: '0%', width: '120vw', height: '60vh' },
  { opacity: 0.12, blur: 32, speed: 90, top: '30%', left: '10%', width: '100vw', height: '50vh' },
  { opacity: 0.10, blur: 24, speed: 120, top: '60%', left: '0%', width: '120vw', height: '40vh' },
];

export default function FogOverlay() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: 2,
      overflow: 'hidden',
      mixBlendMode: 'lighten',
    }}>
      {fogLayers.map((layer, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: layer.top,
            left: layer.left,
            width: layer.width,
            height: layer.height,
            opacity: layer.opacity,
            filter: `blur(${layer.blur}px)`,
            background: 'radial-gradient(ellipse at 50% 50%, #e3eafc 0%, #8bb4f8 60%, transparent 100%)',
            animation: `fogMove${i} ${layer.speed}s linear infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes fogMove0 {
          0% { transform: translateX(0px) translateY(0px); }
          100% { transform: translateX(40px) translateY(20px); }
        }
        @keyframes fogMove1 {
          0% { transform: translateX(0px) translateY(0px); }
          100% { transform: translateX(-60px) translateY(30px); }
        }
        @keyframes fogMove2 {
          0% { transform: translateX(0px) translateY(0px); }
          100% { transform: translateX(30px) translateY(-20px); }
        }
      `}</style>
    </div>
  );
} 