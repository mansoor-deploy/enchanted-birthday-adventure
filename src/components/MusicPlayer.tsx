
import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { setupBackgroundMusic } from '@/utils/audioUtils';

interface MusicPlayerProps {
  audioPath: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ audioPath }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [audioControls, setAudioControls] = useState<ReturnType<typeof setupBackgroundMusic> | null>(null);
  
  useEffect(() => {
    const controls = setupBackgroundMusic(audioPath);
    setAudioControls(controls);
    
    return () => {
      controls.pause();
    };
  }, [audioPath]);
  
  const toggleMute = () => {
    if (audioControls) {
      audioControls.toggle();
      setIsMuted(audioControls.isMuted());
    }
  };
  
  return (
    <button 
      onClick={toggleMute}
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-enchanted-lavender/80 backdrop-blur-sm shadow-md
                 hover:bg-enchanted-lavender transition-all duration-300"
      aria-label={isMuted ? "Unmute music" : "Mute music"}
    >
      {isMuted ? (
        <VolumeX className="h-6 w-6 text-primary-foreground" />
      ) : (
        <Volume2 className="h-6 w-6 text-primary-foreground" />
      )}
    </button>
  );
};

export default MusicPlayer;
