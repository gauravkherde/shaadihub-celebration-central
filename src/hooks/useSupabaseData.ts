
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

// Guest data hook
export const useGuestData = () => {
  const [guests, setGuests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchGuests = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all guests from the guests table
        const { data, error } = await supabase
          .from('guests')
          .select('*')
          .order('name');

        if (error) throw error;
        setGuests(data || []);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching guests:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGuests();

    // Set up real-time subscription for guests
    const subscription = supabase
      .channel('public:guests')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'guests' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setGuests((current) => [...current, payload.new]);
        } else if (payload.eventType === 'UPDATE') {
          setGuests((current) => 
            current.map((guest) => (guest.id === payload.new.id ? payload.new : guest))
          );
        } else if (payload.eventType === 'DELETE') {
          setGuests((current) => 
            current.filter((guest) => guest.id !== payload.old.id)
          );
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [user]);

  return { guests, isLoading, error };
};

// Schedule data hook
export const useScheduleData = () => {
  const [schedule, setSchedule] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchSchedule = async () => {
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('date', { ascending: true });

        if (error) throw error;
        setSchedule(data || []);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching schedule:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();

    // Set up real-time subscription for events
    const subscription = supabase
      .channel('public:events')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'events' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setSchedule((current) => [...current, payload.new]);
        } else if (payload.eventType === 'UPDATE') {
          setSchedule((current) => 
            current.map((event) => (event.id === payload.new.id ? payload.new : event))
          );
        } else if (payload.eventType === 'DELETE') {
          setSchedule((current) => 
            current.filter((event) => event.id !== payload.old.id)
          );
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [user]);

  return { schedule, isLoading, error };
};

// Messages and channels hook
export const useChannelData = () => {
  const [channels, setChannels] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchChannels = async () => {
      try {
        setIsLoading(true);
        
        // First get all channels
        const { data: channelsData, error: channelsError } = await supabase
          .from('channels')
          .select('*')
          .order('name');

        if (channelsError) throw channelsError;
        
        // Then get messages for each channel
        const channelsWithMessages = await Promise.all(
          (channelsData || []).map(async (channel) => {
            const { data: messagesData, error: messagesError } = await supabase
              .from('messages')
              .select(`
                *,
                profiles:user_id (name)
              `)
              .eq('channel_id', channel.id)
              .order('created_at', { ascending: false })
              .limit(20);

            if (messagesError) throw messagesError;
            
            return {
              ...channel,
              messages: (messagesData || []).map((msg) => ({
                id: msg.id,
                user: msg.profiles?.name || 'Unknown User',
                text: msg.content,
                time: new Date(msg.created_at).toLocaleString(),
              })),
            };
          })
        );

        setChannels(channelsWithMessages);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching channels:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChannels();

    // Set up real-time subscription for channels
    const channelsSubscription = supabase
      .channel('public:channels')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'channels' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setChannels((current) => [...current, {...payload.new, messages: []}]);
        } else if (payload.eventType === 'UPDATE') {
          setChannels((current) => 
            current.map((channel) => (channel.id === payload.new.id ? 
              {...payload.new, messages: channel.messages} : channel))
          );
        } else if (payload.eventType === 'DELETE') {
          setChannels((current) => 
            current.filter((channel) => channel.id !== payload.old.id)
          );
        }
      })
      .subscribe();

    // Set up real-time subscription for messages
    const messagesSubscription = supabase
      .channel('public:messages')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, async (payload) => {
        if (payload.eventType === 'INSERT') {
          // Get user name for the message
          const { data: userData } = await supabase
            .from('profiles')
            .select('name')
            .eq('id', payload.new.user_id)
            .single();
          
          const newMessage = {
            id: payload.new.id,
            user: userData?.name || 'Unknown',
            text: payload.new.content,
            time: new Date(payload.new.created_at).toLocaleString(),
          };
          
          setChannels((current) => 
            current.map((channel) => (channel.id === payload.new.channel_id ? 
              {...channel, messages: [newMessage, ...channel.messages]} : channel))
          );
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channelsSubscription);
      supabase.removeChannel(messagesSubscription);
    };
  }, [user]);

  return { channels, isLoading, error };
};

// Tasks data hook
export const useTasksData = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('tasks')
          .select(`
            *,
            profiles:assigned_to (name)
          `)
          .order('due_date');

        if (error) throw error;
        
        setTasks((data || []).map(task => ({
          id: task.id,
          text: task.description,
          completed: task.completed,
          assignedTo: task.profiles?.name || 'Unassigned',
          dueDate: task.due_date
        })));
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching tasks:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();

    // Set up real-time subscription
    const subscription = supabase
      .channel('public:tasks')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, async (payload) => {
        if (payload.eventType === 'INSERT') {
          // Get user name for the task
          const { data: userData } = await supabase
            .from('profiles')
            .select('name')
            .eq('id', payload.new.assigned_to)
            .single();
          
          const newTask = {
            id: payload.new.id,
            text: payload.new.description,
            completed: payload.new.completed,
            assignedTo: userData?.name || 'Unassigned',
            dueDate: payload.new.due_date
          };
          
          setTasks((current) => [...current, newTask]);
        } else if (payload.eventType === 'UPDATE') {
          setTasks((current) => 
            current.map((task) => (task.id === payload.new.id ? {
              ...task,
              text: payload.new.description,
              completed: payload.new.completed,
              dueDate: payload.new.due_date
            } : task))
          );
        } else if (payload.eventType === 'DELETE') {
          setTasks((current) => 
            current.filter((task) => task.id !== payload.old.id)
          );
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [user]);

  return { tasks, isLoading, error };
};

// Announcements data hook
export const useAnnouncementsData = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchAnnouncements = async () => {
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('announcements')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) throw error;
        
        setAnnouncements((data || []).map(announcement => ({
          id: announcement.id,
          title: announcement.title,
          message: announcement.message,
          type: announcement.type,
          timestamp: announcement.created_at
        })));
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching announcements:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();

    // Set up real-time subscription
    const subscription = supabase
      .channel('public:announcements')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'announcements' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          const newAnnouncement = {
            id: payload.new.id,
            title: payload.new.title,
            message: payload.new.message,
            type: payload.new.type,
            timestamp: payload.new.created_at
          };
          
          setAnnouncements((current) => [newAnnouncement, ...current]);
        } else if (payload.eventType === 'UPDATE') {
          setAnnouncements((current) => 
            current.map((announcement) => (announcement.id === payload.new.id ? {
              ...announcement,
              title: payload.new.title,
              message: payload.new.message,
              type: payload.new.type
            } : announcement))
          );
        } else if (payload.eventType === 'DELETE') {
          setAnnouncements((current) => 
            current.filter((announcement) => announcement.id !== payload.old.id)
          );
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [user]);

  return { announcements, isLoading, error };
};

