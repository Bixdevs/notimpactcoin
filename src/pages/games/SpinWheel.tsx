import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { useSpinWheelStore } from '../../store/useSpinWheelStore';
import { SpinHistory } from '../../components/games/SpinHistory';
import { useSpinWheel } from '../../hooks/useSpinWheel';
import { segments, PAID_SPIN_COST } from '../../constants/spinWheel';
import { SpinWheelIndicator } from '../../components/games/SpinWheelIndicator';
import { SpinButtons } from '../../components/games/SpinButtons';

export function SpinWheel() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const { coins } = useGameStore();
  const { freeSpins, spinHistory } = useSpinWheelStore();
  const { handleSpin } = useSpinWheel({ 
    isSpinning, 
    setIsSpinning, 
    rotation, 
    setRotation 
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-pink-500 flex flex-col items-center justify-center p-4">
      <div className="relative w-72 h-72">
        <motion.div
          className="w-full h-full rounded-full border-4 border-white shadow-xl"
          style={{ 
            background: `conic-gradient(${segments.map((s, i) => 
              `${s.color} ${i * (360/segments.length)}deg ${(i + 1) * (360/segments.length)}deg`
            ).join(', ')})` 
          }}
          animate={{ rotate: rotation }}
          transition={{ duration: 3, ease: "easeOut" }}
        />
        <SpinWheelIndicator />
      </div>

      <SpinButtons 
        isSpinning={isSpinning}
        freeSpins={freeSpins}
        coins={coins}
        onSpin={handleSpin}
      />

      <SpinHistory history={spinHistory} />
    </div>
  );
}