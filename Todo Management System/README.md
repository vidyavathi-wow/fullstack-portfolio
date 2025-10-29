# 📝 Todo Management System

A full-stack **Todo Management System** built using **React (Frontend)** and **Node.js + Express + Sequelize (Backend)**.  
This app allows users to manage their tasks with authentication, analytics, and seamless CRUD functionality.

---

## 🚀 Live Demo

- **Frontend (React + Tailwind CSS):** [https://tms-frontend-new.onrender.com](https://tms-frontend-new.onrender.com)  
- **Backend (Node.js + Express + Sequelize):** [https://tms-backend-5dcu.onrender.com](https://tms-backend-5dcu.onrender.com)

---

## 🎨 UI Inspiration

This UI design was inspired by a Dribbble concept for task management apps.  
🔗 **Dribbble Design Link:** [https://share.google/K5TtkiojDCnre0oPN](https://share.google/K5TtkiojDCnre0oPN)

---

## 🧩 Features

✅ User authentication (Login, Register, Forgot Password via Nodemailer)  
✅ JWT-based secure sessions  
✅ Add, edit, delete, and filter todos  
✅ Mark tasks as completed or pending  
✅ Visual analytics for task insights (bar & pie charts)  
✅ Persistent data using REST API integration  
✅ Responsive UI built with Tailwind CSS  
✅ Deployed on **Render**

---

## ⚙️ Tech Stack

**Frontend:**
- React.js  
- Tailwind CSS  
- Axios  
- React Router DOM  
- React Hot Toast  

**Backend:**
- Node.js  
- Express.js  
- Sequelize ORM  
- PostgreSQL / MySQL  
- JWT Authentication  
- Nodemailer (for password recovery)

---

## 🔐 Environment Variables

### 🔸 Frontend (`frontend/.env`)
```env
VITE_BASE_URL=https://tms-backend-5dcu.onrender.com
```

### 🔸 Backend (`backend/.env`)
```env
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASS=your_database_password
DB_HOST=your_database_host
DB_PORT=5432
DB_DIALECT=postgres
PORT=5000

REFRESH_TOKEN_SECRET=your_refresh_token_secret
JWT_SECRET=your_jwt_secret

BREVO_API_KEY=your_brevo_api_key
DATABASE_URL=your_database_connection_url
NODE_ENV=development

SENDER_EMAIL=your_email_address
FRONTEND_URL=your_frontend_deployed_url
```

> ⚠️ **Do not commit `.env` files** to GitHub — keep them private or configure them via Render/Vercel environment settings.

---

## 🧰 Setup Instructions

Follow these steps to set up and run the **Todo Management System** locally 👇

---

### 🪄 1️⃣ Clone the Repository
```bash
# Clone the repository
git clone https://github.com/your-username/todo-management-system.git

# Move into the project folder
cd todo-management-system
```

---

### ⚙️ 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with the variables listed above.

Run the backend server:
```bash
npm run server
```

> ✅ The backend will start on **http://localhost:5000**

---

### 💻 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
```

Create a `.env` file in `frontend/`:
```env
VITE_BASE_URL=http://localhost:5000
```

Start the frontend development server:
```bash
npm run dev
```

> ✅ The frontend will run on **http://localhost:5173**

---

### 🌐 4️⃣ Deployment URLs

| Service | Platform | Live URL |
|----------|-----------|----------|
| Frontend | Render | [https://tms-frontend-new.onrender.com](https://tms-frontend-new.onrender.com) |
| Backend | Render | [https://tms-backend-5dcu.onrender.com](https://tms-backend-5dcu.onrender.com) |
| UI Design | Dribbble | [https://share.google/K5TtkiojDCnre0oPN](https://share.google/K5TtkiojDCnre0oPN) |

---

### 🧪 5️⃣ Testing the App

1. Open the frontend in your browser → [http://localhost:5173](http://localhost:5173)  
2. Register a new user and log in.  
3. Add, edit, delete, and filter todos.  
4. Check task analytics charts.  
5. Try forgot password to test email integration.

---

### 🧹 6️⃣ Common Commands

| Command | Description |
|----------|-------------|
| `npm install` | Installs all dependencies |
| `npm run dev` | Runs the frontend in development mode |
| `npm run server` | Runs the backend using Nodemon |
| `npm run build` | Builds the frontend for production |
| `npm start` | Starts the production server |

---

### ⚠️ 7️⃣ Important Notes

- Ensure PostgreSQL or your selected DB is running locally before starting.  
- Keep `.env` files secure — never push them to GitHub.  
- Update environment variables on Render or Vercel before deployment.  
- Use `DATABASE_URL` for Render PostgreSQL integration.

---



## 🧑‍💻 Author

**Developed by:** Vidya Telugu  

---


