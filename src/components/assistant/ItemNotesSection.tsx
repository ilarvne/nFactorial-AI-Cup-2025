
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface ItemNotesSectionProps {
  notes: string;
  onNotesChange: (notes: string) => void;
  onSaveNotes: () => void;
}

const ItemNotesSection = ({ notes, onNotesChange, onSaveNotes }: ItemNotesSectionProps) => {
  return (
    <Card className="p-6 bg-white/80 border-slate-200/50">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Notes</h3>
      <Textarea
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder="Add notes about this item..."
        className="bg-slate-50/80 mb-4"
        rows={4}
      />
      <Button 
        onClick={onSaveNotes}
        className="bg-indigo-600 hover:bg-indigo-700"
      >
        Save Notes
      </Button>
    </Card>
  );
};

export default ItemNotesSection;
