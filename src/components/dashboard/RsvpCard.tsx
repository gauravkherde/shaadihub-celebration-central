
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Clock } from 'lucide-react';
import { useDemoAuth } from '@/contexts/DemoAuthContext';
import { toast } from 'sonner';

const RsvpCard = () => {
  const { user, updateUserRsvp } = useDemoAuth();
  
  const handleRsvp = (status: 'attending' | 'not-attending') => {
    updateUserRsvp(status);
    
    if (status === 'attending') {
      toast.success('Thank you for confirming your attendance!', {
        description: 'We look forward to celebrating with you.',
      });
    } else {
      toast.info('We\'re sorry you can\'t make it.', {
        description: 'Thank you for letting us know.',
      });
    }
  };

  if (!user) return null;

  return (
    <Card className="border-secondary/30 overflow-hidden">
      <div className="bg-gradient-pink-gold h-3"></div>
      <CardHeader>
        <CardTitle>RSVP Status</CardTitle>
        <CardDescription>
          Please confirm your attendance for Sharma-Patel Wedding
        </CardDescription>
      </CardHeader>
      <CardContent>
        {user.rsvpStatus === 'pending' ? (
          <div className="bg-muted p-4 rounded-md flex items-center gap-3 mb-4">
            <div className="h-10 w-10 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Your Response is Pending</p>
              <p className="text-sm text-muted-foreground">Please confirm if you'll be attending the wedding.</p>
            </div>
          </div>
        ) : user.rsvpStatus === 'attending' ? (
          <div className="bg-green-50 p-4 rounded-md flex items-center gap-3 mb-4">
            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-green-800">You're Attending!</p>
              <p className="text-sm text-green-700">We look forward to celebrating with you.</p>
            </div>
          </div>
        ) : (
          <div className="bg-red-50 p-4 rounded-md flex items-center gap-3 mb-4">
            <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <X className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="font-medium text-red-800">You've Declined</p>
              <p className="text-sm text-red-700">Thanks for letting us know.</p>
            </div>
          </div>
        )}
        
        <div className="text-sm text-muted-foreground mb-4">
          <p>Event: <span className="font-medium text-foreground">Sharma-Patel Wedding</span></p>
          <p>Date: <span className="font-medium text-foreground">Dec 12-15, 2025</span></p>
          <p>Location: <span className="font-medium text-foreground">Delhi, India</span></p>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        {user.rsvpStatus !== 'not-attending' && (
          <Button 
            variant={user.rsvpStatus === 'not-attending' ? "default" : "outline"} 
            className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700"
            onClick={() => handleRsvp('not-attending')}
          >
            <X className="h-4 w-4 mr-1" />
            Decline
          </Button>
        )}
        {/* Here's the problematic line - fixing the condition */}
        {user.rsvpStatus !== 'attending' && (
          <Button 
            className="bg-primary hover:bg-primary/90"
            onClick={() => handleRsvp('attending')}
          >
            <Check className="h-4 w-4 mr-1" />
            I'll Attend
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default RsvpCard;
