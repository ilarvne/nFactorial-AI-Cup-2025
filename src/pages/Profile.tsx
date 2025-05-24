
import { useState } from "react";
import { User, Phone, CreditCard, Bell, Lock, LogOut, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import BottomNavigation from "@/components/BottomNavigation";
import UnifiedHeader from "@/components/UnifiedHeader";

const Profile = () => {
  const [name, setName] = useState("Alex Johnson");
  const [phone, setPhone] = useState("+7 701 234 5678");
  const [iin, setIin] = useState("123456789012");
  const [notifications, setNotifications] = useState({
    appointments: true,
    reminders: true,
    health: false
  });

  const handleSaveProfile = () => {
    // Handle profile save
    console.log("Saving profile:", { name, phone, iin });
  };

  const profileSections = [
    {
      title: "Personal Information",
      items: [
        { icon: User, label: "Full Name", value: name, editable: true },
        { icon: Phone, label: "Phone Number", value: phone, editable: true },
        { icon: CreditCard, label: "IIN", value: iin, editable: true }
      ]
    }
  ];

  const settingsItems = [
    { icon: Bell, label: "Notifications", hasSwitch: true },
    { icon: Lock, label: "Change Password", action: () => {} },
    { icon: LogOut, label: "Sign Out", action: () => {}, destructive: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 pb-24">
      <UnifiedHeader 
        title="Profile"
        subtitle="Manage your account settings"
        showBack={false}
      />

      <div className="px-6 py-6 space-y-6">
        {/* Profile Avatar */}
        <Card className="p-6 text-center bg-white/80 border-slate-200/50">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">{name}</h2>
          <p className="text-slate-600">Patient ID: {iin}</p>
        </Card>

        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4">Personal Information</h3>
          <Card className="p-6 space-y-4 bg-white/80 border-slate-200/50">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              <Input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-slate-50/80"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
              <Input 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-slate-50/80"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">IIN (National ID)</label>
              <Input 
                value={iin}
                onChange={(e) => setIin(e.target.value)}
                className="bg-slate-50/80"
              />
            </div>
            <Button 
              onClick={handleSaveProfile}
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              Save Changes
            </Button>
          </Card>
        </div>

        {/* Notification Settings */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4">Notification Settings</h3>
          <Card className="p-6 space-y-4 bg-white/80 border-slate-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-800">Appointment Reminders</p>
                <p className="text-sm text-slate-600">Get notified about upcoming appointments</p>
              </div>
              <Switch 
                checked={notifications.appointments}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, appointments: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-800">Medication Reminders</p>
                <p className="text-sm text-slate-600">Get reminded to take your medications</p>
              </div>
              <Switch 
                checked={notifications.reminders}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, reminders: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-800">Health Tips</p>
                <p className="text-sm text-slate-600">Receive personalized health insights</p>
              </div>
              <Switch 
                checked={notifications.health}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, health: checked }))}
              />
            </div>
          </Card>
        </div>

        {/* Account Actions */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4">Account</h3>
          <Card className="bg-white/80 border-slate-200/50">
            {settingsItems.map((item, index) => (
              <div 
                key={item.label}
                className={`flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50/50 transition-colors ${
                  index !== settingsItems.length - 1 ? 'border-b border-slate-100' : ''
                }`}
                onClick={item.action}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`h-5 w-5 ${item.destructive ? 'text-red-600' : 'text-slate-600'}`} />
                  <span className={`font-medium ${item.destructive ? 'text-red-600' : 'text-slate-800'}`}>
                    {item.label}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </div>
            ))}
          </Card>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Profile;
