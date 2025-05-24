
import { useState } from "react";
import { useParams } from "react-router-dom";
import ItemHeader from "@/components/assistant/ItemHeader";
import ItemInfoCard from "@/components/assistant/ItemInfoCard";
import ReminderEditForm from "@/components/assistant/ReminderEditForm";
import ItemNotesSection from "@/components/assistant/ItemNotesSection";
import QuickActionsGrid from "@/components/assistant/QuickActionsGrid";

const AssistantItemDetail = () => {
  const { itemId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [reminderData, setReminderData] = useState({
    medicationName: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    startDate: "2024-01-15",
    duration: "30 days",
    reminderTime: "08:00",
    notes: "Take with breakfast"
  });
  const [itemNotes, setItemNotes] = useState("");

  // Mock item data based on type
  const item = {
    id: itemId,
    type: "reminder", // could be "reminder", "appointment", "suggestion"
    title: "Medication Reminder",
    subtitle: "Lisinopril 10mg",
    description: "Daily heart medication",
    time: "Today 8:00 AM",
    status: "active"
  };

  const handleSaveReminder = () => {
    console.log("Saving reminder:", reminderData);
    setIsEditing(false);
    // Handle reminder save
  };

  const handleSaveNotes = () => {
    console.log("Saving notes:", itemNotes);
    // Handle notes save
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <ItemHeader 
        itemType={item.type}
        isEditing={isEditing}
        onEditToggle={() => setIsEditing(!isEditing)}
      />

      <div className="px-6 py-6 space-y-6">
        <ItemInfoCard item={item} />

        {item.type === "reminder" && isEditing && (
          <ReminderEditForm
            reminderData={reminderData}
            onReminderDataChange={setReminderData}
            onSave={handleSaveReminder}
            onCancel={() => setIsEditing(false)}
          />
        )}

        <ItemNotesSection
          notes={itemNotes}
          onNotesChange={setItemNotes}
          onSaveNotes={handleSaveNotes}
        />

        <QuickActionsGrid />
      </div>
    </div>
  );
};

export default AssistantItemDetail;
