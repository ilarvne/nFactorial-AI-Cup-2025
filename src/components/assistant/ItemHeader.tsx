
import { ArrowLeft, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ItemHeaderProps {
  itemType: string;
  isEditing: boolean;
  onEditToggle: () => void;
}

const ItemHeader = ({ itemType, isEditing, onEditToggle }: ItemHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white/95 backdrop-blur-xl border-b border-slate-100/50 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/")}
            className="rounded-xl"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-slate-800">Item Details</h1>
        </div>
        
        {itemType === "reminder" && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onEditToggle}
            className="rounded-xl"
          >
            <Edit className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ItemHeader;
