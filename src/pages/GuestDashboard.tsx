
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
import CountdownTimer from '@/components/dashboard/CountdownTimer';
import AnnouncementsCard from '@/components/dashboard/AnnouncementsCard';

const GuestDashboard = () => {
  const { user } = useDemoAuth();
  
  return (
    <div className="min-h-screen flex flex-col bg-background pattern-bg">
      <Navbar />
      <div className="container py-6 md:py-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-secondary inline-block text-transparent bg-clip-text">
            Sharma-Patel Wedding
          </h1>
          <p className="text-muted-foreground">December 12-15, 2025 • Delhi, India</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <CountdownTimer targetDate="2025-12-12" />
          <AnnouncementsCard />
        </div>

        <div className="mb-6">
          <RsvpCard />
        </div>

        <Tabs defaultValue="schedule" className="mb-8">
          <div className="overflow-x-auto -mx-4 px-4 pb-2">
            <TabsList className="w-full md:w-fit mb-4">
              <TabsTrigger value="schedule" className="flex-1 md:flex-none">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Schedule</span>
                <span className="md:hidden">Events</span>
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex-1 md:flex-none">
                <MessageSquare className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Messages</span>
                <span className="md:hidden">Chat</span>
              </TabsTrigger>
              <TabsTrigger value="gallery" className="flex-1 md:flex-none">
                <Image className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Gallery</span>
                <span className="md:hidden">Photos</span>
              </TabsTrigger>
              <TabsTrigger value="venue" className="flex-1 md:flex-none">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Venues</span>
                <span className="md:hidden">Map</span>
              </TabsTrigger>
              <TabsTrigger value="accommodation" className="flex-1 md:flex-none">
                <Wifi className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Accommodation</span>
                <span className="md:hidden">Room</span>
              </TabsTrigger>
              <TabsTrigger value="info" className="flex-1 md:flex-none">
                <Bell className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Information</span>
                <span className="md:hidden">Info</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
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
