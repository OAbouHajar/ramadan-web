import React from "react";

const RamadanHeader = ({ hijriDate, gregorianDate, currentDay }) => {
  const progress = currentDay ? (currentDay / 30) * 100 : 0;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-end mb-2 px-1">
        <div>
           <h1 className="text-2xl font-bold text-white mb-1">رمضان كريم 🌙</h1>
           <p className="text-gray-400 text-sm">{hijriDate} | {gregorianDate}</p>
        </div>
        {currentDay && (
             <div className="text-right">
                <span className="text-emerald-400 font-bold text-lg">اليوم {currentDay}</span>
                <span className="text-gray-500 text-xs block">من 30</span>
             </div>
        )}
      </div>
      
      {currentDay && (
        <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
            <div 
                className="bg-emerald-500 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${progress}%` }}
            ></div>
        </div>
      )}
    </div>
  );
};

export default RamadanHeader;
