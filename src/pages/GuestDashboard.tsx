
import React from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, Users, MessageSquare, Image, 
  Mail, Wifi, MapPin, Bell, MessageCircle
} from 'lucide-react';
import { useDemoAuth } from '@/contexts/DemoAuthContext';

// Import guest-relevant components
import ScheduleView from '@/components/dashboard/ScheduleView';
import ChannelMessages from '@/components/dashboard/ChannelMessages';
import GalleryView from '@/components/dashboard/GalleryView';
import MapView from '@/components/dashboard/MapView';
import RoomAllocation from '@/components/dashboard/RoomAllocation';
import RsvpCard from '@/components/dashboard/RsvpCard';
import WeatherCard from '@/components/dashboard/WeatherCard';
import EmergencyContacts from '@/components/dashboard/EmergencyContacts';
import DigitalInvitation from '@/components/dashboard/DigitalInvitation';
import NotificationsCard from '@/components/dashboard/NotificationsCard';
import FeedbackForm from '@/components/dashboard/FeedbackForm';

const GuestDashboard = () => {
  const { user } = useDemoAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gradient">Sharma-Patel Wedding</h1>
          <p className="text-muted-foreground">December 12-15, 2025 • Delhi, India</p>
        </div>

        <div className="mb-6">
          <RsvpCard />
        </div>

        <Tabs defaultValue="schedule" className="mb-8">
          <TabsList className="grid w-full grid-cols-4 sm:grid-cols-6 md:w-fit mb-4">
            <TabsTrigger value="schedule">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="gallery">
              <Image className="h-4 w-4 mr-2" />
              Gallery
            </TabsTrigger>
            <TabsTrigger value="venue">
              <MapPin className="h-4 w-4 mr-2" />
              Venues
            </TabsTrigger>
            <TabsTrigger value="accommodation">
              <Wifi className="h-4 w-4 mr-2" />
              Room
            </TabsTrigger>
            <TabsTrigger value="info">
              <Bell className="h-4 w-4 mr-2" />
              Info
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="schedule">
            <ScheduleView />
          </TabsContent>
          
          <TabsContent value="messages">
            <ChannelMessages />
          </TabsContent>
          
          <TabsContent value="gallery">
            <GalleryView />
          </TabsContent>
          
          <TabsContent value="venue">
            <MapView />
          </TabsContent>
          
          <TabsContent value="accommodation">
            <div className="grid grid-cols-1 gap-6">
              <RoomAllocation />
            </div>
          </TabsContent>
          
          <TabsContent value="info">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <WeatherCard />
              <EmergencyContacts />
              <DigitalInvitation />
              <NotificationsCard />
              <div className="md:col-span-2">
                <FeedbackForm />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default GuestDashboard;
