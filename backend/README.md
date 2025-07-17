# Used Car Listing Backend

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/usedcars
   JWT_SECRET=your_jwt_secret
   ```
3. Start the server:
   ```bash
   node index.js
   ```

## API Endpoints

- `POST /api/login` — Dummy login, returns JWT token
- `GET /api/cars` — List all cars
- `POST /api/cars` — Add a new car (requires JWT in Authorization header)
