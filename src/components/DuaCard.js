import { useState } from 'react';

const DUAS = [
  "اللهم إني لك صمت، وعلى رزقك أفطرت، ذهب الظمأ، وابتلت العروق، وثبت الأجر إن شاء الله.",
  "اللهم اجعل صيامي فيه صيام الصائمين وقيامي فيه قيام القائمين، ونبهني فيه عن نومة الغافلين.",
  "اللهم قربني فيه إلى مرضاتك، وجنبني فيه من سخطك ونقماتك، ووفقني فيه لقراءة آياتك.",
  "اللهم ارزقني فيه الذهن والتنبيه، وباعدني فيه من السفاهة والتمويه، واجعل لي نصيباً من كل خير تنزل فيه.",
  "اللهم تقبل منا صيامنا وقيامنا وركوعنا وسجودنا واجعلنا من عتقائك من النار.",
  "اللهم إنك عفو تحب العفو فاعف عنا."
];

export default function DuaCard() {
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const nextDua = () => {
    setIndex((prev) => (prev + 1) % DUAS.length);
    setCopied(false);
  };

  const copyDua = () => {
    navigator.clipboard.writeText(DUAS[index]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-700/50 relative group">
      <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={copyDua}
          className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full text-gray-300 transition-colors"
          title="نسخ الدعاء"
        >
          {copied ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      </div>

      <h3 className="text-gray-400 text-sm font-semibold mb-3 text-center">دعاء اليوم</h3>
      
      <p className="text-xl md:text-2xl text-center text-white/90 leading-relaxed font-serif min-h-[5rem] flex items-center justify-center">
        "{DUAS[index]}"
      </p>

      <div className="mt-4 flex justify-center">
        <button 
          onClick={nextDua}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 rounded-full transition-all text-sm font-medium border border-emerald-500/30"
        >
          <span>الدعاء التالي</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
