
import React, { useState } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, Users, MessageSquare, Image, Clock, 
  Edit, MapPin, Check, Bell, Music, CheckCheck, Star 
} from 'lucide-react';
import { 
  demoGuests, demoSchedule, demoTasks, demoNotifications, 
  demoWeatherData 
} from '@/data/demoData';

// Import dashboard components
import GuestList from '@/components/dashboard/GuestList';
import ScheduleView from '@/components/dashboard/ScheduleView';
import ChannelMessages from '@/components/dashboard/ChannelMessages';
import GalleryView from '@/components/dashboard/GalleryView';
import TaskManagement from '@/components/dashboard/TaskManagement';
import MapView from '@/components/dashboard/MapView';
import VendorCoordination from '@/components/dashboard/VendorCoordination';

// Modal component for simple interaction demonstrations
const DemoModal = ({ isOpen, onClose, title, children }: { 
  isOpen: boolean; 
  onClose: () => void; 
  title: string;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-background rounded-lg shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-medium">{title}</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>Close</Button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

const EventDashboard = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Sharma-Patel Wedding</h1>
            <p className="text-muted-foreground">December 12-15, 2025 • Delhi, India</p>
          </div>
          <Button className="bg-shaadi-red hover:bg-shaadi-maroon">
            <Edit className="mr-2 h-4 w-4" />
            Edit Event
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Guests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">248</div>
              <p className="text-xs text-muted-foreground mt-1">+12 in the last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">RSVPs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">183</div>
              <p className="text-xs text-muted-foreground mt-1">74% confirmed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Days Remaining</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-shaadi-red">42</div>
              <p className="text-xs text-muted-foreground mt-1">6 weeks to go!</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Photos Shared</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">156</div>
              <p className="text-xs text-muted-foreground mt-1">From 24 guests</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="grid grid-cols-6 sm:grid-cols-7 md:w-fit mb-4 overflow-x-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="guests">Guests</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="channels">Channels</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Overview</CardTitle>
                <CardDescription>
                  Manage your wedding celebration and check on key details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-shaadi-red" />
                      Upcoming Activities
                    </h3>
                    <ul className="space-y-3">
                      {demoSchedule.slice(0, 3).map((event, index) => (
                        <li key={index} className={`border-l-2 ${
                          index === 0 ? 'border-shaadi-red' : 
                          index === 1 ? 'border-shaadi-orange' :
                          'border-shaadi-gold'
                        } pl-3 py-1`}>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(event.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric'
                            })} • {event.time}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-shaadi-orange" />
                      Recent Messages
                    </h3>
                    <ul className="space-y-3">
                      <li className="bg-muted/50 p-3 rounded-md">
                        <p className="text-sm font-medium">#Travel</p>
                        <p className="text-sm">Are there any shuttle arrangements from the airport?</p>
                        <p className="text-xs text-muted-foreground mt-1">Anita Desai • 2h ago</p>
                      </li>
                      <li className="bg-muted/50 p-3 rounded-md">
                        <p className="text-sm font-medium">#Food</p>
                        <p className="text-sm">Will there be gluten-free options available?</p>
                        <p className="text-xs text-muted-foreground mt-1">Raj Kumar • 5h ago</p>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 border-t pt-6">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Bell className="h-4 w-4 text-shaadi-gold" />
                    Recent Notifications
                  </h3>
                  <ul className="space-y-2">
                    {demoNotifications.slice(0, 3).map((notification) => (
                      <li key={notification.id} className="flex items-start py-2 border-b last:border-0">
                        <div className={`shrink-0 w-2 h-2 mt-2 rounded-full ${notification.read ? 'bg-muted-foreground' : 'bg-shaadi-red'}`}></div>
                        <div className="ml-3">
                          <p className="font-medium text-sm">{notification.title}</p>
                          <p className="text-xs text-muted-foreground">{notification.message}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6 border-t pt-6">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-shaadi-maroon" />
                    Venue Weather
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {demoWeatherData.map((day, index) => (
                      <div key={index} className="bg-muted/30 p-3 rounded-md text-center">
                        <p className="text-xs text-muted-foreground">{new Date(day.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric'
                        })}</p>
                        <div className="my-2">
                          {day.icon === 'sun' ? (
                            <div className="w-8 h-8 mx-auto bg-yellow-500 rounded-full"></div>
                          ) : day.icon === 'cloud-sun' ? (
                            <div className="w-8 h-8 mx-auto bg-gradient-to-b from-yellow-500 to-gray-300 rounded-full"></div>
                          ) : (
                            <div className="w-8 h-8 mx-auto bg-gray-300 rounded-full"></div>
                          )}
                        </div>
                        <p className="font-medium">{day.temperature}</p>
                        <p className="text-xs">{day.forecast}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6">
                <Button variant="outline" className="w-full">View All Details</Button>
              </CardFooter>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TaskManagement />
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" onClick={() => setActiveModal('guests')}>
                    <Users className="mr-2 h-4 w-4" />
                    Add New Guests
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setActiveModal('schedule')}>
                    <Clock className="mr-2 h-4 w-4" />
                    Update Schedule
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setActiveModal('announcement')}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send Announcement
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setActiveModal('photos')}>
                    <Image className="mr-2 h-4 w-4" />
                    Upload Photos
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setActiveModal('checkin')}>
                    <Check className="mr-2 h-4 w-4" />
                    Manage Check-ins
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setActiveModal('music')}>
                    <Music className="mr-2 h-4 w-4" />
                    Update Playlist
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setActiveModal('feedback')}>
                    <Star className="mr-2 h-4 w-4" />
                    Request Feedback
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setActiveModal('rsvps')}>
                    <CheckCheck className="mr-2 h-4 w-4" />
                    Manage RSVPs
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="guests">
            <GuestList />
          </TabsContent>
          
          <TabsContent value="schedule">
            <ScheduleView />
          </TabsContent>
          
          <TabsContent value="channels">
            <ChannelMessages />
          </TabsContent>
          
          <TabsContent value="gallery">
            <GalleryView />
          </TabsContent>
          
          <TabsContent value="vendors">
            <VendorCoordination />
          </TabsContent>
          
          <TabsContent value="map">
            <MapView />
          </TabsContent>
        </Tabs>
        
        {/* Demo Modals */}
        <DemoModal 
          isOpen={activeModal === 'guests'} 
          onClose={() => setActiveModal(null)}
          title="Add New Guests"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input type="text" className="w-full p-2 border rounded" placeholder="Guest name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" className="w-full p-2 border rounded" placeholder="Email address" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input type="tel" className="w-full p-2 border rounded" placeholder="+91 98765 43210" />
            </div>
            <div className="flex justify-end">
              <Button className="bg-shaadi-red hover:bg-shaadi-maroon">Add Guest</Button>
            </div>
          </div>
        </DemoModal>
        
        <DemoModal 
          isOpen={activeModal === 'announcement'} 
          onClose={() => setActiveModal(null)}
          title="Send Announcement"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Select Channel</label>
              <select className="w-full p-2 border rounded">
                <option>All Guests</option>
                <option>#Travel</option>
                <option>#Food</option>
                <option>#Decoration</option>
                <option>#Accommodation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea className="w-full p-2 border rounded h-32" placeholder="Type your announcement here..."></textarea>
            </div>
            <div className="flex justify-end">
              <Button className="bg-shaadi-red hover:bg-shaadi-maroon">Send to All Guests</Button>
            </div>
          </div>
        </DemoModal>
        
        <DemoModal 
          isOpen={!!activeModal && !['guests', 'announcement'].includes(activeModal)} 
          onClose={() => setActiveModal(null)}
          title="Feature Preview"
        >
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-shaadi-red/10 rounded-full flex items-center justify-center mb-4">
              <Bell className="h-8 w-8 text-shaadi-red" />
            </div>
            <h3 className="text-xl font-bold mb-2">Feature Demo</h3>
            <p className="text-muted-foreground">
              This is a demo of the {activeModal} feature. In a full implementation, you would be able to 
              interact with and manage this feature here.
            </p>
            <Button className="mt-6 bg-shaadi-red hover:bg-shaadi-maroon">
              Great, Got It!
            </Button>
          </div>
        </DemoModal>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default EventDashboard;
