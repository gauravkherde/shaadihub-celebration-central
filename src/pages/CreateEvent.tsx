
import React from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "lucide-react";

const CreateEvent = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Create Your Wedding Event</h1>
          <p className="text-muted-foreground mb-8">
            Fill in the details below to set up your wedding celebration space.
          </p>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-shaadi-red" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Let's start with the essential details of your celebration.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="event-name">Event Name</Label>
                <Input id="event-name" placeholder="e.g., Sharma-Patel Wedding" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input id="end-date" type="date" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g., Delhi, India" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Share details about your special day..."
                  rows={4}
                />
              </div>
            </CardContent>
            
            <Separator className="my-4" />
            
            <CardHeader>
              <CardTitle className="text-lg">Couple Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="partner1-name">Partner 1 Name</Label>
                  <Input id="partner1-name" placeholder="e.g., Priya Sharma" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="partner2-name">Partner 2 Name</Label>
                  <Input id="partner2-name" placeholder="e.g., Rahul Patel" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="partner1-phone">Partner 1 Phone</Label>
                  <Input id="partner1-phone" placeholder="e.g., +91 98765 43210" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="partner2-phone">Partner 2 Phone</Label>
                  <Input id="partner2-phone" placeholder="e.g., +91 98765 43210" />
                </div>
              </div>
            </CardContent>
            
            <Separator className="my-4" />
            
            <CardHeader>
              <CardTitle className="text-lg">Additional Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="enable-rsvp" 
                  className="rounded border-shaadi-gold/50 text-shaadi-orange" 
                />
                <Label htmlFor="enable-rsvp" className="text-sm">Enable RSVP for guests</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="enable-gallery" 
                  className="rounded border-shaadi-gold/50 text-shaadi-orange" 
                />
                <Label htmlFor="enable-gallery" className="text-sm">Allow guests to upload photos</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="enable-channels" 
                  className="rounded border-shaadi-gold/50 text-shaadi-orange" 
                />
                <Label htmlFor="enable-channels" className="text-sm">Create default topic channels (#Food, #Travel, #Decoration)</Label>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline">Save as Draft</Button>
              <Button className="bg-shaadi-red hover:bg-shaadi-maroon">Create Event</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default CreateEvent;
