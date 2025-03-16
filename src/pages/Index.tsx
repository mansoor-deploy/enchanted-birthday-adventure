
import React, { useEffect, useRef, useState } from 'react';
import InvitationHero from '@/components/InvitationHero';
import CountdownTimer from '@/components/CountdownTimer';
import EventDetails from '@/components/EventDetails';
import GuestBook from '@/components/GuestBook';
import MusicPlayer from '@/components/MusicPlayer';
import VideoButton from '@/components/VideoButton';
import GoogleMap from '@/components/GoogleMap';
import WelcomePopup from '@/components/WelcomePopup';
import PageLoader from '@/components/PageLoader';
import { setupScrollAnimations, setupParallaxEffect, createFairyDust } from '@/utils/animationUtils';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioControlsRef = useRef<{ pause: () => void; play: () => void }>({
    pause: () => {},
    play: () => {}
  });
  const { toast } = useToast();

  // Birthday event details - customize these
  const eventDate = new Date("2025-03-30T18:00:00");
  const birthdayName = "Sarah";
  const birthdayAge = 25;
  const venueName = "Enchanted Garden";
  const venueAddress = "123 Fairytale Lane, Wonderland";

  useEffect(() => {
    // Simulate loading time
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

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
      clearTimeout(loadingTimer);
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

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen overflow-hidden" ref={containerRef}>
      {/* Welcome Popup */}
      <WelcomePopup name={birthdayName} age={birthdayAge} />
      
      {/* Music Player */}
      <MusicPlayer 
        audioPath="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
        audioControlsRef={audioControlsRef}
      />
      
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
          <div className="max-w-3xl mx-auto">
            <CountdownTimer 
              targetDate={eventDate} 
              onExpire={() => {
                // Only show toast when countdown actually expires
                const now = new Date();
                if (now >= eventDate) {
                  toast({
                    title: "It's time!",
                    description: "The birthday celebration has begun!",
                  });
                }
              }} 
            />
          </div>
        </div>
      </section>
      
      {/* Event Details Section */}
      <section id="event-details" className="py-16">
        <div className="container px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <EventDetails 
              eventDate={eventDate}
              venueName={venueName}
              venueAddress={venueAddress}
              additionalInfo="Join us for a magical celebration filled with joy and wonder!"
              dresscode="Fairytale Casual"
              giftRegistry="https://example.com/gift-registry"
            />
          </div>
        </div>
      </section>

      {/* Location Map Section */}
      <section className="py-16 bg-enchanted-green/10">
        <div className="container px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl mb-6 font-semibold text-center">Find Us Here</h2>
            <GoogleMap 
              venueName={venueName} 
              address={venueAddress} 
            />
          </div>
        </div>
      </section>
      
      {/* Guest Book Section */}
      <section className="py-16 bg-enchanted-lavender/10">
        <div className="container px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
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
