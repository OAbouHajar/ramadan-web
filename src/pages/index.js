import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Countdown from "../components/Countdown";
import PrayerTimesCard from "../components/PrayerTimesCard";
import DuaCard from "../components/DuaCard";
import ToolsGrid from "../components/ToolsGrid";
import NotificationToggle from "../components/NotificationToggle";

export default function Home() {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState("جاري تحديد الموقع...");
  const [times, setTimes] = useState({ imsak: null, iftar: null, fajr: null });
  const [hijriDate, setHijriDate] = useState("");
  const [ramadanDay, setRamadanDay] = useState(1);
  const [locationError, setLocationError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchData(latitude, longitude);
        },
        () => {
          setLocationError(true);
          setCity("تعذر تحديد الموقع");
        }
      );
    } else {
      setLocationError(true);
      setCity("المتصفح لا يدعم تحديد الموقع");
    }
  }, []);

  const fetchData = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`
      );
      const data = response.data.data;
      const timings = data.timings;
      const hijri = data.date.hijri;

      setTimes({ 
        imsak: timings.Imsak, 
        iftar: timings.Maghrib,
        fajr: timings.Fajr 
      });

      // Fix Hijri Date Format
      setHijriDate(`${hijri.day} ${hijri.month.ar} ${hijri.year}`);
      
      // Check if it's Ramadan
      if (parseInt(hijri.month.number) === 9) {
        setRamadanDay(parseInt(hijri.day));
      } else {
        setRamadanDay(null);
      }

      const geoResponse = await axios.get(
        `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=67c31985d47a1611200339icx19efd8`
      );
      const address = geoResponse.data.address;
      setCity(address.city || address.town || address.village || "موقعك");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    if (!notificationsEnabled) {
      if ("Notification" in window && Notification.permission !== "granted") {
        Notification.requestPermission();
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-amber-500/30 overflow-x-hidden relative">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-indigo-950 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/bg.jpg')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 max-w-md flex flex-col items-center min-h-screen pb-20">
        
        <Header hijriDate={hijriDate} dayNumber={ramadanDay} />

        {locationError && (
          <div className="text-center p-3 bg-red-500/20 border border-red-500/50 text-red-200 rounded-xl w-full mb-6 backdrop-blur-sm">
            ⚠️ يرجى تفعيل الموقع الجغرافي للحصول على الأوقات بدقة.
          </div>
        )}

        <div className="mb-8 flex items-center justify-center gap-2 opacity-80 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm font-medium tracking-wide">{city}</span>
        </div>

        {times.fajr && times.iftar && (
          <Countdown fajrTime={times.fajr} iftarTime={times.iftar} />
        )}

        <div className="w-full grid grid-cols-2 gap-4 mb-8">
          <PrayerTimesCard time={times.imsak || "--:--"} type="imsak" />
          <PrayerTimesCard time={times.iftar || "--:--"} type="iftar" />
        </div>

        <DuaCard />

        <ToolsGrid />

        <NotificationToggle enabled={notificationsEnabled} onToggle={toggleNotifications} />

        <div className="mt-12 text-center text-xs text-gray-500">
          <button className="text-gray-400 hover:text-amber-400 transition-colors mb-2" onClick={() => setShowPopup(true)}>
            كيف يعمل الموقع؟
          </button>
          <p>© 2026 رمضان مبارك</p>
        </div>
      </main>

      {/* Info Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-right" dir="rtl">
          <div className="bg-slate-800 text-white p-6 rounded-2xl w-full max-w-sm mx-auto shadow-2xl border border-gray-700 relative">
            <button 
              onClick={() => setShowPopup(false)} 
              className="absolute top-4 left-4 p-1 hover:bg-slate-700 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-xl font-bold mb-4 text-amber-400">حول الموقع</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
            يعتمد هذا الموقع على الحسابات الفلكية كمرجع أساسي لعرض أوقات الإمساك والإفطار وفقاً لموقعك الجغرافي، مع استخدام بيانات دقيقة لضمان أعلى مستوى من الدقة في التوقيت.
            </p>
            <p className="text-xs text-gray-500 mb-6">
              تصميم وتطوير: <a href="https://www.linkedin.com/in/osamaabouhajar/" target="_blank" className="text-amber-500 hover:underline">أسامة أبو حجر</a>
            </p>
            <div className="w-full text-center">
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors" onClick={() => setShowPopup(false)}>إغلاق</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}