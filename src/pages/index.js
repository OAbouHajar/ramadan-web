import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [location, setLocation] = useState(null);
  const [times, setTimes] = useState({ imsak: "--:--", iftar: "--:--" });
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        fetchPrayerTimes(latitude, longitude);
      });
    }
  }, []);

  const fetchPrayerTimes = async (lat, lon) => {
    try {
      const response = await axios.get(
        "https://api.aladhan.com/v1/timings?latitude=" + lat + "&longitude=" + lon + "&method=2"
      );
      const timings = response.data.data.timings;
      setTimes({ imsak: timings.Imsak, iftar: timings.Maghrib });
    } catch (error) {
      console.error("Error fetching prayer times:", error);
    }
  };

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-gray-100 text-black min-h-screen"}>
      <div className="container mx-auto px-4 py-10 text-center">
        <h1 className="text-3xl font-bold">إيرلندا اليوم</h1>
        <p className="mt-2">اوقات الإمساك والإفطار حسب موقعك</p>

        <div className="mt-6 flex justify-center gap-4">
          <div className="p-6 w-64 border rounded-lg shadow-lg bg-white text-black">
            <h2 className="text-xl font-semibold">وقت الإمساك</h2>
            <p className="text-3xl mt-2">{times.imsak}</p>
          </div>

          <div className="p-6 w-64 border rounded-lg shadow-lg bg-white text-black">
            <h2 className="text-xl font-semibold">وقت الإفطار</h2>
            <p className="text-3xl mt-2">{times.iftar}</p>
          </div>
        </div>

        <button
          className="mt-6 p-2 bg-blue-500 text-white rounded-lg"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "🌞 الوضع الفاتح" : "🌙 الوضع الداكن"}
        </button>
      </div>
    </div>
  );
}