"use client";

import { useState, useRef } from "react";

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.volume = 0.6;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Audio playback error:", error);
          });
      }
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      {/* HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src="/assets/gallo-fino.mp3"
        preload="auto"
        loop
      />

      {/* Floating Discreet Audio Control Badge */}
      <div className="fixed top-20 right-4 sm:right-6 z-50 flex items-center gap-2.5 bg-black/90 backdrop-blur-md border-2 border-gold/60 px-3 py-1.5 rounded-full shadow-[0_6px_25px_rgba(0,0,0,0.8)] transition-all hover:border-gold group">
        {/* Equalizer animation */}
        <div className="flex items-end gap-0.5 h-3.5 px-1">
          <span className={`w-0.5 bg-gold rounded-full transition-all duration-300 ${isPlaying ? "h-3.5 animate-pulse" : "h-1.5"}`} />
          <span className={`w-0.5 bg-gold rounded-full transition-all duration-300 ${isPlaying ? "h-2.5 animate-pulse delay-75" : "h-1"}`} />
          <span className={`w-0.5 bg-gold rounded-full transition-all duration-300 ${isPlaying ? "h-3 animate-pulse delay-150" : "h-2"}`} />
        </div>

        {/* Title */}
        <span className="text-[11px] font-mono font-bold text-cream tracking-wider">
          {isPlaying ? "🎵 CANCIÓN GALLO FINO" : "🎵 MÚSICA"}
        </span>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
          title={isPlaying ? "Pausar canción 'Gallo Fino'" : "Reproducir canción 'Gallo Fino'"}
          className="w-8 h-8 rounded-full bg-gold text-black flex items-center justify-center font-black text-xs hover:scale-110 transition-transform shadow-md cursor-pointer"
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        {/* Mute Button */}
        {isPlaying && (
          <button
            onClick={toggleMute}
            aria-label="Silenciar"
            title={isMuted ? "Desactivar silencio" : "Silenciar"}
            className="text-xs text-gold hover:text-cream px-1 transition-colors cursor-pointer"
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
        )}
      </div>
    </>
  );
}
