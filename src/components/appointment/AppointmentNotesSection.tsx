
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface AppointmentNotesSectionProps {
  status: string;
  notes: string;
  onNotesChange: (notes: string) => void;
  onSaveNotes: () => void;
}

const AppointmentNotesSection = ({ 
  status, 
  notes, 
  onNotesChange, 
  onSaveNotes 
}: AppointmentNotesSectionProps) => {
  return (
    <Card className="p-6 bg-white/80 border-slate-200/50">
      <h3 className="text-lg font-bold text-slate-800 mb-4">
        {status === 'upcoming' ? 'Pre-visit Notes' : 'Post-visit Notes'}
      </h3>
      <Textarea
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder={
          status === 'upcoming' 
            ? "Add any notes or questions for your doctor..."
            : "Add notes about your visit, treatment, or follow-up instructions..."
        }
        className="bg-slate-50/80 mb-4"
        rows={4}
      />
      <Button onClick={onSaveNotes} className="bg-indigo-600 hover:bg-indigo-700">
        Save Notes
      </Button>
    </Card>
  );
};

export default AppointmentNotesSection;
