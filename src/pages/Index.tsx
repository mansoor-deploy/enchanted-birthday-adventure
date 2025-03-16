
import React, { useEffect, useRef } from 'react';
import InvitationHero from '@/components/InvitationHero';
import CountdownTimer from '@/components/CountdownTimer';
import EventDetails from '@/components/EventDetails';
import GuestBook from '@/components/GuestBook';
import MusicPlayer from '@/components/MusicPlayer';
import VideoButton from '@/components/VideoButton';
import { setupScrollAnimations, setupParallaxEffect, createFairyDust } from '@/utils/animationUtils';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioControlsRef = useRef<{ pause: () => void; play: () => void }>({
    pause: () => {},
    play: () => {}
  });
  const { toast } = useToast();

  // Birthday event details - customize these
  const eventDate = new Date("2024-06-15T18:00:00");
  const birthdayName = "Sarah";
  const birthdayAge = 25;

  useEffect(() => {
    // Set up scroll animations
    const cleanupScrollAnimations = setupScrollAnimations();
    
    // Set up parallax effect
    const cleanupParallaxEffect = setupParallaxEffect();
    
    // Create fairy dust effect
    let cleanupFairyDust: (() => void) | null = null;
    if (containerRef.current) {
      cleanupFairyDust = createFairyDust(containerRef.current);
    }
    
    return () => {
      cleanupScrollAnimations();
      cleanupParallaxEffect();
      if (cleanupFairyDust) cleanupFairyDust();
    };
  }, []);

  const handleVideoPlay = () => {
    audioControlsRef.current.pause();
  };
  
  const handleVideoClose = () => {
    audioControlsRef.current.play();
  };

  return (
    <div className="min-h-screen overflow-hidden" ref={containerRef}>
      {/* Music Player */}
      <MusicPlayer audioPath="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
      
      {/* Video Button */}
      <VideoButton 
        videoUrl="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" 
        onVideoPlay={handleVideoPlay}
        onVideoClose={handleVideoClose}
      />
      
      {/* Hero Section */}
      <InvitationHero name={birthdayName} age={birthdayAge} />
      
      {/* Countdown Section */}
      <section className="py-16 bg-enchanted-lavender/10">
        <div className="container px-4 sm:px-6">
          <div className="hidden-initially">
            <CountdownTimer 
              targetDate={eventDate} 
              onExpire={() => {
                toast({
                  title: "It's time!",
                  description: "The birthday celebration has begun!",
                });
              }} 
            />
          </div>
        </div>
      </section>
      
      {/* Event Details Section */}
      <section id="event-details" className="py-16">
        <div className="container px-4 sm:px-6">
          <div className="hidden-initially">
            <EventDetails 
              eventDate={eventDate}
              venueName="Enchanted Garden"
              venueAddress="123 Fairytale Lane, Wonderland"
              additionalInfo="Join us for a magical celebration filled with joy and wonder!"
              dresscode="Fairytale Casual"
              giftRegistry="https://example.com/gift-registry"
            />
          </div>
        </div>
      </section>
      
      {/* Guest Book Section */}
      <section className="py-16 bg-enchanted-lavender/10">
        <div className="container px-4 sm:px-6">
          <div className="hidden-initially">
            <GuestBook />
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 text-center text-foreground/60 bg-enchanted-green/10">
        <div className="container">
          <p>© {new Date().getFullYear()} Magical Birthday Invitation</p>
          <p className="text-sm mt-1">Made with ❤️ for {birthdayName}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
