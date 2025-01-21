// ServicePage.js
import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; 
<script src="https://telegram.org/js/telegram-web-app.js"></script>
function ServicePage({ services }) {
  const { serviceId } = useParams(); 
  const service = services.find((s) => s.service_id === Number(serviceId));

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    details: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Перевіряємо, чи Telegram WebApp доступний
    if (window.Telegram && window.Telegram.WebApp) {
      const formDataForTelegram = {
        serviceId,
        ...formData
      };

      // Відправка даних до Telegram бота
      window.Telegram.WebApp.sendData(JSON.stringify(formDataForTelegram));
      alert("Дані успішно відправлені боту!");
    } else {
      alert("Telegram WebApp не доступний.");
    }
  };
  if (!service) {
    return <h2>Послуга не знайдена</h2>;
  }

  return (
    <div className="service-page">
      <h1>{service.service_name}</h1>
      <img src={service.service_image_url} alt={service.service_name} />
      <p><strong>Ціна:</strong> {service.service_p}</p>
      <p><strong>Опис:</strong> {service.service_price}</p>

      <form className="order-form" onSubmit={handleSubmit}>
        <label>
          Ім'я:
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </label>
        <label>
          Пошта:
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </label>
        <label>
          Номер телефону:
          <input 
            type="tel" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            required 
          />
        </label>
        <label>
          Додаткові побажання:
          <textarea 
            name="details" 
            value={formData.details} 
            onChange={handleChange} 
          ></textarea>
        </label>
        <button type="submit" className="submit-button">Замовити</button>
      </form>
    </div>
  );
}

export default ServicePage;
