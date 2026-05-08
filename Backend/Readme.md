# 🚖 RideBuddy Backend API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=nodedotjs\&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge\&logo=express\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge\&logo=jsonwebtokens\&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge\&logo=mongoose\&logoColor=white)

### Scalable Authentication & User Management Backend

A production-ready backend authentication system built using Node.js, Express, MongoDB, JWT Authentication, and Mongoose.

</div>

---

# 📌 Overview

RideBuddy Backend provides a secure and scalable authentication system for modern web applications. It includes:

* 🔐 JWT-based Authentication
* 👤 User Registration & Login
* 🚪 Secure Logout with Token Blacklisting
* 🛡️ Request Validation using Express Validator
* 🔒 Password Hashing using Bcrypt
* ⚡ Modular MVC Architecture
* 📦 MongoDB Integration using Mongoose
* 🚖 Captain Registration & Authentication

---

# 🏗️ Tech Stack

| Technology        | Purpose            |
| ----------------- | ------------------ |
| Node.js           | Backend Runtime    |
| Express.js        | Web Framework      |
| MongoDB           | Database           |
| Mongoose          | ODM for MongoDB    |
| JWT               | Authentication     |
| bcrypt            | Password Hashing   |
| express-validator | Request Validation |

---

# 📂 Project Structure

```bash
RideBuddy/
│
├── controllers/
│   └── user.controller.js
│   └── captain.controller.js
├── models/
│   └── user.model.js
│   └── captain.model.js
├── routes/
│   └── user.routes.js
│   └── captain.routes.js
├── services/
│   └── user.service.js
│   └── captain.service.js
├── middleware/
│   └── auth.middleware.js
│
├── config/
│   └── config.js
│
├── server.js
├── package.json
└── .env
```

---

# ⚙️ Environment Variables

Create a `.env` file in the root directory.

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

# 🚀 Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone <your-repository-url>
cd RideBuddy
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Configure Environment Variables

Create a `.env` file and add your credentials.

## 4️⃣ Start the Server

```bash
npm run dev
```

Server will start at:

```bash
http://localhost:3000
```

---

# 🔐 Authentication API Documentation

---

# 👤 Register User

## Endpoint

```http
POST /users/register
```

---

## 📖 Description

Creates a new user account after validating request data, hashing the password, and generating a JWT authentication token.

---

## 🧾 Request Body

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

---

## ✅ Validation Rules

| Field              | Validation            |
| ------------------ | --------------------- |
| email              | Must be a valid email |
| fullName.firstName | Minimum 2 characters  |
| password           | Minimum 6 characters  |

---

## ✅ Success Response — 201 Created

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "12345",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

---

## ❌ Validation Error — 400 Bad Request

```json
{
  "errors": [
    {
      "msg": "Please provide a valid email address",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---

# 🔑 User Login

## Endpoint

```http
POST /users/login
```

---

## 📖 Description

Authenticates an existing user by verifying email and password.

On successful authentication, the API returns:

* JWT Token
* User Object

---

## 🧾 Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

---

## ✅ Success Response — 200 OK

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

---

## ❌ Invalid Credentials — 401 Unauthorized

```json
{
  "message": "Invalid email or password"
}
```

---

# 🚪 User Logout

## Endpoint

```http
POST /users/logout
```

---

## 📖 Description

Logs out the authenticated user by blacklisting the JWT token and clearing authentication cookies.

Once logged out:

* The token becomes invalid
* Protected routes can no longer be accessed

---

## 🔒 Authentication Required

Yes ✅

---

## 📨 Request Headers

```http
Authorization: Bearer <token>
```

OR

```http
Cookie: token=<token>
```

---

## ✅ Success Response — 200 OK

```json
{
  "message": "Logged out successfully"
}
```

---

## ❌ Unauthorized — 401

```json
{
  "message": "Unauthorized"
}
```

---

````md
---

# 🚖 Captain Authentication APIs

This section documents all authentication-related endpoints for Captains (drivers).

---

# 🚖 Captain Registration

## Endpoint

```http
POST /captains/register
```

---

## 📖 Description

Registers a new captain along with vehicle details.

The API performs:

* ✅ Request Validation
* 🔒 Password Hashing using bcrypt
* 🚘 Vehicle Information Validation
* 🗄️ MongoDB Record Creation
* 🔑 JWT Token Generation

On successful registration, the server returns an authentication token along with captain details.

---

## 🧾 Request Body

```json
{
  "fullName": {
    "firstName": "Jane",
    "lastName": "Doe"
  },
  "email": "jane@example.com",
  "password": "securepassword123",
  "vehicle": {
    "color": "Silver",
    "plate": "ABC-1234",
    "capacity": 4,
    "type": "car"
  }
}
```

---

## ✅ Success Response — 201 Created

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "67a36f...",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Doe"
    },
    "email": "jane@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Silver",
      "plate": "ABC-1234",
      "capacity": 4,
      "type": "car"
    }
  }
}
```

---

## ❌ Validation Error — 400 Bad Request

Returned when:

* Required fields are missing
* Validation rules fail
* Captain already exists

```json
{
  "errors": [
    {
      "msg": "Validation failed",
      "param": "vehicle.type",
      "location": "body"
    }
  ]
}
```

---

# 🔑 Captain Login

## Endpoint

```http
POST /captains/login
```

---

## 📖 Description

Authenticates a captain using email and password.

On successful authentication:

* A JWT token is generated
* Token is sent in cookies and response body
* Captain details are returned

---

## 🧾 Request Body

```json
{
  "email": "jane@example.com",
  "password": "securepassword123"
}
```

---

## ✅ Success Response — 200 OK

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "67a36f...",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Doe"
    },
    "email": "jane@example.com"
  }
}
```

---

## ❌ Invalid Credentials — 400 Bad Request

```json
{
  "message": "Invalid email or password"
}
```

---

# 👤 Captain Profile

## Endpoint

```http
GET /captains/profile
```

---

## 📖 Description

Retrieves the profile information of the currently authenticated captain.

---

## 🔒 Authentication Required

Yes ✅

Provide JWT token using:

```http
Authorization: Bearer <token>
```

OR

```http
Cookie: token=<token>
```

---

## ✅ Success Response — 200 OK

```json
{
  "captain": {
    "_id": "67a36f...",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Doe"
    },
    "email": "jane@example.com",
    "vehicle": {
      "color": "Silver",
      "plate": "ABC-1234",
      "capacity": 4,
      "type": "car"
    }
  }
}
```

---

## ❌ Unauthorized — 401

```json
{
  "message": "Unauthorized"
}
```

---

# 🚪 Captain Logout

## Endpoint

```http
POST /captains/logout
```

---

## 📖 Description

Logs out the authenticated captain by:

* Blacklisting the JWT token
* Clearing authentication cookies

Once logged out:

* The token becomes invalid
* Protected routes cannot be accessed

---

## 🔒 Authentication Required

Yes ✅

---

## 📨 Request Headers

```http
Authorization: Bearer <token>
```

OR

```http
Cookie: token=<token>
```

---

## ✅ Success Response — 200 OK

```json
{
  "message": "Logged out successfully"
}
```

---

## ❌ Unauthorized — 401

```json
{
  "message": "Unauthorized"
}
```

---

# 🚘 Supported Vehicle Types

* car
* bike
* scooter
* auto

---

# ✅ Validation Rules

| Field              | Validation                 |
| ------------------ | -------------------------- |
| Email              | Must be valid email format |
| Password           | Minimum 6 characters       |
| fullName.firstName | Minimum 2 characters       |
| vehicle.color      | Minimum 3 characters       |
| vehicle.plate      | Minimum 3 characters       |
| vehicle.capacity   | Minimum value: 1           |

---

# 🔒 Security Features

## ✅ Password Encryption

Passwords are securely hashed using bcrypt before storing them in MongoDB.

---

## ✅ JWT Authentication

JSON Web Tokens are used for secure stateless authentication.

---

## ✅ Token Blacklisting

Logged-out tokens are stored in a blacklist collection to prevent reuse.

---

## ✅ TTL Index Cleanup

Blacklisted tokens are automatically deleted after expiration using MongoDB TTL indexes.

---

# 🧠 Captain Authentication Workflow

```text
Captain Request
       ↓
Request Validation
       ↓
Password Hashing
       ↓
JWT Generation
       ↓
Authenticated Access
       ↓
Logout & Token Blacklisting
```


# 🛡️ Authentication Flow

```text
Client Request
      ↓
Request Validation
      ↓
Password Hashing
      ↓
MongoDB User Creation
      ↓
JWT Token Generation
      ↓
Authenticated Access
```

---

# 🔒 Security Features

## ✅ Password Hashing

Passwords are securely hashed using bcrypt before storing them in the database.

---

## ✅ JWT Authentication

JSON Web Tokens are used for stateless authentication.

---

## ✅ Token Blacklisting

Logged-out tokens are stored in a blacklist collection to prevent reuse.

---

## ✅ TTL Index Cleanup

Blacklisted tokens are automatically deleted after expiration.

---

# 🧠 Core Architecture

The backend follows a modular MVC architecture.

## 📌 Controllers

Handle:

* Request validation
* API response handling
* Authentication flow

---

## 📌 Services

Contain:

* Business logic
* Database interaction logic

---

## 📌 Models

Define:

* MongoDB schemas
* Instance methods
* Static methods

Example:

```js
userSchema.methods.generateAuthToken = function () {}
userSchema.methods.comparePassword = function () {}
userSchema.statics.hashPassword = function () {}
```

---

# 📦 Dependencies

```json
{
  "bcrypt": "^latest",
  "dotenv": "^latest",
  "express": "^latest",
  "express-validator": "^latest",
  "jsonwebtoken": "^latest",
  "mongoose": "^latest",
  "nodemon": "^latest"
}
```

---

# 🧪 API Testing

You can test the APIs using:

* Postman
* Thunder Client
* Insomnia

---

# 🌟 Future Improvements

* 🚘 Ride Booking APIs
* 📍 Real-time Location Tracking
* 💬 Socket.IO Chat Integration
* 🧭 Google Maps Integration
* 📱 OTP Verification
* ☁️ Deployment on AWS / Render / Railway

---

# 🤝 Contributing

Contributions are welcome.

Feel free to fork the repository and submit pull requests.


# 👨‍💻 Author

### Arjit Tiwari

Backend Developer | MERN Stack Developer | Problem Solver

---

<div align="center">

### ⭐ If you found this project helpful, give it a star ⭐

</div>
