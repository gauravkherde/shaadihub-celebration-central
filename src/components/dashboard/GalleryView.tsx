
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { demoGallery } from '@/data/demoData';
import { Image, Upload, Heart, MessageSquare, Share2 } from 'lucide-react';

const GalleryView = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image className="h-5 w-5 text-shaadi-red" />
          Photo Gallery
        </CardTitle>
        <CardDescription>
          Browse and share photos from all events
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue={demoGallery[0].id} className="w-full">
          <TabsList className="w-full justify-start px-6 overflow-x-auto flex-nowrap">
            {demoGallery.map((album) => (
              <TabsTrigger key={album.id} value={album.id} className="flex-shrink-0">
                {album.title}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {demoGallery.map((album) => (
            <TabsContent key={album.id} value={album.id} className="px-6 py-4 mt-0">
              <div className="text-sm text-muted-foreground mb-4">
                {new Date(album.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric'
                })}
                {' • '}{album.photos.length} photos
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {album.photos.map((photo) => (
                  <div 
                    key={photo.id} 
                    className="aspect-square rounded-md overflow-hidden cursor-pointer relative group"
                    onClick={() => setSelectedImage(photo.url)}
                  >
                    <img 
                      src={photo.url} 
                      alt={photo.caption} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <p className="text-white text-xs text-center px-2">{photo.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Modal for selected image */}
              {selectedImage && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
                  <div className="max-w-4xl max-h-[80vh] relative" onClick={(e) => e.stopPropagation()}>
                    <img src={selectedImage} alt="Enlarged view" className="max-w-full max-h-[80vh] object-contain" />
                    <Button 
                      variant="outline" 
                      className="absolute top-2 right-2 bg-black/50 text-white border-white/20 hover:bg-black/70"
                      onClick={() => setSelectedImage(null)}
                    >
                      Close
                    </Button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-3 flex justify-between items-center">
                      <div className="text-white text-sm">
                        {album.title}
                      </div>
                      <div className="flex items-center gap-3">
                        <Button size="icon" variant="ghost" className="text-white">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-white">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-white">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <Button variant="outline">
          Create Album
        </Button>
        <Button className="bg-shaadi-red hover:bg-shaadi-maroon">
          <Upload className="h-4 w-4 mr-2" />
          Upload Photos
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GalleryView;
