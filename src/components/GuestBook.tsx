
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';

interface GuestBookEntry {
  id: string;
  name: string;
  message: string;
  timestamp: Date;
}

const GuestBook: React.FC = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [entries, setEntries] = useState<GuestBookEntry[]>([]);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) {
      toast({
        title: "Please fill all fields",
        description: "Both name and message are required",
        variant: "destructive"
      });
      return;
    }
    
    const newEntry: GuestBookEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      timestamp: new Date()
    };
    
    setEntries(prev => [newEntry, ...prev]);
    setName('');
    setMessage('');
    
    toast({
      title: "Message saved!",
      description: "Thank you for your lovely wishes!",
    });
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl mb-6 font-semibold text-center">Guest Book</h2>
      
      <Card className="fancy-border mb-8 bg-card/70 backdrop-blur-sm">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Your Name
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/70"
                placeholder="Enter your name"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Your Message
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-white/70 min-h-[100px]"
                placeholder="Leave your birthday wishes here..."
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-enchanted-lavender hover:bg-enchanted-lavender/80 text-primary-foreground"
            >
              Send Birthday Wishes
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {entries.length > 0 && (
        <Card className="fancy-border bg-card/70 backdrop-blur-sm">
          <CardContent className="p-6">
            <h3 className="text-xl font-medium mb-4">Birthday Wishes</h3>
            <ScrollArea className="h-[300px] rounded-md pr-4">
              <div className="space-y-4">
                {entries.map(entry => (
                  <div key={entry.id} className="p-4 bg-white/50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-primary-foreground">{entry.name}</h4>
                      <span className="text-xs text-foreground/60">
                        {entry.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-foreground/80">{entry.message}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GuestBook;
