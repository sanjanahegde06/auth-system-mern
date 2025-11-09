# 🔐 Simple MERN Authentication App

A minimal **MERN (MongoDB, Express, React, Node.js)** authentication project built for learning and demonstration.  
This app enables users to **sign up, log in, and access protected routes** using **JWT (JSON Web Tokens)** for secure authentication.

---

## 🚀 Features

- User **Sign Up** and **Login**
- **Password hashing** with `bcryptjs`
- **JWT-based authentication**
- **Authorization middleware**
- **MongoDB (Mongoose)** for persistent storage
- Works completely **offline** once dependencies are installed
- **No .env required** — all configuration is hardcoded for simplicity

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Backend | Node.js, Express |
| Database | MongoDB + Mongoose |
| Frontend | React (UMD – no build tools) |
| Authentication | JWT + bcryptjs |

---

## 🧠 How It Works

1. **Sign Up** – User registers with a username and password.  
   Password is hashed using `bcryptjs` and stored securely in MongoDB.

2. **Login** – User credentials are verified.  
   If valid, a **JWT token** is issued and returned.

3. **Protected Route** –  
   The `/auth` endpoint requires a valid JWT in the `Authorization` header.  
   Middleware verifies the token before granting access.

---

## 🧰 Dependencies

| Package | Purpose |
|----------|----------|
| express | Backend web framework |
| mongoose | MongoDB connection and modeling |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT authentication |
| cors | Enables cross-origin requests |

---

## ⚙️ Setup & Run

1️⃣ **Install dependencies**  
Run the following command to install all required packages:  
`npm install`  

2️⃣ **Start MongoDB (locally)**  
Make sure your MongoDB service is running. You can start it with:  
`mongod`  
MongoDB should be available at:  
`mongodb://127.0.0.1:27017`  

3️⃣ **Run the server**  
Start your Express app using:  
`npm start`  

4️⃣ **Open in your browser**  
Go to:  
`http://localhost:5000`