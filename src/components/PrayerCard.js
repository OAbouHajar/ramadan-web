import React from "react";

const PrayerCard = ({ title, time, type }) => {
  const isIftar = type === "iftar";

  // Styles based on type
  const containerClasses = isIftar 
    ? "bg-gradient-to-br from-orange-900/80 to-red-900/80 border-orange-500/30" 
    : "bg-gradient-to-br from-blue-900/80 to-indigo-900/80 border-blue-500/30";
    
  const titleColor = isIftar ? "text-orange-200" : "text-blue-200";
  const timeColor = isIftar ? "text-white" : "text-white";
  const icon = isIftar ? "🌅" : "🌌";

  return (
    <div className={`relative overflow-hidden rounded-xl p-5 border shadow-lg ${containerClasses} hover:scale-[1.02] transition-transform duration-300`}>
      <div className="flex flex-col items-center justify-center relative z-10">
        <span className="text-3xl mb-2 filter drop-shadow-md">{icon}</span>
        <h2 className={`text-md font-medium mb-1 ${titleColor}`}>{title}</h2>
        <p className={`text-3xl font-bold tracking-tight ${timeColor} drop-shadow-sm`}>{time}</p>
      </div>
      
      {/* Decorative Glow */}
      <div className={`absolute -bottom-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-40 ${isIftar ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
    </div>
  );
};

export default PrayerCard;
