
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PartyPopper } from 'lucide-react';

interface WelcomePopupProps {
  name: string;
  age: number;
}

const WelcomePopup: React.FC<WelcomePopupProps> = ({ name, age }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Short delay before showing the popup
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-md border-enchanted-lavender">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center text-2xl">
            <PartyPopper className="h-6 w-6 text-enchanted-pink mr-2" />
            <span>You're Invited!</span>
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            Join us in celebrating {name}'s {age}th birthday!
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 text-center">
          <p className="text-lg text-foreground/90">
            We're delighted to invite you to a magical celebration filled with joy, 
            laughter, and unforgettable moments.
          </p>
          <p className="mt-3 text-foreground/80">
            Scroll down to discover all the enchanting details.
          </p>
        </div>
        
        <DialogFooter className="flex justify-center sm:justify-center">
          <Button 
            className="bg-enchanted-lavender hover:bg-enchanted-lavender/80 text-primary-foreground"
            onClick={() => setIsOpen(false)}
          >
            Let's celebrate!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomePopup;
