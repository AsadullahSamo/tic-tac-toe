import confetti from 'canvas-confetti';

const emoji = ['🎉', '🎈', '🎊', '✨', '🌟', '⭐'];

function createSticker(x: number, y: number, shape: string) {
  const defaults = {
    origin: { x, y },
    particleCount: 1,
    spread: 360,
    startVelocity: 30,
    gravity: 0.8,
    drift: 0,
    scalar: 3,
    ticks: 100,
    shapes: [shape as any as confetti.Shape],
    colors: ['#FFD700', '#FF69B4', '#00FF88', '#87CEEB', '#DDA0DD'],
  };

  confetti(defaults);
}

export function triggerWinConfetti() {
  let stickersCreated = 0;
  const maxStickers = 15;
  const duration = 2000;

  
  const interval = setInterval(() => {
    if (stickersCreated >= maxStickers) {
      clearInterval(interval);
      return;
    }

    const x = 0.2 + Math.random() * 0.6;
    const y = 0.2 + Math.random() * 0.6;
    const shape = emoji[Math.floor(Math.random() * emoji.length)];
    createSticker(x, y, shape);
    stickersCreated++;
  }, duration / maxStickers);

  
  setTimeout(() => {
    const end = Date.now() + 1000;
    const colors = ['#FFD700', '#FF69B4', '#00FF88', '#87CEEB', '#DDA0DD'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, duration);
}
