
import TeddyCamera from "@/components/TeddyCamera";
import TeddyChat from "@/components/TeddyChat";

const TeddyMode = () => {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-white p-4">
      <div className="max-w-md mx-auto space-y-6">
        <TeddyCamera />
        <TeddyChat />
      </div>
    </div>
  );
};

export default TeddyMode;
