
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

interface InvitationHeroProps {
  name: string;
  age: number;
  headline?: string;
}

const InvitationHero: React.FC<InvitationHeroProps> = ({ 
  name, 
  age,
  headline = "You're Invited to a Magical Birthday Celebration!"
}) => {
  const scrollToDetails = () => {
    const detailsSection = document.getElementById('event-details');
    if (detailsSection) {
      detailsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-20">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="parallax-layer absolute top-[10%] left-[10%] w-16 h-16 md:w-24 md:h-24">
          <img src="/images/balloon1.svg" alt="" className="w-full h-full animate-balloon-float" />
        </div>
        <div className="parallax-layer absolute top-[15%] right-[15%] w-16 h-16 md:w-24 md:h-24">
          <img src="/images/balloon2.svg" alt="" className="w-full h-full animate-balloon-float [animation-delay:1s]" />
        </div>
        <div className="parallax-layer absolute bottom-[20%] left-[20%] w-16 h-16 md:w-24 md:h-24">
          <img src="/images/balloon3.svg" alt="" className="w-full h-full animate-balloon-float [animation-delay:2s]" />
        </div>
        <div className="parallax-layer absolute bottom-[10%] right-[25%] w-16 h-16 md:w-24 md:h-24">
          <img src="/images/balloon4.svg" alt="" className="w-full h-full animate-balloon-float [animation-delay:1.5s]" />
        </div>
      </div>
      
      {/* Main content */}
      <div className="text-center z-10 max-w-4xl px-4 sm:px-6 space-y-8">
        <div className="mb-2 inline-block">
          <span className="text-lg md:text-xl bg-enchanted-pink px-4 py-1 rounded-full text-primary-foreground font-medium">
            {headline}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-whimsical bg-gradient-to-r from-enchanted-lavender via-enchanted-pink to-enchanted-blue bg-clip-text text-transparent pb-2">
          {name}'s {age}th Birthday
        </h1>
        
        <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto">
          Join us for an enchanted adventure filled with magic, joy, and unforgettable moments as we celebrate this special day together!
        </p>
        
        <div className="pt-8">
          <Button
            onClick={scrollToDetails}
            className="rounded-full px-8 py-6 text-lg bg-enchanted-lavender hover:bg-enchanted-lavender/80 text-primary-foreground flex items-center gap-2 group"
          >
            View Details
            <ArrowDown className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvitationHero;
