/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class EngineAudio {
  private ctx: AudioContext | null = null;
  private primaryGain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private oscs: { osc: OscillatorNode; gain: GainNode }[] = [];
  private noiseGain: GainNode | null = null;
  private isIgnited = false;
  private currentRPM = 800;
  private targetRPM = 800;
  private rpmInterval: number | null = null;

  constructor() {
    // Lazy loaded to respect browser security policies on audio playback before user interaction
  }

  public init() {
    if (this.ctx) return;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.primaryGain = this.ctx.createGain();
      this.primaryGain.gain.setValueAtTime(0, this.ctx.currentTime);

      // Low pass filter to simulate the exhaust pipe muffler acoustic dampening
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.Q.setValueAtTime(4.0, this.ctx.currentTime); // resonant spike for throatiness

      // Combustion distortion / warmth
      const waveShaper = this.ctx.createWaveShaper();
      waveShaper.curve = this.makeDistortionCurve(15);

      // Generate phase-shifted oscillators to simulate three pistons in a flat-six bank
      const cylinderCount = 3;
      for (let i = 0; i < cylinderCount; i++) {
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();

        // Standard saw and triangle mixes make for rich diesel/gasoline cylinder firing
        osc.type = i % 2 === 0 ? 'sawtooth' : 'triangle';
        
        // Detune cylinders slightly to simulate mechanical micro-imperfections
        const detuneValue = (i - 1) * 12; // in cents
        osc.detune.setValueAtTime(detuneValue, this.ctx.currentTime);

        // Lower gain for individual piston levels
        oscGain.gain.setValueAtTime(0.18, this.ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(waveShaper);
        this.oscs.push({ osc, gain: oscGain });
      }

      // White combustion exhaust puff noise
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      this.noiseGain = this.ctx.createGain();
      // Low noise level
      this.noiseGain.gain.setValueAtTime(0.005, this.ctx.currentTime);

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(40, this.ctx.currentTime);

      noiseSource.connect(noiseFilter);
      noiseFilter.connect(this.noiseGain);
      this.noiseGain.connect(waveShaper);

      // Chain connections
      waveShaper.connect(this.filter);
      this.filter.connect(this.primaryGain);
      this.primaryGain.connect(this.ctx.destination);

      // Start sound sources
      this.oscs.forEach(({ osc }) => osc.start(0));
      noiseSource.start(0);

      this.updateSynthParameters();
    } catch (err) {
      console.error('Failed to initialize synthetic engine sound:', err);
    }
  }

  private makeDistortionCurve(amount: number) {
    const k = typeof amount === 'number' ? amount : 50;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  public ignite() {
    this.init();
    if (!this.ctx || this.isIgnited) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isIgnited = true;
    this.targetRPM = 800;
    this.currentRPM = 200; // start low and roar up to idle

    // Fade primary gain up quickly to represent starting crank noise
    const t = this.ctx.currentTime;
    this.primaryGain?.gain.setTargetAtTime(0.35, t, 0.1);

    // Audio RPM loop to smooth pitch shifts
    if (this.rpmInterval) clearInterval(this.rpmInterval);
    this.rpmInterval = window.setInterval(() => {
      // Smoothly interpolate current RPM to target RPM
      const diff = this.targetRPM - this.currentRPM;
      this.currentRPM += diff * 0.15;
      this.updateSynthParameters();
    }, 16);
  }

  public cutEngine() {
    if (!this.isIgnited || !this.ctx) return;
    this.isIgnited = false;
    
    const t = this.ctx.currentTime;
    this.primaryGain?.gain.setTargetAtTime(0, t, 0.15);

    if (this.rpmInterval) {
      clearInterval(this.rpmInterval);
      this.rpmInterval = null;
    }
  }

  public setRPM(rpm: number) {
    // Constrain RPMs nicely between idle (800) and redline (9000)
    this.targetRPM = Math.max(800, Math.min(9000, rpm));
  }

  private updateSynthParameters() {
    if (!this.ctx || !this.isIgnited) return;

    // RPM to Hz conversion for a flat six cylinder (6 cylinders, 4 cycles: firing rate = RPM * cylinders / (120))
    // we scale the fundamental frequency nicely to match the acoustic timbre
    const baseFreq = 8 + (this.currentRPM / 65);
    const t = this.ctx.currentTime;

    this.oscs.forEach(({ osc, gain }, idx) => {
      // Create interesting harmonics
      const harmonicFactor = idx === 0 ? 1.0 : idx === 1 ? 2.0 : 1.5;
      const targetFreq = baseFreq * harmonicFactor;
      
      // Interpolate frequency to reduce digital pops
      osc.frequency.setTargetAtTime(targetFreq, t, 0.05);

      // Distribute piston loudness at premium high RPMs
      if (this.currentRPM > 4000) {
        gain.gain.setTargetAtTime(0.24, t, 0.1);
      } else {
        gain.gain.setTargetAtTime(0.18, t, 0.1);
      }
    });

    // Revving introduces high exhaust hiss (air filter intake sucking air)
    const exhaustVolume = 0.005 + (this.currentRPM / 9000) * 0.03;
    this.noiseGain?.gain.setTargetAtTime(exhaustVolume, t, 0.1);

    // Filter opens up as RPM goes up (deeper roar => metal intake scream)
    const filterCutoff = 80 + (this.currentRPM / 9000) * 1200;
    this.filter?.frequency.setTargetAtTime(filterCutoff, t, 0.05);

    // Adjust gain slightly dynamically to give rich throttle feedback rumble
    const throttleGain = 0.35 + (this.currentRPM / 9000) * 0.25;
    this.primaryGain?.gain.setTargetAtTime(throttleGain, t, 0.1);
  }

  public getIsIgnited(): boolean {
    return this.isIgnited;
  }

  public getCurrentRPM(): number {
    return this.currentRPM;
  }
}

export const engineAudio = new EngineAudio();
