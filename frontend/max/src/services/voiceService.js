/**
 * MAX Voice Service Layer
 * Adapted from Varta's low-latency multilingual voice & RAG system.
 *
 * Core Features:
 * 1. sanitizeMathForSpeech: Translates LaTeX equations, fractions, and symbols into natural spoken language.
 * 2. VoiceRecorderVAD: Client-side Voice Activity Detection with 450ms auto-submission & 2.5s auto-cancel.
 * 3. SpeechSynthesizer: Multilingual zero-egress browser TTS with locale selection.
 */

// ═══════════════════════════════════════════════════════════════════
// 1. Math Speech Sanitizer (Varta Core Innovation)
// ═══════════════════════════════════════════════════════════════════

export function sanitizeMathForSpeech(text) {
  if (!text) return '';
  let s = text;

  // 1. Remove citations, code fences, markdown asterisks/headers
  s = s.replace(/\[Source:[^\]]*\]/gi, ' ');
  s = s.replace(/```[\s\S]*?```/g, ' code block omitted ');
  s = s.replace(/`([^`]+)`/g, '$1');
  s = s.replace(/[#*_~]/g, ' ');

  // 2. Fractions: \frac{a}{b} -> a over b
  s = s.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1 over $2');

  // 3. Square roots & roots: \sqrt{x} -> square root of x
  s = s.replace(/\\sqrt\{([^}]+)\}/g, 'square root of $1');
  s = s.replace(/\\sqrt\[([^\]]+)\]\{([^}]+)\}/g, '$1th root of $2');

  // 4. Powers & exponents: x^2 -> x squared, x^3 -> x cubed, x^n -> x to the power of n
  s = s.replace(/\^2\b/g, ' squared');
  s = s.replace(/\^3\b/g, ' cubed');
  s = s.replace(/\^\{?([a-zA-Z0-9+\-]+)\}?/g, ' to the power of $1');

  // 5. Common mathematical operators and symbols
  const mathReplacements = [
    [/\\times/g, ' times '],
    [/\\div/g, ' divided by '],
    [/\\pm/g, ' plus or minus '],
    [/\\approx/g, ' is approximately '],
    [/\\leq/g, ' is less than or equal to '],
    [/\\geq/g, ' is greater than or equal to '],
    [/\\neq/g, ' is not equal to '],
    [/\\cdot/g, ' times '],
    [/\\pi/g, ' pi '],
    [/\\theta/g, ' theta '],
    [/\\alpha/g, ' alpha '],
    [/\\beta/g, ' beta '],
    [/\\Delta/g, ' delta '],
    [/\\sigma/g, ' sigma '],
    [/\\rho/g, ' rho '],
    [/\\mu/g, ' mu '],
    [/\\sum/g, ' sum of '],
    [/\\int/g, ' integral of '],
    [/\\infty/g, ' infinity '],
    [/\\left|\\right/g, ''],
    [/=/g, ' equals '],
    [/\+/g, ' plus '],
    [/\-/g, ' minus '],
    [/\//g, ' divided by '],
    [/\*/g, ' times '],
    [/\$+/g, ' '],
    [/\\[a-zA-Z]+/g, ' '], // remove leftover LaTeX command slashes
  ];

  for (const [pattern, replacement] of mathReplacements) {
    s = s.replace(pattern, replacement);
  }

  // 6. Clean engineering units for speech
  s = s.replace(/\bMPa\b/g, ' mega pascals ');
  s = s.replace(/\bkPa\b/g, ' kilo pascals ');
  s = s.replace(/\bmm\b/g, ' millimeters ');
  s = s.replace(/\bm\/s\b/g, ' meters per second ');
  s = s.replace(/\bm\^3\/h\b/g, ' cubic meters per hour ');
  s = s.replace(/\bbarg\b/g, ' bar gauge ');

  // Collapse whitespace
  return s.replace(/\s+/g, ' ').trim();
}

// ═══════════════════════════════════════════════════════════════════
// 2. Multilingual Locale Mapping
// ═══════════════════════════════════════════════════════════════════

export function getTTSLocale(lang = 'en') {
  const l = (lang || '').toLowerCase();
  if (l.includes('hin') || l.includes('hi')) return 'hi-IN';
  if (l.includes('ben') || l.includes('bn')) return 'bn-IN';
  if (l.includes('tam') || l.includes('ta')) return 'ta-IN';
  if (l.includes('tel') || l.includes('te')) return 'te-IN';
  if (l.includes('mar') || l.includes('mr')) return 'mr-IN';
  if (l.includes('guj') || l.includes('gu')) return 'gu-IN';
  if (l.includes('kan') || l.includes('kn')) return 'kn-IN';
  if (l.includes('mal') || l.includes('ml')) return 'ml-IN';
  if (l.includes('pan') || l.includes('pa')) return 'pa-IN';
  return 'en-US';
}

// ═══════════════════════════════════════════════════════════════════
// 3. Sweet Human Female Voice Selection & Speech Synthesis
// ═══════════════════════════════════════════════════════════════════

/**
 * Heuristic scoring to find the sweetest, most natural human female voice.
 * Prioritizes neural/natural female voices (Jenny, Aria, Neerja, Zira, Samantha, Google Female)
 * and strictly filters out robotic male voices (David, Mark, George, Guy, Ravi).
 */
export function scoreVoiceForSweetFemale(voice, targetLang = 'en-US') {
  if (!voice) return -999;
  const name = (voice.name || '').toLowerCase();
  const lang = (voice.lang || '').toLowerCase().replace('_', '-');
  const target = (targetLang || 'en-US').toLowerCase().replace('_', '-');
  const targetPrefix = target.split('-')[0];

  let score = 0;

  // Language affinity
  if (lang === target) {
    score += 80;
  } else if (lang.startsWith(targetPrefix)) {
    score += 40;
  }

  // 1. Strictly disqualify male voices
  const maleKeywords = [
    'david', 'george', 'mark', 'guy', 'ravi', 'hemant', 'male', 'paul',
    'stefan', 'richard', 'james', 'john', 'alex', 'daniel', 'fred', 'oliver',
  ];
  for (const m of maleKeywords) {
    if (name.includes(m)) {
      return -1000;
    }
  }

  // 2. High-tier neural/natural female voices (sound indistinguishable from a real woman)
  if (name.includes('natural') || name.includes('neural') || name.includes('online')) {
    score += 150;
  }

  // 3. Specific sweetest natural female personas
  if (name.includes('jenny')) score += 600;      // Microsoft Jenny (sweet, gentle, warm conversational)
  if (name.includes('aria')) score += 580;       // Microsoft Aria (soft, friendly, human female)
  if (name.includes('neerja')) score += 550;     // Microsoft Neerja (sweet, clear Indian-English female)
  if (name.includes('swara')) score += 520;      // Microsoft Swara
  if (name.includes('samantha')) score += 480;   // Apple Samantha (natural female)
  if (name.includes('victoria')) score += 450;   // Apple Victoria
  if (name.includes('karen')) score += 420;      // Apple Karen
  if (name.includes('zira')) score += 350;       // Windows Zira (friendly female system voice)
  if (name.includes('heera')) score += 330;      // Windows Heera (en-IN female)
  if (name.includes('hazel') || name.includes('susan')) score += 320; // Windows UK female
  if (name.includes('kalpana')) score += 310;    // Windows Kalpana (Hindi female)

  // 4. Generic female tokens
  if (name.includes('female') || name.includes('woman') || name.includes('girl')) {
    score += 300;
  }

  // 5. Google clean voices
  if (name.includes('google') && !name.includes('male')) {
    score += 120;
  }

  return score;
}

class SpeechSynthesizer {
  constructor() {
    this.currentUtterance = null;
    this.isSpeaking = false;
    this.onStateChange = null;
    this.cachedVoices = [];
    this.selectedVoiceName = null;
    this.voicesReadyPromise = null;

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this._initVoices();
    }
  }

  _initVoices() {
    this.voicesReadyPromise = new Promise((resolve) => {
      const load = () => {
        const v = window.speechSynthesis.getVoices();
        if (v && v.length > 0) {
          this.cachedVoices = v;
          resolve(v);
        }
      };

      load();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          load();
        };
      }

      // Safety timeout in case onvoiceschanged does not fire
      setTimeout(() => {
        if (this.cachedVoices.length === 0) {
          this.cachedVoices = window.speechSynthesis.getVoices() || [];
        }
        resolve(this.cachedVoices);
      }, 500);
    });
  }

  async getVoices() {
    if (this.cachedVoices.length > 0) return this.cachedVoices;
    if (this.voicesReadyPromise) {
      return await this.voicesReadyPromise;
    }
    if ('speechSynthesis' in window) {
      this.cachedVoices = window.speechSynthesis.getVoices() || [];
    }
    return this.cachedVoices;
  }

  /**
   * Returns list of all detected female voices for UI selection.
   */
  getFemaleVoices(targetLang = 'en-US') {
    const voices = this.cachedVoices.length > 0 ? this.cachedVoices : (window.speechSynthesis?.getVoices() || []);
    return voices
      .filter((v) => scoreVoiceForSweetFemale(v, targetLang) > 0)
      .sort((a, b) => scoreVoiceForSweetFemale(b, targetLang) - scoreVoiceForSweetFemale(a, targetLang));
  }

  /**
   * Find the sweetest human female voice available on the device.
   */
  findSweetFemaleVoice(targetLang = 'en-US') {
    const voices = this.cachedVoices.length > 0 ? this.cachedVoices : (window.speechSynthesis?.getVoices() || []);
    if (!voices || voices.length === 0) return null;

    // If user explicitly picked a voice name, honor it
    if (this.selectedVoiceName) {
      const explicit = voices.find((v) => v.name === this.selectedVoiceName);
      if (explicit) return explicit;
    }

    let bestVoice = null;
    let highestScore = -999;

    for (const v of voices) {
      const score = scoreVoiceForSweetFemale(v, targetLang);
      if (score > highestScore) {
        highestScore = score;
        bestVoice = v;
      }
    }

    // If no female voice scored above 0, fallback to standard language match
    if (!bestVoice || highestScore <= 0) {
      bestVoice = voices.find((v) => v.lang.replace('_', '-').startsWith(targetLang.split('-')[0])) || voices[0];
    }

    return bestVoice;
  }

  setVoice(voiceName) {
    this.selectedVoiceName = voiceName;
  }

  async speak(rawText, options = {}) {
    if (!('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis is not supported in this browser.');
      return false;
    }

    this.stop();

    // Naturalize math, equations, markdown and cadence
    let cleanText = sanitizeMathForSpeech(rawText);
    if (!cleanText) return false;

    // Add gentle cadence pauses for sentence breaks, colons, and lists
    cleanText = cleanText
      .replace(/:\s+/g, '. ')
      .replace(/;\s+/g, ', ')
      .replace(/(\d+)\.\s+/g, '$1, ')
      .replace(/\s{2,}/g, ' ')
      .trim();

    // Ensure voices are loaded
    await this.getVoices();

    const targetLang = options.lang || getTTSLocale(options.languageCode || 'en');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = targetLang;

    // Sweet, warm, natural human female voice settings:
    // Pitch: 1.08 - 1.12 (warm, sweet, gentle feminine timbre; avoids monotone robotic drone)
    // Rate: 0.96 - 0.98 (calm, conversational cadence; avoids rushed mechanical clip)
    utterance.rate = options.rate !== undefined ? options.rate : 0.97;
    utterance.pitch = options.pitch !== undefined ? options.pitch : 1.10;
    utterance.volume = options.volume !== undefined ? options.volume : 1.0;

    const sweetVoice = this.findSweetFemaleVoice(targetLang);
    if (sweetVoice) {
      utterance.voice = sweetVoice;
      console.log(`[MAX Voice] Speaking with sweet female voice: "${sweetVoice.name}" (${sweetVoice.lang})`);
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (this.onStateChange) this.onStateChange(true);
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (this.onStateChange) this.onStateChange(false);
    };

    utterance.onerror = (err) => {
      // Ignore interruption cancellations
      if (err.error !== 'canceled' && err.error !== 'interrupted') {
        console.warn('Speech synthesis error:', err);
      }
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (this.onStateChange) this.onStateChange(false);
    };

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
    return true;
  }

  stop() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (this.onStateChange) this.onStateChange(false);
    }
  }

  toggle(rawText, options = {}) {
    if (this.isSpeaking) {
      this.stop();
      return false;
    }
    return this.speak(rawText, options);
  }

  /**
   * Play a brief preview with the selected sweet female voice
   */
  preview(sampleText = "Hello! I am MAX. I will read out all answers in this natural female voice.") {
    return this.speak(sampleText);
  }
}

export const speechSynthesizer = new SpeechSynthesizer();

// ═══════════════════════════════════════════════════════════════════
// 4. Voice Activity Detection (VAD) & Dual-Pipeline Audio Recorder
// ═══════════════════════════════════════════════════════════════════

export function isSpeechRecognitionSupported() {
  if (typeof window === 'undefined') return false;
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

function flattenAndDownsample(chunks, inputSampleRate, targetSampleRate = 16000) {
  let totalLength = 0;
  for (const chunk of chunks) totalLength += chunk.length;
  const merged = new Float32Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.length;
  }

  if (inputSampleRate === targetSampleRate) return merged;

  const ratio = inputSampleRate / targetSampleRate;
  const newLength = Math.round(totalLength / ratio);
  const result = new Float32Array(newLength);
  let offsetResult = 0;
  let offsetSource = 0;

  while (offsetResult < result.length) {
    const nextOffsetSource = Math.round((offsetResult + 1) * ratio);
    let accum = 0;
    let count = 0;
    for (let i = offsetSource; i < nextOffsetSource && i < merged.length; i++) {
      accum += merged[i];
      count++;
    }
    result[offsetResult] = count > 0 ? accum / count : 0;
    offsetResult++;
    offsetSource = nextOffsetSource;
  }

  return result;
}

function encodeWAV(samples, sampleRate = 16000) {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // Linear PCM
  view.setUint16(22, 1, true); // Mono channel
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true); // byte rate (sampleRate * 2)
  view.setUint16(32, 2, true); // block align
  view.setUint16(34, 16, true); // bits per sample
  writeString(view, 36, 'data');
  view.setUint32(40, samples.length * 2, true);

  let offset = 44;
  for (let i = 0; i < samples.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }

  return new Blob([view], { type: 'audio/wav' });
}

export async function sendAudioToBackend(wavBlob, language = 'en-US') {
  const endpoints = [
    '/api/v1/voice/transcribe',
    '/api/voice/transcribe',
    'http://127.0.0.1:8000/api/v1/voice/transcribe',
    'http://127.0.0.1:8000/api/voice/transcribe',
    'http://localhost:8000/api/v1/voice/transcribe',
    'http://localhost:8000/api/voice/transcribe',
  ];

  for (const ep of endpoints) {
    try {
      const formData = new FormData();
      formData.append('file', wavBlob, 'recording.wav');
      if (language) formData.append('language', language);

      const res = await fetch(ep, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data && typeof data.transcript === 'string') {
          return data.transcript;
        }
      }
    } catch (err) {
      // Try next endpoint
    }
  }
  return '';
}

export class VoiceRecorderVAD {
  constructor({
    onTranscription,
    onVolumeChange,
    onStatusChange,
    onError,
    language = 'en-US',
    autoStopSilenceMs = 1800,
    initialText = '',
  } = {}) {
    this.onTranscription = onTranscription;
    this.onVolumeChange = onVolumeChange;
    this.onStatusChange = onStatusChange;
    this.onError = onError;
    this.language = language;
    this.autoStopSilenceMs = autoStopSilenceMs;
    this.initialText = initialText || '';

    this.isRecording = false;
    this.audioContext = null;
    this.mediaStream = null;
    this.analyser = null;
    this.processorNode = null;
    this.silenceGain = null;
    this.audioChunks = [];
    this.silenceTimer = null;
    this.recognition = null;
    this.hasSpoken = false;
    this.hasWebSpeechProducedText = false;
    this.silenceStart = null;
    this.recordStartTime = 0;
    this.accumulatedTranscript = '';
  }

  async start(prefixText = '') {
    if (this.isRecording) return;
    this.accumulatedTranscript = prefixText || this.initialText || '';
    this.hasWebSpeechProducedText = false;
    this.audioChunks = [];

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioCtx();
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
      const source = this.audioContext.createMediaStreamSource(this.mediaStream);

      // 1. Analyser for volume visualization & silence detection
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      source.connect(this.analyser);

      // Create a muted GainNode to keep audio flow alive without playing back into speakers
      this.silenceGain = this.audioContext.createGain();
      this.silenceGain.gain.value = 0;

      // 2. Audio recording node to capture PCM samples for backend transcription fallback
      try {
        this.processorNode = this.audioContext.createScriptProcessor(4096, 1, 1);
        this.processorNode.onaudioprocess = (e) => {
          if (!this.isRecording) return;
          const input = e.inputBuffer.getChannelData(0);
          this.audioChunks.push(new Float32Array(input));
        };
        source.connect(this.processorNode);
        this.processorNode.connect(this.silenceGain);
        this.silenceGain.connect(this.audioContext.destination);

        // Retain reference on window to prevent Chrome garbage collection
        if (typeof window !== 'undefined') {
          window.__max_voice_proc = this.processorNode;
        }
      } catch (procErr) {
        console.warn('ScriptProcessor init warning:', procErr);
      }

      this.isRecording = true;
      this.hasSpoken = false;
      this.silenceStart = null;
      this.recordStartTime = Date.now();

      if (this.onStatusChange) this.onStatusChange('listening');

      // 3. Initialize Web Speech Recognition for instant live text streaming
      this._initSpeechRecognition();

      // 4. Start VAD volume loop
      this._startVADLoop();
    } catch (err) {
      console.error('Microphone initialization error:', err);
      this.isRecording = false;
      const msg = err.name === 'NotAllowedError'
        ? 'Microphone permission denied. Please allow microphone access in your browser settings.'
        : (err.message || 'Microphone access error');
      if (this.onError) this.onError(msg);
      if (this.onStatusChange) this.onStatusChange('error');
    }
  }

  _initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = this.language || 'en-US';

        this.recognition.onresult = (event) => {
          let interimChunk = '';
          let finalChunk = '';
          for (let i = 0; i < event.results.length; i++) {
            const res = event.results[i];
            if (res.isFinal) {
              finalChunk += res[0].transcript + ' ';
            } else {
              interimChunk += res[0].transcript;
            }
          }

          const base = this.initialText ? (this.initialText.trim() + ' ') : '';
          const full = (base + finalChunk + interimChunk).trim();

          if (full) {
            this.hasSpoken = true;
            this.hasWebSpeechProducedText = true;
            this.silenceStart = null;
            if (this.onTranscription) {
              this.onTranscription(full, !interimChunk.trim());
            }
          }
        };

        this.recognition.onerror = (e) => {
          if (e.error !== 'no-speech') {
            console.warn('SpeechRecognition warning:', e.error);
          }
        };

        this.recognition.onend = () => {
          if (this.isRecording && this.recognition) {
            try {
              this.recognition.start();
            } catch (e) {}
          }
        };

        this.recognition.start();
      } catch (e) {
        console.warn('Recognition start exception:', e);
      }
    }
  }

  _startVADLoop() {
    const buffer = new Uint8Array(this.analyser.frequencyBinCount);

    this.silenceTimer = setInterval(() => {
      if (!this.isRecording || !this.analyser) return;

      this.analyser.getByteFrequencyData(buffer);
      let sum = 0;
      for (let i = 0; i < buffer.length; i++) sum += buffer[i];
      const avgEnergy = sum / buffer.length;

      if (this.onVolumeChange) {
        this.onVolumeChange(Math.min(100, Math.round(avgEnergy * 2.5)));
      }

      const elapsed = Date.now() - this.recordStartTime;

      if (avgEnergy > 8) {
        this.hasSpoken = true;
        this.silenceStart = null;
      } else if (!this.hasSpoken) {
        if (elapsed >= 10000) {
          this.stop(false);
        }
      } else if (this.hasSpoken) {
        if (!this.silenceStart) {
          this.silenceStart = Date.now();
        } else if (Date.now() - this.silenceStart >= this.autoStopSilenceMs) {
          this.stop(false);
        }
      }
    }, 60);
  }

  async stop(cancelled = false) {
    if (!this.isRecording) return;
    this.isRecording = false;

    if (this.silenceTimer) {
      clearInterval(this.silenceTimer);
      this.silenceTimer = null;
    }

    if (this.recognition) {
      try {
        this.recognition.onend = null;
        this.recognition.stop();
      } catch (e) {}
      this.recognition = null;
    }

    // Disconnect audio nodes
    if (this.processorNode) {
      try {
        this.processorNode.disconnect();
      } catch (e) {}
      this.processorNode = null;
      if (typeof window !== 'undefined') {
        window.__max_voice_proc = null;
      }
    }

    if (this.silenceGain) {
      try {
        this.silenceGain.disconnect();
      } catch (e) {}
      this.silenceGain = null;
    }

    const sampleRate = this.audioContext?.sampleRate || 44100;

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }

    if (this.audioContext && this.audioContext.state !== 'closed') {
      try {
        this.audioContext.close();
      } catch (e) {}
      this.audioContext = null;
    }

    // Backend Fallback Transcription:
    // If Web Speech API didn't produce final text or accumulated text is empty, process recorded WAV:
    if (!cancelled && (!this.hasWebSpeechProducedText || !this.accumulatedTranscript.trim()) && this.audioChunks.length > 2) {
      if (this.onStatusChange) this.onStatusChange('transcribing');
      try {
        const pcm16k = flattenAndDownsample(this.audioChunks, sampleRate, 16000);
        const wavBlob = encodeWAV(pcm16k, 16000);
        console.log(`[Voice] Submitting ${wavBlob.size} bytes WAV to local transcription backend...`);
        const transcript = await sendAudioToBackend(wavBlob, this.language);
        if (transcript && transcript.trim()) {
          const base = this.initialText ? (this.initialText.trim() + ' ') : '';
          const finalFull = (base + transcript.trim()).trim();
          this.accumulatedTranscript = finalFull;
          if (this.onTranscription) {
            this.onTranscription(finalFull, true);
          }
        }
      } catch (backendErr) {
        console.warn('Backend audio fallback error:', backendErr);
      }
    }

    if (this.onStatusChange) {
      this.onStatusChange(cancelled ? 'cancelled' : 'completed');
    }
  }
}
