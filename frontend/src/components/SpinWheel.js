import React, { useEffect, useRef } from 'react';
import './SpinWheel.css';

function SpinWheel({ restaurants, spinning, result }) {
  const canvasRef = useRef(null);
  const rotationRef = useRef(0);
  const animationRef = useRef(null);
  const targetRestaurantRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const size = Math.min(400, window.innerWidth - 80);
    canvas.width = size;
    canvas.height = size;
    const center = size / 2;
    const radius = center - 10;

    const drawWheel = (rotation = 0) => {
      ctx.clearRect(0, 0, size, size);

      if (!restaurants || restaurants.length === 0) {
        ctx.fillStyle = '#f0f0f0';
        ctx.beginPath();
        ctx.arc(center, center, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#666';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Select categories', center, center);
        return;
      }

      const anglePerSlice = (Math.PI * 2) / restaurants.length;
      const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
        '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
        '#FFB347', '#87CEEB', '#DDA0DD', '#F0E68C'
      ];

      // Draw wheel slices
      restaurants.forEach((restaurant, index) => {
        // Calculate angles - start from top (12 o'clock = -π/2)
        // First slice starts at -π/2, then goes clockwise
        const startAngle = -Math.PI / 2 + index * anglePerSlice + rotation;
        const endAngle = -Math.PI / 2 + (index + 1) * anglePerSlice + rotation;

        ctx.beginPath();
        ctx.moveTo(center, center);
        ctx.arc(center, center, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = colors[index % colors.length];
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw restaurant name
        const textAngle = startAngle + anglePerSlice / 2;
        const restaurantName = restaurant.name || restaurant;
        const maxLength = 15;
        const displayName = restaurantName.length > maxLength 
          ? restaurantName.substring(0, maxLength) + '...' 
          : restaurantName;
        
        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(textAngle);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px Arial';
        ctx.fillText(displayName, radius * 0.55, 0);
        ctx.restore();
      });

      // Draw center circle
      ctx.beginPath();
      ctx.arc(center, center, 30, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.strokeStyle = '#667eea';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw pointer at top (fixed position)
      ctx.beginPath();
      ctx.moveTo(center, 10);
      ctx.lineTo(center - 15, 40);
      ctx.lineTo(center + 15, 40);
      ctx.closePath();
      ctx.fillStyle = '#667eea';
      ctx.fill();
    };

    // Handle spinning animation
    if (spinning && restaurants.length > 0) {
      // Find the target restaurant index
      let targetIndex = -1;
      if (result) {
        targetIndex = restaurants.findIndex(r => {
          const name = typeof r === 'string' ? r : r.name;
          return name === result;
        });
        
        if (targetIndex === -1) {
          console.warn('Restaurant not found in wheel:', result);
        } else {
          targetRestaurantRef.current = targetIndex;
        }
      }

      const startRotation = rotationRef.current;
      const startTime = Date.now();
      const duration = 3000;

      // Calculate target rotation
      let targetRotation;
      
      if (targetIndex !== -1) {
        const anglePerSlice = (Math.PI * 2) / restaurants.length;
        
        // When rotation = 0, first restaurant (index 0) starts at -π/2 (top)
        // Restaurant at index i starts at: -π/2 + i * anglePerSlice
        // Restaurant center is at: -π/2 + i * anglePerSlice + anglePerSlice/2
        
        // We want the target restaurant's center to be at the pointer (top = -π/2)
        // So we need: -π/2 + targetIndex * anglePerSlice + anglePerSlice/2 + rotation = -π/2
        // Simplifying: targetIndex * anglePerSlice + anglePerSlice/2 + rotation = 0
        // Therefore: rotation = -(targetIndex * anglePerSlice + anglePerSlice/2)
        
        const restaurantCenterAngle = targetIndex * anglePerSlice + anglePerSlice / 2;
        const baseRotation = -restaurantCenterAngle;
        
        // Add multiple full rotations for visual effect
        const fullRotations = 4 + Math.random() * 2;
        targetRotation = startRotation + fullRotations * Math.PI * 2 + baseRotation;
        
        console.log('Target calculation:', {
          restaurant: result,
          index: targetIndex,
          restaurantCenterAngle: (restaurantCenterAngle * 180 / Math.PI).toFixed(1) + '°',
          baseRotation: (baseRotation * 180 / Math.PI).toFixed(1) + '°',
          fullRotations: fullRotations.toFixed(2),
          targetRotation: (targetRotation * 180 / Math.PI).toFixed(1) + '°'
        });
      } else {
        // Random spin if no target
        targetRotation = startRotation + 1440 + Math.random() * 360;
      }

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        rotationRef.current = startRotation + (targetRotation - startRotation) * easeOut;
        
        drawWheel(rotationRef.current);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Animation complete - normalize rotation to 0-2π
          let finalRotation = targetRotation % (Math.PI * 2);
          if (finalRotation < 0) {
            finalRotation += Math.PI * 2;
          }
          rotationRef.current = finalRotation;
          drawWheel(rotationRef.current);
          
          // Verify the result
          if (targetIndex !== -1) {
            const anglePerSlice = (Math.PI * 2) / restaurants.length;
            // Check which restaurant is at the top (-π/2)
            // After rotation, restaurant i starts at: -π/2 + i * anglePerSlice + finalRotation
            // Restaurant center is at: -π/2 + i * anglePerSlice + anglePerSlice/2 + finalRotation
            // We want to find which restaurant's center is closest to -π/2
            
            let minDiff = Infinity;
            let actualIndex = -1;
            
            for (let i = 0; i < restaurants.length; i++) {
              const centerAngle = -Math.PI / 2 + i * anglePerSlice + anglePerSlice / 2 + finalRotation;
              // Normalize to -π to π range
              let normalizedAngle = centerAngle % (Math.PI * 2);
              if (normalizedAngle > Math.PI) normalizedAngle -= Math.PI * 2;
              if (normalizedAngle < -Math.PI) normalizedAngle += Math.PI * 2;
              
              // Distance from -π/2 (top)
              let diff = Math.abs(normalizedAngle - (-Math.PI / 2));
              if (diff > Math.PI) diff = Math.PI * 2 - diff;
              
              if (diff < minDiff) {
                minDiff = diff;
                actualIndex = i;
              }
            }
            
            if (actualIndex !== -1) {
              const actualRestaurant = restaurants[actualIndex];
              const actualName = typeof actualRestaurant === 'string' ? actualRestaurant : actualRestaurant.name;
              
              if (actualName === result) {
                console.log('✓ Success! Pointer correctly points to:', result);
              } else {
                console.error('❌ MISMATCH!', {
                  expected: result,
                  expectedIndex: targetIndex,
                  actual: actualName,
                  actualIndex: actualIndex,
                  finalRotation: (finalRotation * 180 / Math.PI).toFixed(1) + '°',
                  angleDiff: (minDiff * 180 / Math.PI).toFixed(1) + '°'
                });
              }
            }
          }
        }
      };

      animate();
    } else {
      // Not spinning - just draw the wheel
      drawWheel(rotationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [restaurants, spinning, result]);

  return (
    <div className="spin-wheel-container">
      <canvas ref={canvasRef} className="spin-wheel-canvas" />
      {spinning && <div className="spinning-overlay">Spinning...</div>}
    </div>
  );
}

export default SpinWheel;
