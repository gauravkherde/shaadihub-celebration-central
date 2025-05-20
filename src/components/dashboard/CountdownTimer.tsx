
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string; // Format: YYYY-MM-DD
  eventName?: string;
}

const CountdownTimer = ({ targetDate, eventName = "Wedding Day" }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        // If the date has passed, set all counters to 0
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <Card className="border-secondary/30 overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-secondary h-2"></div>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-primary" />
          Countdown to {eventName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">
              {timeLeft.days}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Days</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">
              {timeLeft.hours}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Hours</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">
              {timeLeft.minutes}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Minutes</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">
              {timeLeft.seconds}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Seconds</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CountdownTimer;
