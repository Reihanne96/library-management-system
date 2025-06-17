
# Library Management System

A simple full-stack Library Management System built using **Node.js**, **Express**, **MongoDB**, and **Bootstrap**. This web app supports book CRUD operations and borrow/return tracking.

---

## Project Setup Instructions


### 1. Install Dependencies
```bash
npm install
```

### 2. Start MongoDB
Ensure MongoDB is installed and running on your local machine.

### 3. Run the App
```bash
node server.js
```

### 4. Open in Browser
Visit:  
```
http://localhost:3000
```

---

## API Endpoints

### Book Management

| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| GET    | `/api/books`     | Get all books            |
| GET    | `/api/books/:id` | Get a book by ID         |
| POST   | `/api/books`     | Add a new book           |
| PUT    | `/api/books/:id` | Update book by ID        |
| DELETE | `/api/books/:id` | Delete book by ID        |

### Borrow/Return Books

| Method | Endpoint      | Description         |
|--------|---------------|---------------------|
| POST   | `/api/borrow` | Borrow a book       |
| POST   | `/api/return` | Return a borrowed book |

---

## Frontend Design (Bootstrap)

- **Bootstrap 5** used for layout, responsiveness, and styling.
- Book cards show title, author, ISBN, and availability status.
- Dynamic badges and border color indicate **Available** (green) or **Borrowed** (red) status.
- Borrow/Return section includes user input and submission feedback via alert messages.
- A semi-transparent overlay improves contrast over a custom background image.
