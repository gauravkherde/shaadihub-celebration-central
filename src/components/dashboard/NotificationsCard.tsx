
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Settings } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

const notifications = [
  { id: 1, title: "Event Updates", description: "Receive updates about event schedule changes", enabled: true },
  { id: 2, title: "Photo Alerts", description: "Be notified when new photos are shared", enabled: true },
  { id: 3, title: "Messages", description: "Notifications for new messages", enabled: true },
  { id: 4, title: "Reminders", description: "Get reminders for important event dates", enabled: false }
];

const NotificationsCard = () => {
  const [preferences, setPreferences] = React.useState(notifications);

  const handleToggle = (id: number) => {
    setPreferences(prev => 
      prev.map(pref => 
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
      )
    );
    
    const notification = preferences.find(p => p.id === id);
    if (notification) {
      toast.success(
        notification.enabled ? 
          `${notification.title} notifications disabled` : 
          `${notification.title} notifications enabled`
      );
    }
  };
  
  return (
    <Card className="border-secondary/30 overflow-hidden">
      <div className="bg-gradient-pink-gold h-3"></div>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <span>Push Notifications</span>
          </div>
          <Button variant="outline" size="sm" className="h-8">
            <Settings className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {preferences.map((notification) => (
            <div key={notification.id} className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">{notification.title}</p>
                <p className="text-xs text-muted-foreground">{notification.description}</p>
              </div>
              <Switch 
                checked={notification.enabled}
                onCheckedChange={() => handleToggle(notification.id)}
              />
            </div>
          ))}
        </div>
        
        <div className="relative">
          <div className="absolute -top-1 -right-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
          </div>
          <div className="bg-muted/50 p-3 rounded-md">
            <p className="text-sm font-medium">New Announcement</p>
            <p className="text-xs text-muted-foreground">The Sangeet ceremony location has been updated. Please check the schedule.</p>
            <p className="text-xs text-primary mt-1">1 minute ago</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsCard;
