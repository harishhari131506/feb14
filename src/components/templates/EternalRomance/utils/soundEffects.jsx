// Sound effects utility
// You can add your own sound files to the public folder and reference them here

export const playSound = (soundName, volume = 0.5) => {
    try {
        const audio = new Audio(`/sounds/${soundName}.mp3`);
        audio.volume = volume;
        audio.play().catch((error) => {
            // Silently fail if sound file doesn't exist
            console.log(`Sound ${soundName} not found`);
        });
    } catch (error) {
        console.log(`Error playing sound ${soundName}`);
    }
};

// Predefined sound effects
export const sounds = {
    buttonClick: () => playSound("click", 0.3),
    celebration: () => playSound("celebration", 0.6),
    heartBeat: () => playSound("heartbeat", 0.4),
    sparkle: () => playSound("sparkle", 0.3),
    success: () => playSound("success", 0.5),
};

// Create audio context for more advanced sound effects
export const createTone = (frequency, duration, volume = 0.1) => {
    try {
        const audioContext = new (window.AudioContext || (window).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = "sine";

        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
        console.log("Web Audio API not supported");
    }
};

// Celebration sound sequence
export const playCelebrationSequence = () => {
    // Play a sequence of tones for celebration
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C, E, G, C (C major chord)
    notes.forEach((note, index) => {
        setTimeout(() => {
            createTone(note, 0.3, 0.15);
        }, index * 150);
    });
};
