
import React from 'react';
import { Calendar, Users, MessageSquare, Clock, Image, Bell } from 'lucide-react';
import { cn } from "@/lib/utils";

const features = [
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Event Creation & Management",
    description: "Create beautiful event spaces with all the details your guests need for your wedding celebrations."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Guest Management",
    description: "Add guests by phone number or bulk upload via CSV and automatically send SMS invites."
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Topic-based Channels",
    description: "Organize conversations in dedicated channels for #Food, #Decoration, #Travel and more."
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Real-time Schedules",
    description: "Keep everyone on track with live schedules, countdowns, and instant updates."
  },
  {
    icon: <Image className="h-6 w-6" />,
    title: "Centralized Photo Gallery",
    description: "Collect and share all wedding photos and videos in one beautiful gallery."
  },
  {
    icon: <Bell className="h-6 w-6" />,
    title: "RSVP & Check-in Tools",
    description: "Track attendance and manage guest check-ins with a simple digital system."
  }
];

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24" id="features">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need For Your Perfect Wedding</h2>
          <p className="text-lg text-muted-foreground">
            ShaadiHub combines all the tools you need to plan, coordinate, and celebrate your big day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description,
  index
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  index: number;
}) {
  return (
    <div className={cn(
      "decorative-border group hover:shadow-lg transition-all duration-300 bg-card",
      "hover:-translate-y-1"
    )}>
      <div className="flex flex-col items-start gap-4">
        <div className="rounded-lg bg-shaadi-cream p-3 text-shaadi-maroon">
          {icon}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
