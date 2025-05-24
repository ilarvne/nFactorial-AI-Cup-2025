
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ReminderData {
  medicationName: string;
  dosage: string;
  frequency: string;
  startDate: string;
  duration: string;
  reminderTime: string;
  notes: string;
}

interface ReminderEditFormProps {
  reminderData: ReminderData;
  onReminderDataChange: (data: ReminderData) => void;
  onSave: () => void;
  onCancel: () => void;
}

const ReminderEditForm = ({ 
  reminderData, 
  onReminderDataChange, 
  onSave, 
  onCancel 
}: ReminderEditFormProps) => {
  const updateReminderData = (field: keyof ReminderData, value: string) => {
    onReminderDataChange({ ...reminderData, [field]: value });
  };

  return (
    <Card className="p-6 bg-white/80 border-slate-200/50">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Edit Reminder</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Medication Name</label>
          <Input
            value={reminderData.medicationName}
            onChange={(e) => updateReminderData('medicationName', e.target.value)}
            className="bg-slate-50/80"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Dosage</label>
            <Input
              value={reminderData.dosage}
              onChange={(e) => updateReminderData('dosage', e.target.value)}
              className="bg-slate-50/80"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Frequency</label>
            <Input
              value={reminderData.frequency}
              onChange={(e) => updateReminderData('frequency', e.target.value)}
              className="bg-slate-50/80"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Start Date</label>
            <Input
              type="date"
              value={reminderData.startDate}
              onChange={(e) => updateReminderData('startDate', e.target.value)}
              className="bg-slate-50/80"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Duration</label>
            <Input
              value={reminderData.duration}
              onChange={(e) => updateReminderData('duration', e.target.value)}
              className="bg-slate-50/80"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Reminder Time</label>
          <Input
            type="time"
            value={reminderData.reminderTime}
            onChange={(e) => updateReminderData('reminderTime', e.target.value)}
            className="bg-slate-50/80"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Notes</label>
          <Textarea
            value={reminderData.notes}
            onChange={(e) => updateReminderData('notes', e.target.value)}
            className="bg-slate-50/80"
            rows={3}
          />
        </div>

        <div className="flex gap-3">
          <Button 
            onClick={onSave}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700"
          >
            Save Changes
          </Button>
          <Button 
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ReminderEditForm;
