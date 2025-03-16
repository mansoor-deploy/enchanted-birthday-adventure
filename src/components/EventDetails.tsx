
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Gift, 
  CalendarPlus 
} from 'lucide-react';
import { formatDateForDisplay, generateGoogleCalendarLink } from '@/utils/dateUtils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';

interface EventDetailsProps {
  eventDate: Date;
  venueName: string;
  venueAddress: string;
  additionalInfo: string;
  dresscode?: string;
  giftRegistry?: string;
}

const EventDetails: React.FC<EventDetailsProps> = ({
  eventDate,
  venueName,
  venueAddress,
  additionalInfo,
  dresscode,
  giftRegistry
}) => {
  // Create event end date (3 hours after start)
  const eventEndDate = new Date(eventDate);
  eventEndDate.setHours(eventEndDate.getHours() + 3);
  
  const googleCalendarUrl = generateGoogleCalendarLink(
    "Birthday Celebration 🎂",
    `You're invited to a special birthday celebration!\n\n${additionalInfo}${dresscode ? `\n\nDress code: ${dresscode}` : ''}`,
    `${venueName}, ${venueAddress}`,
    eventDate,
    eventEndDate
  );

  return (
    <Card className="w-full max-w-3xl mx-auto fancy-border bg-card/70 backdrop-blur-sm">
      <CardContent className="p-6">
        <h2 className="text-2xl md:text-3xl mb-6 font-semibold text-center">Event Details</h2>
        
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="bg-enchanted-lavender p-2 rounded-full">
              <Calendar className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Date & Time</h3>
              <p className="text-foreground/80">{formatDateForDisplay(eventDate)}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="bg-enchanted-yellow p-2 rounded-full">
              <MapPin className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Venue</h3>
              <p className="text-foreground/80">{venueName}</p>
              <p className="text-foreground/70 text-sm">{venueAddress}</p>
            </div>
          </div>
          
          {dresscode && (
            <div className="flex items-start gap-4">
              <div className="bg-enchanted-pink p-2 rounded-full">
                <Clock className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Dress Code</h3>
                <p className="text-foreground/80">{dresscode}</p>
              </div>
            </div>
          )}
          
          {giftRegistry && (
            <div className="flex items-start gap-4">
              <div className="bg-enchanted-green p-2 rounded-full">
                <Gift className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Gift Registry</h3>
                <p className="text-foreground/80">
                  <a href={giftRegistry} target="_blank" rel="noopener noreferrer" 
                     className="text-primary-foreground underline decoration-dotted underline-offset-4">
                    View Gift Registry
                  </a>
                </p>
              </div>
            </div>
          )}
          
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center">
            <a href={googleCalendarUrl} target="_blank" rel="noopener noreferrer">
              <Button className="flex items-center gap-2 bg-enchanted-lavender hover:bg-enchanted-lavender/80 text-primary-foreground w-full sm:w-auto">
                <CalendarPlus className="h-4 w-4" />
                Add to Google Calendar
              </Button>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventDetails;
