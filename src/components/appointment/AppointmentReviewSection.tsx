
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface AppointmentReviewSectionProps {
  rating: number;
  review: string;
  onRatingChange: (rating: number) => void;
  onReviewChange: (review: string) => void;
  onSubmitReview: () => void;
}

const AppointmentReviewSection = ({ 
  rating, 
  review, 
  onRatingChange, 
  onReviewChange, 
  onSubmitReview 
}: AppointmentReviewSectionProps) => {
  return (
    <Card className="p-6 bg-white/80 border-slate-200/50">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Leave a Review</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => onRatingChange(star)}
              className="p-1"
            >
              <Star 
                className={`h-8 w-8 ${
                  star <= rating 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">Review</label>
        <Textarea
          value={review}
          onChange={(e) => onReviewChange(e.target.value)}
          placeholder="Share your experience with other patients..."
          className="bg-slate-50/80"
          rows={3}
        />
      </div>

      <Button 
        onClick={onSubmitReview}
        disabled={rating === 0}
        className="w-full bg-indigo-600 hover:bg-indigo-700"
      >
        Submit Review
      </Button>
    </Card>
  );
};

export default AppointmentReviewSection;
