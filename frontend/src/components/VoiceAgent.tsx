import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, PhoneOff, Check, User, Bot } from "lucide-react";
import { AudioWaveform } from "./AudioWaveform";
import { Button } from "./ui/button";

interface VoiceAgentProps {
  onConfirm: () => void;
  onDecline: () => void;
}

interface Message {
  role: "ai" | "user";
  text: string;
}

const conversation: Message[] = [
  { role: "ai", text: "Hello, Parth. I have detected a critical wear pattern on your XUV 700's front brake pads." },
  { role: "user", text: "Is it urgent?" },
  { role: "ai", text: "Yes. Based on your driving history, failure is likely within 200 km. I found a slot at 'AutoCare Hub' this Saturday at 10:00 AM. Shall I book it?" },
];

export const VoiceAgent = ({ onConfirm, onDecline }: VoiceAgentProps) => {
  const [callDuration, setCallDuration] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  // Call duration timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-typing effect
  useEffect(() => {
    if (messageIndex >= conversation.length) return;

    const message = conversation[messageIndex];
    let charIndex = 0;
    setIsTyping(true);
    setCurrentText("");

    const typingInterval = setInterval(() => {
      if (charIndex < message.text.length) {
        setCurrentText(message.text.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        setDisplayedMessages((prev) => [...prev, message]);
        setCurrentText("");
        
        setTimeout(() => {
          setMessageIndex((prev) => prev + 1);
        }, 1000);
      }
    }, 40);

    return () => clearInterval(typingInterval);
  }, [messageIndex]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-background/95 backdrop-blur-xl p-8"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-voice opacity-10" />
      <div className="absolute inset-0 cyber-grid opacity-20" />

      {/* Header */}
      <div className="relative z-10 text-center mt-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-24 h-24 mx-auto mb-4 rounded-full gradient-voice p-1 glow-purple"
        >
          <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
            <Bot className="w-12 h-12 text-accent" />
          </div>
        </motion.div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">Hero Motocorp Agentic AI</h2>
        <div className="flex items-center justify-center gap-2 text-success">
          <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-sm font-medium">{formatDuration(callDuration)}... Connected</span>
        </div>
      </div>

      {/* Waveform */}
      <div className="relative z-10 w-full max-w-2xl my-8">
        <AudioWaveform isActive={isTyping && conversation[messageIndex]?.role === "ai"} />
      </div>

      {/* Transcript */}
      <div className="relative z-10 w-full max-w-2xl flex-1 overflow-y-auto mb-8">
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {displayedMessages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === "ai" ? "gradient-voice" : "bg-secondary"
                }`}>
                  {msg.role === "ai" ? (
                    <Bot className="w-5 h-5 text-foreground" />
                  ) : (
                    <User className="w-5 h-5 text-foreground" />
                  )}
                </div>
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  msg.role === "ai" 
                    ? "bg-accent/20 border border-accent/30 rounded-tl-none" 
                    : "bg-secondary rounded-tr-none"
                }`}>
                  <p className="text-sm text-foreground">{msg.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Currently typing message */}
          {currentText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-3 ${conversation[messageIndex]?.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                conversation[messageIndex]?.role === "ai" ? "gradient-voice" : "bg-secondary"
              }`}>
                {conversation[messageIndex]?.role === "ai" ? (
                  <Bot className="w-5 h-5 text-foreground" />
                ) : (
                  <User className="w-5 h-5 text-foreground" />
                )}
              </div>
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                conversation[messageIndex]?.role === "ai" 
                  ? "bg-accent/20 border border-accent/30 rounded-tl-none" 
                  : "bg-secondary rounded-tr-none"
              }`}>
                <p className="text-sm text-foreground">
                  {currentText}
                  <span className="animate-pulse">|</span>
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 flex items-center gap-6 mb-8"
      >
        <Button
          onClick={onDecline}
          variant="outline"
          size="lg"
          className="w-48 h-14 rounded-full border-2 border-muted-foreground/30 hover:bg-destructive/20 hover:border-destructive transition-all"
        >
          <PhoneOff className="w-5 h-5 mr-2" />
          Decline
        </Button>
        <Button
          onClick={onConfirm}
          size="lg"
          className="w-48 h-14 rounded-full bg-success hover:bg-success/90 text-success-foreground font-semibold glow-success transition-all"
        >
          <Check className="w-5 h-5 mr-2" />
          Confirm Booking
        </Button>
      </motion.div>
    </motion.div>
  );
};
