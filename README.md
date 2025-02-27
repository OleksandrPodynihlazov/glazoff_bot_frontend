# Glazoff Bot Frontend

Glazoff Bot is a Telegram mini-app for managing service orders. This repository contains the frontend of the project, while the backend can be found at **glazoff_bot_backend**.

## Project Overview

The frontend is a web-based user interface that allows users to browse services and place orders within the Telegram mini-app.

## Features

- **Service Listing**: Displays available services retrieved from the backend.
- **Order Placement**: Allows users to submit service orders.
- **Integration with Telegram WebApp**: Enables seamless communication with the bot.

## Technologies Used

- **React** — Frontend framework
- **JavaScript/TypeScript** — Programming language
- **Telegram WebApp API** — For embedding the mini-app inside Telegram
- **CSS (or Tailwind)** — For styling

## Setup and Execution

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm start
```

### Build the Project

```bash
npm run build
```

## Environment Variables

Create a `.env` file and define:

```
REACT_APP_BACKEND_URL=your_backend_url
REACT_APP_TELEGRAM_BOT_USERNAME=your_bot_username
```

## Deployment

https://front-deploy-8r81.onrender.com/

## Author

Glazoff Bot — A Telegram mini-app for service order management.

