import { motion } from "framer-motion";
import { Dumbbell, Bell, Settings } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between py-6"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg gradient-primary">
          <Dumbbell className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Fitcoach.Ai</h1>
          <p className="text-sm text-muted-foreground">AI-Powered Fitness Planning</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="glass" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
        <Button variant="glass" size="icon">
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </motion.header>
  );
};

export default Header;
