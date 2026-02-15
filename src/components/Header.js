export default function Header({ hijriDate, dayNumber }) {
  const currentDay = dayNumber ? Math.min(Math.max(dayNumber, 0), 30) : 0;
  const percentage = (currentDay / 30) * 100;

  return (
    <div className="flex flex-col items-center w-full mb-8 animate-fade-in text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg font-serif" dir="rtl">
        {hijriDate}
      </h2>
      
      {dayNumber ? (
        <>
          <p className="text-amber-400 text-sm md:text-base font-medium mb-3 tracking-wide drop-shadow-md">
            اليوم {dayNumber} من رمضان
          </p>

          {/* Progress Bar Container */}
          <div className="w-full max-w-xs bg-slate-800/80 backdrop-blur-sm rounded-full h-3 border border-slate-700/50 shadow-inner overflow-hidden relative mx-auto">
            {/* Fill */}
            <div
              className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(245,158,11,0.5)]"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </>
      ) : (
        <p className="text-slate-400 text-sm font-light mt-1 tracking-wide">
          اللهم بلغنا رمضان
        </p>
      )}
    </div>
  );
}
