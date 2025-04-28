
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Download, Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useDemoAuth } from '@/contexts/DemoAuthContext';

const DigitalInvitation = () => {
  const { user } = useDemoAuth();

  return (
    <Card className="border-secondary/30 overflow-hidden">
      <div className="bg-gradient-pink-gold h-3"></div>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          Your Invitation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-4 border rounded-md mx-auto max-w-md bg-background decorative-border">
          <div className="text-center space-y-4">
            <div>
              <p className="text-xs text-muted-foreground">THE PLEASURE OF YOUR COMPANY IS REQUESTED AT THE</p>
              <h3 className="text-2xl font-bold mt-1 text-gradient">Wedding Celebration</h3>
              <p className="text-sm">OF</p>
            </div>
            
            <div className="py-4">
              <h3 className="text-xl font-bold">Priya Sharma</h3>
              <p className="text-sm">&</p>
              <h3 className="text-xl font-bold">Raj Patel</h3>
            </div>
            
            <div className="py-2">
              <p className="text-sm">FRIDAY, DECEMBER 12TH, 2025</p>
              <p className="text-sm">AT SEVEN O'CLOCK IN THE EVENING</p>
              <p className="text-sm">DELHI LUXURY HOTEL</p>
              <p className="text-xs text-muted-foreground mt-2">RECEPTION TO FOLLOW</p>
            </div>

            <p className="text-sm text-muted-foreground border-t border-b py-2">
              {user?.name ? `Personalized for: ${user.name}` : ""}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2 mt-4 justify-center">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Download</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DigitalInvitation;
