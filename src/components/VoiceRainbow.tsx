import { useState, useEffect, useCallback } from 'react';

interface ColorVoice {
  name: string;
  lang: string;
  pitch: number;
  rate: number;
}

const VoiceRainbow = () => {
  // ROYGBIV colors with their voice configurations
  const colors = [
    { hex: '#FF0000', name: 'Red', voice: { name: 'en-US-Standard-A', lang: 'en-US', pitch: 1.0, rate: 1.0 } },
    { hex: '#FF7F00', name: 'Orange', voice: { name: 'en-US-Standard-B', lang: 'en-US', pitch: 1.2, rate: 0.9 } },
    { hex: '#FFFF00', name: 'Yellow', voice: { name: 'en-US-Standard-C', lang: 'en-US', pitch: 1.4, rate: 1.1 } },
    { hex: '#00FF00', name: 'Green', voice: { name: 'en-US-Standard-D', lang: 'en-US', pitch: 0.8, rate: 0.9 } },
    { hex: '#0000FF', name: 'Blue', voice: { name: 'en-US-Standard-E', lang: 'en-US', pitch: 0.6, rate: 0.8 } },
    { hex: '#4B0082', name: 'Indigo', voice: { name: 'en-US-Standard-F', lang: 'en-US', pitch: 0.5, rate: 0.7 } },
    { hex: '#9400D3', name: 'Violet', voice: { name: 'en-US-Standard-G', lang: 'en-US', pitch: 1.3, rate: 1.2 } }
  ];

  const [colorIndex, setColorIndex] = useState(0);
  const [isDarkBackground, setIsDarkBackground] = useState(true);
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSynthesis(window.speechSynthesis);
      
      const updateVoices = () => {
        setVoices(window.speechSynthesis.getVoices());
      };

      window.speechSynthesis.onvoiceschanged = updateVoices;
      updateVoices();

      // Clean up synthesis on unmount
      return () => {
        window.speechSynthesis.cancel();
      };
    }
  }, []);

  // Speak the color name with appropriate voice configuration
  const speakColor = useCallback((colorName: string, voiceConfig: ColorVoice) => {
    if (!synthesis) return;

    // Cancel any ongoing speech
    synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(colorName);
    const availableVoice = voices.find(v => v.name === voiceConfig.name) || voices[0];

    utterance.voice = availableVoice;
    utterance.lang = voiceConfig.lang;
    utterance.pitch = voiceConfig.pitch;
    utterance.rate = voiceConfig.rate;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthesis.speak(utterance);
  }, [synthesis, voices]);

  // Handle text click
  const handleTextClick = useCallback(() => {
    const newIndex = (colorIndex + 1) % colors.length;
    setColorIndex(newIndex);
    speakColor(colors[newIndex].name, colors[newIndex].voice);
  }, [colorIndex, colors, speakColor]);

  // Handle background click
  const handleBackgroundClick = useCallback(() => {
    setIsDarkBackground(prev => !prev);
  }, []);

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center cursor-pointer"
      style={{ backgroundColor: isDarkBackground ? '#000000' : '#FFFFFF' }}
      onClick={handleBackgroundClick}
      role="button"
      aria-label="Toggle background color"
    >
      <div 
        className="text-center select-none"
        onClick={(e) => {
          e.stopPropagation();
          handleTextClick();
        }}
        role="button"
        aria-label={`Current color: ${colors[colorIndex].name}. Click to change color.`}
      >
        <h1 
          className="text-8xl font-bold p-8"
          style={{ color: colors[colorIndex].hex }}
        >
          {colors[colorIndex].name}
        </h1>
        <p 
          className="text-2xl mt-4"
          style={{ 
            color: colors[colorIndex].hex,
            opacity: isSpeaking ? 1 : 0,
            transition: 'opacity 0.2s ease-in-out'
          }}
        >
          Speaking...
        </p>
      </div>
    </div>
  );
};

export default VoiceRainbow;