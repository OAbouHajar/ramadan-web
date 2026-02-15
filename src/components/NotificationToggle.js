export default function NotificationToggle({ enabled, onToggle }) {
  return (
    <div className="flex items-center justify-between w-full bg-gray-800/50 backdrop-blur-md p-4 rounded-2xl mt-8 border border-gray-700/50 shadow-sm hover:border-amber-500/30 transition-colors cursor-pointer" onClick={onToggle}>
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-full transition-colors duration-300 ${enabled ? 'bg-amber-500/20 text-amber-400' : 'bg-gray-700/50 text-gray-500'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
        <div className="text-right">
          <h3 className="text-sm font-semibold text-gray-200 transition-colors group-hover:text-white">تنبيهات الصلاة</h3>
          <p className="text-xs text-gray-400">تذكير قبل الإمساك والإفطار</p>
        </div>
      </div>
      
      <button 
        type="button"
        className={`w-12 h-7 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-amber-500 ${enabled ? 'bg-amber-600' : 'bg-gray-600'}`}
        role="switch"
        aria-checked={enabled}
      >
        <div 
          className={`absolute top-1 bottom-1 w-5 bg-white rounded-full shadow transition-all duration-300 ${enabled ? 'left-1' : 'right-1'}`}
        />
      </button>
    </div>
  );
}
