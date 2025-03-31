
import React, { useState } from "react";
import { Star, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

// Sample reviews data - in a real app, this would come from an API
const sampleReviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    date: "2 months ago",
    text: "After my sports injury, I was in constant pain. The team at Noushy helped me recover completely. Their expertise and personalized approach made all the difference!",
    avatar: "SJ"
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 5,
    date: "1 month ago",
    text: "Professional service with amazing results. My back pain has significantly improved after just a few sessions. Highly recommend their manual therapy program.",
    avatar: "MC"
  },
  {
    id: 3,
    name: "Emma Williams",
    rating: 4,
    text: "Great experience overall. The therapists are knowledgeable and the facility is clean and welcoming. Would recommend to anyone needing physiotherapy services.",
    date: "3 weeks ago",
    avatar: "EW"
  }
];

interface ReviewProps {
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}

const Review: React.FC<ReviewProps> = ({ name, rating, text, date, avatar }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-noushy-200 flex items-center justify-center text-noushy-700 font-medium">
              {avatar}
            </div>
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              <CardDescription>{date}</CardDescription>
            </div>
          </div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-noushy-700">{text}</p>
      </CardContent>
    </Card>
  );
};

export const GoogleReviews = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleLeaveReview = () => {
    // In a real implementation, this would open the Google review dialog
    // For now, we'll just open a new tab to Google Maps
    window.open("https://www.google.com/maps/search/?api=1&query=noushy+physiotherapy", "_blank");
    toast.success("Thank you for leaving a review!");
  };
  
  return (
    <section className="py-16 bg-noushy-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-noushy-900 mb-4">
            What Our Patients Say
          </h2>
          <p className="text-noushy-700 text-lg max-w-2xl mx-auto">
            Read reviews from our patients to learn about their experiences at Noushy Physiotherapy Centre.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {sampleReviews.map((review) => (
            <Review
              key={review.id}
              name={review.name}
              rating={review.rating}
              text={review.text}
              date={review.date}
              avatar={review.avatar}
            />
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            onClick={handleLeaveReview}
            className="bg-noushy-500 hover:bg-noushy-600 text-white"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Leave a Google Review
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
