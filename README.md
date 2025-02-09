# Secure API Backend

## Overview
This is the backend for the Secure API project, designed to handle user authentication and provide secure endpoints. It supports user registration, login, and JWT-based protected routes. MongoDB Atlas is used as the database to store user data.

---

## Features
- User registration with hashed passwords using **bcrypt.js**.
- User login with **JWT authentication**.
- Protected routes with token-based verification.
- MongoDB Atlas integration for scalable data storage.

---

## Technologies
- **Node.js**: Server runtime environment.
- **Express.js**: Framework for building RESTful APIs.
- **MongoDB Atlas**: Cloud-based NoSQL database.
- **JWT (JSON Web Tokens)**: Authentication method.
- **bcrypt.js**: For hashing passwords.

---

## Setup Instructions

### Prerequisites
1. **Node.js** and **npm** installed. [Download here](https://nodejs.org).
2. MongoDB Atlas cluster set up. Get your MongoDB connection string.

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd secure-api
