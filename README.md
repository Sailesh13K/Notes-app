# 📝 Notes App

A full-stack **Note-taking application** built with **React, Node.js, Express, and MongoDB**.  
Users can **register, login, add, edit, delete, and search notes**. Access to notes is restricted to authenticated users.

---

## **✨ Features**

- User authentication with **JWT**
- Add, edit, and delete notes
- Search notes by title or description
- Responsive and interactive UI built with **React & Tailwind CSS**
- Protected routes for authenticated users
- Backend APIs with **Node.js, Express, MongoDB**

---

## **🛠 Tech Stack**

- **Frontend:** React, Tailwind CSS, Axios, React Router, React Icons, React Toastify
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- **Environment Variables:**
  - `VITE_API_BASE_URL` → Frontend API URL
  - `MONGO_URI` → MongoDB connection string
  - `JWT_SECRET` → Secret key for JWT

---

## **⚡ Setup Instructions**

### **Backend**

1. Navigate to backend folder:

```bash
cd backend
Install dependencies:
```

2. Install dependencies:

```bash
npm install
Create .env file with:
```

3. Create .env file with:

```bash
PORT=5000
MONGO_URI=<your-mongo-uri>
JWT_SECRET=<your-secret-key>
```

4. Start server:

```bash
npm start
```

### **Frontemd**

1. Navigate to frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create .env file:

```bash
VITE_API_BASE_URL=http://localhost:5000
```

4. Start frontend:

```bash
npm run dev
```
