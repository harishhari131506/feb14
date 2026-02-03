/**
 * Sound Design System
 * Subtle audio effects for enhanced emotional experience
 */

class SoundManager {
  constructor() {
    this.sounds = {};
    this.enabled = false;
    this.volume = 0.3;
    this.audioContext = null;
    this.init();
  }

  async init() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('AudioContext not supported');
    }
  }

  async enable() {
    if (!this.audioContext) return;
    
    // Resume audio context (required for user interaction)
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
    
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
    // Stop all sounds
    Object.values(this.sounds).forEach(sound => {
      if (sound && sound.stop) sound.stop();
    });
  }

  // Heartbeat sound using Web Audio API
  playHeartbeat() {
    if (!this.enabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Heartbeat pattern: two quick beats, pause, repeat
    const beatPattern = [
      { time: 0, frequency: 60 },
      { time: 0.1, frequency: 0 },
      { time: 0.15, frequency: 60 },
      { time: 0.25, frequency: 0 },
    ];

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(60, this.audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, this.audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.1);
    gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, this.audioContext.currentTime + 0.15);
    gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.25);

    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 0.3);
  }

  // Paper rustling sound (white noise with envelope)
  playPaperRustle() {
    if (!this.enabled || !this.audioContext) return;

    const bufferSize = this.audioContext.sampleRate * 0.2; // 0.2 seconds
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    // Generate filtered white noise
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }

    const source = this.audioContext.createBufferSource();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();

    filter.type = 'bandpass';
    filter.frequency.value = 2000;
    filter.Q.value = 5;

    source.buffer = buffer;
    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Envelope for natural decay
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.volume * 0.2, this.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.2);

    source.start();
    source.stop(this.audioContext.currentTime + 0.2);
  }

  // Pen writing sound (click-like)
  playPenClick() {
    if (!this.enabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.volume * 0.1, this.audioContext.currentTime + 0.001);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.05);

    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 0.05);
  }

  // Whoosh sound for transitions
  playWhoosh(duration = 0.3) {
    if (!this.enabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + duration);

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.volume * 0.15, this.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + duration);
  }
}

// Singleton instance
const soundManager = new SoundManager();

export default soundManager;
