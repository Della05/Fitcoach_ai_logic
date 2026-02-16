import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Dumbbell, Flame, Clock, Zap, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "./ui/button";

interface Client {
  id: string;
  name: string;
  goal: string;
}

interface FitnessPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client | null;
}

const mockPlan = {
  weeklySchedule: [
    { day: "Monday", workout: "Upper Body Strength", duration: "45 min", intensity: "High" },
    { day: "Tuesday", workout: "HIIT Cardio", duration: "30 min", intensity: "Very High" },
    { day: "Wednesday", workout: "Active Recovery & Yoga", duration: "40 min", intensity: "Low" },
    { day: "Thursday", workout: "Lower Body Power", duration: "50 min", intensity: "High" },
    { day: "Friday", workout: "Core & Conditioning", duration: "35 min", intensity: "Medium" },
    { day: "Saturday", workout: "Full Body Circuit", duration: "55 min", intensity: "High" },
    { day: "Sunday", workout: "Rest Day", duration: "-", intensity: "Rest" },
  ],
  recommendations: [
    "Increase protein intake to 1.6g per kg body weight",
    "Aim for 7-8 hours of sleep for optimal recovery",
    "Stay hydrated with at least 3L of water daily",
    "Consider creatine supplementation for strength gains",
  ],
};

const FitnessPlanModal = ({ isOpen, onClose, client }: FitnessPlanModalProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [planGenerated, setPlanGenerated] = useState(false);

  useEffect(() => {
    if (isOpen && client) {
      setIsGenerating(true);
      setPlanGenerated(false);
      
      // Simulate AI generation
      setTimeout(() => {
        setIsGenerating(false);
        setPlanGenerated(true);
      }, 2000);
    }
  }, [isOpen, client]);

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "Very High": return "text-destructive";
      case "High": return "text-warning";
      case "Medium": return "text-primary";
      case "Low": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="glass rounded-2xl p-8 w-full max-w-3xl my-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">AI Fitness Plan</h2>
                {client && (
                  <p className="text-muted-foreground">
                    Personalized for {client.name} • Goal: {client.goal}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isGenerating ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className="mt-4 text-lg font-medium">Generating Personalized Plan...</p>
                <p className="text-muted-foreground text-sm mt-2">
                  Analyzing health data and creating optimal workout schedule
                </p>
              </div>
            ) : planGenerated ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Dumbbell className="w-5 h-5 text-primary" />
                    Weekly Training Schedule
                  </h3>
                  <div className="space-y-2">
                    {mockPlan.weeklySchedule.map((day, index) => (
                      <motion.div
                        key={day.day}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                      >
                        <div className="w-24 font-medium text-primary">{day.day}</div>
                        <div className="flex-1 font-medium">{day.workout}</div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {day.duration}
                          </div>
                          <div className={`flex items-center gap-1 text-sm font-medium ${getIntensityColor(day.intensity)}`}>
                            <Flame className="w-4 h-4" />
                            {day.intensity}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-warning" />
                    AI Recommendations
                  </h3>
                  <div className="grid gap-3">
                    {mockPlan.recommendations.map((rec, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20"
                      >
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <p className="text-sm">{rec}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="ghost" onClick={onClose} className="flex-1">
                    Close
                  </Button>
                  <Button variant="glow" className="flex-1">
                    Export Plan
                  </Button>
                </div>
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FitnessPlanModal;
