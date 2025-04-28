
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneCall, HelpCircle, Star, Hospital, ShieldAlert } from 'lucide-react';
import { Button } from "@/components/ui/button";

const contacts = [
  { name: 'Event Coordinator', phone: '+91 98765 43210', role: 'For any event-related queries' },
  { name: 'Hotel Reception', phone: '+91 11 2345 6789', role: 'For accommodation issues' },
  { name: 'Medical Support', phone: '+91 98123 45678', role: 'On-site medical assistance' },
  { name: 'Transport Service', phone: '+91 99887 65432', role: 'For transportation needs' }
];

const EmergencyContacts = () => {
  return (
    <Card className="border-secondary/30 overflow-hidden">
      <div className="bg-gradient-pink-gold h-3"></div>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PhoneCall className="h-5 w-5 text-primary" />
          Emergency Contacts
        </CardTitle>
        <CardDescription>Important contacts for the event</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {contacts.map((contact, index) => (
            <div key={index} className="flex items-start p-3 bg-muted/30 rounded-md">
              <div className="p-2 bg-secondary/20 rounded-full mr-3">
                {index === 0 ? <Star className="h-4 w-4 text-primary" /> : 
                 index === 1 ? <HelpCircle className="h-4 w-4 text-primary" /> : 
                 index === 2 ? <Hospital className="h-4 w-4 text-primary" /> :
                 <ShieldAlert className="h-4 w-4 text-primary" />}
              </div>
              <div>
                <p className="font-medium">{contact.name}</p>
                <p className="text-sm text-muted-foreground">{contact.role}</p>
                <Button variant="link" className="p-0 h-auto text-primary mt-1">
                  {contact.phone}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-pink-50 p-3 rounded-md border border-pink-100">
          <p className="text-sm font-medium text-primary mb-1">Emergency Services</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="font-medium">Police:</p>
              <p className="text-muted-foreground">100</p>
            </div>
            <div>
              <p className="font-medium">Ambulance:</p>
              <p className="text-muted-foreground">102</p>
            </div>
            <div>
              <p className="font-medium">Fire:</p>
              <p className="text-muted-foreground">101</p>
            </div>
            <div>
              <p className="font-medium">Emergency:</p>
              <p className="text-muted-foreground">112</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyContacts;
