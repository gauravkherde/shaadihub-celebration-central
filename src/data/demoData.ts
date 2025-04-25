
// Guest Data
export const demoGuests = [
  { id: '1', name: 'Anita Desai', email: 'anita@example.com', phone: '+91 98765 43210', status: 'Confirmed', relationship: 'Family', side: 'Bride', dietaryRestrictions: 'Vegetarian', emergencyContact: 'Rahul Desai: +91 98765 43211', plusOnes: 2, notes: 'Coming from Mumbai' },
  { id: '2', name: 'Raj Kumar', email: 'raj@example.com', phone: '+91 98765 12345', status: 'Confirmed', relationship: 'Friend', side: 'Groom', dietaryRestrictions: 'Non-vegetarian', emergencyContact: 'Priya Kumar: +91 98765 12346', plusOnes: 1, notes: 'Allergic to nuts' },
  { id: '3', name: 'Priya Mehra', email: 'priya@example.com', phone: '+91 87654 32109', status: 'Pending', relationship: 'Colleague', side: 'Groom', dietaryRestrictions: 'Vegan', emergencyContact: 'Vikram Mehra: +91 87654 32108', plusOnes: 0, notes: 'Needs accommodation' },
  { id: '4', name: 'Vikram Singh', email: 'vikram@example.com', phone: '+91 76543 21098', status: 'Confirmed', relationship: 'Family', side: 'Bride', dietaryRestrictions: 'No restrictions', emergencyContact: 'Neha Singh: +91 76543 21099', plusOnes: 3, notes: 'Will bring traditional gifts' },
  { id: '5', name: 'Neha Patel', email: 'neha@example.com', phone: '+91 65432 10987', status: 'Declined', relationship: 'Friend', side: 'Bride', dietaryRestrictions: 'Gluten-free', emergencyContact: 'Arjun Patel: +91 65432 10988', plusOnes: 0, notes: 'Unable to attend due to prior commitment' },
  { id: '6', name: 'Arjun Sharma', email: 'arjun@example.com', phone: '+91 54321 09876', status: 'Confirmed', relationship: 'Friend', side: 'Groom', dietaryRestrictions: 'No restrictions', emergencyContact: 'Meera Sharma: +91 54321 09877', plusOnes: 1, notes: 'Will help with music arrangements' },
  { id: '7', name: 'Meera Joshi', email: 'meera@example.com', phone: '+91 43210 98765', status: 'Pending', relationship: 'Colleague', side: 'Bride', dietaryRestrictions: 'Vegetarian', emergencyContact: 'Rahul Joshi: +91 43210 98766', plusOnes: 0, notes: 'Coming from Delhi' },
  { id: '8', name: 'Rahul Verma', email: 'rahul@example.com', phone: '+91 32109 87654', status: 'Confirmed', relationship: 'Family', side: 'Groom', dietaryRestrictions: 'No restrictions', emergencyContact: 'Sonia Verma: +91 32109 87655', plusOnes: 2, notes: 'Bringing special sweets' },
];

// Schedule Data
export const demoSchedule = [
  {
    id: '1',
    title: 'Mehndi Ceremony',
    date: '2025-12-12',
    time: '16:00',
    location: 'Garden Courtyard, Hotel Imperial',
    description: 'Traditional mehndi application with music and dance performances.',
    notes: 'Casual attire, colorful clothes recommended',
    coordinates: { lat: 28.6129, lng: 77.2295 }
  },
  {
    id: '2',
    title: 'Sangeet Night',
    date: '2025-12-13',
    time: '19:00',
    location: 'Grand Ballroom, Hotel Imperial',
    description: 'Evening of music, dance performances and celebrations.',
    notes: 'Semi-formal attire, family dance performances scheduled',
    coordinates: { lat: 28.6129, lng: 77.2295 }
  },
  {
    id: '3',
    title: 'Haldi Ceremony',
    date: '2025-12-14',
    time: '10:00',
    location: 'Poolside, Hotel Imperial',
    description: 'Traditional turmeric application ceremony for the bride and groom.',
    notes: 'Casual attire, wear clothes that can get stained with turmeric',
    coordinates: { lat: 28.6129, lng: 77.2295 }
  },
  {
    id: '4',
    title: 'Wedding Ceremony',
    date: '2025-12-14',
    time: '19:00',
    location: 'Temple Gardens',
    description: 'Traditional Hindu wedding ceremony with rituals and vows.',
    notes: 'Formal traditional attire, ceremony will last approximately 3 hours',
    coordinates: { lat: 28.6139, lng: 77.2090 }
  },
  {
    id: '5',
    title: 'Reception',
    date: '2025-12-15',
    time: '18:00',
    location: 'Luxury Banquet Hall, Grand Hyatt',
    description: 'Dinner reception with speeches, music and celebrations.',
    notes: 'Formal attire, dinner will be served at 20:00',
    coordinates: { lat: 28.5494, lng: 77.1201 }
  }
];

// Channels Data
export const demoChannels = [
  {
    id: '1',
    name: 'Travel',
    icon: 'airplane',
    messages: [
      { id: '101', user: 'Anita Desai', text: 'Are there any shuttle arrangements from the airport?', time: '2 hours ago' },
      { id: '102', user: 'Event Host', text: 'Yes, we have arranged shuttles from both domestic and international terminals. They will run every hour from 10 AM on Dec 11th.', time: '1 hour ago' },
      { id: '103', user: 'Raj Kumar', text: 'What about parking at the venue for those driving in from nearby cities?', time: '45 minutes ago' },
      { id: '104', user: 'Event Host', text: 'There is ample parking at all venues. You will receive a parking pass at the hotel check-in.', time: '30 minutes ago' }
    ]
  },
  {
    id: '2',
    name: 'Food',
    icon: 'utensils',
    messages: [
      { id: '201', user: 'Raj Kumar', text: 'Will there be gluten-free options available?', time: '5 hours ago' },
      { id: '202', user: 'Event Host', text: 'Yes, we have gluten-free, vegetarian, and vegan options at all events. Please make sure your dietary preferences are updated in your profile.', time: '4 hours ago' },
      { id: '203', user: 'Meera Joshi', text: 'Is there going to be a traditional South Indian breakfast on the final day?', time: '2 hours ago' },
      { id: '204', user: 'Event Host', text: 'Yes, we will have both North and South Indian breakfast options on all days.', time: '1 hour ago' }
    ]
  },
  {
    id: '3',
    name: 'Decoration',
    icon: 'palette',
    messages: [
      { id: '301', user: 'Neha Patel', text: 'What are the color themes for each ceremony?', time: '1 day ago' },
      { id: '302', user: 'Event Host', text: 'Mehndi: Yellow & Green, Sangeet: Blue & Silver, Wedding: Red & Gold, Reception: Purple & Gold', time: '23 hours ago' },
      { id: '303', user: 'Arjun Sharma', text: 'Can guests bring additional decorations for their tables?', time: '10 hours ago' },
      { id: '304', user: 'Event Host', text: 'Small personal touches are welcome, but please coordinate with us first so we can ensure it fits with the overall decor.', time: '8 hours ago' }
    ]
  },
  {
    id: '4',
    name: 'Accommodation',
    icon: 'building',
    messages: [
      { id: '401', user: 'Priya Mehra', text: 'Is there a special rate at nearby hotels for guests?', time: '2 days ago' },
      { id: '402', user: 'Event Host', text: 'Yes, we have negotiated special rates at Hotel Imperial and Grand Hyatt. Use code "SHARMAPATEL" when booking.', time: '1 day ago' },
      { id: '403', user: 'Vikram Singh', text: 'Until what date can we book rooms at the special rate?', time: '12 hours ago' },
      { id: '404', user: 'Event Host', text: 'The special rate is available until November 12th, one month before the wedding.', time: '10 hours ago' }
    ]
  }
];

// Gallery Data
export const demoGallery = [
  {
    id: '1',
    title: 'Engagement Photos',
    date: '2025-06-15',
    photos: [
      { id: '101', url: 'https://source.unsplash.com/random/800x600/?indian,engagement', caption: 'Ring ceremony', uploadedBy: 'Event Host' },
      { id: '102', url: 'https://source.unsplash.com/random/800x600/?indian,couple', caption: 'First official photo as an engaged couple', uploadedBy: 'Event Host' },
      { id: '103', url: 'https://source.unsplash.com/random/800x600/?celebration,indian', caption: 'Family celebration', uploadedBy: 'Rahul Verma' },
    ]
  },
  {
    id: '2',
    title: 'Pre-Wedding Photoshoot',
    date: '2025-09-23',
    photos: [
      { id: '201', url: 'https://source.unsplash.com/random/800x600/?indian,wedding', caption: 'Garden photoshoot', uploadedBy: 'Event Host' },
      { id: '202', url: 'https://source.unsplash.com/random/800x600/?couple,traditional', caption: 'Traditional outfits', uploadedBy: 'Event Host' },
      { id: '203', url: 'https://source.unsplash.com/random/800x600/?couple,sunset', caption: 'Sunset by the lake', uploadedBy: 'Arjun Sharma' },
    ]
  },
  {
    id: '3',
    title: 'Family Get-Together',
    date: '2025-11-05',
    photos: [
      { id: '301', url: 'https://source.unsplash.com/random/800x600/?indian,family', caption: 'Extended family dinner', uploadedBy: 'Neha Patel' },
      { id: '302', url: 'https://source.unsplash.com/random/800x600/?dinner,celebration', caption: 'Pre-wedding dinner celebration', uploadedBy: 'Event Host' },
      { id: '303', url: 'https://source.unsplash.com/random/800x600/?family,laughing', caption: 'Joyful moments', uploadedBy: 'Vikram Singh' },
    ]
  }
];

// Tasks Data
export const demoTasks = [
  { id: '1', text: 'Finalize menu with caterer', completed: false, assignedTo: 'Event Host', dueDate: '2025-11-25' },
  { id: '2', text: 'Confirm flowers for mandap decoration', completed: false, assignedTo: 'Event Host', dueDate: '2025-11-30' },
  { id: '3', text: 'Follow up with DJ for playlist', completed: false, assignedTo: 'Arjun Sharma', dueDate: '2025-12-01' },
  { id: '4', text: 'Send reminder to guests for RSVP', completed: true, assignedTo: 'Event Host', dueDate: '2025-11-15' },
  { id: '5', text: 'Confirm transportation for elderly family members', completed: false, assignedTo: 'Rahul Verma', dueDate: '2025-12-05' },
  { id: '6', text: 'Final dress fitting for bride and groom', completed: true, assignedTo: 'Event Host', dueDate: '2025-12-01' },
  { id: '7', text: 'Review photography shot list', completed: false, assignedTo: 'Event Host', dueDate: '2025-12-07' },
  { id: '8', text: 'Confirm special meal requirements with hotel', completed: false, assignedTo: 'Event Host', dueDate: '2025-12-02' }
];

// Vendor Data
export const demoVendors = [
  { id: '1', name: 'Exotic Blooms', category: 'Flowers', contact: 'Kavita Sharma', phone: '+91 98765 87654', email: 'kavita@exoticblooms.com', notes: 'Providing all floral arrangements and mandap decorations' },
  { id: '2', name: 'Delhi Caterers', category: 'Food', contact: 'Rajan Khanna', phone: '+91 87654 76543', email: 'rajan@delhicaterers.com', notes: 'Handling all food arrangements, specializes in North Indian cuisine' },
  { id: '3', name: 'Rhythm Masters', category: 'Music', contact: 'DJ Aryan', phone: '+91 76543 65432', email: 'aryan@rhythmmasters.com', notes: 'DJ and live musicians for sangeet and reception' },
  { id: '4', name: 'Capture Moments', category: 'Photography', contact: 'Vikram Rathore', phone: '+91 65432 54321', email: 'vikram@capturemoments.com', notes: 'Photography and videography team, including drone footage' },
  { id: '5', name: 'Bridal Beauty', category: 'Makeup', contact: 'Neha Khanna', phone: '+91 54321 43210', email: 'neha@bridalbeauty.com', notes: 'Makeup and hair for bride and bridal party' },
  { id: '6', name: 'Event Solutions', category: 'Event Management', contact: 'Priya Malhotra', phone: '+91 43210 32109', email: 'priya@eventsolutions.com', notes: 'Coordinating all vendors and event scheduling' }
];

// Seating Arrangement Data
export const demoSeatingData = {
  venue: 'Grand Ballroom, Hotel Imperial',
  tables: [
    { id: '1', name: 'Family Table 1', capacity: 10, assigned: ['Anita Desai', 'Rahul Verma', 'Vikram Singh', 'Plus 5 others'] },
    { id: '2', name: 'Family Table 2', capacity: 10, assigned: ['Arjun Sharma', 'Meera Joshi', 'Plus 8 others'] },
    { id: '3', name: 'Friends Table 1', capacity: 8, assigned: ['Raj Kumar', 'Priya Mehra', 'Plus 6 others'] },
    { id: '4', name: 'Friends Table 2', capacity: 8, assigned: ['Plus 8 others'] },
    { id: '5', name: 'Colleagues Table', capacity: 8, assigned: ['Plus 8 others'] },
    { id: '6', name: 'Bride\'s Friends', capacity: 8, assigned: ['Plus 8 others'] },
    { id: '7', name: 'Groom\'s Friends', capacity: 8, assigned: ['Plus 8 others'] },
    { id: '8', name: 'VIP Table', capacity: 6, assigned: ['Plus 6 others'] },
  ]
};

// Weather Data
export const demoWeatherData = [
  { date: '2025-12-12', forecast: 'Sunny', temperature: '22°C', icon: 'sun' },
  { date: '2025-12-13', forecast: 'Partly Cloudy', temperature: '20°C', icon: 'cloud-sun' },
  { date: '2025-12-14', forecast: 'Cloudy', temperature: '19°C', icon: 'cloud' },
  { date: '2025-12-15', forecast: 'Sunny', temperature: '21°C', icon: 'sun' },
];

// Playlist Data
export const demoPlaylistData = [
  { id: '1', title: 'First Dance', artist: 'Various Artists', addedBy: 'Event Host', votes: 12 },
  { id: '2', title: 'Bollywood Dance Mix', artist: 'Various Artists', addedBy: 'Arjun Sharma', votes: 10 },
  { id: '3', title: 'Traditional Wedding Songs', artist: 'Various Artists', addedBy: 'Event Host', votes: 8 },
  { id: '4', title: 'Punjabi Dance Hits', artist: 'Various Artists', addedBy: 'Raj Kumar', votes: 15 },
  { id: '5', title: 'Romantic Slow Songs', artist: 'Various Artists', addedBy: 'Meera Joshi', votes: 7 },
];

// Local Attractions Data
export const demoAttractions = [
  { id: '1', name: 'Taj Mahal', distance: '210 km', description: 'One of the seven wonders of the world', imageUrl: 'https://source.unsplash.com/random/300x200/?taj,mahal' },
  { id: '2', name: 'Red Fort', distance: '5 km', description: 'Historic fort in the city of Delhi', imageUrl: 'https://source.unsplash.com/random/300x200/?red,fort' },
  { id: '3', name: 'India Gate', distance: '3 km', description: 'War memorial located in New Delhi', imageUrl: 'https://source.unsplash.com/random/300x200/?india,gate' },
  { id: '4', name: 'Qutub Minar', distance: '15 km', description: 'UNESCO World Heritage Site', imageUrl: 'https://source.unsplash.com/random/300x200/?qutub,minar' },
  { id: '5', name: 'Lotus Temple', distance: '10 km', description: 'Baha\'i House of Worship', imageUrl: 'https://source.unsplash.com/random/300x200/?lotus,temple' },
];

// Guestbook Data
export const demoGuestbook = [
  { id: '1', name: 'Anita Desai', message: 'Congratulations on your beautiful wedding! Wishing you a lifetime of happiness!', date: '2025-12-15', type: 'text' },
  { id: '2', name: 'Raj Kumar', message: 'Such a wonderful celebration! May your marriage be as colorful as your wedding!', date: '2025-12-15', type: 'text' },
  { id: '3', name: 'Priya Mehra', message: 'Video blessing from Mumbai', date: '2025-12-14', type: 'video' },
  { id: '4', name: 'Vikram Singh', message: 'Voice message blessing', date: '2025-12-15', type: 'audio' },
  { id: '5', name: 'Arjun Sharma', message: 'What a beautiful ceremony! The traditions were so meaningful!', date: '2025-12-14', type: 'text' },
];

// Transportation Data
export const demoTransportation = [
  { id: '1', type: 'Airport Shuttle', schedule: 'Every hour from 10 AM-10 PM, Dec 11-16', pickup: 'Delhi International Airport', contact: '+91 98765 12345' },
  { id: '2', type: 'Hotel Shuttle', schedule: 'Every 30 mins from 9 AM-11 PM, Dec 12-15', pickup: 'Hotel Imperial', contact: '+91 87654 23456' },
  { id: '3', type: 'Wedding Venue Transport', schedule: '5 PM-1 AM, Dec 14', pickup: 'Hotel Imperial', contact: '+91 76543 34567' },
  { id: '4', type: 'Reception Transport', schedule: '5 PM-12 AM, Dec 15', pickup: 'Hotel Imperial to Grand Hyatt', contact: '+91 65432 45678' },
];

// Poll Data
export const demoPolls = [
  { 
    id: '1', 
    question: 'Which cuisine do you prefer for the reception dinner?', 
    options: [
      { id: '1', text: 'North Indian', votes: 25 },
      { id: '2', text: 'South Indian', votes: 15 },
      { id: '3', text: 'Mix of both', votes: 45 },
      { id: '4', text: 'Include International options', votes: 15 }
    ],
    active: true,
    totalVotes: 100
  },
  { 
    id: '2', 
    question: 'What type of music do you want for the Sangeet night?', 
    options: [
      { id: '1', text: 'Traditional folk songs', votes: 20 },
      { id: '2', text: 'Bollywood hits', votes: 35 },
      { id: '3', text: 'Mix of traditional and modern', votes: 40 },
      { id: '4', text: 'Some Western music too', votes: 5 }
    ],
    active: true,
    totalVotes: 100
  }
];

// Notifications Data
export const demoNotifications = [
  { id: '1', title: 'Mehndi Ceremony Tomorrow', message: 'Don\'t forget the Mehndi ceremony starts at 4 PM tomorrow at the Hotel Imperial Garden Courtyard.', date: '2025-12-11', read: false },
  { id: '2', title: 'New Photos Added', message: 'New engagement photos have been added to the gallery. Check them out!', date: '2025-12-10', read: true },
  { id: '3', title: 'RSVP Reminder', message: 'Please confirm your attendance and any dietary restrictions by December 1st.', date: '2025-11-25', read: true },
  { id: '4', title: 'Transportation Update', message: 'Additional shuttles have been arranged from the airport every 30 minutes.', date: '2025-12-05', read: false },
  { id: '5', title: 'Event Location Change', message: 'The Sangeet night has been moved to the Grand Ballroom due to weather forecast.', date: '2025-12-08', read: false },
];
