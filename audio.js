// ============================================================================
// APEX BEAST: Sound & Speech Synthesis System
// 100% Offline, Zero external assets, Web Audio API + Web Speech API
// Bulletproof compatibility for Windows Surface, iPad / iOS Safari, Chrome, Edge
// ============================================================================

class ApexAudioManager {
  constructor() {
    this.audioCtx = null;
    this.soundEnabled = true;
    this.speechEnabled = true;
    this.masterGain = null;
    this.voice = null;
    this.voicesLoaded = false;
    this.lastSpokenTime = 0;
    this.activeUtterance = null;
    this.isUnlocked = false;

    this.initAudioContext();
    this.initSpeech();
  }

  // --------------------------------------------------------------------------
  // Web Audio Context & Multi-Platform Unlock (Surface + iPad)
  // --------------------------------------------------------------------------
  initAudioContext() {
    const unlockHandler = () => {
      this.unlock();
    };

    ['click', 'touchstart', 'touchend', 'keydown', 'pointerdown'].forEach(evt => {
      document.addEventListener(evt, unlockHandler, { once: false, passive: true });
    });
  }

  unlock() {
    if (this.isUnlocked && this.audioCtx && this.audioCtx.state === 'running') {
      return;
    }

    try {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          this.audioCtx = new AudioContextClass();
          this.masterGain = this.audioCtx.createGain();
          this.masterGain.gain.setValueAtTime(0.35, this.audioCtx.currentTime);
          this.masterGain.connect(this.audioCtx.destination);
        }
      }

      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      // iOS Safari Unlock Trick: play 1 frame of silent buffer
      if (this.audioCtx && this.audioCtx.state === 'running') {
        const buffer = this.audioCtx.createBuffer(1, 1, 22050);
        const source = this.audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(this.audioCtx.destination);
        source.start(0);
        this.isUnlocked = true;
      }

      // Warm up SpeechSynthesis (iOS Safari requires this on user gesture)
      if ('speechSynthesis' in window && !this.voicesLoaded) {
        this.refreshVoices();
      }
    } catch (e) {
      console.warn("Audio unlock error:", e);
    }
  }

  ensureContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
        this.masterGain = this.audioCtx.createGain();
        this.masterGain.gain.setValueAtTime(0.35, this.audioCtx.currentTime);
        this.masterGain.connect(this.audioCtx.destination);
      }
    }
    if (this.audioCtx && !this.masterGain) {
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(0.35, this.audioCtx.currentTime);
      this.masterGain.connect(this.audioCtx.destination);
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // --------------------------------------------------------------------------
  // Speech Synthesis (English Pronunciation) - Bulletproof iPad & Windows
  // --------------------------------------------------------------------------
  initSpeech() {
    if (!('speechSynthesis' in window)) return;

    this.refreshVoices();

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = () => this.refreshVoices();
    }
  }

  refreshVoices() {
    if (!('speechSynthesis' in window)) return;
    try {
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        this.voicesLoaded = true;
        // Prioritize natural sounding English voices
        this.voice = voices.find(v => (v.lang === 'en-US' || v.lang === 'en-GB') && 
          (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel') || v.name.includes('Alex') || v.name.includes('Karen') || v.name.includes('David') || v.name.includes('Zira')))
          || voices.find(v => v.lang.startsWith('en-US'))
          || voices.find(v => v.lang.startsWith('en'))
          || voices[0];
      }
    } catch (e) {
      console.warn("Voice refresh error:", e);
    }
  }

  speak(text, force = false) {
    if (!this.speechEnabled || !('speechSynthesis' in window)) return;

    // Throttle frequent speech during rapid clicking unless forced (e.g. card listen button)
    const now = Date.now();
    if (!force && (now - this.lastSpokenTime < 1100)) {
      return;
    }
    this.lastSpokenTime = now;

    try {
      const cleanText = text.replace(/[^a-zA-Z0-9\s]/g, '').trim();
      if (!cleanText) return;

      // Resume speech synthesis if suspended or paused
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      // Create new Utterance
      const utterance = new SpeechSynthesisUtterance(cleanText);

      // WebKit GC Fix: store reference on window/instance so iOS doesn't kill it
      this.activeUtterance = utterance;
      window._activeSpeechUtterance = utterance;

      if (!this.voice && !this.voicesLoaded) {
        this.refreshVoices();
      }

      if (this.voice) {
        utterance.voice = this.voice;
      }
      utterance.lang = 'en-US';
      utterance.rate = 0.92; // Deliberate and clear for special needs learning
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      utterance.onend = () => {
        this.activeUtterance = null;
        window._activeSpeechUtterance = null;
      };

      utterance.onerror = (e) => {
        console.warn("Speech utterance error:", e);
        this.activeUtterance = null;
      };

      // Safely queue speech without calling cancel() in the same tick (which breaks iOS & Edge!)
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis error:", e);
    }
  }

  // --------------------------------------------------------------------------
  // Synthesized Animal Sound Cues (Web Audio API - 100% Offline)
  // --------------------------------------------------------------------------
  playAnimalSound(animalId) {
    if (!this.soundEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    switch (animalId) {
      case 'dog':
        // Punchy double bark
        this.synthBark(ctx, now);
        break;

      case 'cat':
        // Smooth purr-meow sweep
        this.synthMeow(ctx, now);
        break;

      case 'bird':
        // High chirping avian frequency sweep
        this.synthChirp(ctx, now);
        break;

      case 'fish':
        // Hydro bubble splash
        this.synthSplash(ctx, now);
        break;

      case 'frog':
        // Low resonant ribbit croak
        this.synthCroak(ctx, now);
        break;

      case 'wolf':
        // Eerie ascending pack howl
        this.synthHowl(ctx, now);
        break;

      case 'bear':
      case 'gorilla':
      case 'rhino':
        // Heavy bass ground slam & growl
        this.synthRoar(ctx, now, 80, 0.45);
        break;

      case 'snake':
        // Sharp venomous hiss
        this.synthHiss(ctx, now);
        break;

      case 'shark':
      case 'crocodile':
        // Serrated hydraulic jaw chomp
        this.synthChomp(ctx, now);
        break;

      case 'eagle':
      case 'falcon':
        // Piercing supersonic raptor screech
        this.synthScreech(ctx, now);
        break;

      case 'tiger':
      case 'lion':
        // Majestic predator apex roar
        this.synthRoar(ctx, now, 120, 0.55);
        break;

      case 'dragon':
        // Massive inferno blast + low rumble
        this.synthDragon(ctx, now);
        break;

      default:
        // Default energetic tech pulse
        this.playUpgrade();
        break;
    }
  }

  synthBark(ctx, now) {
    // Two quick acoustic barks
    [0, 0.14].forEach((delay) => {
      const t = now + delay;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(110, t + 0.1);

      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.1);
    });
  }

  synthMeow(ctx, now) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(550, now + 0.35);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.35);
  }

  synthChirp(ctx, now) {
    [0, 0.08, 0.16].forEach((delay) => {
      const t = now + delay;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1600 + Math.random() * 400, t);
      osc.frequency.exponentialRampToValueAtTime(2600, t + 0.05);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.06);
    });
  }

  synthSplash(ctx, now) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.2);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  synthCroak(ctx, now) {
    [0, 0.12].forEach((delay) => {
      const t = now + delay;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(130, t);
      osc.frequency.exponentialRampToValueAtTime(90, t + 0.09);

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.09);
    });
  }

  synthHowl(ctx, now) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(520, now + 0.35);
    osc.frequency.exponentialRampToValueAtTime(380, now + 0.7);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.75);
  }

  synthRoar(ctx, now, baseFreq = 100, duration = 0.5) {
    const osc = ctx.createOscillator();
    const sub = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    sub.type = 'triangle';

    osc.frequency.setValueAtTime(baseFreq * 1.5, now);
    osc.frequency.linearRampToValueAtTime(baseFreq * 0.6, now + duration);

    sub.frequency.setValueAtTime(baseFreq * 0.8, now);
    sub.frequency.linearRampToValueAtTime(40, now + duration);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    sub.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    sub.start(now);
    osc.stop(now + duration);
    sub.stop(now + duration);
  }

  synthHiss(ctx, now) {
    const bufferSize = ctx.sampleRate * 0.3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Highpass filter for pure snake hiss
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(2800, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(now);
    noise.stop(now + 0.3);
  }

  synthChomp(ctx, now) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  synthScreech(ctx, now) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(2200, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(900, now + 0.45);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.45);
  }

  synthDragon(ctx, now) {
    this.synthRoar(ctx, now, 140, 0.8);
    // Add fiery whoosh
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(70, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.8);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.8);
  }

  // --------------------------------------------------------------------------
  // Core Gameplay SFX
  // --------------------------------------------------------------------------
  playClick(combo = 1) {
    if (!this.soundEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    const baseFreq = 220 + Math.min(combo * 15, 600);
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.08);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  playSpacebar(combo = 1) {
    if (!this.soundEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const sub = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    sub.type = 'sine';

    const baseFreq = 160 + Math.min(combo * 12, 400);
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);

    sub.frequency.setValueAtTime(baseFreq * 0.5, now);
    sub.frequency.exponentialRampToValueAtTime(30, now + 0.12);

    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    sub.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    sub.start(now);
    osc.stop(now + 0.12);
    sub.stop(now + 0.12);
  }

  // AI Auto-Pulse (Superhuman machine-gun click rhythm)
  playAiPulse() {
    if (!this.soundEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(480, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.04);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  playCritical() {
    if (!this.soundEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(360, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.18);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.18);
  }

  playBuy() {
    if (!this.soundEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.setValueAtTime(659.25, now + 0.05);
    osc.frequency.setValueAtTime(880, now + 0.1);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.22);
  }

  playUpgrade() {
    if (!this.soundEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const now = ctx.currentTime + idx * 0.04;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.18);
    });
  }

  playBeacon() {
    if (!this.soundEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1760, now + 0.35);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.45);
  }

  playFrenzyStart() {
    if (!this.soundEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(880, now + 0.4);

    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.6);
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    return this.soundEnabled;
  }

  toggleSpeech() {
    this.speechEnabled = !this.speechEnabled;
    return this.speechEnabled;
  }

  // Quick Diagnostic Test for Teacher
  testAudio() {
    this.unlock();
    this.playUpgrade();
    this.speak("Apex Beast Audio System Online", true);
  }
}

window.ApexAudioManager = ApexAudioManager;
