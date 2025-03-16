
import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { setupBackgroundMusic } from '@/utils/audioUtils';

interface MusicPlayerProps {
  audioPath: string;
  audioControlsRef?: React.MutableRefObject<{
    pause: () => void;
    play: () => void;
  }>;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ audioPath, audioControlsRef }) => {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const controls = setupBackgroundMusic(audioPath);
    
    if (audioControlsRef) {
      audioControlsRef.current = controls;
    }
    
    // Initial state is muted
    controls.pause();
    
    return () => {
      controls.pause();
    };
  }, [audioPath, audioControlsRef]);
  
  const toggleMute = () => {
    if (audioControlsRef?.current) {
      if (isMuted) {
        audioControlsRef.current.play();
      } else {
        audioControlsRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };
  
  return (
    <button 
      onClick={toggleMute}
      className="fixed z-40 bottom-4 right-4 p-3 rounded-full bg-enchanted-lavender/80 hover:bg-enchanted-lavender text-primary-foreground shadow-md transition-all"
      aria-label={isMuted ? "Turn music on" : "Turn music off"}
    >
      {isMuted ? (
        <VolumeX className="h-5 w-5" />
      ) : (
        <Volume2 className="h-5 w-5" />
      )}
    </button>
  );
};

export default MusicPlayer;
