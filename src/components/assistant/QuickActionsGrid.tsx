
import { Button } from "@/components/ui/button";

const QuickActionsGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button variant="outline" className="p-4">
        Mark Complete
      </Button>
      <Button variant="outline" className="p-4 text-red-600 border-red-200 hover:bg-red-50">
        Delete Item
      </Button>
    </div>
  );
};

export default QuickActionsGrid;
