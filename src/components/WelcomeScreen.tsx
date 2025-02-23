
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bear } from "lucide-react";
import { motion } from "framer-motion";

const WelcomeScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center animate-float">
            <Bear className="w-12 h-12 text-accent" />
          </div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center space-y-2"
          >
            <h1 className="text-3xl font-bold text-primary">
              Welcome to CuddlyAI
            </h1>
            <p className="text-muted-foreground">
              Your child's safe and smart teddy bear companion
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full space-y-3"
          >
            <Button className="w-full" size="lg">
              Get Started
            </Button>
            <Button variant="outline" className="w-full" size="lg">
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </Card>
    </div>
  );
};

export default WelcomeScreen;
