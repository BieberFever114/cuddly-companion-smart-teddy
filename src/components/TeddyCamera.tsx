
import React, { useRef, useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Pause, Play } from "lucide-react";
import * as tf from '@tensorflow/tfx';
import { motion } from "framer-motion";

const TeddyCamera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [detectedObject, setDetectedObject] = useState<string>("");

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      setIsActive(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card className="relative overflow-hidden rounded-xl">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full aspect-video object-cover"
        />
        <div className="absolute bottom-4 right-4 space-x-2">
          {!isActive ? (
            <Button onClick={startCamera} size="lg" className="rounded-full">
              <Play className="w-6 h-6" />
            </Button>
          ) : (
            <Button onClick={stopCamera} size="lg" variant="destructive" className="rounded-full">
              <Pause className="w-6 h-6" />
            </Button>
          )}
        </div>
        {detectedObject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm p-2 rounded-lg"
          >
            <p className="text-sm font-medium">I see a {detectedObject}!</p>
          </motion.div>
        )}
      </Card>
    </div>
  );
};

export default TeddyCamera;
