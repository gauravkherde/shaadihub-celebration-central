
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MessageSquare, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    
    // In a real app, this would submit to the backend
    setSubmitted(true);
    toast.success('Feedback submitted successfully!');
  };

  if (submitted) {
    return (
      <Card className="border-secondary/30 overflow-hidden">
        <div className="bg-gradient-pink-gold h-3"></div>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Feedback & Reviews
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <div className="mx-auto w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
            <Star className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Thank You!</h3>
          <p className="text-muted-foreground">
            Your feedback has been submitted successfully. We appreciate your input!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-secondary/30 overflow-hidden">
      <div className="bg-gradient-pink-gold h-3"></div>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Feedback & Reviews
        </CardTitle>
        <CardDescription>Share your thoughts about the event</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">How would you rate your experience?</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="text-2xl focus:outline-none"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                  >
                    <Star 
                      className={`h-8 w-8 ${
                        star <= (hoveredRating || rating) 
                          ? 'fill-secondary text-secondary' 
                          : 'text-muted-foreground'
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Your feedback</label>
              <Textarea
                placeholder="Share your thoughts, suggestions, or areas for improvement..."
                className="min-h-32"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
          </div>
          
          <Button type="submit" className="mt-4 w-full bg-primary hover:bg-primary/90">
            <Send className="h-4 w-4 mr-2" />
            Submit Feedback
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;
