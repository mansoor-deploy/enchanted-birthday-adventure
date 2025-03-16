
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Play, X } from 'lucide-react';

interface VideoButtonProps {
  videoUrl: string;
  onVideoPlay: () => void;
  onVideoClose: () => void;
}

const VideoButton: React.FC<VideoButtonProps> = ({ 
  videoUrl,
  onVideoPlay,
  onVideoClose
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  
  const handleOpen = () => {
    setIsOpen(true);
    setIsActive(true);
    onVideoPlay();
  };
  
  const handleClose = () => {
    setIsOpen(false);
    onVideoClose();
  };
  
  return (
    <>
      <div 
        className={`video-button ${isActive ? 'active' : ''}`}
        onClick={handleOpen}
      >
        <Play 
          className="h-8 w-8 text-primary-foreground" 
          fill={isActive ? "rgba(255,255,255,0.5)" : "none"} 
        />
      </div>
      
      <Dialog open={isOpen} onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) handleClose();
      }}>
        <DialogContent className="sm:max-w-[700px] p-0 bg-transparent border-none">
          <div className="relative">
            <button 
              onClick={handleClose}
              className="absolute top-3 right-3 z-10 p-1 rounded-full bg-enchanted-lavender/80 hover:bg-enchanted-lavender"
            >
              <X className="h-5 w-5 text-primary-foreground" />
            </button>
            
            <div className="rounded-lg overflow-hidden shadow-xl">
              <video 
                src={videoUrl} 
                controls 
                autoPlay 
                className="w-full"
                onEnded={handleClose}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoButton;
