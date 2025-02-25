
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Star, Heart, Book } from "lucide-react";

const LearnMore = () => {
  const features = [
    {
      icon: <Star className="w-8 h-8 text-yellow-400" />,
      title: "Interactive Learning",
      description: "Engaging educational activities tailored for toddlers"
    },
    {
      icon: <Heart className="w-8 h-8 text-pink-400" />,
      title: "Safe & Secure",
      description: "Full parental control and monitoring features"
    },
    {
      icon: <Book className="w-8 h-8 text-blue-400" />,
      title: "Educational Content",
      description: "Age-appropriate learning materials and activities"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center text-primary"
        >
          Welcome to TeddyAI
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-muted-foreground"
        >
          Your child's smart companion for learning and fun
        </motion.p>

        <div className="grid gap-4 mt-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * (index + 1) }}
            >
              <Card className="p-6 flex items-start space-x-4 bg-white/50 backdrop-blur-sm">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
