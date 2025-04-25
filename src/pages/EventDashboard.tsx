
import React from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, MessageSquare, Image, Clock } from 'lucide-react';

const EventDashboard = () => {
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
          <TabsList className="grid grid-cols-5 md:w-fit mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="guests">Guests</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="channels">Channels</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
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
                      <li className="border-l-2 border-shaadi-red pl-3 py-1">
                        <p className="font-medium">Mehndi Ceremony</p>
                        <p className="text-sm text-muted-foreground">Dec 12, 2025 • 4:00 PM</p>
                      </li>
                      <li className="border-l-2 border-shaadi-orange pl-3 py-1">
                        <p className="font-medium">Sangeet Night</p>
                        <p className="text-sm text-muted-foreground">Dec 13, 2025 • 7:00 PM</p>
                      </li>
                      <li className="border-l-2 border-shaadi-gold pl-3 py-1">
                        <p className="font-medium">Wedding Ceremony</p>
                        <p className="text-sm text-muted-foreground">Dec 14, 2025 • 9:00 PM</p>
                      </li>
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
              </CardContent>
              <CardFooter className="border-t pt-6">
                <Button variant="outline" className="w-full">View All Details</Button>
              </CardFooter>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Add New Guests
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="mr-2 h-4 w-4" />
                    Update Schedule
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send Announcement
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Image className="mr-2 h-4 w-4" />
                    Upload Photos
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-shaadi-gold/50 text-shaadi-orange" />
                      <span>Finalize menu with caterer</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-shaadi-gold/50 text-shaadi-orange" />
                      <span>Confirm flowers for mandap decoration</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-shaadi-gold/50 text-shaadi-orange" />
                      <span>Follow up with DJ for playlist</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-shaadi-gold/50 text-shaadi-orange" />
                      <span>Send reminder to guests for RSVP</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="ghost" className="w-full">Add Task</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="guests">
            <Card>
              <CardHeader>
                <CardTitle>Guest Management</CardTitle>
                <CardDescription>
                  Manage your guest list, send invitations, and track RSVPs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">This section will display your full guest list with RSVP status.</p>
                <div className="border rounded-md p-4 text-center">
                  <p>Guest list details will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Event Schedule</CardTitle>
                <CardDescription>
                  Manage and share your event timeline.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">This section will display your event schedule.</p>
                <div className="border rounded-md p-4 text-center">
                  <p>Schedule details will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="channels">
            <Card>
              <CardHeader>
                <CardTitle>Topic Channels</CardTitle>
                <CardDescription>
                  Organize conversations by topic for better communication.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">This section will display your topic channels.</p>
                <div className="border rounded-md p-4 text-center">
                  <p>Channel list and conversations will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="gallery">
            <Card>
              <CardHeader>
                <CardTitle>Photo Gallery</CardTitle>
                <CardDescription>
                  Collect and share photos from all your events.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">This section will display your photo gallery.</p>
                <div className="border rounded-md p-4 text-center">
                  <p>Photos will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default EventDashboard;
