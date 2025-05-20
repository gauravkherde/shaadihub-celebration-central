
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Clock } from 'lucide-react';
import { useDemoAuth } from '@/contexts/DemoAuthContext';
import { toast } from 'sonner';

const RsvpCard = () => {
  const { user, updateUserRsvp } = useDemoAuth();
  
  const handleRsvp = async (status: 'attending' | 'not-attending') => {
    try {
      await updateUserRsvp(status);
      
      if (status === 'attending') {
        toast.success("Thank you for confirming your attendance!", {
          description: "We're excited to celebrate with you!"
        });
      } else {
        toast.info("We're sorry you can't make it", {
          description: "Thank you for letting us know."
        });
      }
    } catch (error) {
      toast.error("Failed to update your RSVP status");
    }
  };
  
  return (
    <Card className="border-yellow-300/30 overflow-hidden">
      <div className="bg-gradient-to-r from-pink-500 to-yellow-500 h-3"></div>
      <CardHeader>
        <CardTitle className="text-gradient">RSVP Status</CardTitle>
        <CardDescription>
          Please confirm your attendance for Sharma-Patel Wedding
        </CardDescription>
      </CardHeader>
      <CardContent>
        {user?.rsvpStatus === 'attending' ? (
          <div className="bg-green-50 p-4 rounded-md flex items-center gap-3 mb-4 border border-green-200">
            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-green-700">You're Attending!</p>
              <p className="text-sm text-green-600">We're excited to celebrate with you.</p>
            </div>
          </div>
        ) : user?.rsvpStatus === 'not-attending' ? (
          <div className="bg-rose-50 p-4 rounded-md flex items-center gap-3 mb-4 border border-rose-200">
            <div className="h-10 w-10 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
              <X className="h-5 w-5 text-rose-600" />
            </div>
            <div>
              <p className="font-medium text-rose-700">Not Attending</p>
              <p className="text-sm text-rose-600">Thank you for letting us know.</p>
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 p-4 rounded-md flex items-center gap-3 mb-4 border border-yellow-200">
            <div className="h-10 w-10 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="h-5 w-5 text-pink-600" />
            </div>
            <div>
              <p className="font-medium">Awaiting Your Response</p>
              <p className="text-sm text-muted-foreground">Please confirm if you'll be attending the wedding.</p>
            </div>
          </div>
        )}
        
        <div className="text-sm text-muted-foreground mb-4 space-y-2">
          <p>Event: <span className="font-medium text-foreground">Sharma-Patel Wedding</span></p>
          <p>Date: <span className="font-medium text-foreground">Dec 12-15, 2025</span></p>
          <p>Location: <span className="font-medium text-foreground">Delhi, India</span></p>
          <p>Dress Code: <span className="font-medium text-pink-500">Traditional Indian Attire</span></p>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        {user?.rsvpStatus === 'pending' && (
          <>
            <Button 
              variant="outline" 
              className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20"
              onClick={() => handleRsvp('not-attending')}
            >
              <X className="h-4 w-4 mr-1" />
              Decline
            </Button>
            <Button 
              className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:opacity-90"
              onClick={() => handleRsvp('attending')}
            >
              <Check className="h-4 w-4 mr-1" />
              I'll Attend
            </Button>
          </>
        )}
        {user?.rsvpStatus !== 'pending' && (
          <Button 
            variant="outline" 
            className="border-yellow-300/30 hover:bg-yellow-50"
            onClick={() => updateUserRsvp('pending')}
          >
            Change Response
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default RsvpCard;
