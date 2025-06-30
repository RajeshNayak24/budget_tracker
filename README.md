# 💰 Budget Tracker App

A full-stack budget management app built with **React (Frontend)**, **Node.js/Express (Backend)**, and **MongoDB** — fully containerized using **Docker Compose**.

---

## 📦 Features

- Track and manage your income and expenses
- User authentication (login/signup)
- View transactions and reports
- Fully containerized using Docker
- MongoDB database integration

---

## 🛠️ Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Containerization**: Docker & Docker Compose

---

## 🚀 Getting Started

### ✅ Prerequisites

- Install [Docker Desktop](https://www.docker.com/products/docker-desktop)

> ✅ Works on Mac, Windows, and Linux  
> 💡 Make sure Docker is running in the background

---

### 📁 Folder Structure

\`\`\`
budget-tracker/
├── client/          # React frontend
│   └── Dockerfile
├── server/          # Node/Express backend
│   ├── Dockerfile
│   ├── .env
├── docker-compose.yml
├── README.md
└── .gitignore
\`\`\`

---

## 🧪 Setup Instructions

### 1. Clone the Repo

\`\`\`bash
git clone https://github.com/yourusername/budget-tracker.git
cd budget-tracker
\`\`\`

---

### 2. Configure Environment Variables

Create a `.env` file in the `server/` folder using the template:

---

### 3. Run the App Using Docker

\`\`\`bash
docker compose up --build
\`\`\`

### 4. Access the App

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5050](http://localhost:5050)
- MongoDB: Runs in background on port `27017`

---

## 🐳 Docker Overview

This app uses **Docker Compose** to run three services:

| Service   | Description          | Port       |
|-----------|----------------------|------------|
| frontend  | React UI             | 3000:80    |
| backend   | Express API server   | 5050:5050  |
| mongo     | MongoDB Database     | 27017:27017|

---
