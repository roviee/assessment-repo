# Assessment

## Project Overview
This application with a **NextJS frontend** and a **Laravel backend**. It includes a MySQL database for data storage, and implements basic CRUD functionality through a RESTful API.

---
## Requirements Implementation

### Frontend
- Built with **NextJS**.
- Responsive web pages for user interaction.
- **Input validation**: ensures the full name contains only alphabetic characters (no numbers).
- Communicates with the backend API to perform CRUD operations.

### Backend
- Built with **Laravel** framework.
- Provides a **RESTful API** with the following methods:
  - `GET` – Retrieve data
  - `POST` – Add new data
  - `PUT/PATCH` – Update existing data
  - `DELETE` – Remove data

### Database
- tools: **MySQL Workbench**.

---

## Setup Instructions

### Frontend
```bash
cd frontend
npm install
npm run dev   # For NextJS
```
### Backend
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve

