// App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ServicePage from './ServicePage'; // Імпортуємо компонент ServicePage

import './App.css'; 

<script src="https://telegram.org/js/telegram-web-app.js"></script>

function App() {
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      const response = await axios.get("https://glazoff-bot-experimental.onrender.com/services");
      setServices(response.data); // Зберігаємо дані в стані
    } catch (error) {
      console.error("Помилка при отриманні даних:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="logo">
            <img src='/cropped-LOGO100x100-white-1.png' alt="Логотип" />
          </div>
          <div className="support-button-container">
            <a 
              href="https://t.me/Glazoff_com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="support-button"
            >
              Зв'язатися з підтримкою
            </a>
          </div>
        </header>
        
        <main className="container">
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <h1 className="title">Список послуг</h1>
                  <div className="services-grid">
                    {services.map((service) => (
                      <div key={service.service_id} className="service-card">
                        <img 
                          src={service.service_image_url} 
                          alt={service.service_name} 
                          className="service-image"
                        />
                        <div className="service-details">
                          <h2 className="service-name">{service.service_name}</h2>
                          <p className="service-description">{service.service_p}</p>
                          <p className="service-price"><strong>Ціна:</strong> {service.service_price}</p>
                          <Link to={`/service/${service.service_id}`} className="order-button">
                            Замовити послугу
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              }
            />
            <Route 
              path="/service/:serviceId" 
              element={<ServicePage services={services} />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
