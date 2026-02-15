import React, { useState, useEffect } from "react";

const CountdownTimer = ({ iftarTime, imsakTime }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [targetLabel, setTargetLabel] = useState("");
  const [isCritical, setIsCritical] = useState(false);

  useEffect(() => {
    if (!iftarTime || !imsakTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      
      // Parse times (assuming HH:MM format from API)
      const [iftarH, iftarM] = iftarTime.split(":").map(Number);
      const [imsakH, imsakM] = imsakTime.split(":").map(Number);

      const iftarDate = new Date();
      iftarDate.setHours(iftarH, iftarM, 0);

      const imsakDate = new Date();
      imsakDate.setHours(imsakH, imsakM, 0);
      
      // If imsak is tomorrow (e.g. now is 23:00, imsak is 04:00)
      if (now.getHours() > imsakH && imsakDate < now) {
          imsakDate.setDate(imsakDate.getDate() + 1);
      }

      let targetDate;
      let label;

      if (now < iftarDate) {
        targetDate = iftarDate;
        label = "المتبقي للإفطار";
      } else {
        targetDate = imsakDate; // Next Fajr/Imsak
        // If passed iftar, next imsak is tomorrow
        if (targetDate < now) {
            targetDate.setDate(targetDate.getDate() + 1);
        }
        label = "المتبقي للإمساك";
      }

      const diff = targetDate - now;
      
      if (diff <= 0) {
        setTimeLeft("00:00:00");
        return;
      }

      // Format countdown
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(
        `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
      );
      setTargetLabel(label);

      // Critical time: last 10 minutes
      if (diff < 10 * 60 * 1000) {
        setIsCritical(true);
      } else {
        setIsCritical(false);
      }

    }, 1000);

    return () => clearInterval(interval);
  }, [iftarTime, imsakTime]);

  return (
    <div className={`text-center p-6 rounded-2xl mb-6 transition-all duration-500 ${isCritical ? 'bg-red-900/40 animate-pulse border-red-500/50' : 'bg-gray-800/50 border-gray-700'} border backdrop-blur-sm`}>
      <p className="text-gray-400 text-sm font-medium mb-2">{targetLabel}</p>
      <div className={`text-5xl font-bold tracking-wider font-mono ${isCritical ? 'text-red-400 drop-shadow-[0_0_15px_rgba(248,113,113,0.5)]' : 'text-white'}`}>
        {timeLeft || "--:--:--"}
      </div>
    </div>
  );
};

export default CountdownTimer;
