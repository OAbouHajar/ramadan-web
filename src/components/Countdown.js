import { useState, useEffect } from 'react';

export default function Countdown({ fajrTime, iftarTime }) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [targetLabel, setTargetLabel] = useState("");
  const [isCritical, setIsCritical] = useState(false); // Last 10 mins

  useEffect(() => {
    if (!fajrTime || !iftarTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      
      // Parse times (HH:MM format)
      // We assume times are for "today" initially
      const [fajrH, fajrM] = fajrTime.split(':').map(Number);
      const [iftarH, iftarM] = iftarTime.split(':').map(Number);

      const fajrDate = new Date(now);
      fajrDate.setHours(fajrH, fajrM, 0, 0);

      const iftarDate = new Date(now);
      iftarDate.setHours(iftarH, iftarM, 0, 0);

      let targetDateInfo;
      let labelText;

      if (now < fajrDate) {
        // Before Fajr (Suhoor time) -> Target Today's Fajr
        targetDateInfo = fajrDate;
        labelText = "أذان الفجر";
      } else if (now < iftarDate) {
        // Fasting time -> Target Today's Iftar
        targetDateInfo = iftarDate;
        labelText = "أذان المغرب";
      } else {
        // After Iftar -> Target Tomorrow's Fajr
        const nextFajr = new Date(fajrDate);
        nextFajr.setDate(nextFajr.getDate() + 1);
        targetDateInfo = nextFajr;
        labelText = "أذان الفجر";
      }

      const diff = targetDateInfo - now;
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const isUrgent = diff <= 600000 && diff > 0; // 10 mins

      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      setTargetLabel(labelText);
      setIsCritical(isUrgent);
    }, 1000);

    return () => clearInterval(interval);
  }, [fajrTime, iftarTime]);

  if (!timeLeft) return <div className="animate-pulse h-8 bg-gray-700 w-32 rounded mx-auto mb-4"></div>;

  return (
    <div className={`flex flex-col items-center mb-8 transition-all duration-500 ${isCritical ? 'scale-105' : ''}`}>
      <p className="text-gray-400 text-sm mb-1 font-medium">الوقت المتبقي حتى {targetLabel}</p>
      <div className={`text-5xl md:text-6xl font-black tracking-wider transition-colors duration-300 ${isCritical ? 'text-red-400 drop-shadow-[0_0_15px_rgba(248,113,113,0.6)]' : 'text-white drop-shadow-lg'}`}>
        {timeLeft}
      </div>
    </div>
  );
}
