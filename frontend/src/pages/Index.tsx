import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AppHeader } from "@/components/AppHeader";
import { FleetDashboard } from "@/components/FleetDashboard";
import { VoiceAgent } from "@/components/VoiceAgent";
import { ServiceTicket } from "@/components/ServiceTicket";
import { FactoryIntel } from "@/components/FactoryIntel";

type ViewState = "DASHBOARD" | "VOICE_AGENT" | "TICKET" | "FACTORY_INTEL";

const pageTransition = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
  transition: { duration: 0.3 },
};

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewState>("DASHBOARD");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    navigate("/auth");
    return null;
  }

  const showHeader = currentView === "DASHBOARD";

  return (
    <div className="min-h-screen bg-background">
      {showHeader && <AppHeader />}
      
      <AnimatePresence mode="wait">
        {currentView === "DASHBOARD" && (
          <motion.div key="dashboard" {...pageTransition}>
            <FleetDashboard onIncomingCall={() => setCurrentView("VOICE_AGENT")} />
          </motion.div>
        )}

        {currentView === "VOICE_AGENT" && (
          <motion.div key="voice" {...pageTransition}>
            <VoiceAgent
              onConfirm={() => setCurrentView("TICKET")}
              onDecline={() => setCurrentView("DASHBOARD")}
            />
          </motion.div>
        )}

        {currentView === "TICKET" && (
          <motion.div key="ticket" {...pageTransition}>
            <ServiceTicket onViewInsights={() => setCurrentView("FACTORY_INTEL")} />
          </motion.div>
        )}

        {currentView === "FACTORY_INTEL" && (
          <motion.div key="factory" {...pageTransition}>
            <FactoryIntel onBack={() => setCurrentView("DASHBOARD")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
