
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { demoGuests } from '@/data/demoData';
import { Search, UserPlus, Check, Clock } from 'lucide-react';

const GuestList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredGuests = demoGuests.filter(guest => 
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    guest.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Guest List</span>
          <span className="text-xs bg-shaadi-red/10 text-shaadi-red px-2 py-1 rounded-full">
            {demoGuests.filter(g => g.status === 'Confirmed').length} confirmed / {demoGuests.length} total
          </span>
        </CardTitle>
        <CardDescription>
          Manage your guest list and track RSVPs
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
          <Button className="ml-2 bg-shaadi-red hover:bg-shaadi-maroon">
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
                <th className="text-left text-xs font-medium text-muted-foreground p-2">Status</th>
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
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      guest.status === 'Confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : guest.status === 'Declined'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {guest.status === 'Confirmed' ? <Check className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                      {guest.status}
                    </div>
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
