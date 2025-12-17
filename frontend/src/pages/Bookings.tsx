import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Calendar,
  Clock,
  MapPin,
  Car,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ArrowLeft,
  Wrench,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Booking {
  id: string;
  vehicle: string;
  vehicleId: string;
  serviceCenter: string;
  address: string;
  date: string;
  time: string;
  serviceType: string;
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED" | "IN_PROGRESS";
  cost?: string;
  agent: string;
}

const bookings: Booking[] = [
  {
    id: "BK-2025-889",
    vehicle: "XUV 700",
    vehicleId: "XYZ-789",
    serviceCenter: "AutoCare Hub",
    address: "Sector 62, Gurugram",
    date: "Jan 18, 2025",
    time: "10:00 AM",
    serviceType: "Predictive Brake Replacement",
    status: "CONFIRMED",
    agent: "Scheduling Agent",
  },
  {
    id: "BK-2025-756",
    vehicle: "Thar 4x4",
    vehicleId: "LMN-456",
    serviceCenter: "Mahindra Service Center",
    address: "MG Road, Delhi",
    date: "Jan 5, 2025",
    time: "2:30 PM",
    serviceType: "Annual Maintenance",
    status: "COMPLETED",
    cost: "₹8,500",
    agent: "Voice Agent",
  },
  {
    id: "BK-2024-612",
    vehicle: "Scorpio N",
    vehicleId: "ABC-123",
    serviceCenter: "Quick Auto Works",
    address: "Connaught Place, Delhi",
    date: "Dec 20, 2024",
    time: "11:00 AM",
    serviceType: "Battery Replacement",
    status: "COMPLETED",
    cost: "₹12,000",
    agent: "Data Agent",
  },
  {
    id: "BK-2024-489",
    vehicle: "XUV 700",
    vehicleId: "XYZ-789",
    serviceCenter: "AutoCare Hub",
    address: "Sector 62, Gurugram",
    date: "Nov 15, 2024",
    time: "9:00 AM",
    serviceType: "Engine Oil Change",
    status: "COMPLETED",
    cost: "₹3,200",
    agent: "Scheduling Agent",
  },
];

const statusConfig = {
  CONFIRMED: { color: "bg-cyber-cyan/20 text-cyber-cyan border-cyber-cyan/30", icon: CheckCircle2 },
  COMPLETED: { color: "bg-green-500/20 text-green-400 border-green-500/30", icon: CheckCircle2 },
  CANCELLED: { color: "bg-red-500/20 text-red-400 border-red-500/30", icon: AlertCircle },
  IN_PROGRESS: { color: "bg-amber-500/20 text-amber-400 border-amber-500/30", icon: Wrench },
};

const Bookings = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("ALL");

  if (!isAuthenticated) {
    navigate("/auth");
    return null;
  }

  const filteredBookings = filter === "ALL" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-orbitron text-xl font-bold text-foreground">My Bookings</h1>
              <p className="text-sm text-muted-foreground">{bookings.length} total appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground"
            >
              <option value="ALL">All</option>
              <option value="CONFIRMED">Upcoming</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Bookings", value: bookings.length, color: "text-foreground" },
            { label: "Upcoming", value: bookings.filter((b) => b.status === "CONFIRMED").length, color: "text-cyber-cyan" },
            { label: "Completed", value: bookings.filter((b) => b.status === "COMPLETED").length, color: "text-green-400" },
            { label: "Total Spent", value: "₹23,700", color: "text-cyber-purple" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-4"
            >
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className={`text-2xl font-bold font-orbitron ${stat.color}`}>{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.map((booking, index) => {
            const StatusIcon = statusConfig[booking.status].icon;
            return (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card border border-border rounded-xl p-5 hover:border-cyber-cyan/50 transition-colors cursor-pointer group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-cyber-cyan/10 flex items-center justify-center">
                        <Car className="w-5 h-5 text-cyber-cyan" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{booking.vehicle}</h3>
                        <p className="text-sm text-muted-foreground">{booking.vehicleId}</p>
                      </div>
                      <Badge className={`${statusConfig[booking.status].color} border ml-auto md:ml-0`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {booking.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{booking.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{booking.serviceCenter}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="bg-cyber-purple/10 border-cyber-purple/30 text-cyber-purple">
                        <Wrench className="w-3 h-3 mr-1" />
                        {booking.serviceType}
                      </Badge>
                      <Badge variant="outline" className="bg-muted border-border text-muted-foreground">
                        {booking.agent}
                      </Badge>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex items-center gap-4">
                    {booking.cost && (
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Total Cost</p>
                        <p className="text-lg font-bold text-green-400">{booking.cost}</p>
                      </div>
                    )}
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-cyber-cyan transition-colors" />
                  </div>
                </div>

                {/* Booking ID */}
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground">ID: {booking.id}</span>
                  {booking.status === "CONFIRMED" && (
                    <Button size="sm" variant="outline" className="text-xs border-cyber-cyan/50 text-cyber-cyan hover:bg-cyber-cyan/10">
                      Reschedule
                    </Button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
