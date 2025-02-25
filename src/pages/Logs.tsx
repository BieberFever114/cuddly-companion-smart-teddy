
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";

const Logs = () => {
  const logs = [
    { date: "Today", duration: "30 mins", activity: "Learning Numbers" },
    { date: "Yesterday", duration: "45 mins", activity: "Story Time" },
    { date: "2 days ago", duration: "20 mins", activity: "Animal Sounds" },
  ];

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-primary text-center mb-6">Activity Logs</h2>
        {logs.map((log, index) => (
          <Card key={index} className="p-4 bg-white/50 backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">{log.activity}</p>
                <p className="text-sm text-muted-foreground">
                  {log.date} • {log.duration}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Logs;
