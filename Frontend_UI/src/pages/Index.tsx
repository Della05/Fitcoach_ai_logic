import { motion } from "framer-motion";
import { Users, Activity, TrendingUp, Calendar, Plus } from "lucide-react";
import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import ClientCard from "@/components/ClientCard";
import { Button } from "@/components/ui/button";
const mockClients = [
  {
    id: "C001",
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    age: 28,
    goal: "Muscle Building",
    lastSession: "2 days ago",
    progress: 72,
    heartRate: 68,
    workoutsCompleted: 24,
  },
  {
    id: "C002",
    name: "Mike Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    age: 35,
    goal: "Weight Loss",
    lastSession: "Yesterday",
    progress: 85,
    heartRate: 72,
    workoutsCompleted: 36,
  },
  {
    id: "C003",
    name: "Emily Davis",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    age: 42,
    goal: "Endurance Training",
    lastSession: "Today",
    progress: 58,
    heartRate: 65,
    workoutsCompleted: 18,
  },
  {
    id: "C004",
    name: "James Wilson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    age: 31,
    goal: "Flexibility",
    lastSession: "3 days ago",
    progress: 45,
    heartRate: 70,
    workoutsCompleted: 12,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Background glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <Header />

        {/* Stats Section */}
        <section className="mt-8">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg font-semibold mb-4 text-muted-foreground"
          >
            Overview
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Clients"
              value={24}
              subtitle="Active members"
              icon={Users}
              trend={{ value: 12, isPositive: true }}
              delay={0.1}
            />
            <StatCard
              title="Sessions This Week"
              value={48}
              subtitle="Across all clients"
              icon={Activity}
              trend={{ value: 8, isPositive: true }}
              delay={0.2}
            />
            <StatCard
              title="Avg. Progress"
              value="65%"
              subtitle="Goal completion"
              icon={TrendingUp}
              trend={{ value: 5, isPositive: true }}
              delay={0.3}
            />
            <StatCard
              title="Upcoming"
              value={12}
              subtitle="Sessions scheduled"
              icon={Calendar}
              delay={0.4}
            />
          </div>
        </section>

        {/* Clients Section */}
        <section className="mt-12 pb-12">
          <div className="flex items-center justify-between mb-6">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg font-semibold text-muted-foreground"
            >
              Your Clients
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Client
              </Button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockClients.map((client, index) => (
              <ClientCard
                key={client.id}
                client={client}
                delay={0.5 + index * 0.1}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
