
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { demoVendors } from '@/data/demoData';
import { Phone, Mail, Plus } from 'lucide-react';

const VendorCoordination = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendor Management</CardTitle>
        <CardDescription>
          Coordinate with your wedding vendors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {demoVendors.map((vendor) => (
            <div key={vendor.id} className="border rounded-md p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{vendor.name}</h3>
                  <p className="text-xs text-muted-foreground">{vendor.category}</p>
                </div>
                <div className="bg-shaadi-red/10 text-shaadi-red text-xs px-2 py-0.5 rounded-full">
                  {vendor.category}
                </div>
              </div>
              <p className="text-sm mt-2">{vendor.notes}</p>
              <div className="mt-3 text-xs text-muted-foreground">
                <div className="font-medium">{vendor.contact}</div>
                <div className="flex flex-wrap gap-3 mt-1">
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    <a href={`tel:${vendor.phone}`} className="hover:underline">{vendor.phone}</a>
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    <a href={`mailto:${vendor.email}`} className="hover:underline">{vendor.email}</a>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex gap-2">
                <Button variant="outline" size="sm" className="text-xs">Message</Button>
                <Button variant="outline" size="sm" className="text-xs">Notes</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button className="w-full bg-shaadi-red hover:bg-shaadi-maroon">
          <Plus className="h-4 w-4 mr-2" />
          Add Vendor
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VendorCoordination;
