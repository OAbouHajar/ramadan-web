export default function PrayerTimesCard({ time, type }) {
  const isIftar = type === 'iftar';
  
  return (
    <div className={`p-5 rounded-2xl shadow-xl w-full text-center flex flex-col items-center border transition-all duration-300 transform hover:translate-y-[-2px] ${
      isIftar 
        ? 'bg-gradient-to-br from-orange-800 via-red-900 to-orange-900 border-orange-500/30' 
        : 'bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 border-blue-400/30'
    }`}>
      <div className={`mb-3 p-3 rounded-full ${isIftar ? 'bg-orange-500/10' : 'bg-blue-500/10'}`}>
        {isIftar ? (
           // Simple SVG for Sunset
           <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <path d="M17 18a5 5 0 0 0-10 0"></path>
             <line x1="12" y1="9" x2="12" y2="2"></line>
             <line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line>
             <line x1="1" y1="18" x2="3" y2="18"></line>
             <line x1="21" y1="18" x2="23" y2="18"></line>
             <line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line>
             <line x1="23" y1="22" x2="1" y2="22"></line>
             <polyline points="16 5 12 9 8 5"></polyline>
           </svg>
        ) : (
           // Simple SVG for Sunrise/Dawn
           <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <path d="M17 18a5 5 0 0 0-10 0"></path>
             <line x1="12" y1="2" x2="12" y2="9"></line>
             <line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line>
             <line x1="1" y1="18" x2="3" y2="18"></line>
             <line x1="21" y1="18" x2="23" y2="18"></line>
             <line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line>
             <line x1="23" y1="22" x2="1" y2="22"></line>
             <line x1="8" y1="6" x2="12" y2="2"></line>
             <line x1="16" y1="6" x2="12" y2="2"></line>
           </svg>
        )}
      </div>
      <h2 className={`text-sm md:text-md font-medium mb-1 opacity-90 ${isIftar ? 'text-orange-200' : 'text-blue-200'}`}>
        {isIftar ? 'موعد الإفطار' : 'موعد الإمساك'}
      </h2>
      <p className="text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-sm">
        {time}
      </p>
    </div>
  );
}
