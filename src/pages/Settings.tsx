
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        <Card className="p-6 bg-white/50 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <SettingsIcon className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold text-primary">Settings</h2>
            </div>
            
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                Parental Controls
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Voice Settings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Notification Preferences
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Privacy Settings
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
