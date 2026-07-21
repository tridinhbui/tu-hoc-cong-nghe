// Sound manager using Web Audio API to synthesize game sound effects in the browser.
// This is extremely lightweight, requires 0 network asset requests, and works offline.

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

if (typeof window !== "undefined") {
  // Read preference from localStorage if set
  const saved = localStorage.getItem("thtcdn_games_sound");
  if (saved !== null) {
    soundEnabled = saved === "true";
  }
}

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  // Resume context if suspended (browsers auto-suspend audio context until user interaction)
  if (audioCtx && audioCtx.state === "suspended") {
    void audioCtx.resume();
  }
  return audioCtx;
}

export const soundManager = {
  isEnabled(): boolean {
    return soundEnabled;
  },

  setEnabled(enabled: boolean) {
    soundEnabled = enabled;
    if (typeof window !== "undefined") {
      localStorage.setItem("thtcdn_games_sound", String(enabled));
    }
  },

  playCorrect() {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    // Nice bright square-triangle hybrid (sine with a bit of triangle tone)
    osc.type = "triangle";
    
    // Play a quick ascending major third chord step
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
    
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.start(now);
    osc.stop(now + 0.35);
  },

  playWrong() {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sawtooth";
    const now = ctx.currentTime;
    
    // Sad pitch drop
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.25);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.start(now);
    osc.stop(now + 0.26);
  },

  playCombo(comboCount: number) {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sine";
    const now = ctx.currentTime;

    // Pitch increases with combo count
    const baseFreq = 523.25; // C5
    const multiplier = 1 + (comboCount * 0.12);
    const freq = baseFreq * multiplier;

    osc.frequency.setValueAtTime(freq, now);
    
    // Subtle vibrato/slide up
    osc.frequency.exponentialRampToValueAtTime(freq * 1.05, now + 0.15);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.start(now);
    osc.stop(now + 0.25);
  },

  playPowerup() {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sine";
    const now = ctx.currentTime;

    // Retro arcade pitch sweep up
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.35);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.start(now);
    osc.stop(now + 0.36);
  },

  playFreeze() {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    // Crystal ice chiming sound (using multiple sine oscillators)
    const now = ctx.currentTime;
    const freqs = [880, 1100, 1320, 1760]; // bright harmonic cluster
    
    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(f, now);
      
      // Delay play times slightly for arpeggio effect
      const start = now + (idx * 0.04);
      gain.gain.setValueAtTime(0, now);
      gain.gain.setValueAtTime(0.04, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);
      
      osc.start(now);
      osc.stop(start + 0.45);
    });
  },

  playWin() {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Classic C-E-G-C victory arpeggio
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      
      const start = now + idx * 0.08;
      gain.gain.setValueAtTime(0, now);
      gain.gain.setValueAtTime(0.06, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.5);
      
      osc.start(now);
      osc.stop(start + 0.6);
    });
  }
};
