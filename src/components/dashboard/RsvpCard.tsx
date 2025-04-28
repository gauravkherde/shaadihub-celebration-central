
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Clock } from 'lucide-react';
import { useDemoAuth } from '@/contexts/DemoAuthContext';
import { toast } from 'sonner';

const RsvpCard = () => {
  const { user } = useDemoAuth();
  
  return (
    <Card className="border-secondary/30 overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-secondary h-3"></div>
      <CardHeader>
        <CardTitle>RSVP Status</CardTitle>
        <CardDescription>
          Please confirm your attendance for Sharma-Patel Wedding
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/50 p-4 rounded-md flex items-center gap-3 mb-4">
          <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">Awaiting Your Response</p>
            <p className="text-sm text-muted-foreground">Please confirm if you'll be attending the wedding.</p>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground mb-4">
          <p>Event: <span className="font-medium text-foreground">Sharma-Patel Wedding</span></p>
          <p>Date: <span className="font-medium text-foreground">Dec 12-15, 2025</span></p>
          <p>Location: <span className="font-medium text-foreground">Delhi, India</span></p>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        <Button 
          variant="outline" 
          className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20"
        >
          <X className="h-4 w-4 mr-1" />
          Decline
        </Button>
        <Button 
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
        >
          <Check className="h-4 w-4 mr-1" />
          I'll Attend
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RsvpCard;
