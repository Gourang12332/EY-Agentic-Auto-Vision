import { Button } from "@/components/ui/button";
import { Battery, Thermometer, Activity, Droplets, Gauge, Wind, Zap, X } from "lucide-react";

interface SensorModalProps {
  vehicle: any;
  onClose: () => void;
}

export const SensorModal = ({ vehicle, onClose }: SensorModalProps) => {
  if (!vehicle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-950 border border-slate-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative">
        
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/90 backdrop-blur border-b border-slate-800 p-6 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              {vehicle.model} 
              <span className="text-sm font-normal text-slate-400 font-mono px-2 py-1 bg-slate-800 rounded">{vehicle.vehicle_id}</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1">Full Sensor Telemetry Matrix</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-slate-800 rounded-full">
            <X className="h-6 w-6 text-slate-400" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-8 p-4 bg-cyan-950/30 border border-cyan-500/20 rounded-lg text-cyan-200 text-sm leading-relaxed">
              <span className="font-bold text-cyan-400 block mb-1">AI DIAGNOSTIC SUMMARY:</span>
              {vehicle.summary}
          </div>

          <h3 className="text-lg font-semibold text-slate-200 mb-4">Live Sensor Readings</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            
            <SensorTile label="Battery" value={`${vehicle.sensors.battery_voltage_v} V`} icon={<Battery />} status={vehicle.sensors.battery_voltage_v < 11 ? 'danger' : 'good'} />
            <SensorTile label="Eng. Temp" value={`${vehicle.sensors.engine_temp_c} °C`} icon={<Thermometer />} status={vehicle.sensors.engine_temp_c > 105 ? 'danger' : 'good'} />
            <SensorTile label="Brake Wear" value={`${vehicle.sensors.brake_pad_wear_mm} mm`} icon={<Activity />} status={vehicle.sensors.brake_pad_wear_mm < 3 ? 'danger' : 'good'} />
            <SensorTile label="Oil Pressure" value={`${vehicle.sensors.oil_pressure_psi} PSI`} icon={<Droplets />} />
            <SensorTile label="Tire (FL)" value={`${vehicle.sensors.tire_pressure_fl_psi} PSI`} icon={<Gauge />} />
            <SensorTile label="Tire (FR)" value={`${vehicle.sensors.tire_pressure_fr_psi} PSI`} icon={<Gauge />} />
            <SensorTile label="Vibration" value={`${vehicle.sensors.vibration_level_hz} Hz`} icon={<Activity />} />
            <SensorTile label="Coolant" value={`${vehicle.sensors.coolant_level_pct} %`} icon={<Wind />} />
            <SensorTile label="O2 Sensor" value={`${vehicle.sensors.o2_sensor_voltage_v} V`} icon={<Zap />} />
            <SensorTile label="Trans. Temp" value={`${vehicle.sensors.transmission_temp_c} °C`} icon={<Thermometer />} />

          </div>
        </div>
      </div>
    </div>
  );
};

// Internal Helper for the Grid Tiles
const SensorTile = ({ label, value, icon, status = 'neutral' }: any) => {
  const getStatusColor = () => {
    if (status === 'danger') return 'border-red-500/50 bg-red-500/10 text-red-200';
    if (status === 'good') return 'border-emerald-500/30 bg-emerald-500/5 text-emerald-200';
    return 'border-slate-800 bg-slate-900/50 text-slate-300';
  };

  return (
    <div className={`p-4 rounded-lg border flex flex-col items-center text-center gap-2 ${getStatusColor()}`}>
      <div className="opacity-70">{icon}</div>
      <span className="text-xs uppercase tracking-wider opacity-60">{label}</span>
      <span className="text-lg font-bold font-mono">{value}</span>
    </div>
  );
};