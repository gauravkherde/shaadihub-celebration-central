
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { demoSchedule } from '@/data/demoData';
import { Calendar, Clock, MapPin } from 'lucide-react';

const ScheduleView = () => {
  // Group events by date
  const eventsByDate = demoSchedule.reduce((acc, event) => {
    const date = event.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  }, {} as Record<string, typeof demoSchedule>);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-shaadi-red" />
          Event Schedule
        </CardTitle>
        <CardDescription>
          Complete timeline of all wedding events
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {Object.entries(eventsByDate).map(([date, events]) => (
            <div key={date} className="space-y-4">
              <h3 className="font-medium text-lg border-b pb-2">{formatDate(date)}</h3>
              
              <div className="space-y-6">
                {events.map((event) => (
                  <div key={event.id} className="relative pl-6 border-l-2 border-shaadi-gold/50">
                    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-shaadi-gold" />
                    
                    <h4 className="font-bold text-lg">{event.title}</h4>
                    
                    <div className="flex items-center text-sm text-muted-foreground mt-1 gap-6">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <p className="mt-2 text-sm">{event.description}</p>
                    
                    {event.notes && (
                      <div className="mt-2 text-xs bg-muted/50 p-2 rounded-md">
                        <span className="font-medium">Note:</span> {event.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleView;
