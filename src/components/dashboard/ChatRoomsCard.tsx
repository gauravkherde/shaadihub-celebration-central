
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send, Users } from 'lucide-react';
import { Avatar } from "@/components/ui/avatar";

interface ChatRoom {
  id: string;
  name: string;
  description: string;
  participantsCount: number;
  messages: ChatMessage[];
}

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: string;
}

const demoChatRooms: ChatRoom[] = [
  {
    id: 'general',
    name: 'General',
    description: 'Chat for all wedding guests',
    participantsCount: 128,
    messages: [
      {
        id: 'm1',
        userId: 'u1',
        userName: 'Anita Desai',
        userAvatar: 'https://i.pravatar.cc/100?img=1',
        content: 'Hello everyone! So excited for the wedding!',
        timestamp: '2025-12-11T09:30:00'
      },
      {
        id: 'm2',
        userId: 'u2',
        userName: 'Raj Kumar',
        userAvatar: 'https://i.pravatar.cc/100?img=2',
        content: 'Me too! Looking forward to seeing you all there!',
        timestamp: '2025-12-11T09:32:00'
      },
      {
        id: 'm3',
        userId: 'u3',
        userName: 'Priya Sharma',
        userAvatar: 'https://i.pravatar.cc/100?img=3',
        content: 'Does anyone know if there\'s transportation from the airport?',
        timestamp: '2025-12-11T09:35:00'
      }
    ]
  },
  {
    id: 'bride-squad',
    name: 'Bride Squad',
    description: 'For the bride\'s friends and family',
    participantsCount: 42,
    messages: [
      {
        id: 'm1',
        userId: 'u4',
        userName: 'Meera Joshi',
        userAvatar: 'https://i.pravatar.cc/100?img=4',
        content: 'Excited for the bachelorette party tonight!',
        timestamp: '2025-12-11T10:00:00'
      },
      {
        id: 'm2',
        userId: 'u5',
        userName: 'Leela Patel',
        userAvatar: 'https://i.pravatar.cc/100?img=5',
        content: 'I got my outfit ready! Going to be so much fun!',
        timestamp: '2025-12-11T10:05:00'
      }
    ]
  },
  {
    id: 'groom-squad',
    name: 'Groom Squad',
    description: 'For the groom\'s friends and family',
    participantsCount: 38,
    messages: []
  },
];

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

const ChatRoomsCard = () => {
  const [activeRoomId, setActiveRoomId] = useState<string>('general');
  const [newMessage, setNewMessage] = useState<string>('');
  
  const activeRoom = demoChatRooms.find(room => room.id === activeRoomId);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim() === '') return;
    
    // In a real app, you would send this to your backend
    console.log('Sending message:', newMessage, 'to room:', activeRoomId);
    
    // Clear the input
    setNewMessage('');
  };
  
  return (
    <Card className="border-secondary/30 overflow-hidden h-[600px] flex flex-col">
      <div className="bg-gradient-to-r from-primary to-secondary h-2"></div>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MessageCircle className="h-5 w-5 text-primary" />
          Chat Rooms
        </CardTitle>
        <CardDescription>
          Connect with other guests in these chat rooms
        </CardDescription>
      </CardHeader>
      <div className="flex flex-1 overflow-hidden">
        {/* Chat room list */}
        <div className="w-1/3 border-r border-secondary/20 overflow-y-auto p-2">
          {demoChatRooms.map(room => (
            <div 
              key={room.id}
              className={`p-3 rounded-md cursor-pointer transition-colors mb-2 ${
                activeRoomId === room.id 
                  ? 'bg-secondary/20 border-l-2 border-secondary' 
                  : 'hover:bg-muted/50'
              }`}
              onClick={() => setActiveRoomId(room.id)}
            >
              <div className="font-medium text-sm"># {room.name}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Users className="h-3 w-3" /> {room.participantsCount}
              </div>
            </div>
          ))}
        </div>
        
        {/* Chat messages */}
        <div className="flex-1 flex flex-col max-h-full">
          {activeRoom && (
            <>
              <div className="p-3 border-b border-secondary/20 bg-muted/30">
                <h3 className="font-medium">#{activeRoom.name}</h3>
                <p className="text-xs text-muted-foreground">{activeRoom.description}</p>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeRoom.messages.length > 0 ? (
                  activeRoom.messages.map(message => (
                    <div key={message.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        {message.userAvatar && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img 
                            src={message.userAvatar} 
                            alt={message.userName} 
                            className="h-full w-full object-cover"
                          />
                        )}
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{message.userName}</span>
                          <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                        </div>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No messages yet. Start the conversation!
                  </div>
                )}
              </div>
              
              <div className="p-3 border-t border-secondary/20">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    className="flex-1"
                    placeholder={`Message #${activeRoom.name}`}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button 
                    type="submit"
                    size="icon"
                    disabled={newMessage.trim() === ''}
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ChatRoomsCard;
