import { useEffect, useState } from "react";

function useTelegramInitData() {
  const [telegramData, setTelegramData] = useState(null);

  useEffect(() => {
    const loadTelegramData = () => {
      if (window.Telegram?.WebApp) {
        console.log("Telegram WebApp доступний");

        const initData = window.Telegram.WebApp.initData;
        console.log("initData:", initData);

        if (initData) {
          try {
            const params = new URLSearchParams(initData);
            const userDataString = params.get("user");
            const userData = JSON.parse(decodeURIComponent(userDataString));

            console.log("Розпарсені дані користувача:", userData);

            const userId = userData.id;
            const firstName = userData.first_name;
            const lastName = userData.last_name;
            const tgUsername = userData.username;

            setTelegramData({ userId, firstName, lastName, tgUsername });
          } catch (error) {
            console.error("Помилка при розборі initData:", error);
          }
        } else {
          console.warn("initData відсутній");
        }
      } else {
        console.error("Telegram WebApp не знайдений");
      }
    };

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js?56";
    script.async = true;

    script.onload = () => {
      console.log("Telegram WebApp скрипт завантажено");
      loadTelegramData();
    };

    script.onerror = () => {
      console.error("Помилка завантаження Telegram WebApp скрипта");
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return telegramData;
}

export default useTelegramInitData;
