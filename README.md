# NexoraGroups Backend API

Backend server for NexoraGroups website built with Node.js, Express.js, and MongoDB.

## Features

- 📝 Enquiry form submission
- 💾 MongoDB database storage
- 🔒 CORS enabled for frontend integration
- ✅ Input validation
- 📊 RESTful API endpoints

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure MongoDB

**Option A: Local MongoDB**
- Install MongoDB locally: https://www.mongodb.com/try/download/community
- MongoDB will run on `mongodb://localhost:27017`
- No changes needed to `.env` file

**Option B: MongoDB Atlas (Cloud)**
- Create free account at https://www.mongodb.com/cloud/atlas
- Create a new cluster
- Get your connection string
- Update `.env` file with your MongoDB Atlas URI:
  ```
  MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/nexoragroups?retryWrites=true&w=majority
  ```

### 3. Start the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /api/health
```

### Enquiries

**Create new enquiry:**
```
POST /api/enquiries
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "message": "Interested in NEET course",
  "businessName": "Students Paradise",
  "courseName": "NEET Preparation"
}
```

**Get all enquiries:**
```
GET /api/enquiries
```

**Get enquiry by ID:**
```
GET /api/enquiries/:id
```

**Delete enquiry:**
```
DELETE /api/enquiries/:id
```

## Database Schema

### Enquiry Model
```javascript
{
  name: String (required),
  email: String (required),
  phone: String (required),
  message: String,
  businessName: String (required),
  courseName: String,
  createdAt: Date (auto-generated)
}
```

## Frontend Integration

The EnquiryModal component is already configured to submit to this backend. The form data will be automatically saved to MongoDB when users submit enquiries.

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nexoragroups
```

## Testing the API

You can test the API using:
- Postman
- cURL
- VS Code REST Client
- Frontend form submission

Example cURL:
```bash
curl -X POST http://localhost:5000/api/enquiries \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"1234567890","businessName":"Students Paradise"}'
```

## Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running (local) or connection string is correct (Atlas)
- Check firewall settings
- Verify network access in MongoDB Atlas

**CORS Error:**
- Backend CORS is already configured to accept requests from any origin
- If issues persist, check browser console for specific error

**Port Already in Use:**
- Change PORT in `.env` file
- Kill existing process on port 5000

## Production Deployment

For production deployment:
1. Set up MongoDB Atlas for cloud database
2. Update `.env` with production MongoDB URI
3. Deploy backend to: Heroku, Railway, Render, or any Node.js hosting
4. Update frontend API URL from `localhost:5000` to your production URL
5. Enable environment-based API URLs in frontend

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Security:** CORS enabled
- **Development:** Nodemon for auto-restart
