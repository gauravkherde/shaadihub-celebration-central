
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Info, Star } from 'lucide-react';
import { useAnnouncementsData } from '@/hooks/useSupabaseData';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

const AnnouncementsCard = () => {
  const { announcements, isLoading, error } = useAnnouncementsData();

  return (
    <Card className="border-secondary/30 overflow-hidden">
      <div className="bg-gradient-to-r from-pink-500 to-yellow-500 h-2"></div>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bell className="h-5 w-5 text-pink-500" />
          Latest Announcements
        </CardTitle>
        <CardDescription>
          Stay updated with important wedding information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin h-6 w-6 border-2 border-pink-500 border-t-transparent rounded-full mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading announcements...</p>
          </div>
        ) : error ? (
          <div className="p-4 text-center text-rose-500">
            <p>Failed to load announcements</p>
          </div>
        ) : announcements.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-sm text-muted-foreground">No announcements yet</p>
          </div>
        ) : (
          announcements.map(announcement => (
            <div 
              key={announcement.id} 
              className={`p-3 rounded-md border ${
                announcement.type === 'alert' 
                  ? 'border-red-200 bg-red-50' 
                  : announcement.type === 'highlight'
                  ? 'border-yellow-200 bg-yellow-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-3">
                {announcement.type === 'alert' ? (
                  <div className="mt-1 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <Bell className="h-3.5 w-3.5 text-red-600" />
                  </div>
                ) : announcement.type === 'highlight' ? (
                  <div className="mt-1 h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                    <Star className="h-3.5 w-3.5 text-yellow-600" />
                  </div>
                ) : (
                  <div className="mt-1 h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Info className="h-3.5 w-3.5 text-gray-600" />
                  </div>
                )}
                <div>
                  <h4 className={`text-sm font-medium ${
                    announcement.type === 'alert' 
                      ? 'text-red-700' 
                      : announcement.type === 'highlight'
                      ? 'text-yellow-700'
                      : 'text-gray-800'
                  }`}>
                    {announcement.title}
                  </h4>
                  <p className="text-sm mt-1 text-gray-600">{announcement.message}</p>
                  <p className="text-xs mt-1 text-gray-500">{formatDate(announcement.timestamp)}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default AnnouncementsCard;
