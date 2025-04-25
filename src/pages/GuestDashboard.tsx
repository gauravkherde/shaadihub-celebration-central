
import React from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, MessageSquare, Image } from 'lucide-react';

// Import only guest-relevant components
import ScheduleView from '@/components/dashboard/ScheduleView';
import ChannelMessages from '@/components/dashboard/ChannelMessages';
import GalleryView from '@/components/dashboard/GalleryView';
import MapView from '@/components/dashboard/MapView';

const GuestDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Sharma-Patel Wedding</h1>
          <p className="text-muted-foreground">December 12-15, 2025 • Delhi, India</p>
        </div>

        <Tabs defaultValue="schedule" className="mb-8">
          <TabsList className="grid w-full grid-cols-4 md:w-fit">
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
            <TabsTrigger value="map">
              <Users className="h-4 w-4 mr-2" />
              Venues
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
          
          <TabsContent value="map">
            <MapView />
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
