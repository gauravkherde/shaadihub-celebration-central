
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, CloudSun, Sun, CloudRain, Umbrella } from 'lucide-react';

const weatherData = [
  { date: '2025-12-12', day: 'Friday', temp: '24°C', condition: 'Sunny', icon: 'sun' },
  { date: '2025-12-13', day: 'Saturday', temp: '23°C', condition: 'Partly Cloudy', icon: 'cloud-sun' },
  { date: '2025-12-14', day: 'Sunday', temp: '22°C', condition: 'Mostly Cloudy', icon: 'cloud' },
  { date: '2025-12-15', day: 'Monday', temp: '21°C', condition: 'Light Rain', icon: 'cloud-rain' }
];

const WeatherIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'sun':
      return <Sun className="h-8 w-8 text-amber-500" />;
    case 'cloud-sun':
      return <CloudSun className="h-8 w-8 text-amber-400" />;
    case 'cloud':
      return <Cloud className="h-8 w-8 text-gray-400" />;
    case 'cloud-rain':
      return <CloudRain className="h-8 w-8 text-blue-400" />;
    default:
      return <Sun className="h-8 w-8 text-amber-500" />;
  }
};

const WeatherCard = () => {
  return (
    <Card className="border-secondary/30 overflow-hidden">
      <div className="bg-gradient-pink-gold h-3"></div>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CloudSun className="h-5 w-5 text-primary" />
          Weather Updates
        </CardTitle>
        <CardDescription>Delhi, India during event days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {weatherData.map((day, index) => (
            <div key={index} className="bg-muted/30 p-3 rounded-md text-center">
              <p className="text-xs text-muted-foreground">{day.day}</p>
              <div className="my-3 flex justify-center">
                <WeatherIcon type={day.icon} />
              </div>
              <p className="font-medium text-lg">{day.temp}</p>
              <p className="text-xs">{day.condition}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-4">
          <div className="bg-secondary/10 p-3 rounded-md">
            <div className="flex items-center">
              <Umbrella className="h-4 w-4 mr-2 text-primary" />
              <span className="text-sm font-medium">Packing Tips</span>
            </div>
            <p className="text-xs mt-1 text-muted-foreground">
              December evenings can be cool in Delhi. We recommend bringing a light jacket or shawl for outdoor events.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
