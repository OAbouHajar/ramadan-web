import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState("موقعك");
  const [times, setTimes] = useState({ imsak: "--:--", iftar: "--:--" });
  const [darkMode, setDarkMode] = useState(true);
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [locationError, setLocationError] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchPrayerTimes(latitude, longitude);
          fetchCityName(latitude, longitude);
        },
        () => {
          setLocationError(true);
        }
      );
    } else {
      setLocationError(true);
    }
    
    // Set Date and Day
    const today = new Date();
    setDate(today.toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" }));
    setDay(today.toLocaleDateString("ar-EG", { weekday: "long" }));
  }, []);

  const fetchPrayerTimes = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`
      );
      const timings = response.data.data.timings;
      setTimes({ imsak: timings.Imsak, iftar: timings.Maghrib });
    } catch (error) {
      console.error("Error fetching prayer times:", error);
    }
  };

  const fetchCityName = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=67c31985d47a1611200339icx19efd8`
      );
      const cityName = response.data.address.city || response.data.address.town || response.data.address.village || "موقعك";
      setCity(cityName);
    } catch (error) {
      console.error("Error fetching city name:", error);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-white relative overflow-hidden w-full max-w-sm mx-auto p-4 bg-cover bg-center" style={{ backgroundImage: "url('/bg.jpg')" }}>      
      {locationError && (
        <div className="text-center p-3 bg-red-600 text-white rounded-lg w-full mb-4">
          ⚠️ يرجى تفعيل الموقع الجغرافي للحصول على أوقات الإمساك والإفطار بدقة.
        </div>
      )}

      <div className="text-center p-4 w-full bg-opacity-80 bg-gray-900 shadow-lg rounded-lg border border-gray-700 mt-4">
        <p className="text-lg mb-2 font-semibold text-gray-300">اوقات الإمساك حسب مدينتك</p>
        <p className="text-lg mb-2 font-semibold text-gray-300">{city}</p>
        <p className="text-md font-semibold text-gray-400">{day}, {date}</p>

        <div className="mt-4 flex flex-col items-center gap-4 w-full">
          <div className="bg-blue-900 p-4 rounded-lg shadow-lg w-full text-center flex flex-col items-center border border-blue-600">
            <img src="/sunrise-icon.png" alt="Sunrise" className="w-10 h-10 mb-1" />
            <h2 className="text-lg font-semibold text-white">وقت الإمساك</h2>
            <p className="text-2xl mt-1 font-bold text-blue-300">{times.imsak}</p>
          </div>

          <div className="bg-orange-900 p-4 rounded-lg shadow-lg w-full text-center flex flex-col items-center border border-orange-600">
            <img src="/sunset-icon.png" alt="Sunset" className="w-10 h-10 mb-1" />
            <h2 className="text-lg font-semibold text-orange-300">وقت الإفطار</h2>
            <p className="text-2xl mt-1 font-bold text-orange-200">{times.iftar}</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-700 text-yellow-300 rounded-lg text-center text-md w-full border border-gray-600">
          "اللهم إني لك صمت، وعلى رزقك أفطرت، ذهب الظمأ، وابتلت العروق، وثبت الأجر إن شاء الله."
        </div>
      </div>
      {/* Logo */}
      <img src="/Logo.png" alt="Website Logo" className="w-32 h-auto mt-6 drop-shadow-lg" />

      <div className="mt-4 text-center">
        <p className="text-md font-semibold">ايرلندا اليوم منصه خدمية تهتم بالشأن العربي في أيرلندا تابعونا على</p>
        <a 
          href="https://bento.me/irelandtoday" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-300 hover:underline text-md font-semibold"
        >
          bento.me/irelandtoday
        </a>
      </div>
      
      {/* Footer */}
      <div className="mt-6 text-center text-gray-400 text-xs pb-4">
        <p>تم تصميم هذا التطبيق باستخدام الذكاء الاصطناعي</p>
      </div>
    </div>
  );
}