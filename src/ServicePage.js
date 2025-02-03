import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./ServicePage.css";

// Хук для роботи з Telegram WebApp
import useTelegramInitData from "./telegramInitData";

function ServicePage({ services }) {
  const { serviceId } = useParams();
  const service = services?.find((s) => s.service_id === Number(serviceId));
  const currentDateTime = new Date().toString()

  const [formData, setFormData] = useState({
    service_name: service?.service_name || "",
    user_name: "",
    email: "",
    phone: "",
    details: "",
  });

  // Використання хука для роботи з Telegram WebApp
  const telegramData = useTelegramInitData();
  console.log("telegramData:", telegramData);
 
  useEffect(() => {
    // Заповнюємо форму даними з Telegram WebApp
    if (telegramData) {
      setFormData((prevData) => ({
        ...prevData,
        tgFullname: telegramData.lastName ? `${telegramData.firstName ?? ''} ${telegramData.lastName ?? ''}`.trim() : telegramData.firstName,
        tgUsername: telegramData.tgUsername,
        tgId: telegramData.userId
      }));
    }
  }, [telegramData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      order_date: currentDateTime
    }));
  };
  const sendDataToBot = () => {
    const data = {
      action: "Замовлення успішно оформлене",
      service: service.service_name,
      user_name: formData.user_name,
      email: formData.email,
      phone: formData.phone,
      details: formData.details,
      tgFullname: formData.tgFullname,
      tgUsername: formData.tgUsername,
      tgId: formData.tgId,
      order_date: formData.order_date
    };
    console.log("Data to send:", data);
    window.Telegram.WebApp.sendData(JSON.stringify(data)); // Відправляє дані на бота
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("FormData перед відправкою:", formData);

    try {
      const response = await axios.post(
        "https://glazoff-bot-experimental.onrender.com/api/orders",
        formData
      );

      if (response.status === 200) {
        alert("Замовлення успішно оформлене");
      }
    } catch (error) {
      console.error("Помилка при відправці форми:", error);
      alert("Щось пішло не так, спробуйте пізніше");
    }
  };

  if (!service) {
    return <h2>Послуга не знайдена</h2>;
  }

  return (
    <div className="service-page">

      <Helmet>
        <script src="https://telegram.org/js/telegram-web-app.js?56"></script>
      </Helmet>
      <div className="service-header">
        <Link to={`/`} onClick={() => window.scrollTo(0, 0)} className="back-button">
          На головну
        </Link>
        <h1>{service.service_name}</h1>
        <div className="service-image-container">
          <img src={service.service_image_url} alt={service.service_name} />
        </div>
      </div>

      <div className="service-info">
        <p><strong>Опис:</strong> {service.service_p}</p>
        <p><strong>Ціна:</strong> {service.service_price}</p>

        <form className="order-form" onSubmit={handleSubmit}>
          <p></p>
          <label className="order-form-label">
            Ім'я*:
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              required
            />
          </label>
          <label className="order-form-label">
            Пошта*:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label className="order-form-label">
            Номер телефону*:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <label className="order-form-label">
            Додаткові побажання:
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
            ></textarea>
          </label>
          <button onClick={sendDataToBot} type="submit" className="submit-button">Замовити</button>
        </form>
      </div>
    </div>
  );
}

export default ServicePage;
