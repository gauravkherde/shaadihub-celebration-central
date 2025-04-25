
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { demoSchedule } from '@/data/demoData';

const MapView = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Venue Locations</CardTitle>
        <CardDescription>Interactive map of all wedding venues</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] border rounded-md bg-muted overflow-hidden relative">
          {/* In a real implementation, this would be a MapBox or Google Maps component */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56042.74629940976!2d77.16676347474127!3d28.617142395926753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd7ee440f533%3A0x5fd84cd3d7f18db8!2sDelhi%20Golf%20Club!5e0!3m2!1sen!2sin!4v1714172675353!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            className="border-0" 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          
          <div className="absolute bottom-0 left-0 right-0 bg-background/95 p-3 border-t">
            <h3 className="font-medium text-sm">Venue locations:</h3>
            <div className="mt-1 space-y-1 text-xs">
              {demoSchedule.map((event, index) => (
                <div key={index} className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-shaadi-red rounded-full"></span>
                  <span>{event.title} - {event.location}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapView;
