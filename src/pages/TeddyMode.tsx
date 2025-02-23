
import TeddyCamera from "@/components/TeddyCamera";
import TeddyChat from "@/components/TeddyChat";

const TeddyMode = () => {
  return (
    <div className="min-h-screen bg-background p-4 space-y-4">
      <TeddyCamera />
      <TeddyChat />
    </div>
  );
};

export default TeddyMode;
