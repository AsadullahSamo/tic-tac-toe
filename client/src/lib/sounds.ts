import { Howl } from "howler";

let soundEnabled = true;
let soundsInitialized = false;

// Create oscillator-based move sound
const context = new (window.AudioContext || (window as any).webkitAudioContext)();

const createMoveSound = () => {
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(440, context.currentTime); // A4 note
  gainNode.gain.setValueAtTime(0, context.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, context.currentTime + 0.01);
  gainNode.gain.linearRampToValueAtTime(0, context.currentTime + 0.1);

  oscillator.start(context.currentTime);
  oscillator.stop(context.currentTime + 0.1);
};

// Create win sound (multiple tones)
const createWinSound = () => {
  const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
  frequencies.forEach((freq, index) => {
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(freq, context.currentTime + index * 0.1);

    gainNode.gain.setValueAtTime(0, context.currentTime + index * 0.1);
    gainNode.gain.linearRampToValueAtTime(0.2, context.currentTime + index * 0.1 + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, context.currentTime + index * 0.1 + 0.3);

    oscillator.start(context.currentTime + index * 0.1);
    oscillator.stop(context.currentTime + index * 0.1 + 0.3);
  });
};

export const playMove = () => {
  if (soundEnabled) {
    try {
      // Resume audio context if it's suspended (browser autoplay policy)
      if (context.state === 'suspended') {
        context.resume();
      }
      createMoveSound();
    } catch (error) {
      console.warn("Failed to play move sound:", error);
    }
  }
};

export const playWin = () => {
  if (soundEnabled) {
    try {
      // Resume audio context if it's suspended (browser autoplay policy)
      if (context.state === 'suspended') {
        context.resume();
      }
      createWinSound();
    } catch (error) {
      console.warn("Failed to play win sound:", error);
    }
  }
};

export const toggleSound = (enabled: boolean) => {
  soundEnabled = enabled;
  if (enabled && context.state === 'suspended') {
    context.resume();
  }
};

export const isSoundEnabled = () => soundEnabled;