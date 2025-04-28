
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { demoGuests } from '@/data/demoData';
import { Search, UserPlus, Check, Clock, Home, Wifi, X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

// Extended demo guest data with room allocation
const guestsWithRooms = demoGuests.map(guest => ({
  ...guest,
  roomAllocation: guest.status === 'Confirmed' ? {
    roomNumber: Math.floor(Math.random() * 500 + 100).toString(),
    wifiUsername: "SharmaWedding",
    wifiPassword: "Celebrate2025!"
  } : null,
  rsvpStatus: guest.status === 'Confirmed' ? 'attending' : 
              guest.status === 'Declined' ? 'not-attending' : 'pending'
}));

const GuestList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [guests, setGuests] = useState(guestsWithRooms);
  const [selectedGuest, setSelectedGuest] = useState<any>(null);
  
  const filteredGuests = guests.filter(guest => 
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    guest.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleRoomAllocation = (guestId: string, roomDetails: any) => {
    setGuests(prevGuests => 
      prevGuests.map(guest => 
        guest.id === guestId 
          ? { ...guest, roomAllocation: roomDetails } 
          : guest
      )
    );
    setSelectedGuest(null);
    toast.success("Room allocated successfully!");
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Guest List</span>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            {guests.filter(g => g.rsvpStatus === 'attending').length} confirmed / {guests.length} total
          </span>
        </CardTitle>
        <CardDescription>
          Manage your guest list, track RSVPs, and allocate rooms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search guests..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="ml-2 bg-primary hover:bg-primary/90">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Guest
          </Button>
        </div>
        
        <div className="border rounded-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left text-xs font-medium text-muted-foreground p-2">Name</th>
                <th className="text-left text-xs font-medium text-muted-foreground p-2 hidden md:table-cell">Side</th>
                <th className="text-left text-xs font-medium text-muted-foreground p-2 hidden sm:table-cell">Plus Ones</th>
                <th className="text-left text-xs font-medium text-muted-foreground p-2">Room</th>
                <th className="text-left text-xs font-medium text-muted-foreground p-2">Status</th>
                <th className="text-left text-xs font-medium text-muted-foreground p-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredGuests.map((guest) => (
                <tr key={guest.id} className="hover:bg-muted/30">
                  <td className="p-2">
                    <div className="font-medium">{guest.name}</div>
                    <div className="text-xs text-muted-foreground">{guest.email}</div>
                  </td>
                  <td className="p-2 hidden md:table-cell">{guest.side}</td>
                  <td className="p-2 hidden sm:table-cell">{guest.plusOnes}</td>
                  <td className="p-2">
                    {guest.roomAllocation ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary/20 text-secondary-foreground">
                        <Home className="h-3 w-3 mr-1" />
                        Room {guest.roomAllocation.roomNumber}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">Not allocated</span>
                    )}
                  </td>
                  <td className="p-2">
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      guest.rsvpStatus === 'attending' 
                        ? 'bg-green-100 text-green-800' 
                        : guest.rsvpStatus === 'not-attending'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {guest.rsvpStatus === 'attending' ? <Check className="h-3 w-3 mr-1" /> : 
                       guest.rsvpStatus === 'not-attending' ? <X className="h-3 w-3 mr-1" /> : 
                       <Clock className="h-3 w-3 mr-1" />}
                      {guest.rsvpStatus === 'attending' ? 'Attending' : 
                       guest.rsvpStatus === 'not-attending' ? 'Declined' : 'Pending'}
                    </div>
                  </td>
                  <td className="p-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => setSelectedGuest(guest)}
                        >
                          {guest.roomAllocation ? 'Change Room' : 'Assign Room'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Assign Room</DialogTitle>
                          <DialogDescription>
                            Allocate accommodation for {selectedGuest?.name}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Room Number</label>
                            <Input 
                              placeholder="e.g. 301" 
                              defaultValue={selectedGuest?.roomAllocation?.roomNumber} 
                              id="room-number"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">WiFi Username</label>
                            <Input 
                              placeholder="WiFi username" 
                              defaultValue="SharmaWedding" 
                              id="wifi-username"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">WiFi Password</label>
                            <Input 
                              placeholder="WiFi password" 
                              defaultValue="Celebrate2025!" 
                              id="wifi-password"
                            />
                          </div>
                        </div>
                        
                        <DialogFooter>
                          <Button 
                            variant="outline" 
                            onClick={() => setSelectedGuest(null)}
                          >
                            Cancel
                          </Button>
                          <Button 
                            className="bg-primary hover:bg-primary/90"
                            onClick={() => {
                              const roomNumber = (document.getElementById('room-number') as HTMLInputElement).value;
                              const wifiUsername = (document.getElementById('wifi-username') as HTMLInputElement).value;
                              const wifiPassword = (document.getElementById('wifi-password') as HTMLInputElement).value;
                              
                              if (roomNumber && wifiUsername && wifiPassword && selectedGuest) {
                                handleRoomAllocation(selectedGuest.id, {
                                  roomNumber,
                                  wifiUsername,
                                  wifiPassword
                                });
                              }
                            }}
                          >
                            <Wifi className="h-4 w-4 mr-2" />
                            Assign Room
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button variant="outline" className="text-xs w-full">
          Export Guest List
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GuestList;
