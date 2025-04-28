
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDemoAuth } from '@/contexts/DemoAuthContext';
import { Wifi, MapPin, Key } from 'lucide-react';

const RoomAllocation = () => {
  const { user } = useDemoAuth();
  const room = user?.roomAllocation;

  if (!room) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Room Allocation</CardTitle>
          <CardDescription>
            You don't have a room allocated yet. Please check back later.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-secondary/30 overflow-hidden">
      <div className="bg-gradient-pink-gold h-3"></div>
      <CardHeader>
        <CardTitle>Your Room Details</CardTitle>
        <CardDescription>
          Your accommodation information for the event
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-md">
            <div className="p-2 bg-secondary/20 rounded-full">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium">Room Number</p>
              <p className="text-3xl font-bold">{room.roomNumber}</p>
              <p className="text-sm text-muted-foreground mt-1">Delhi Luxury Hotel, Tower B</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-md">
            <div className="p-2 bg-secondary/20 rounded-full">
              <Wifi className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium">WiFi Details</p>
              <div className="mt-1 space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-secondary/10">Username</Badge>
                  <span className="font-mono">{room.wifiUsername}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-secondary/10">Password</Badge>
                  <span className="font-mono">{room.wifiPassword}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-md">
            <div className="p-2 bg-secondary/20 rounded-full">
              <Key className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium">Check-in Details</p>
              <p className="mt-1">Check-in: <span className="font-medium">Dec 12, 2025 from 2:00 PM</span></p>
              <p>Check-out: <span className="font-medium">Dec 16, 2025 by 12:00 PM</span></p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View Hotel Map
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomAllocation;
