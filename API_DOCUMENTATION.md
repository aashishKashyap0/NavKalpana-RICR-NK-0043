# FitAI - Complete RESTful API Documentation

## 📚 Table of Contents
1. [API Overview](#api-overview)
2. [Authentication](#authentication)
3. [API Endpoints](#api-endpoints)
4. [Request/Response Format](#requestresponse-format)
5. [Error Handling](#error-handling)
6. [Rate Limiting](#rate-limiting)
7. [Viva Questions & Answers](#viva-questions--answers)

---

## 🌐 API Overview

### Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

### Architecture Pattern
**RESTful API** - Representational State Transfer

### Key Principles Followed
1. **Stateless**: Each request contains all information needed
2. **Resource-Based**: URLs represent resources (nouns, not verbs)
3. **HTTP Methods**: Standard methods (GET, POST, PUT, DELETE)
4. **JSON Format**: All data exchanged in JSON
5. **Status Codes**: Proper HTTP status codes for responses

### Technology Stack
- **Framework**: Express.js (Node.js)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) + Firebase
- **AI Integration**: Groq API
- **Middleware**: Custom authentication, error handling

---

## 🔐 Authentication

### Authentication Flow
```
1. User registers/logs in
2. Server validates credentials
3. Server generates JWT token
4. Client stores token (localStorage/sessionStorage)
5. Client sends token in Authorization header for protected routes
6. Server validates token using middleware
7. Request proceeds if valid, rejected if invalid
```

### Token Structure
```javascript
Header: {
  "alg": "HS256",
  "typ": "JWT"
}

Payload: {
  "userId": "user_id_here",
  "email": "user@example.com",
  "iat": 1234567890,
  "exp": 1234567890
}
```

### Protected Routes
All routes except `/auth/register` and `/auth/login` require authentication.

**Authorization Header Format**:
```
Authorization: Bearer <jwt_token>
```

---

## 📡 API Endpoints

### 1. Authentication APIs

#### POST /api/auth/register
**Purpose**: Create new user account

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response** (201 Created):
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "user_id",
    "email": "user@example.com"
  }
}
```

**Errors**:
- 400: Email already exists
- 400: Invalid email format
- 400: Password too weak

---

#### POST /api/auth/login
**Purpose**: Authenticate existing user

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response** (200 OK):
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "user_id",
    "email": "user@example.com"
  }
}
```

**Errors**:
- 401: Invalid credentials
- 404: User not found

---


### 2. Profile APIs

#### POST /api/profile
**Purpose**: Create user profile after registration
**Authentication**: Required

**Request Body**:
```json
{
  "age": 25,
  "gender": "Male",
  "height_cm": 175,
  "weight_kg": 75,
  "activity_level": "Moderate",
  "experience_level": "Intermediate",
  "goal": "Muscle Gain",
  "goal_timeframe": "12 weeks",
  "target_weight_kg": 80,
  "available_days_per_week": 5,
  "initial_measurements": {
    "waist_cm": 80,
    "chest_cm": 95,
    "hips_cm": 90,
    "left_arm_cm": 32,
    "right_arm_cm": 32,
    "left_thigh_cm": 55,
    "right_thigh_cm": 55
  },
  "dietary_preferences": "No red meat",
  "allergies": "Peanuts",
  "injuries_limitations": "Lower back pain"
}
```

**Response** (201 Created):
```json
{
  "message": "Profile created successfully",
  "profile": { /* profile object */ }
}
```

---

#### GET /api/profile
**Purpose**: Get user's profile
**Authentication**: Required

**Response** (200 OK):
```json
{
  "_id": "profile_id",
  "user_id": "user_id",
  "age": 25,
  "gender": "Male",
  "height_cm": 175,
  "weight_kg": 75,
  "bmi": 24.5,
  "bmr": 1750,
  "daily_calorie_target": 2500,
  /* ... other fields */
}
```

---

#### PUT /api/profile
**Purpose**: Update user profile
**Authentication**: Required

**Request Body**: (partial update supported)
```json
{
  "weight_kg": 76,
  "target_weight_kg": 82
}
```

**Response** (200 OK):
```json
{
  "message": "Profile updated successfully",
  "profile": { /* updated profile */ }
}
```

---

### 3. Workout APIs

#### POST /api/workouts
**Purpose**: Generate AI-powered workout plan
**Authentication**: Required

**Request Body**:
```json
{
  "week_number": 1
}
```

**Response** (201 Created):
```json
{
  "message": "Workout plan generated successfully",
  "workout": {
    "_id": "workout_id",
    "user_id": "user_id",
    "week_number": 1,
    "workouts": [
      {
        "day": 1,
        "day_name": "Monday",
        "rest_day": false,
        "exercises": [
          {
            "name": "Bench Press",
            "sets": 4,
            "reps": "8-10",
            "rest_seconds": 90,
            "muscle_group": "Chest",
            "equipment": "Barbell",
            "difficulty": "Intermediate"
          }
        ]
      }
    ],
    "created_at": "2026-02-26T10:00:00.000Z"
  }
}
```

---

#### GET /api/workouts/latest
**Purpose**: Get most recent workout plan
**Authentication**: Required

**Response** (200 OK):
```json
{
  "_id": "workout_id",
  "week_number": 1,
  "workouts": [ /* workout array */ ]
}
```

---

#### GET /api/workouts/week/:week_number
**Purpose**: Get workout plan for specific week
**Authentication**: Required

**URL Parameters**:
- `week_number`: Week number (1-52)

**Response** (200 OK):
```json
{
  "week_number": 1,
  "workouts": [ /* workout array */ ]
}
```

---

#### GET /api/workouts
**Purpose**: Get all workout plans for user
**Authentication**: Required

**Response** (200 OK):
```json
[
  {
    "week_number": 1,
    "workouts": [ /* workouts */ ]
  },
  {
    "week_number": 2,
    "workouts": [ /* workouts */ ]
  }
]
```

---

### 4. Diet APIs

#### POST /api/diet
**Purpose**: Generate AI-powered diet plan
**Authentication**: Required

**Request Body**:
```json
{
  "week_number": 1
}
```

**Response** (201 Created):
```json
{
  "message": "Diet plan generated successfully",
  "diet": {
    "_id": "diet_id",
    "user_id": "user_id",
    "week_number": 1,
    "daily_calories": 2500,
    "macros": {
      "protein": 150,
      "carbs": 300,
      "fats": 70
    },
    "meals": [
      {
        "meal_number": 1,
        "meal_name": "Breakfast",
        "time": "08:00",
        "foods": [
          {
            "name": "Oatmeal",
            "quantity": "100g",
            "calories": 389,
            "protein": 17,
            "carbs": 66,
            "fats": 7
          }
        ],
        "total_calories": 500,
        "total_protein": 25,
        "total_carbs": 70,
        "total_fats": 10
      }
    ]
  }
}
```

---

#### GET /api/diet/latest
**Purpose**: Get most recent diet plan
**Authentication**: Required

**Response** (200 OK):
```json
{
  "daily_calories": 2500,
  "macros": { /* macros */ },
  "meals": [ /* meals array */ ]
}
```

---

### 5. Daily Log APIs

#### POST /api/daily-log/log
**Purpose**: Log daily activity (workout, diet, energy, sleep)
**Authentication**: Required

**Request Body**:
```json
{
  "date": "2026-02-26",
  "workout_completed": true,
  "diet_followed": true,
  "energy_level": 8,
  "sleep_quality": 7,
  "notes": "Great workout today!"
}
```

**Response** (201 Created):
```json
{
  "message": "Daily log saved successfully",
  "log": { /* log object */ }
}
```

---

#### GET /api/daily-log/date/:date
**Purpose**: Get log for specific date
**Authentication**: Required

**URL Parameters**:
- `date`: Date in YYYY-MM-DD format

**Response** (200 OK):
```json
{
  "date": "2026-02-26",
  "workout_completed": true,
  "diet_followed": true,
  "energy_level": 8,
  "sleep_quality": 7,
  "notes": "Great workout today!"
}
```

---

#### GET /api/daily-log/recent
**Purpose**: Get recent logs
**Authentication**: Required

**Query Parameters**:
- `days`: Number of days (default: 7)

**Response** (200 OK):
```json
[
  {
    "date": "2026-02-26",
    "workout_completed": true,
    "diet_followed": true
  }
]
```

---

#### GET /api/daily-log/streak
**Purpose**: Get current streak
**Authentication**: Required

**Response** (200 OK):
```json
{
  "current_streak": 5,
  "longest_streak": 12,
  "last_log_date": "2026-02-26"
}
```

---

### 6. Progress APIs

#### POST /api/progress
**Purpose**: Log weight progress
**Authentication**: Required

**Request Body**:
```json
{
  "weight_kg": 76.5,
  "notes": "Feeling good"
}
```

**Response** (201 Created):
```json
{
  "message": "Progress logged successfully",
  "progress": {
    "date": "2026-02-26",
    "weight_kg": 76.5,
    "notes": "Feeling good"
  }
}
```

---

#### GET /api/progress/recent
**Purpose**: Get recent progress logs
**Authentication**: Required

**Query Parameters**:
- `days`: Number of days (default: 30)

**Response** (200 OK):
```json
[
  {
    "date": "2026-02-26",
    "weight_kg": 76.5
  },
  {
    "date": "2026-02-25",
    "weight_kg": 76.8
  }
]
```

---

#### GET /api/progress/habits/current
**Purpose**: Get current habit score
**Authentication**: Required

**Response** (200 OK):
```json
{
  "habit_score": 85,
  "streak_count": 3,
  "workouts_completed": 4,
  "diet_adherence": 90,
  "week_start_date": "2026-02-24"
}
```

---

#### GET /api/progress/dropoff/check
**Purpose**: Check if user is at risk of dropping off
**Authentication**: Required

**Response** (200 OK):
```json
{
  "at_risk": false,
  "risk_level": "low",
  "days_since_last_log": 1,
  "recommendations": [
    "Keep up the great work!",
    "You're on track with your goals"
  ],
  "positive_notes": [
    "Consistent workout completion"
  ]
}
```

---

#### GET /api/progress/goal/progress
**Purpose**: Get progress toward goal
**Authentication**: Required

**Response** (200 OK):
```json
{
  "current_weight": 76.5,
  "target_weight": 80,
  "starting_weight": 75,
  "progress_percentage": 42.8,
  "remaining_kg": 3.5,
  "weeks_elapsed": 2,
  "estimated_weeks_remaining": 3
}
```

---

### 7. Measurement APIs

#### POST /api/measurements
**Purpose**: Add body measurements
**Authentication**: Required

**Request Body**:
```json
{
  "measurements": {
    "waist_cm": 79,
    "chest_cm": 96,
    "hips_cm": 91,
    "left_arm_cm": 33,
    "right_arm_cm": 33,
    "left_thigh_cm": 56,
    "right_thigh_cm": 56
  },
  "notes": "Seeing progress!"
}
```

**Response** (201 Created):
```json
{
  "message": "Measurement added successfully",
  "measurement": { /* measurement object */ }
}
```

---

#### GET /api/measurements/latest
**Purpose**: Get latest measurements
**Authentication**: Required

**Response** (200 OK):
```json
{
  "date": "2026-02-26",
  "measurements": {
    "waist_cm": 79,
    "chest_cm": 96
  },
  "notes": "Seeing progress!"
}
```

---

#### GET /api/measurements/reminder
**Purpose**: Check if measurement reminder is due
**Authentication**: Required

**Response** (200 OK):
```json
{
  "reminder_due": false,
  "days_until_next": 21,
  "last_measurement_date": "2026-02-05",
  "next_due_date": "2026-03-05"
}
```

---

#### GET /api/measurements/analyze-ai
**Purpose**: AI analysis of measurement changes
**Authentication**: Required

**Response** (200 OK):
```json
{
  "analysis": {
    "overall_progress": "positive",
    "needs_diet_adjustment": false,
    "needs_workout_adjustment": false,
    "key_changes": [
      "Waist decreased by 1cm - excellent progress"
    ],
    "recommendations": [
      "Continue current plan"
    ]
  }
}
```

---

#### POST /api/measurements/regenerate-plans
**Purpose**: Regenerate workout/diet plans based on measurements
**Authentication**: Required

**Response** (200 OK):
```json
{
  "success": true,
  "diet_regenerated": true,
  "workout_regenerated": false,
  "diet_plan": { /* new diet plan */ },
  "workout_plan": null
}
```

---

### 8. Premium Coaching APIs

#### GET /api/premium/status
**Purpose**: Check premium subscription status
**Authentication**: Required

**Response** (200 OK):
```json
{
  "is_premium": true,
  "activated_at": "2026-01-01",
  "features_available": [
    "macro_customization",
    "meal_swapping",
    "ai_coaching",
    "recovery_analysis"
  ]
}
```

---

#### GET /api/premium/preferences
**Purpose**: Get premium preferences
**Authentication**: Required

**Response** (200 OK):
```json
{
  "macro_strategy": "high_protein",
  "meal_preferences": {
    "avoid_foods": ["mushrooms"],
    "favorite_foods": ["chicken", "rice"]
  },
  "coaching_style": "motivational"
}
```

---

#### PUT /api/premium/preferences
**Purpose**: Update premium preferences
**Authentication**: Required

**Request Body**:
```json
{
  "macro_strategy": "balanced",
  "coaching_style": "analytical"
}
```

**Response** (200 OK):
```json
{
  "message": "Preferences updated successfully",
  "preferences": { /* updated preferences */ }
}
```

---

#### GET /api/premium/macros/calculate
**Purpose**: Calculate macros based on strategy
**Authentication**: Required

**Query Parameters**:
- `strategy`: Macro strategy (high_protein, low_carb, etc.)

**Response** (200 OK):
```json
{
  "strategy": "high_protein",
  "daily_calories": 2500,
  "macros": {
    "protein": 200,
    "carbs": 250,
    "fats": 70
  },
  "distribution": {
    "protein_percentage": 32,
    "carbs_percentage": 40,
    "fats_percentage": 28
  }
}
```

---

#### POST /api/premium/meals/swap
**Purpose**: Swap a meal with AI-generated alternative
**Authentication**: Required

**Request Body**:
```json
{
  "meal_number": 1,
  "reason": "I need more protein",
  "dietary_restrictions": ["vegetarian"]
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "original_meal": { /* original meal */ },
  "new_meal": {
    "meal_name": "High Protein Breakfast",
    "foods": [ /* food items */ ],
    "total_calories": 520,
    "total_protein": 45
  },
  "swap_id": "swap_id"
}
```

---

#### POST /api/premium/coaching/ask
**Purpose**: Ask AI coach a question
**Authentication**: Required

**Request Body**:
```json
{
  "question": "How can I improve my bench press?"
}
```

**Response** (200 OK):
```json
{
  "response": "To improve your bench press, focus on...",
  "context_used": {
    "current_workout": "Push day",
    "experience_level": "Intermediate"
  }
}
```

---

#### GET /api/premium/recovery/analyze
**Purpose**: Get recovery analysis
**Authentication**: Required

**Response** (200 OK):
```json
{
  "recovery_score": 75,
  "status": "good",
  "recommendations": [
    "You're recovering well",
    "Consider a rest day if energy drops"
  ],
  "metrics": {
    "avg_energy": 7.5,
    "avg_sleep": 7.2,
    "workout_frequency": 4
  }
}
```

---

### 9. Reporting APIs

#### GET /api/reporting/monthly
**Purpose**: Get comprehensive monthly report
**Authentication**: Required

**Response** (200 OK):
```json
{
  "period": {
    "start_date": "2026-01-26",
    "end_date": "2026-02-26"
  },
  "summary": {
    "weight_change": -2.5,
    "workouts_completed": 18,
    "diet_adherence": 85,
    "habit_score_avg": 82
  },
  "measurements": {
    "waist_change": -2,
    "chest_change": 1
  },
  "insights": [
    "Excellent progress this month!",
    "Consistency is your strength"
  ],
  "recommendations": [
    "Increase protein intake slightly",
    "Add one more workout day"
  ]
}
```

---

#### GET /api/reporting/summary
**Purpose**: Get quick report summary
**Authentication**: Required

**Response** (200 OK):
```json
{
  "last_30_days": {
    "workouts": 18,
    "weight_change": -2.5,
    "habit_score": 82
  }
}
```

---

### 10. Assistant APIs

#### POST /api/assistant/ask
**Purpose**: Ask AI assistant a question
**Authentication**: Required

**Request Body**:
```json
{
  "question": "What should I eat before workout?"
}
```

**Response** (200 OK):
```json
{
  "response": "Before a workout, aim for a meal with...",
  "timestamp": "2026-02-26T10:00:00.000Z"
}
```

---

## 📋 Request/Response Format

### Standard Request Headers
```
Content-Type: application/json
Authorization: Bearer <jwt_token>
```

### Standard Response Structure

**Success Response**:
```json
{
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

**Error Response**:
```json
{
  "error": "Error message",
  "details": "Detailed error information"
}
```

---

## ⚠️ Error Handling

### HTTP Status Codes Used

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful GET, PUT requests |
| 201 | Created | Successful POST (resource created) |
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | Missing/invalid authentication |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate resource |
| 500 | Internal Server Error | Server-side error |

### Common Error Responses

**Authentication Error** (401):
```json
{
  "error": "Authentication required",
  "message": "Please provide valid token"
}
```

**Validation Error** (400):
```json
{
  "error": "Validation failed",
  "details": {
    "email": "Invalid email format",
    "password": "Password must be at least 8 characters"
  }
}
```

**Not Found Error** (404):
```json
{
  "error": "Resource not found",
  "message": "Profile not found for this user"
}
```

---

## 🚦 Rate Limiting

### Current Limits
- **General APIs**: 100 requests per 15 minutes per IP
- **AI APIs**: 20 requests per hour per user
- **Authentication**: 5 login attempts per 15 minutes

### Rate Limit Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1234567890
```

### Rate Limit Exceeded Response (429):
```json
{
  "error": "Rate limit exceeded",
  "message": "Too many requests. Please try again later.",
  "retry_after": 900
}
```

---


## 🎓 Viva Questions & Answers

### Q1: What is REST and why did you choose it?
**Answer**: REST (Representational State Transfer) is an architectural style for designing networked applications. I chose REST because:
- **Stateless**: Each request is independent, making it scalable
- **Cacheable**: Responses can be cached for better performance
- **Uniform Interface**: Standard HTTP methods (GET, POST, PUT, DELETE)
- **Client-Server Separation**: Frontend and backend are decoupled
- **Widely Adopted**: Industry standard with excellent tooling support

---

### Q2: Explain the difference between PUT and PATCH?
**Answer**: 
- **PUT**: Replaces the entire resource. Requires sending all fields.
  ```javascript
  PUT /api/profile
  // Must send complete profile object
  ```
- **PATCH**: Partial update. Only send fields to update.
  ```javascript
  PATCH /api/profile
  // Send only { "weight_kg": 76 }
  ```
In my project, I use PUT for profile updates but support partial updates by merging with existing data.

---

### Q3: How do you handle authentication in your API?
**Answer**: I use a two-layer authentication system:
1. **Firebase Authentication**: For user registration and login
2. **JWT Tokens**: For API request authentication

**Flow**:
```
1. User logs in → Firebase validates
2. Backend generates JWT token
3. Client stores token
4. Every API request includes: Authorization: Bearer <token>
5. authMiddleware validates token
6. If valid, request proceeds; if invalid, returns 401
```

**Code Example**:
```javascript
// Middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user_id = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

---

### Q4: What HTTP methods do you use and why?
**Answer**:
- **GET**: Retrieve data (workouts, diet plans, progress)
  - Idempotent: Multiple calls return same result
  - Cacheable
  - No request body

- **POST**: Create new resources (register, log daily activity)
  - Not idempotent: Creates new resource each time
  - Has request body
  - Returns 201 Created

- **PUT**: Update existing resources (profile, preferences)
  - Idempotent: Multiple calls have same effect
  - Replaces entire resource

- **DELETE**: Remove resources (not heavily used in my app)
  - Idempotent

---

### Q5: How do you structure your API URLs?
**Answer**: I follow RESTful conventions:

**Resource-Based URLs** (nouns, not verbs):
```
✅ Good: GET /api/workouts
❌ Bad: GET /api/getWorkouts

✅ Good: POST /api/profile
❌ Bad: POST /api/createProfile
```

**Hierarchical Structure**:
```
/api/workouts              → All workouts
/api/workouts/latest       → Latest workout
/api/workouts/week/:id     → Specific week
```

**Query Parameters for Filtering**:
```
/api/progress/recent?days=7
/api/daily-log/range?start=2026-01-01&end=2026-01-31
```

---

### Q6: Explain your error handling strategy?
**Answer**: I use a multi-layer error handling approach:

**1. Input Validation**:
```javascript
if (!email || !password) {
  return res.status(400).json({ 
    error: 'Validation failed',
    details: 'Email and password required'
  });
}
```

**2. Try-Catch Blocks**:
```javascript
try {
  const result = await someOperation();
  res.status(200).json(result);
} catch (error) {
  res.status(500).json({ 
    error: 'Operation failed',
    message: error.message 
  });
}
```

**3. Proper Status Codes**:
- 400: Bad request (validation errors)
- 401: Unauthorized (auth errors)
- 404: Not found
- 500: Server errors

**4. Consistent Error Format**:
```json
{
  "error": "Error type",
  "message": "Human-readable message",
  "details": { /* additional info */ }
}
```

---

### Q7: How do you ensure API security?
**Answer**: Multiple security layers:

**1. Authentication**:
- JWT tokens with expiration
- Secure password hashing (bcrypt)
- Firebase authentication

**2. Authorization**:
- Middleware checks on all protected routes
- User can only access their own data

**3. Input Validation**:
- Validate all inputs
- Sanitize data to prevent injection

**4. HTTPS**:
- All production traffic encrypted

**5. Environment Variables**:
- Sensitive keys stored in .env
- Never committed to repository

**6. Rate Limiting**:
- Prevent brute force attacks
- Limit AI API calls

---

### Q8: What is middleware and how do you use it?
**Answer**: Middleware are functions that execute between receiving a request and sending a response.

**My Usage**:

**1. Authentication Middleware**:
```javascript
router.use(authMiddleware);
// All routes below require authentication
```

**2. Route-Level Middleware**:
```javascript
router.get('/profile', authMiddleware, getProfile);
```

**3. Error Handling Middleware**:
```javascript
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});
```

**Execution Order**:
```
Request → authMiddleware → Route Handler → Response
```

---

### Q9: How do you handle CORS in your API?
**Answer**: CORS (Cross-Origin Resource Sharing) allows frontend (different domain) to access backend.

**Implementation**:
```javascript
import cors from 'cors';

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

**Why Needed**: Browser security prevents cross-origin requests by default. CORS headers tell browser it's safe.

---

### Q10: Explain your database interaction pattern?
**Answer**: I use the **Repository Pattern** with Mongoose:

**Layers**:
```
Controller → Service → Model → Database
```

**Example Flow**:
```javascript
// 1. Controller (handles HTTP)
export const getProfile = async (req, res) => {
  try {
    const profile = await profileService.getProfile(req.user_id);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Service (business logic)
export const getProfile = async (user_id) => {
  const profile = await Profile.findOne({ user_id });
  if (!profile) throw new Error('Profile not found');
  return profile;
};

// 3. Model (database schema)
const profileSchema = new mongoose.Schema({
  user_id: { type: ObjectId, required: true },
  age: Number,
  // ... other fields
});
```

**Benefits**:
- Separation of concerns
- Reusable business logic
- Easy to test
- Clean code organization

---

### Q11: How do you integrate AI in your API?
**Answer**: I integrate Groq AI through a dedicated service:

**Architecture**:
```javascript
// groqService.js
export const generateWorkoutPlan = async (userProfile) => {
  const prompt = `Generate workout plan for:
    - Experience: ${userProfile.experience_level}
    - Goal: ${userProfile.goal}
    - Days: ${userProfile.available_days_per_week}`;
  
  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 2000
  });
  
  return JSON.parse(response.choices[0].message.content);
};
```

**API Endpoints Using AI**:
- POST /api/workouts → Workout generation
- POST /api/diet → Diet plan generation
- POST /api/premium/meals/swap → Meal swapping
- GET /api/measurements/analyze-ai → Progress analysis
- POST /api/assistant/ask → AI coaching

**Error Handling**:
```javascript
try {
  const aiResponse = await groqService.generate(prompt);
  return aiResponse;
} catch (error) {
  // Fallback to template-based generation
  return generateFallbackPlan(userProfile);
}
```

---

### Q12: What is the difference between synchronous and asynchronous APIs?
**Answer**:

**Synchronous**:
- Client waits for response
- Blocking operation
- Example: GET /api/profile (returns immediately)

**Asynchronous**:
- Client doesn't wait
- Non-blocking
- Example: AI plan generation (takes 2-5 seconds)

**My Implementation**:
```javascript
// Async/await pattern
export const generateWorkoutPlan = async (req, res) => {
  try {
    // This is async - waits for AI response
    const workout = await workoutService.generatePlan(req.user_id);
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

**All my APIs use async/await** for:
- Database operations
- AI API calls
- External service calls

---

### Q13: How do you version your API?
**Answer**: Currently using **URL versioning**:

```
/api/v1/workouts
/api/v2/workouts
```

**Why Versioning**:
- Backward compatibility
- Gradual migration
- Multiple versions can coexist

**Future Approach**:
```javascript
// Header-based versioning
Accept: application/vnd.fitai.v1+json
```

**Breaking Changes**:
- New version for breaking changes
- Deprecation notices
- Migration guides

---

### Q14: Explain your API testing strategy?
**Answer**: Multi-level testing approach:

**1. Unit Tests** (Service layer):
```javascript
describe('Profile Service', () => {
  it('should create profile', async () => {
    const profile = await profileService.create(userData);
    expect(profile).toBeDefined();
    expect(profile.age).toBe(25);
  });
});
```

**2. Integration Tests** (API endpoints):
```javascript
describe('POST /api/profile', () => {
  it('should create profile with valid data', async () => {
    const response = await request(app)
      .post('/api/profile')
      .set('Authorization', `Bearer ${token}`)
      .send(profileData);
    
    expect(response.status).toBe(201);
    expect(response.body.profile).toBeDefined();
  });
});
```

**3. Manual Testing**:
- Postman collections
- Test scripts in `/backend/scripts`

**4. AI Testing**:
```javascript
// backend/scripts/testAllAIFunctions.js
// Tests all AI integrations
```

---

### Q15: How do you handle file uploads in your API?
**Answer**: Currently, my API doesn't handle file uploads, but if implementing:

**Approach**:
```javascript
import multer from 'multer';

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images allowed'));
    }
  }
});

router.post('/upload', upload.single('photo'), (req, res) => {
  res.json({ url: req.file.path });
});
```

**For Production**:
- Use cloud storage (AWS S3, Cloudinary)
- Generate signed URLs
- Validate file types and sizes

---

### Q16: What is pagination and how would you implement it?
**Answer**: Pagination divides large datasets into pages.

**Implementation**:
```javascript
// GET /api/workouts?page=1&limit=10
export const getAllWorkouts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  
  const workouts = await Workout.find({ user_id: req.user_id })
    .sort({ created_at: -1 })
    .skip(skip)
    .limit(limit);
  
  const total = await Workout.countDocuments({ user_id: req.user_id });
  
  res.json({
    data: workouts,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
};
```

**Response**:
```json
{
  "data": [ /* workouts */ ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pages": 5
  }
}
```

---

### Q17: How do you optimize API performance?
**Answer**: Multiple optimization strategies:

**1. Database Indexing**:
```javascript
profileSchema.index({ user_id: 1 });
workoutSchema.index({ user_id: 1, week_number: 1 });
```

**2. Caching**:
```javascript
// Cache frequently accessed data
const cachedProfile = await redis.get(`profile:${user_id}`);
if (cachedProfile) return JSON.parse(cachedProfile);
```

**3. Selective Field Return**:
```javascript
// Only return needed fields
Profile.findOne({ user_id }).select('age weight_kg goal');
```

**4. Pagination**:
- Limit data returned per request

**5. Async Operations**:
- Non-blocking I/O
- Parallel requests where possible

**6. Connection Pooling**:
- Reuse database connections

---

### Q18: What is the difference between authentication and authorization?
**Answer**:

**Authentication**: "Who are you?"
- Verifying user identity
- Login with email/password
- JWT token generation
```javascript
// User proves identity
POST /api/auth/login
{ "email": "user@example.com", "password": "pass" }
```

**Authorization**: "What can you do?"
- Verifying permissions
- Checking if user can access resource
```javascript
// Check if user can access their own data
const profile = await Profile.findOne({ user_id: req.user_id });
if (!profile) return res.status(403).json({ error: 'Forbidden' });
```

**In My Project**:
- **Authentication**: JWT tokens via authMiddleware
- **Authorization**: User can only access their own data (checked by user_id)

---

### Q19: How do you document your API?
**Answer**: Multiple documentation approaches:

**1. Code Comments**:
```javascript
/**
 * Generate workout plan
 * @route POST /api/workouts
 * @access Private
 * @param {number} week_number - Week number for plan
 * @returns {Object} Generated workout plan
 */
```

**2. README Files**:
- API_DOCUMENTATION.md (this file)
- Endpoint descriptions
- Request/response examples

**3. Postman Collections**:
- Organized by resource
- Example requests
- Environment variables

**4. Swagger/OpenAPI** (Future):
```yaml
/api/workouts:
  post:
    summary: Generate workout plan
    security:
      - bearerAuth: []
    responses:
      201:
        description: Workout created
```

---

### Q20: What are the advantages of using MongoDB with your REST API?
**Answer**:

**1. Flexible Schema**:
- Easy to add new fields
- No migrations needed
```javascript
// Can easily add new fields
profile.new_field = "value";
await profile.save();
```

**2. JSON-Native**:
- Stores data as BSON (Binary JSON)
- Perfect match for REST APIs (JSON in/out)
- No ORM impedance mismatch

**3. Scalability**:
- Horizontal scaling (sharding)
- Handles large datasets

**4. Performance**:
- Fast reads/writes
- Indexing support
- Aggregation pipeline

**5. Developer Experience**:
- Mongoose ODM provides structure
- Easy to work with in Node.js
- Rich query language

**Example**:
```javascript
// Complex query made simple
const workouts = await Workout.find({
  user_id: userId,
  week_number: { $gte: 1, $lte: 4 }
}).sort({ created_at: -1 }).limit(10);
```

---

## 📚 Additional Concepts

### Idempotency
**Definition**: Multiple identical requests have the same effect as a single request.

**Idempotent Methods**:
- GET, PUT, DELETE

**Non-Idempotent**:
- POST (creates new resource each time)

**Example**:
```javascript
// Idempotent
PUT /api/profile { "weight_kg": 75 }
// Calling 5 times → weight is still 75

// Non-idempotent
POST /api/progress { "weight_kg": 75 }
// Calling 5 times → creates 5 progress logs
```

---

### Statelessness
**Definition**: Server doesn't store client state between requests.

**Implementation**:
- Each request contains all needed information
- JWT token includes user identity
- No server-side sessions

**Benefits**:
- Scalability (any server can handle any request)
- Reliability (no session loss)
- Simplicity

---

### Content Negotiation
**Definition**: Client and server agree on response format.

**Headers**:
```
Accept: application/json
Content-Type: application/json
```

**My API**:
- Only supports JSON
- Could add XML, CSV in future

---

## 🎯 Summary

This API documentation covers:
- ✅ Complete endpoint reference
- ✅ Request/response examples
- ✅ Authentication & security
- ✅ Error handling
- ✅ 20+ viva questions with detailed answers
- ✅ RESTful principles explained
- ✅ Real code examples from project

**Key Takeaways**:
1. RESTful architecture with proper HTTP methods
2. JWT-based authentication
3. Layered architecture (Controller → Service → Model)
4. AI integration through dedicated service
5. Comprehensive error handling
6. Security best practices
7. Performance optimization

---

**For More Information**:
- Check individual route files in `/backend/routes`
- Review controller implementations in `/backend/controllers`
- See service logic in `/backend/services`
- Test scripts in `/backend/scripts`

---

*This documentation is prepared for viva voce examination and technical presentations.*

**Last Updated**: February 2026  
**Version**: 1.0.0  
**Status**: Complete ✅
