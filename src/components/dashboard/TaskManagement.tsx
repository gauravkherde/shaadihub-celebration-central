
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { demoTasks } from '@/data/demoData';
import { Plus, Calendar, User } from 'lucide-react';

const TaskManagement = () => {
  const [tasks, setTasks] = useState(demoTasks);
  const [newTask, setNewTask] = useState('');

  const toggleTaskCompleted = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed } 
        : task
    ));
  };

  const addTask = () => {
    if (newTask.trim() === '') return;
    
    const newTaskObj = {
      id: `${Date.now()}`,
      text: newTask,
      completed: false,
      assignedTo: 'Event Host',
      dueDate: new Date().toISOString().split('T')[0]
    };
    
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
        <CardDescription>
          Manage your wedding planning tasks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-start p-2 hover:bg-muted/50 rounded-md -mx-2">
              <input 
                type="checkbox" 
                checked={task.completed}
                onChange={() => toggleTaskCompleted(task.id)}
                className="rounded border-shaadi-gold/50 text-shaadi-orange mt-1" 
              />
              <div className="ml-3 flex-1">
                <p className={`${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                  {task.text}
                </p>
                <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {task.dueDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {task.assignedTo}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex gap-2">
          <Input 
            placeholder="Add a new task..." 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <Button onClick={addTask} className="bg-shaadi-red hover:bg-shaadi-maroon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button variant="outline" className="w-full text-xs">
          View All Tasks
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskManagement;
