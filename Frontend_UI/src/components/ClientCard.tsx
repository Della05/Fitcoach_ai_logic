import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, TrendingUp, Heart, Calendar, BarChart3, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import AnalysisModal from "./AnalysisModal";

interface Client {
  id: string;
  name: string;
  avatar: string;
  age: number;
  goal: string;
  lastSession: string;
  progress: number;
  heartRate: number;
  workoutsCompleted: number;
}

interface ClientCardProps {
  client: Client;
  delay?: number;
}

const ClientCard = ({ client, delay = 0 }: ClientCardProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const handleAnalyzePerformance = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch(
        "https://n8n.srv1270389.hstgr.cloud/webhook/82b69d60-22bd-4348-9960-1495b9d07bfd",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ clientId: client.id }),
        }
      );

      const data = await response.json();
      
      // Pass the flat JSON response directly to the modal
      setAnalysisResult(JSON.stringify(data));
      setIsAnalysisModalOpen(true);
    } catch (error) {
      toast.error("Analysis Failed", {
        description: "Could not connect to the analysis service. Please try again.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      className="glass rounded-xl p-6 hover:glow transition-all duration-300 group"
    >
      <div className="flex items-start gap-4">
        <div className="relative">
          <img
            src={client.avatar}
            alt={client.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-primary/30"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-success border-2 border-card" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">{client.name}</h3>
              <p className="text-muted-foreground text-sm">{client.age} years • {client.goal}</p>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-destructive" />
              <div>
                <p className="text-xs text-muted-foreground">Avg HR</p>
                <p className="font-medium">{client.heartRate} bpm</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Workouts</p>
                <p className="font-medium">{client.workoutsCompleted}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-success" />
              <div>
                <p className="text-xs text-muted-foreground">Progress</p>
                <p className="font-medium">{client.progress}%</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Goal Progress</span>
              <span className="text-xs font-medium text-primary">{client.progress}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${client.progress}%` }}
                transition={{ duration: 1, delay: delay + 0.3 }}
                className="h-full gradient-primary rounded-full"
              />
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Calendar className="w-4 h-4" />
              <span>Last: {client.lastSession}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleAnalyzePerformance}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <BarChart3 className="w-4 h-4" />
                )}
                <span className="ml-1">Analyze</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AnalysisModal
        isOpen={isAnalysisModalOpen}
        onClose={() => setIsAnalysisModalOpen(false)}
        clientName={client.name}
        analysisResult={analysisResult}
      />
    </motion.div>
  );
};

export default ClientCard;
