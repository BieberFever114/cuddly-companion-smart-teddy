
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        <Card className="p-6 bg-white/50 backdrop-blur-sm">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-primary">Child's Profile</h2>
            <p className="text-muted-foreground text-center">
              Set up your child's preferences and learning goals
            </p>
            <Button className="w-full">Edit Profile</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
