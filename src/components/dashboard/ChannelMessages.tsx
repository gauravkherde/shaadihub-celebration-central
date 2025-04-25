
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { demoChannels } from '@/data/demoData';
import { MessageSquare, Send, Image, Smile } from 'lucide-react';

const ChannelMessages = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-shaadi-red" />
          Topic Channels
        </CardTitle>
        <CardDescription>
          Join conversations by topic for better communication
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue={demoChannels[0].id} className="w-full">
          <TabsList className="w-full justify-start px-6 overflow-x-auto flex-nowrap">
            {demoChannels.map((channel) => (
              <TabsTrigger key={channel.id} value={channel.id} className="flex-shrink-0">
                #{channel.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {demoChannels.map((channel) => (
            <TabsContent key={channel.id} value={channel.id} className="px-6 py-4 mt-0 h-[400px] flex flex-col">
              <div className="overflow-y-auto flex-1">
                {channel.messages.map((message) => (
                  <div key={message.id} className="mb-4">
                    <div className="flex gap-2 items-start">
                      <div className="bg-shaadi-gold/20 text-shaadi-maroon w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                        {message.user.split(' ')[0][0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{message.user}</span>
                          <span className="text-xs text-muted-foreground">{message.time}</span>
                        </div>
                        <p className="text-sm mt-1">{message.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 border-t pt-4">
                <div className="flex gap-2">
                  <Input placeholder={`Message #${channel.name}...`} />
                  <Button size="icon" className="bg-shaadi-red hover:bg-shaadi-maroon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2 flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Image className="h-3 w-3 mr-1" />
                    Photo
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    <Smile className="h-3 w-3 mr-1" />
                    Emoji
                  </Button>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button variant="outline" className="text-xs w-full">
          Create New Channel
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChannelMessages;
