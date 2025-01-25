import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Helmet } from 'react-helmet';


function ServicePage({ services }) {
  const { serviceId } = useParams();
  const service = services?.find((s) => s.service_id === Number(serviceId));

  const [formData, setFormData] = useState({
    service_name: service?.service_name || '',
    user_name: '',
    email: '',
    phone: '',
    details: ''
  });

  useEffect(() => {
    // Логіка для обробки даних користувача з Telegram Web App
    const initData = window.Telegram?.WebApp?.initData || null;
    if (initData) {
      const userData = JSON.parse(decodeURIComponent(initData));
      alert("Дані користувача:", userData);

      // Використовуйте ці дані для своїх цілей
      // const userId = userData.user_id;
      // const firstName = userData.first_name;
      // const lastName = userData.last_name;
      // const username = userData.username;

      // Ваш код для обробки цих даних
    }
  }, []); // Пустий масив залежностей, щоб виконувати лише один раз після завантаження компонента

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("FormData перед відправкою:", formData);

    try {

      const response = await axios.post('https://glazoff-bot-experimental.onrender.com/api/orders', formData);

      if (response.status === 200) {
        alert('Замовлення успішно оформлене');
      }
    } catch (error) {
      console.error("Помилка при відправці форми:", error);
      alert('Щось пішло не так, спробуйте пізніше');
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
      <h1>{service.service_name}</h1>
      <img src={service.service_image_url} alt={service.service_name} />
      <p><strong>Ціна:</strong> {service.service_price}</p>
      <p><strong>Опис:</strong> {service.service_p}</p>

      <form className="order-form" onSubmit={handleSubmit}>
        <label>
          Ім'я:
          <input 
            type="text" 
            name="user_name" 
            value={formData.user_name} 
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
