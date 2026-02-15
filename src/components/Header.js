export default function Header({ hijriDate, dayNumber }) {
  const progress = Math.min(Math.max(dayNumber, 0), 30);
  const percentage = (progress / 30) * 100;

  return (
    <div className="flex flex-col items-center w-full mb-8 animate-fade-in">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-1 drop-shadow-md">
        {hijriDate}
      </h2>
      <p className="text-amber-400 text-sm md:text-base font-medium mb-3 tracking-wide">
        اليوم {dayNumber} من رمضان
      </p>

      {/* Progress Bar Container */}
      <div className="w-full max-w-xs bg-gray-800/50 backdrop-blur-sm rounded-full h-2 border border-gray-700/50 shadow-inner overflow-hidden relative">
        {/* Fill */}
        <div
          className="h-full bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(251,191,36,0.5)]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
