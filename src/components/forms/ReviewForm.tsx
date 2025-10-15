import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "../ui/label";
import { useState } from "react";
import { Button } from "../ui/button";
import { Star } from "lucide-react";

const ReviewForm = () => {
  const [rating, setRating] = useState(0);

  const handleSubmitReview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Review submitted");
  };
  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your Name" required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Your Email" required />
          </div>
          <div>
            <Label>Rating</Label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`focus:outline-none ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  aria-label={`Rate ${star} stars out of 5`}
                >
                  <Star className="w-6 h-6 fill-current" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="review">Review</Label>
            <Textarea
              id="review"
              placeholder="Write your review here"
              required
            />
          </div>
          <Button type="submit">Submit Review</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
