import React, { useRef, useEffect } from 'react';

const VibratingStrings = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let mouse = { x: undefined, y: undefined };

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (event) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    const numStrings = 50;
    const strings = [];
    for (let i = 0; i < numStrings; i++) {
      strings.push({
        y: (canvas.height / (numStrings - 1)) * i,
        angle: Math.random() * 10,
        amplitude: 5,
        frequency: 0.01 + (Math.random() * 0.02),
        color: `hsl(160, 100%, ${50 + Math.random() * 30}%)`
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      strings.forEach(string => {
        ctx.beginPath();
        ctx.moveTo(0, string.y);
        ctx.strokeStyle = string.color;
        ctx.lineWidth = 1;

        let dynamicAmplitude = string.amplitude;
        if(mouse.x !== undefined){
            const dist = Math.abs(string.y - mouse.y);
            if(dist < 50) {
                dynamicAmplitude = (1 - dist / 50) * 40 + string.amplitude;
            }
        }
        
        for (let x = 0; x < canvas.width; x++) {
          const y = string.y + Math.sin(x * 0.03 + string.angle) * dynamicAmplitude * Math.sin(string.angle);
          ctx.lineTo(x, y);
        }
        ctx.stroke();
        string.angle += string.frequency;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="vibrating-strings-section">
      <canvas ref={canvasRef} className="vibrating-strings-canvas"></canvas>
    </section>
  );
};

export default VibratingStrings;
