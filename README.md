# MERN Stack Food Delivery System

A full-stack food delivery menu manager built with the MERN stack.
This project lets restaurant staff add, update, delete, search, and filter food items using a React dashboard connected to an Express/MongoDB API.

## Features

- Browse food items with live search
- Filter by category
- Add new menu items with image URLs
- Edit existing food items
- Delete unavailable items
- Responsive React dashboard UI
- REST API powered by Express and MongoDB

## Technology Stack

- Frontend: React
- Backend: Node.js + Express
- Database: MongoDB
- ORM: Mongoose
- HTTP client: Axios
- Dev tools: Nodemon, Create React App

## Project Structure

```
mern-stack-food-delivery-system/
├── backend/
│   ├── package.json
│   ├── server.js
│   └── models/
├── frontend/
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── App.css
│       ├── App.js
│       └── index.js
└── README.md
```

## Prerequisites

- Node.js installed
- npm available
- MongoDB installed and running locally

## Getting Started

### 1. Start MongoDB

Run the MongoDB server locally. The backend expects MongoDB at:

```
mongodb://127.0.0.1:27017/foodDB
```

If you use a different MongoDB address, update the connection string in `backend/server.js`.

### 2. Run the Backend

Open a terminal in the `backend` folder and install dependencies:

```bash
cd backend
npm install
npm run dev
```

This starts the API server on:

```
http://localhost:5000
```

### 3. Run the Frontend

Open another terminal in the `frontend` folder and install dependencies:

```bash
cd frontend
npm install
npm start
```

The React app will launch at:

```
http://localhost:3000
```

## API Reference

### Get all food items

```http
GET /foods
```

Query params:
- `search` — filter by food name
- `category` — filter by category

### Add a food item

```http
POST /foods
```

Request body example:

```json
{
  "name": "Burger",
  "price": 120,
  "category": "Fast Food",
  "image": "https://example.com/burger.jpg"
}
```

### Update a food item

```http
PUT /foods/:id
```

### Delete a food item

```http
DELETE /foods/:id
```

## App Workflow

1. Add a food item using the form
2. Use the search box to find items by name
3. Use the category dropdown to filter menu items
4. Click **Edit** to load an item into the form
5. Click **Delete** to remove an item

## Notes

- The UI supports image URLs, so you can display food images in the menu cards.
- If MongoDB is not running, the backend will fail to connect.

## Future Improvements

- Add user authentication (admin/customer)
- Add order creation and order history
- Persist food categories separately
- Improve image upload support
- Add mobile-friendly navigation
