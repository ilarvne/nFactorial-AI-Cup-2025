
import { useState } from "react";
import { useParams } from "react-router-dom";
import AppointmentHeader from "@/components/appointment/AppointmentHeader";
import AppointmentInfoCard from "@/components/appointment/AppointmentInfoCard";
import AppointmentActionButtons from "@/components/appointment/AppointmentActionButtons";
import AppointmentNotesSection from "@/components/appointment/AppointmentNotesSection";
import AppointmentReviewSection from "@/components/appointment/AppointmentReviewSection";

const AppointmentDetail = () => {
  const { appointmentId } = useParams();
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const appointment = {
    id: appointmentId,
    doctor: {
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"
    },
    date: "January 15, 2024",
    time: "2:30 PM",
    status: "upcoming",
    location: "Almaty Medical Center",
    type: "Consultation",
    duration: "30 minutes",
    reason: "Heart health checkup"
  };

  const handleSaveNotes = () => {
    console.log("Saving notes:", notes);
    // Handle notes save
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }
    console.log("Submitting review:", { rating, review });
    // Handle review submission
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <AppointmentHeader />

      <div className="px-6 py-6 space-y-6">
        <AppointmentInfoCard appointment={appointment} />

        {appointment.status === 'upcoming' && <AppointmentActionButtons />}

        <AppointmentNotesSection
          status={appointment.status}
          notes={notes}
          onNotesChange={setNotes}
          onSaveNotes={handleSaveNotes}
        />

        {appointment.status === 'completed' && (
          <AppointmentReviewSection
            rating={rating}
            review={review}
            onRatingChange={setRating}
            onReviewChange={setReview}
            onSubmitReview={handleSubmitReview}
          />
        )}
      </div>
    </div>
  );
};

export default AppointmentDetail;
