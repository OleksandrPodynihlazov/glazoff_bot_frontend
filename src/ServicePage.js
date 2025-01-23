import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './ServicePage.css';

<script src="https://telegram.org/js/telegram-web-app.js"></script>
// const userData = JSON.parse(window.Telegram.WebApp.initData);

// const userId = userData.user_id;
// const firstName = userData.first_name;
// const lastName = userData.last_name;
// const username = userData.username;

// console.log(`User ID: ${userId}, Full Name: ${firstName} ${lastName}, Username: ${username}`);

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
      // const response = await axios.post('http://127.0.0.1:5000/api/orders', formData);
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
      <div className="service-header">
        <Link to={`/`} onClick={() => window.scrollTo(0, 0)} className="back-button">
          На головну
        </Link>
        <h1>{service.service_name}</h1>
        <img src={service.service_image_url} alt={service.service_name} />
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
          <button type="submit" className="submit-button">Замовити</button>
        </form>
      </div>
    </div>
  );
}

export default ServicePage;
