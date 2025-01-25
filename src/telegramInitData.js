import { useEffect } from "react";

function useTelegramInitData() {
  useEffect(() => {
    const loadTelegramData = () => {
      if (window.Telegram?.WebApp) {
        console.log("Telegram WebApp доступний");
        
        // Отримуємо initData з Telegram WebApp
        const initData = window.Telegram.WebApp.initData;
        console.log("initData:", initData);

        if (initData) {
          try {
            // Декодуємо параметр `user` з initData
            const params = new URLSearchParams(initData);
            const userDataString = params.get("user");
            const userData = JSON.parse(decodeURIComponent(userDataString));
            
            console.log("Розпарсені дані користувача:", userData);

            // Ваш код для обробки цих даних
            const userId = userData.id;
            const firstName = userData.first_name;
            const lastName = userData.last_name;
            const tgUsername = userData.username;

            console.log({ userId, firstName, lastName, tgUsername });
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

    // Завантажуємо скрипт Telegram WebApp і чекаємо, поки він стане доступним
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
}

export default useTelegramInitData;
