import { motion } from "framer-motion";
import { Car, AlertTriangle, CheckCircle, Clock, Activity } from "lucide-react";

interface VehiclePrediction {
  component: string;
  probability: string;
  daysRemaining: number;
}

interface Vehicle {
  id: string;
  model: string;
  type: string;
  status: "CRITICAL" | "HEALTHY" | "WARNING";
  healthScore: number;
  lastSync: string;
  prediction: VehiclePrediction | null;
}

interface VehicleCardProps {
  vehicle: Vehicle;
}

const statusConfig = {
  CRITICAL: {
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive",
    icon: AlertTriangle,
    glow: "animate-pulse-glow",
  },
  WARNING: {
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning",
    icon: AlertTriangle,
    glow: "",
  },
  HEALTHY: {
    color: "text-success",
    bg: "bg-success/10",
    border: "border-success",
    icon: CheckCircle,
    glow: "",
  },
};

export const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const config = statusConfig[vehicle.status];
  const StatusIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-xl border-2 ${config.border} ${config.glow} bg-card p-6 transition-all hover:scale-[1.02]`}
    >
      {/* Background grid effect */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      {/* Status indicator bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${config.bg}`}>
        <motion.div
          className={`h-full ${vehicle.status === "HEALTHY" ? "bg-success" : vehicle.status === "WARNING" ? "bg-warning" : "bg-destructive"}`}
          initial={{ width: 0 }}
          animate={{ width: `${vehicle.healthScore}%` }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${config.bg}`}>
              <Car className={`w-6 h-6 ${config.color}`} />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">{vehicle.model}</h3>
              <p className="text-sm text-muted-foreground">{vehicle.type} • {vehicle.id}</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${config.bg}`}>
            <StatusIcon className={`w-4 h-4 ${config.color}`} />
            <span className={`text-xs font-semibold ${config.color}`}>{vehicle.status}</span>
          </div>
        </div>

        {/* Health Score */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Health Score</span>
            <span className={`text-2xl font-display font-bold ${config.color}`}>{vehicle.healthScore}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${vehicle.status === "HEALTHY" ? "bg-success" : vehicle.status === "WARNING" ? "bg-warning" : "bg-destructive"}`}
              initial={{ width: 0 }}
              animate={{ width: `${vehicle.healthScore}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>

        {/* Sync Status */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Clock className="w-4 h-4" />
          <span>Last sync: {vehicle.lastSync}</span>
          <Activity className="w-4 h-4 text-success animate-pulse ml-auto" />
        </div>

        {/* Prediction Alert */}
        {vehicle.prediction && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className={`p-4 rounded-lg ${config.bg} border ${config.border}`}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className={`w-5 h-5 ${config.color} flex-shrink-0 mt-0.5`} />
              <div>
                <p className={`font-semibold text-sm ${config.color}`}>⚠️ PREDICTION</p>
                <p className="text-sm text-foreground mt-1">
                  {vehicle.prediction.component} failure likely in &lt; {vehicle.prediction.daysRemaining} days
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Confidence: {vehicle.prediction.probability}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
