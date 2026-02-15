export default function ToolsGrid() {
  const tools = [
    { title: "آية اليوم", icon: "📖", color: "bg-blue-900/30 text-blue-300 border-blue-500/20" },
    { title: "أذكار الصباح", icon: "🤲", color: "bg-emerald-900/30 text-emerald-300 border-emerald-500/20" },
    { title: "القرآن الكريم", icon: "🎧", color: "bg-purple-900/30 text-purple-300 border-purple-500/20" },
    { title: "حاسبة الزكاة", icon: "💰", color: "bg-amber-900/30 text-amber-300 border-amber-500/20" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 w-full mt-8">
      {tools.map((tool, idx) => (
        <button 
          key={idx}
          className={`flex flex-col items-center justify-center p-4 rounded-2xl border backdrop-blur-sm hover:scale-[1.02] active:scale-95 transition-all duration-200 outline-none ${tool.color}`}
        >
          <span className="text-3xl mb-2 filter drop-shadow-md">{tool.icon}</span>
          <span className="text-sm font-semibold opacity-90">{tool.title}</span>
        </button>
      ))}
    </div>
  );
}
