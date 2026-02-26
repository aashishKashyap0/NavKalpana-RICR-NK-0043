# FitAI Premium Features - Complete Documentation

## 📚 Table of Contents
1. [Premium Features Overview](#premium-features-overview)
2. [Architecture & Data Flow](#architecture--data-flow)
3. [Feature 1: Advanced Macro Customization](#feature-1-advanced-macro-customization)
4. [Feature 2: Intelligent Meal Swap Engine](#feature-2-intelligent-meal-swap-engine)
5. [Feature 3: Personalized Meal Adjustments](#feature-3-personalized-meal-adjustments)
6. [Feature 4: Extended AI Coaching](#feature-4-extended-ai-coaching)
7. [Feature 5: Deep Recovery Insights](#feature-5-deep-recovery-insights)
8. [Groq AI Integration](#groq-ai-integration)
9. [REST API Reference](#rest-api-reference)
10. [Frontend Implementation](#frontend-implementation)
11. [Database Schema](#database-schema)
12. [Viva Questions & Answers](#viva-questions--answers)

---

## 🌟 Premium Features Overview

### What is Premium?
Premium is an advanced subscription tier that unlocks AI-powered personalization features beyond the basic plan.

### Premium Features List
1. **Advanced Macro Customization** - 7 macro strategies with real-time diet plan updates
2. **Intelligent Meal Swap Engine** - AI-powered meal alternatives
3. **Personalized Meal Adjustments** - Behavioral pattern analysis
4. **Extended AI Coaching** - Context-aware coaching responses
5. **Deep Recovery Insights** - 14-day recovery analysis with recommendations

### Technology Stack
- **Backend**: Node.js + Express
- **AI**: Groq API (llama-3.1-8b-instant model)
- **Database**: MongoDB (PremiumPreferences, MealSwapHistory collections)
- **Frontend**: React with 5 premium tabs

---

## 🏗️ Architecture & Data Flow

### System Architecture
```
┌─────────────┐
│   Frontend  │
│ (React App) │
└──────┬──────┘
       │ HTTP Requests (REST API)
       │ Authorization: Bearer <JWT>
       ↓
┌──────────────────────────────────┐
│   Backend API Layer              │
│   (Express.js Controllers)       │
└──────┬───────────────────────────┘
       │
       ├─→ Authentication Middleware
       │   (Verify JWT Token)
       │
       ├─→ Premium Status Check
       │   (Verify user.is_premium)
       │
       ↓
┌──────────────────────────────────┐
│   Premium Coaching Service       │
│   (Business Logic Layer)         │
└──────┬───────────────────────────┘
       │
       ├─→ MongoDB (Read/Write)
       │   • PremiumPreferences
       │   • MealSwapHistory
       │   • DailyLog
       │   • Profile
       │   • DietPlan
       │
       ├─→ Groq AI API
       │   • Meal generation
       │   • Coaching responses
       │   • Analysis
       │
       └─→ Response to Frontend
```

### Complete Data Flow Example (Meal Swap)
```
1. USER ACTION
   └─→ User clicks "Swap Meal" in MealsTab.jsx
   └─→ Enters reason: "I need more protein"

2. FRONTEND (MealsTab.jsx)
   └─→ Calls: premiumService.swapMeal(dietPlanId, mealNumber, reason)
   └─→ API Request: POST /api/premium/meals/swap
   └─→ Headers: { Authorization: Bearer <token> }
   └─→ Body: { diet_plan_id, meal_number, swap_reason }

3. BACKEND CONTROLLER (premiumCoachingController.js)
   └─→ Receives request
   └─→ Validates: diet_plan_id, meal_number
   └─→ Calls: premiumCoachingService.swapMeal()

4. SERVICE LAYER (premiumCoachingService.js)
   └─→ Step 1: Fetch data from MongoDB
       ├─→ DietPlan.findById(dietPlanId)
       ├─→ PremiumPreferences.findOne({ user_id })
       └─→ Profile.findOne({ user_id })
   
   └─→ Step 2: Extract original meal
       └─→ Find meal by meal_number
       └─→ Get: calories, protein, carbs, fats
   
   └─→ Step 3: Build constraints
       ├─→ Target macros from original meal
       ├─→ Dietary restrictions from preferences
       ├─→ Allergies, dislikes
       ├─→ Budget level, cooking skill
       └─→ Swap reason (user input)
   
   └─→ Step 4: Call Groq AI
       ├─→ Build detailed prompt
       ├─→ Include all constraints
       ├─→ Special instructions based on reason
       └─→ Request JSON response
   
   └─→ Step 5: Process AI response
       ├─→ Clean markdown/code blocks
       ├─→ Parse JSON
       ├─→ Validate required fields
       └─→ Ensure macros are numbers
   
   └─→ Step 6: Save to database
       ├─→ Create MealSwapHistory document
       ├─→ Update DietPlan with new meal
       └─→ Save both documents
   
   └─→ Step 7: Return response
       └─→ { success, swapped_meal, original_meal }

5. GROQ AI PROCESSING
   └─→ Receives prompt with:
       ├─→ Original meal details
       ├─→ Target macros (±tolerance)
       ├─→ Dietary restrictions
       ├─→ User preferences
       └─→ Swap reason
   
   └─→ Generates alternative meal:
       ├─→ Matches macros closely
       ├─→ Respects restrictions
       ├─→ Addresses user request
       └─→ Returns JSON format

6. RESPONSE TO FRONTEND
   └─→ Controller sends JSON response
   └─→ Status: 200 OK
   └─→ Body: { success, swapped_meal, original_meal }

7. FRONTEND UPDATE
   └─→ MealsTab receives response
   └─→ Updates UI with new meal
   └─→ Shows success message
   └─→ Refreshes meal list
```

---

# FitAI Premium Features Documentation - Part 2

## 🎯 Feature 1: Advanced Macro Customization

### Overview
Premium users can choose from 7 different macro strategies that automatically calculate and apply personalized macronutrient targets based on their weight, goals, and preferences.

### Available Strategies

#### 1. Balanced (Default)
- **Ratio**: 30% Protein / 40% Carbs / 30% Fat
- **Protein**: 2.0g per kg body weight
- **Best For**: General fitness, maintenance, beginners
- **Use Case**: Well-rounded approach for sustainable progress

#### 2. High Protein
- **Ratio**: 35% Protein / 35% Carbs / 30% Fat
- **Protein**: 2.5g per kg body weight
- **Best For**: Muscle building, strength training
- **Use Case**: Maximizing muscle protein synthesis

#### 3. Low Carb
- **Ratio**: 35% Protein / 20% Carbs / 45% Fat
- **Protein**: 2.2g per kg body weight
- **Best For**: Fat loss, metabolic flexibility
- **Use Case**: Reducing body fat while preserving muscle

#### 4. High Carb
- **Ratio**: 25% Protein / 55% Carbs / 20% Fat
- **Protein**: 2.0g per kg body weight
- **Best For**: Endurance athletes, high-volume training
- **Use Case**: Fueling intense workouts and recovery

#### 5. Ketogenic
- **Ratio**: 25% Protein / 5% Carbs / 70% Fat
- **Protein**: 2.0g per kg body weight
- **Best For**: Rapid fat loss, metabolic adaptation
- **Use Case**: Entering and maintaining ketosis

#### 6. Carb Cycling
- **High Carb Days**: 30% Protein / 50% Carbs / 20% Fat
- **Low Carb Days**: 35% Protein / 25% Carbs / 40% Fat
- **Protein**: 2.2g per kg body weight
- **Best For**: Advanced athletes, body recomposition
- **Use Case**: Optimizing performance and fat loss
- **Default Schedule**: High carb on Mon/Wed/Fri (workout days)

#### 7. Custom
- **Ratio**: User-defined percentages
- **Protein**: Adjustable from 1.2g to 3.5g per kg
- **Best For**: Specific dietary needs, experimentation
- **Use Case**: Complete control over macro distribution

### Implementation Details

#### Backend Calculation (`premiumCoachingService.js`)
```javascript
async calculatePremiumMacros(userId, profile, preferences) {
  const weight = profile.weight_kg;
  const calories = profile.daily_calorie_target;
  const strategy = preferences.macro_strategy;
  
  // Calculate protein grams based on strategy
  let macros = {};
  
  switch (strategy) {
    case 'high_protein':
      macros = {
        protein_g: Math.round(weight * 2.5),
        protein_percent: 35,
        carbs_percent: 35,
        fat_percent: 30
      };
      break;
    // ... other strategies
  }
  
  // Calculate carbs and fat from percentages
  macros.carbs_g = Math.round((calories * (macros.carbs_percent / 100)) / 4);
  macros.fat_g = Math.round((calories * (macros.fat_percent / 100)) / 9);
  
  return macros;
}
```

#### Applying Macros to Diet Plan
```javascript
async applyMacrosToDietPlan(userId, macros) {
  const dietPlan = await DietPlan.findOne({ user_id: userId })
    .sort({ created_at: -1 });
  
  // Update plan-level macros
  dietPlan.protein_grams = macros.protein_g;
  dietPlan.carbs_grams = macros.carbs_g;
  dietPlan.fat_grams = macros.fat_g;
  
  // Redistribute across meals
  const mealsCount = dietPlan.meals.length;
  dietPlan.meals.forEach((meal) => {
    meal.macros = {
      protein_g: Math.round(macros.protein_g / mealsCount),
      carbs_g: Math.round(macros.carbs_g / mealsCount),
      fat_g: Math.round(macros.fat_g / mealsCount)
    };
  });
  
  await dietPlan.save();
  return dietPlan;
}
```

### REST API Endpoints

#### Calculate Premium Macros
```
POST /api/premium/macros/calculate
Authorization: Bearer <JWT_TOKEN>

Response:
{
  "macros": {
    "protein_g": 150,
    "carbs_g": 200,
    "fat_g": 67,
    "protein_percent": 30,
    "carbs_percent": 40,
    "fat_percent": 30
  },
  "strategy": "high_protein",
  "explanation": "Macros calculated using high_protein strategy",
  "diet_plan_updated": true,
  "message": "Macros applied to your current diet plan"
}
```

### Frontend Implementation (MacrosTab.jsx)

#### Strategy Selection UI
- Grid of 7 strategy cards with icons and descriptions
- Visual selection with border highlighting
- Real-time preview of macro distribution
- Protein per kg slider (1.2g - 3.5g)
- Carb cycling toggle for advanced users

#### Save Flow
1. User selects strategy
2. Adjusts protein target (optional)
3. Enables carb cycling (optional)
4. Clicks "Save Macro Preferences"
5. Backend updates preferences
6. Backend recalculates macros
7. Backend applies to current diet plan
8. Frontend refreshes and shows success message

---

## 🔄 Feature 2: Intelligent Meal Swap Engine

### Overview
AI-powered meal replacement system that generates alternative meals matching the original's macros while respecting dietary restrictions, preferences, and user requests.

### How It Works

#### 1. User Initiates Swap
- Clicks "Swap" button on any meal
- Modal opens with optional reason field
- Examples: "I need more protein", "I'm vegetarian", "Don't like chicken"

#### 2. Backend Processing
```javascript
async swapMeal(userId, dietPlanId, mealNumber, swapReason) {
  // Fetch data
  const [dietPlan, preferences, profile] = await Promise.all([
    DietPlan.findById(dietPlanId),
    PremiumPreferences.findOne({ user_id: userId }),
    Profile.findOne({ user_id: userId })
  ]);
  
  // Extract original meal
  const originalMeal = dietPlan.meals.find(m => m.meal_number === mealNumber);
  
  // Build constraints
  const constraints = {
    target_calories: originalMeal.estimated_calories,
    calorie_tolerance: 50,
    target_protein: originalMeal.macros.protein_g,
    target_carbs: originalMeal.macros.carbs_g,
    target_fat: originalMeal.macros.fat_g,
    dietary_restrictions: ['vegetarian', 'gluten-free'],
    disliked_foods: preferences.food_preferences.disliked_foods,
    allergies: preferences.food_preferences.allergies,
    budget_level: preferences.budget_level,
    cooking_skill: preferences.cooking_skill,
    swap_reason: swapReason
  };
  
  // Generate swap using AI
  const swappedMeal = await this._generateMealSwap(originalMeal, constraints, profile.goal);
  
  // Save history
  await MealSwapHistory.create({
    user_id: userId,
    diet_plan_id: dietPlanId,
    original_meal: { ... },
    swapped_meal: swappedMeal,
    swap_reason: swapReason
  });
  
  // Update diet plan
  dietPlan.meals[mealIndex] = swappedMeal;
  await dietPlan.save();
  
  return { success: true, swapped_meal, original_meal };
}
```

#### 3. Groq AI Generation
```javascript
const prompt = `You are a premium nutrition coach. Generate a meal swap that matches these requirements:

ORIGINAL MEAL:
- Name: ${originalMeal.meal_name}
- Calories: ${originalMeal.estimated_calories}
- Protein: ${originalMeal.macros.protein_g}g
- Carbs: ${originalMeal.macros.carbs_g}g
- Fat: ${originalMeal.macros.fat_g}g

SWAP REQUIREMENTS:
- Target Calories: ${constraints.target_calories} (±${constraints.calorie_tolerance})
- Target Protein: ${constraints.target_protein}g (±5g)
- Dietary Restrictions: ${constraints.dietary_restrictions.join(', ')}
- Avoid: ${constraints.disliked_foods.join(', ')}
- Budget: ${constraints.budget_level}
- User Request: ${constraints.swap_reason}

Return ONLY valid JSON:
{
  "meal_name": "New meal name",
  "description": "Brief description",
  "calories": number,
  "macros": { "protein_g": number, "carbs_g": number, "fat_g": number },
  "ingredients": ["ingredient 1", "ingredient 2"],
  "preparation_tips": "Step by step instructions"
}`;

const response = await callGroqAPI(prompt, 'meal_swap', {
  temperature: 0.7,
  max_tokens: 800
});
```

#### 4. Special Instructions Based on Reason
- **"protein"** → Focus on high-protein alternatives, increase by 10-20g
- **"vegetarian/vegan"** → Provide plant-based alternatives only
- **"low carb"** → Reduce carbs, increase healthy fats
- **"quick/easy"** → Under 15 minutes prep time

### REST API Endpoints

#### Swap Meal
```
POST /api/premium/meals/swap
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

Request Body:
{
  "diet_plan_id": "507f1f77bcf86cd799439011",
  "meal_number": 2,
  "swap_reason": "I need more protein and don't like chicken"
}

Response:
{
  "success": true,
  "swapped_meal": {
    "meal_name": "High-Protein Salmon Bowl",
    "description": "Grilled salmon with quinoa and vegetables",
    "calories": 520,
    "macros": {
      "protein_g": 45,
      "carbs_g": 40,
      "fat_g": 18
    },
    "ingredients": [
      "200g salmon fillet",
      "1 cup cooked quinoa",
      "Mixed vegetables"
    ],
    "preparation_tips": "Grill salmon for 6-8 minutes..."
  },
  "original_meal": {
    "meal_name": "Chicken Breast with Rice",
    "estimated_calories": 500,
    "macros": { "protein_g": 35, "carbs_g": 45, "fat_g": 15 }
  }
}
```

#### Get Meal Swap History
```
GET /api/premium/meals/swap-history
Authorization: Bearer <JWT_TOKEN>

Response:
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "user_id": "507f191e810c19729de860ea",
    "diet_plan_id": "507f1f77bcf86cd799439011",
    "original_meal": { ... },
    "swapped_meal": { ... },
    "swap_reason": "I need more protein",
    "user_rating": 5,
    "created_at": "2026-02-26T10:30:00.000Z"
  }
]
```

#### Rate Meal Swap
```
POST /api/premium/meals/rate-swap
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

Request Body:
{
  "swap_id": "507f1f77bcf86cd799439011",
  "rating": 5
}

Response:
{
  "message": "Rating saved successfully",
  "swap": { ... }
}
```

### Frontend Implementation (MealsTab.jsx)

#### UI Components
1. **Current Meals List** - Shows all meals with swap buttons
2. **Swap Modal** - Popup for entering swap reason
3. **Swap History** - Recent swaps with ratings
4. **Loading States** - "Swapping..." indicator during AI generation

#### Swap Flow
1. User clicks "🔄 Swap" on meal card
2. Modal opens with meal details
3. User enters optional reason (e.g., "I need more protein")
4. User clicks "Swap Meal"
5. Frontend shows "Swapping..." loading state
6. Backend calls Groq AI (2-5 seconds)
7. New meal returned and displayed
8. Success alert shows new meal details
9. Diet plan refreshes with swapped meal
10. Swap saved to history

---

## 🧠 Feature 3: Personalized Meal Adjustments

### Overview
AI analyzes user behavior patterns over 30 days and automatically adapts meal plans to match natural eating habits.

### Behavioral Analysis

#### Patterns Tracked
1. **Breakfast Skip Rate** - How often user skips breakfast
2. **Meal Adherence** - Which meals are followed consistently
3. **Snack Frequency** - How often user adds snacks
4. **Meal Timing** - Preferred eating times

#### Analysis Logic
```javascript
async analyzeAndAdaptMeals(userId) {
  // Get last 30 days of logs
  const recentLogs = await DailyLog.find({ user_id: userId })
    .sort({ date: -1 })
    .limit(30);
  
  // Analyze patterns
  const mealPatterns = {
    breakfast_skip_rate: breakfastSkips / logs.length,
    lunch_adherence: lunchAdherence / logs.length,
    dinner_adherence: dinnerAdherence / logs.length,
    snack_frequency: snackCount / logs.length
  };
  
  // Generate adaptations
  const adaptations = {
    skip_breakfast_often: mealPatterns.breakfast_skip_rate > 0.5,
    prefer_larger_dinners: mealPatterns.dinner_adherence > mealPatterns.lunch_adherence,
    snack_preference: mealPatterns.snack_frequency
  };
  
  // Update preferences automatically
  if (adaptations.skip_breakfast_often) {
    preferences.meal_prep_preference = 'intermittent_fasting';
  }
  
  return { patterns, adaptations, recommendations };
}
```

### Adaptive Recommendations

#### Example 1: Breakfast Skipper
```
Pattern Detected: User skips breakfast 60% of the time
Recommendation: "Consider Intermittent Fasting"
Description: "You consistently skip breakfast. An IF approach (16:8) might suit your natural eating pattern better."
Action: Adjust meal schedule to start at lunch
```

#### Example 2: Larger Dinners
```
Pattern Detected: Dinner adherence > Lunch adherence
Recommendation: "Adjust Calorie Distribution"
Description: "You prefer larger dinners. We can redistribute calories: lighter lunch, bigger dinner."
Action: Rebalance meal calories (30% lunch, 50% dinner)
```

### REST API Endpoints

#### Analyze Meal Adaptations
```
GET /api/premium/meals/analyze-adaptations
Authorization: Bearer <JWT_TOKEN>

Response:
{
  "patterns": {
    "breakfast_skip_rate": 0.6,
    "lunch_adherence": 0.7,
    "dinner_adherence": 0.9,
    "snack_frequency": 0.3
  },
  "adaptations": {
    "skip_breakfast_often": true,
    "prefer_larger_dinners": true,
    "snack_preference": 0.3
  },
  "recommendations": [
    {
      "type": "meal_timing",
      "title": "Consider Intermittent Fasting",
      "description": "You consistently skip breakfast...",
      "action": "adjust_meal_schedule"
    }
  ]
}
```

---

## 💬 Feature 4: Extended AI Coaching

### Overview
Premium users get detailed, context-aware coaching responses with scientific reasoning, personalized tone, and actionable advice.

### Context-Aware Responses

#### User Context Gathered
```javascript
const userContext = {
  goal: profile.goal,                    // "Muscle Gain"
  weight: profile.weight_kg,             // 75
  target_weight: profile.target_weight_kg, // 80
  experience: profile.experience_level,  // "Intermediate"
  recent_adherence: 85,                  // 85% adherence last 7 days
  macro_strategy: 'high_protein',
  coaching_tone: 'supportive',           // User preference
  detail_level: 'detailed'               // User preference
};
```

#### Prompt Construction
```javascript
const prompt = `You are an elite personal trainer with 15+ years of experience.

CLIENT PROFILE:
- Goal: ${userContext.goal}
- Current Weight: ${userContext.weight}kg → Target: ${userContext.target_weight}kg
- Experience Level: ${userContext.experience}
- Recent Adherence: ${userContext.recent_adherence}%
- Macro Strategy: ${userContext.macro_strategy}
- Preferred Coaching Tone: ${userContext.coaching_tone}
- Detail Level: ${userContext.detail_level}

CLIENT QUESTION:
"${question}"

COACHING GUIDELINES:
1. Provide ${userContext.detail_level} explanations with scientific reasoning
2. Use a ${userContext.coaching_tone} tone
3. Include specific, actionable advice
4. Reference their current progress and goals
5. Explain the "why" behind recommendations
6. Show empathy and understanding

Respond as their dedicated coach:`;
```

### Coaching Tones

#### 1. Motivational
- Energetic and inspiring
- Uses exclamation points
- Focuses on potential and achievements
- Example: "You're crushing it! Let's push even harder!"

#### 2. Analytical
- Data-driven and precise
- Includes numbers and percentages
- Scientific explanations
- Example: "Based on your 85% adherence rate and current macro split..."

#### 3. Supportive (Default)
- Empathetic and encouraging
- Acknowledges challenges
- Positive reinforcement
- Example: "I understand it's tough, but you're making great progress..."

#### 4. Direct
- Straightforward and concise
- No fluff
- Action-focused
- Example: "Here's what you need to do: 1. Increase protein to 150g..."

### Detail Levels

#### Brief
- Quick answers (100-200 words)
- Key points only
- Minimal explanation

#### Moderate (Default)
- Balanced explanations (200-400 words)
- Some reasoning
- 2-3 action items

#### Detailed
- Comprehensive analysis (400-1000 words)
- Scientific reasoning
- Multiple examples
- Step-by-step guidance
- 5+ action items

### REST API Endpoints

#### Get Premium Coaching Response
```
POST /api/premium/coaching/ask
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

Request Body:
{
  "question": "Should I increase my protein intake for muscle gain?",
  "context": {
    "current_topic": "nutrition"
  }
}

Response:
{
  "response": "Based on your current weight of 75kg and muscle gain goal, your protein intake of 150g (2.0g/kg) is adequate but could be optimized. For maximum muscle protein synthesis during a bulk, research suggests 2.2-2.5g/kg is ideal. I'd recommend increasing to 165-187g daily...",
  "coaching_insights": {
    "focus_area": "nutrition",
    "urgency": "normal",
    "follow_up_needed": false
  },
  "action_items": [
    "Increase daily protein to 165-187g",
    "Distribute across 4-5 meals",
    "Monitor strength gains over 4 weeks"
  ]
}
```

---

## 💪 Feature 5: Deep Recovery Insights

### Overview
14-day recovery analysis with overtraining detection, recovery score calculation, and personalized recommendations.

### Recovery Metrics Analyzed

#### 1. Sleep Quality
- Average sleep hours (last 14 days)
- Poor sleep days (< 6 hours)
- Impact: -30 points if avg < 6h, -15 if < 7h

#### 2. Energy Levels
- Average energy score (Low=1, Medium=2, High=3)
- Fatigue days (Low energy)
- Impact: -25 points if avg < 1.5, -10 if < 2.0

#### 3. Workout Performance
- Completion rate (recent 7 days vs previous 7 days)
- Trend: improving or declining
- Impact: -15 points if declining

#### 4. Missed Workouts
- Count of incomplete workouts
- Impact: -5 points per missed workout

#### 5. Stress Indicators
- Persistent low energy (4+ days)
- Insufficient sleep (3+ days < 6h)
- Workout adherence drop (4+ missed)

### Recovery Score Calculation

```javascript
function calculateRecoveryScore(metrics) {
  let score = 100;
  
  // Sleep impact
  if (metrics.avg_sleep < 6) score -= 30;
  else if (metrics.avg_sleep < 7) score -= 15;
  
  // Energy impact
  if (metrics.avg_energy < 1.5) score -= 25;
  else if (metrics.avg_energy < 2) score -= 10;
  
  // Fatigue impact
  score -= (metrics.fatigue_days * 3);
  
  // Missed workouts impact
  score -= (metrics.missed_workouts * 5);
  
  // Performance trend
  if (metrics.workout_performance.trend === 'declining') score -= 15;
  
  return Math.max(0, Math.min(100, score));
}
```

### Recovery Status Levels

#### Excellent (80-100)
- Message: "Recovery is optimal. You're ready for high-intensity training."
- Warnings: None
- Action Required: No

#### Good (60-79)
- Message: "Recovery is adequate. Continue current training load."
- Warnings: ["Monitor sleep quality"]
- Action Required: No

#### Moderate (40-59)
- Message: "Recovery is compromised. Reduce training intensity."
- Warnings: 
  - "Consider reducing training intensity"
  - "Prioritize sleep (7-9 hours)"
  - "High fatigue detected"
- Action Required: Yes

#### Poor (0-39)
- Message: "Overtraining risk detected. Immediate rest required."
- Warnings:
  - "URGENT: Take 2-3 rest days"
  - "Focus on sleep and nutrition"
  - "Consider deload week"
- Action Required: Yes

### Recommendations Generated

#### Rest Recommendations
```javascript
{
  type: 'rest',
  priority: 'high',
  title: 'Increase Rest Days',
  description: 'Add 1-2 extra rest days this week to allow full recovery.',
  action: 'reduce_training_frequency'
}
```

#### Sleep Recommendations
```javascript
{
  type: 'sleep',
  priority: 'high',
  title: 'Improve Sleep Quality',
  description: 'Current average: 5.8h. Target: 7-9 hours per night.',
  action: 'increase_sleep_duration'
}
```

#### Nutrition Recommendations
```javascript
{
  type: 'nutrition',
  priority: 'medium',
  title: 'Optimize Recovery Nutrition',
  description: 'Increase protein to 2.2g/kg and ensure adequate carbs for glycogen replenishment.',
  action: 'adjust_macros'
}
```

#### Training Recommendations
```javascript
{
  type: 'training',
  priority: 'high',
  title: 'Reduce Training Intensity',
  description: 'Lower weights by 20% and focus on form and recovery.',
  action: 'deload_week'
}
```

### REST API Endpoints

#### Get Recovery Analysis
```
GET /api/premium/recovery/analyze
Authorization: Bearer <JWT_TOKEN>

Response:
{
  "recovery_score": 65,
  "status": "good",
  "metrics": {
    "avg_sleep": 7.2,
    "avg_energy": 2.1,
    "fatigue_days": 2,
    "missed_workouts": 1,
    "workout_performance": {
      "recent_completion_rate": 0.86,
      "trend": "improving"
    },
    "stress_indicators": []
  },
  "recommendations": [
    {
      "type": "sleep",
      "priority": "medium",
      "title": "Maintain Sleep Quality",
      "description": "You're averaging 7.2h - keep it up!",
      "action": "maintain_current"
    }
  ],
  "warnings": ["Monitor sleep quality"],
  "action_required": false
}
```

---
# FitAI Premium Features Documentation - Part 3

## 🤖 Groq AI Integration

### Overview
All premium features use Groq API with the `llama-3.1-8b-instant` model for fast, intelligent responses.

### Groq Client Setup

```javascript
import Groq from 'groq-sdk';

const getGroqClient = () => {
  // Try multiple API keys in order of preference
  const apiKey = process.env.GROQ_API_KEY || 
                 process.env.GROQ_API_KEY_ASSISTANT || 
                 process.env.GROQ_API_KEY_DIET ||
                 process.env.GROQ_API_KEY_WORKOUT;
  
  if (!apiKey || apiKey === 'your_groq_api_key_here') {
    console.warn('⚠️  Groq API key not configured properly');
    return null;
  }
  
  return new Groq({ apiKey });
};
```

### Generic API Call Function

```javascript
const callGroqAPI = async (prompt, context = 'premium_coaching', options = {}) => {
  const client = getGroqClient();
  if (!client) {
    throw new Error('Groq API not configured');
  }

  const completion = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are an expert fitness and nutrition coach. Always respond with valid JSON only, no markdown."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    model: options.model || "llama-3.1-8b-instant",
    temperature: options.temperature || 0.7,
    max_tokens: options.max_tokens || 1000
  });

  const text = completion.choices[0]?.message?.content || '';
  
  // Clean up markdown and extract JSON
  let cleanText = text.trim();
  cleanText = cleanText.replace(/```json\n?/gi, '').replace(/```\n?/g, '');
  cleanText = cleanText.trim();
  
  // Extract JSON object
  const firstBrace = cleanText.indexOf('{');
  const lastBrace = cleanText.lastIndexOf('}');
  
  if (firstBrace !== -1 && lastBrace !== -1) {
    cleanText = cleanText.substring(firstBrace, lastBrace + 1);
  }
  
  return cleanText;
};
```

### Model Configuration

#### Model: llama-3.1-8b-instant
- **Speed**: Very fast (1-3 seconds response time)
- **Context Window**: 8,192 tokens
- **Best For**: Quick responses, JSON generation
- **Cost**: Free tier available

#### Temperature Settings
- **Meal Swap**: 0.7 (balanced creativity and consistency)
- **Coaching**: 0.7 (natural conversation)
- **Analysis**: 0.5 (more deterministic)

#### Max Tokens
- **Meal Swap**: 800 tokens (detailed meal with ingredients)
- **Coaching**: 1000 tokens (extended responses)
- **Analysis**: 500 tokens (concise insights)

### Response Cleaning

#### Problem: Markdown in JSON
Groq sometimes returns:
```
```json
{
  "meal_name": "Chicken Bowl"
}
```
```

#### Solution: Clean Before Parsing
```javascript
// Remove markdown code blocks
cleanText = cleanText.replace(/```json\s*/gi, '').replace(/```\s*/g, '');

// Remove control characters
cleanText = cleanText.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ' ');

// Replace multiple spaces
cleanText = cleanText.replace(/\s+/g, ' ');

// Extract JSON only
const firstBrace = cleanText.indexOf('{');
const lastBrace = cleanText.lastIndexOf('}');
cleanText = cleanText.substring(firstBrace, lastBrace + 1);

// Parse
const parsed = JSON.parse(cleanText);
```

### Error Handling

#### Fallback Mechanism
```javascript
try {
  const response = await callGroqAPI(prompt);
  const parsed = JSON.parse(response);
  return parsed;
} catch (error) {
  console.error('AI generation failed:', error);
  
  // Return fallback meal
  return {
    meal_name: `Alternative ${originalMeal.meal_name}`,
    description: `A nutritious alternative with similar macros`,
    calories: originalMeal.estimated_calories,
    macros: originalMeal.macros,
    ingredients: ['Similar ingredients', 'Adjusted for preferences'],
    preparation_tips: 'Prepare similar to original meal'
  };
}
```

### API Key Management

#### Environment Variables (.env)
```bash
# Primary key for premium features
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxx

# Backup keys for load balancing
GROQ_API_KEY_ASSISTANT=gsk_xxxxxxxxxxxxxxxxxxxxx
GROQ_API_KEY_DIET=gsk_xxxxxxxxxxxxxxxxxxxxx
GROQ_API_KEY_WORKOUT=gsk_xxxxxxxxxxxxxxxxxxxxx
```

#### Key Rotation Logic
```javascript
const apiKeys = [
  process.env.GROQ_API_KEY,
  process.env.GROQ_API_KEY_ASSISTANT,
  process.env.GROQ_API_KEY_DIET,
  process.env.GROQ_API_KEY_WORKOUT
].filter(key => key && !key.includes('your_groq'));

// Use first available key
const apiKey = apiKeys[0];
```

### Rate Limiting

#### Groq Free Tier Limits
- 30 requests per minute
- 14,400 requests per day
- 6,000 tokens per minute

#### Handling Rate Limits
```javascript
try {
  const response = await callGroqAPI(prompt);
  return response;
} catch (error) {
  if (error.status === 429) {
    // Rate limit exceeded
    console.warn('Rate limit hit, using fallback');
    return fallbackResponse;
  }
  throw error;
}
```

---

## 📊 REST API Reference

### Base URL
```
http://localhost:5000/api/premium
```

### Authentication
All endpoints require JWT authentication:
```
Authorization: Bearer <JWT_TOKEN>
```

### Complete Endpoint List

#### 1. Premium Status
```
GET /api/premium/status

Response:
{
  "is_premium": true,
  "subscription_tier": "premium",
  "premium_since": "2026-01-15T00:00:00.000Z",
  "premium_expires": "2026-02-15T00:00:00.000Z",
  "features": [
    "advanced_macro_customization",
    "meal_swap_engine",
    "personalized_meal_adjustments",
    "extended_ai_coaching",
    "deep_recovery_insights"
  ]
}
```

#### 2. Get Preferences
```
GET /api/premium/preferences

Response:
{
  "_id": "507f1f77bcf86cd799439011",
  "user_id": "507f191e810c19729de860ea",
  "macro_strategy": "high_protein",
  "protein_per_kg": 2.5,
  "carb_cycling_enabled": false,
  "meal_swap_preferences": {
    "vegetarian": false,
    "vegan": false,
    "gluten_free": true,
    "dairy_free": false
  },
  "budget_level": "moderate",
  "cooking_skill": "intermediate",
  "coaching_tone": "supportive",
  "detail_level": "detailed"
}
```

#### 3. Update Preferences
```
PUT /api/premium/preferences
Content-Type: application/json

Request Body:
{
  "macro_strategy": "carb_cycling",
  "protein_per_kg": 2.2,
  "carb_cycling_enabled": true,
  "high_carb_days": [1, 3, 5]
}

Response:
{
  "message": "Premium preferences updated successfully",
  "preferences": { ... }
}
```

#### 4. Calculate Macros
```
POST /api/premium/macros/calculate

Response:
{
  "macros": {
    "protein_g": 165,
    "carbs_g": 175,
    "fat_g": 67,
    "protein_percent": 35,
    "carbs_percent": 35,
    "fat_percent": 30
  },
  "strategy": "high_protein",
  "diet_plan_updated": true
}
```

#### 5. Swap Meal
```
POST /api/premium/meals/swap
Content-Type: application/json

Request Body:
{
  "diet_plan_id": "507f1f77bcf86cd799439011",
  "meal_number": 2,
  "swap_reason": "I need more protein"
}

Response:
{
  "success": true,
  "swapped_meal": { ... },
  "original_meal": { ... }
}
```

#### 6. Get Swap History
```
GET /api/premium/meals/swap-history

Response:
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "original_meal": { ... },
    "swapped_meal": { ... },
    "swap_reason": "I need more protein",
    "user_rating": 5,
    "created_at": "2026-02-26T10:30:00.000Z"
  }
]
```

#### 7. Rate Swap
```
POST /api/premium/meals/rate-swap
Content-Type: application/json

Request Body:
{
  "swap_id": "507f1f77bcf86cd799439011",
  "rating": 5
}

Response:
{
  "message": "Rating saved successfully",
  "swap": { ... }
}
```

#### 8. Analyze Meal Adaptations
```
GET /api/premium/meals/analyze-adaptations

Response:
{
  "patterns": {
    "breakfast_skip_rate": 0.6,
    "lunch_adherence": 0.7,
    "dinner_adherence": 0.9
  },
  "adaptations": {
    "skip_breakfast_often": true,
    "prefer_larger_dinners": true
  },
  "recommendations": [ ... ]
}
```

#### 9. Get Coaching Response
```
POST /api/premium/coaching/ask
Content-Type: application/json

Request Body:
{
  "question": "Should I increase my protein intake?",
  "context": {}
}

Response:
{
  "response": "Based on your current weight...",
  "coaching_insights": { ... },
  "action_items": [ ... ]
}
```

#### 10. Get Recovery Analysis
```
GET /api/premium/recovery/analyze

Response:
{
  "recovery_score": 75,
  "status": "good",
  "metrics": { ... },
  "recommendations": [ ... ],
  "warnings": [ ... ]
}
```

#### 11. Activate Premium (Testing)
```
POST /api/premium/activate
Content-Type: application/json

Request Body:
{
  "duration_months": 1
}

Response:
{
  "message": "Premium activated successfully",
  "user": {
    "is_premium": true,
    "subscription_tier": "premium",
    "premium_expires": "2026-03-26T10:30:00.000Z"
  }
}
```

#### 12. Deactivate Premium (Testing)
```
POST /api/premium/deactivate

Response:
{
  "message": "Premium deactivated successfully",
  "user": {
    "is_premium": false,
    "subscription_tier": "free",
    "premium_expires": null
  }
}
```

---

## 🗄️ Database Schema

### PremiumPreferences Collection

```javascript
{
  _id: ObjectId,
  user_id: ObjectId (ref: 'User', unique),
  
  // Macro Customization
  macro_strategy: String (enum: ['high_protein', 'low_carb', 'high_carb', 'ketogenic', 'balanced', 'carb_cycling', 'custom']),
  protein_per_kg: Number (default: 2.0, min: 1.2, max: 3.5),
  carb_cycling_enabled: Boolean (default: false),
  high_carb_days: [Number], // [1, 3, 5] = Mon, Wed, Fri
  low_carb_days: [Number],
  
  // Meal Preferences
  meal_swap_preferences: {
    vegetarian: Boolean,
    vegan: Boolean,
    pescatarian: Boolean,
    gluten_free: Boolean,
    dairy_free: Boolean,
    halal: Boolean,
    kosher: Boolean
  },
  
  food_preferences: {
    liked_foods: [String],
    disliked_foods: [String],
    allergies: [String]
  },
  
  budget_level: String (enum: ['budget', 'moderate', 'premium']),
  cooking_skill: String (enum: ['beginner', 'intermediate', 'advanced']),
  meal_prep_preference: String (enum: ['daily_fresh', 'weekly_prep', 'mixed']),
  
  // Recovery Preferences
  recovery_focus: String (enum: ['standard', 'high_intensity', 'recovery_focused']),
  sleep_target_hours: Number (default: 8, min: 6, max: 10),
  
  // AI Coaching Preferences
  coaching_tone: String (enum: ['motivational', 'analytical', 'supportive', 'direct']),
  detail_level: String (enum: ['brief', 'moderate', 'detailed']),
  
  // Behavioral Tracking
  meal_adherence_history: [{
    date: Date,
    meal_number: Number,
    adhered: Boolean,
    swapped: Boolean,
    skipped: Boolean
  }],
  
  preferred_meal_times: {
    breakfast: String,
    lunch: String,
    dinner: String,
    snack1: String,
    snack2: String
  },
  
  created_at: Date,
  updated_at: Date
}
```

### MealSwapHistory Collection

```javascript
{
  _id: ObjectId,
  user_id: ObjectId (ref: 'User'),
  diet_plan_id: ObjectId (ref: 'DietPlan'),
  
  original_meal: {
    meal_number: Number,
    meal_name: String,
    description: String,
    calories: Number,
    macros: {
      protein_g: Number,
      carbs_g: Number,
      fat_g: Number
    }
  },
  
  swapped_meal: {
    meal_name: String,
    description: String,
    calories: Number,
    macros: {
      protein_g: Number,
      carbs_g: Number,
      fat_g: Number
    },
    ingredients: [String],
    preparation_tips: String
  },
  
  swap_reason: String,
  user_rating: Number (min: 1, max: 5),
  created_at: Date
}
```

### User Collection (Premium Fields)

```javascript
{
  _id: ObjectId,
  email: String,
  // ... other user fields
  
  // Premium Fields
  is_premium: Boolean (default: false),
  subscription_tier: String (enum: ['free', 'premium', 'elite']),
  premium_since: Date,
  premium_expires: Date,
  payment_method: String,
  subscription_id: String
}
```

---
# FitAI Premium Features - Viva Questions & Answers

## 📚 Table of Contents
1. [Architecture & Design Questions](#architecture--design-questions)
2. [Groq AI Integration Questions](#groq-ai-integration-questions)
3. [Macro Customization Questions](#macro-customization-questions)
4. [Meal Swap Engine Questions](#meal-swap-engine-questions)
5. [Recovery Analysis Questions](#recovery-analysis-questions)
6. [REST API Questions](#rest-api-questions)
7. [Database & Data Flow Questions](#database--data-flow-questions)
8. [Frontend Implementation Questions](#frontend-implementation-questions)
9. [Security & Performance Questions](#security--performance-questions)
10. [Advanced Concepts Questions](#advanced-concepts-questions)

---

## 🏗️ Architecture & Design Questions

### Q1: What is the overall architecture of your premium features?
**Answer:**
The premium features follow a 3-tier architecture:

1. **Presentation Layer (Frontend)**
   - React components with 5 premium tabs
   - State management using React hooks
   - API calls through apiService.jsx

2. **Business Logic Layer (Backend Services)**
   - premiumCoachingService.js handles all premium logic
   - Groq AI integration for intelligent responses
   - Data processing and calculations

3. **Data Layer (MongoDB)**
   - PremiumPreferences collection for user settings
   - MealSwapHistory collection for swap tracking
   - Integration with existing User, Profile, DietPlan collections

**Data Flow:**
Frontend → Controller → Service → (Groq AI / MongoDB) → Service → Controller → Frontend

---

### Q2: Why did you separate premium features into a dedicated service?
**Answer:**
Separation of concerns and modularity:

1. **Code Organization**: All premium logic in one place (premiumCoachingService.js)
2. **Reusability**: Service methods can be called from multiple controllers
3. **Maintainability**: Easy to update premium features without affecting core app
4. **Testing**: Can test premium features independently
5. **Scalability**: Easy to add new premium features
6. **Access Control**: Clear boundary between free and premium functionality

---

### Q3: How do you ensure premium features are only accessible to premium users?
**Answer:**
Multi-layer access control:

1. **Backend Middleware**: Check `user.is_premium` flag before processing
2. **Expiration Check**: Verify `premium_expires > current_date`
3. **Frontend Guards**: Hide premium UI for non-premium users
4. **API Validation**: All premium endpoints validate subscription status
5. **Database Queries**: Filter by `user_id` to prevent data leakage

```javascript
// Backend check
if (!user.is_premium || new Date(user.premium_expires) < new Date()) {
  return res.status(403).json({ error: 'Premium subscription required' });
}

// Frontend check
{premiumStatus?.is_premium && <PremiumFeature />}
```

---

### Q4: What design patterns did you use in premium features?
**Answer:**

1. **Service Pattern**: Business logic separated into premiumCoachingService
2. **Factory Pattern**: getGroqClient() creates AI client instances
3. **Strategy Pattern**: Different macro calculation strategies (high_protein, low_carb, etc.)
4. **Observer Pattern**: React state updates trigger UI re-renders
5. **Singleton Pattern**: Single service instance exported
6. **Fallback Pattern**: AI failures gracefully degrade to default responses

---

## 🤖 Groq AI Integration Questions

### Q5: Why did you choose Groq API over other AI providers?
**Answer:**

**Advantages of Groq:**
1. **Speed**: 1-3 second response time (vs 5-10s for others)
2. **Cost**: Free tier with generous limits
3. **Quality**: llama-3.1-8b-instant provides good results
4. **JSON Support**: Reliable structured output
5. **No Rate Limit Issues**: 30 req/min sufficient for our use case

**Comparison:**
- OpenAI: Slower, more expensive, better quality
- Anthropic: Expensive, no free tier
- Groq: Fast, free, good enough quality ✅

---

### Q6: How do you handle Groq API failures?
**Answer:**
Multi-level fallback strategy:

1. **Try-Catch Blocks**: Wrap all AI calls
2. **Fallback Responses**: Return sensible defaults
3. **Error Logging**: Log failures for debugging
4. **User Feedback**: Show error messages
5. **Retry Logic**: Could add exponential backoff (future)

```javascript
try {
  const response = await callGroqAPI(prompt);
  return JSON.parse(response);
} catch (error) {
  console.error('AI failed:', error);
  
  // Return fallback meal
  return {
    meal_name: `Alternative ${originalMeal.meal_name}`,
    description: 'A nutritious alternative',
    calories: originalMeal.estimated_calories,
    macros: originalMeal.macros
  };
}
```

---

### Q7: How do you clean Groq API responses to extract valid JSON?
**Answer:**
Multi-step cleaning process:

1. **Remove Markdown**: Strip ```json and ``` tags
2. **Remove Control Characters**: Clean \x00-\x1F characters
3. **Normalize Whitespace**: Replace multiple spaces with single space
4. **Extract JSON**: Find first { and last }, extract substring
5. **Parse**: JSON.parse() the cleaned string
6. **Validate**: Check required fields exist

```javascript
let cleanText = text.trim();
cleanText = cleanText.replace(/```json\s*/gi, '').replace(/```\s*/g, '');
cleanText = cleanText.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ' ');
cleanText = cleanText.replace(/\s+/g, ' ');

const firstBrace = cleanText.indexOf('{');
const lastBrace = cleanText.lastIndexOf('}');
cleanText = cleanText.substring(firstBrace, lastBrace + 1);

const parsed = JSON.parse(cleanText);
```

---

### Q8: What parameters do you send to Groq API and why?
**Answer:**

**Parameters:**
1. **model**: "llama-3.1-8b-instant" - Fast and accurate
2. **temperature**: 0.7 - Balanced creativity and consistency
3. **max_tokens**: 800-1000 - Enough for detailed responses
4. **messages**: System prompt + user prompt

**Temperature Explanation:**
- 0.0-0.3: Deterministic, repetitive (not good for meals)
- 0.4-0.7: Balanced, creative but consistent ✅
- 0.8-1.0: Very creative, unpredictable (too random)

**Max Tokens:**
- Meal swap: 800 tokens (meal + ingredients + instructions)
- Coaching: 1000 tokens (detailed explanations)
- Analysis: 500 tokens (concise insights)

---

### Q9: How do you manage multiple Groq API keys?
**Answer:**
Key rotation for load balancing:

```javascript
const getGroqClient = () => {
  const apiKey = process.env.GROQ_API_KEY || 
                 process.env.GROQ_API_KEY_ASSISTANT || 
                 process.env.GROQ_API_KEY_DIET ||
                 process.env.GROQ_API_KEY_WORKOUT;
  
  if (!apiKey || apiKey.includes('your_groq')) {
    return null;
  }
  
  return new Groq({ apiKey });
};
```

**Benefits:**
1. **Load Distribution**: Spread requests across keys
2. **Redundancy**: If one key fails, try another
3. **Rate Limit Avoidance**: Each key has separate limits
4. **Flexibility**: Easy to add/remove keys

---

## 🎯 Macro Customization Questions

### Q10: How do you calculate macros for different strategies?
**Answer:**
Strategy-based calculation with weight and calorie inputs:

**Formula:**
1. **Protein**: weight_kg × protein_multiplier
2. **Carbs**: (calories × carbs_percent / 100) / 4 (4 cal/g)
3. **Fat**: (calories × fat_percent / 100) / 9 (9 cal/g)

**Example (High Protein, 75kg, 2000 cal):**
```javascript
protein_g = 75 × 2.5 = 187g
carbs_g = (2000 × 0.35) / 4 = 175g
fat_g = (2000 × 0.30) / 9 = 67g
```

**Strategies:**
- High Protein: 2.5g/kg, 35/35/30
- Low Carb: 2.2g/kg, 35/20/45
- Ketogenic: 2.0g/kg, 25/5/70
- Carb Cycling: Dynamic based on workout days

---

### Q11: What is carb cycling and how did you implement it?
**Answer:**
Carb cycling alternates high and low carb days based on training schedule.

**Concept:**
- **High Carb Days**: Workout days (fuel performance)
- **Low Carb Days**: Rest days (promote fat burning)

**Implementation:**
```javascript
const today = new Date().getDay(); // 0-6 (Sun-Sat)
const isHighCarbDay = preferences.high_carb_days?.includes(today) || [1, 3, 5].includes(today);

if (isHighCarbDay) {
  macros = {
    protein_percent: 30,
    carbs_percent: 50,  // High carbs
    fat_percent: 20,
    day_type: 'high_carb'
  };
} else {
  macros = {
    protein_percent: 35,
    carbs_percent: 25,  // Low carbs
    fat_percent: 40,
    day_type: 'low_carb'
  };
}
```

**Benefits:**
- Optimize performance on training days
- Enhance fat loss on rest days
- Maintain muscle mass
- Improve insulin sensitivity

---

### Q12: How do you apply calculated macros to the diet plan?
**Answer:**
Two-step process:

**Step 1: Update Plan-Level Macros**
```javascript
dietPlan.protein_grams = macros.protein_g;
dietPlan.carbs_grams = macros.carbs_g;
dietPlan.fat_grams = macros.fat_g;
```

**Step 2: Redistribute Across Meals**
```javascript
const mealsCount = dietPlan.meals.length; // e.g., 5 meals

dietPlan.meals.forEach((meal) => {
  meal.macros = {
    protein_g: Math.round(macros.protein_g / mealsCount),
    carbs_g: Math.round(macros.carbs_g / mealsCount),
    fat_g: Math.round(macros.fat_g / mealsCount)
  };
  
  // Recalculate calories
  meal.estimated_calories = 
    (meal.macros.protein_g * 4) + 
    (meal.macros.carbs_g * 4) + 
    (meal.macros.fat_g * 9);
});

await dietPlan.save();
```

**Result**: Each meal gets equal macro distribution

---

## 🔄 Meal Swap Engine Questions

### Q13: How does the meal swap engine work end-to-end?
**Answer:**
7-step process:

**Step 1: User Request**
- User clicks "Swap" on meal
- Enters optional reason: "I need more protein"

**Step 2: Fetch Data**
```javascript
const [dietPlan, preferences, profile] = await Promise.all([
  DietPlan.findById(dietPlanId),
  PremiumPreferences.findOne({ user_id: userId }),
  Profile.findOne({ user_id: userId })
]);
```

**Step 3: Extract Original Meal**
```javascript
const originalMeal = dietPlan.meals.find(m => m.meal_number === mealNumber);
```

**Step 4: Build Constraints**
```javascript
const constraints = {
  target_calories: originalMeal.estimated_calories,
  calorie_tolerance: 50,
  target_protein: originalMeal.macros.protein_g,
  dietary_restrictions: ['vegetarian', 'gluten-free'],
  disliked_foods: ['chicken', 'broccoli'],
  allergies: ['peanuts'],
  budget_level: 'moderate',
  cooking_skill: 'intermediate',
  swap_reason: "I need more protein"
};
```

**Step 5: Generate with AI**
- Build detailed prompt with all constraints
- Call Groq API
- Parse JSON response

**Step 6: Save History**
```javascript
await MealSwapHistory.create({
  user_id, diet_plan_id,
  original_meal, swapped_meal,
  swap_reason
});
```

**Step 7: Update Diet Plan**
```javascript
dietPlan.meals[mealIndex] = swappedMeal;
await dietPlan.save();
```

---

### Q14: How do you ensure swapped meals match the original macros?
**Answer:**
Tolerance-based matching in AI prompt:

**Prompt Constraints:**
```
Target Calories: 500 (±50) = 450-550 cal
Target Protein: 35g (±5g) = 30-40g
Target Carbs: 45g (±10g) = 35-55g
Target Fat: 15g (±5g) = 10-20g
```

**AI Instructions:**
"Generate a meal that matches macros closely (within tolerance). Prioritize protein accuracy, allow more flexibility for carbs and fats."

**Validation:**
```javascript
// Ensure macros are numbers
parsed.macros.protein_g = Number(parsed.macros.protein_g) || constraints.target_protein;
parsed.macros.carbs_g = Number(parsed.macros.carbs_g) || constraints.target_carbs;
parsed.macros.fat_g = Number(parsed.macros.fat_g) || constraints.target_fat;
```

**Fallback:**
If AI fails, return meal with exact same macros as original.

---

### Q15: How do you handle special swap reasons like "I need more protein"?
**Answer:**
Dynamic prompt modification based on reason:

```javascript
let specialInstructions = '';
const reason = constraints.swap_reason.toLowerCase();

if (reason.includes('protein')) {
  specialInstructions = 'Focus on high-protein alternatives. Increase protein by 10-20g if possible.';
} else if (reason.includes('vegetarian') || reason.includes('vegan')) {
  specialInstructions = 'Provide plant-based alternatives only.';
} else if (reason.includes('carb') || reason.includes('low carb')) {
  specialInstructions = 'Reduce carbs and increase healthy fats.';
} else if (reason.includes('quick') || reason.includes('easy')) {
  specialInstructions = 'Provide quick and easy meal options (under 15 minutes prep).';
}

// Add to prompt
prompt += `\n${specialInstructions}`;
```

**Result**: AI generates meals tailored to user's specific request

---

### Q16: What data do you store in MealSwapHistory and why?
**Answer:**
Comprehensive swap tracking for analytics and user history:

**Stored Data:**
```javascript
{
  user_id: ObjectId,              // Who swapped
  diet_plan_id: ObjectId,         // Which plan
  original_meal: {                // What was replaced
    meal_number: 2,
    meal_name: "Chicken Breast",
    calories: 500,
    macros: { ... }
  },
  swapped_meal: {                 // What replaced it
    meal_name: "Salmon Bowl",
    calories: 520,
    macros: { ... },
    ingredients: [...],
    preparation_tips: "..."
  },
  swap_reason: "I need more protein", // Why swapped
  user_rating: 5,                 // User feedback
  created_at: Date                // When swapped
}
```

**Benefits:**
1. **User History**: Show past swaps
2. **Analytics**: Track popular swaps
3. **AI Improvement**: Learn from ratings
4. **Debugging**: Troubleshoot issues
5. **Recommendations**: Suggest similar swaps

---

## 💪 Recovery Analysis Questions

### Q17: How do you calculate the recovery score?
**Answer:**
Point deduction system starting from 100:

**Base Score**: 100 points

**Deductions:**
1. **Sleep** (max -30):
   - Avg < 6h: -30 points
   - Avg < 7h: -15 points

2. **Energy** (max -25):
   - Avg < 1.5: -25 points
   - Avg < 2.0: -10 points

3. **Fatigue** (max -42):
   - Each low energy day: -3 points
   - Example: 4 fatigue days = -12 points

4. **Missed Workouts** (max -70):
   - Each missed workout: -5 points
   - Example: 3 missed = -15 points

5. **Performance Trend** (-15):
   - Declining trend: -15 points

**Example Calculation:**
```
Base: 100
Sleep (6.5h avg): -15
Energy (1.8 avg): -10
Fatigue (3 days): -9
Missed (2 workouts): -10
Trend (declining): -15
---
Final Score: 41 (Poor Recovery)
```

---

### Q18: What are the different recovery status levels and their meanings?
**Answer:**

**Excellent (80-100)**
- **Meaning**: Optimal recovery, ready for high-intensity training
- **Action**: Continue current approach
- **Warnings**: None
- **Example**: 8h sleep, high energy, no missed workouts

**Good (60-79)**
- **Meaning**: Adequate recovery, can maintain training load
- **Action**: Monitor sleep quality
- **Warnings**: ["Monitor sleep quality"]
- **Example**: 7h sleep, medium energy, 1 missed workout

**Moderate (40-59)**
- **Meaning**: Compromised recovery, reduce intensity
- **Action**: Take extra rest day, prioritize sleep
- **Warnings**: ["Reduce training intensity", "Prioritize sleep", "High fatigue detected"]
- **Example**: 6h sleep, low energy, 3 missed workouts

**Poor (0-39)**
- **Meaning**: Overtraining risk, immediate rest required
- **Action**: Take 2-3 rest days, deload week
- **Warnings**: ["URGENT: Take 2-3 rest days", "Focus on sleep and nutrition", "Consider deload week"]
- **Example**: 5h sleep, persistent low energy, 5 missed workouts

---

### Q19: How do you detect stress indicators?
**Answer:**
Pattern recognition across 14 days:

**Indicator 1: Persistent Low Energy**
```javascript
const lowEnergyDays = logs.filter(l => l.energy_level === 'Low').length;
if (lowEnergyDays >= 4) {
  indicators.push('persistent_low_energy');
}
```

**Indicator 2: Insufficient Sleep**
```javascript
const poorSleepDays = logs.filter(l => l.sleep_hours < 6).length;
if (poorSleepDays >= 3) {
  indicators.push('insufficient_sleep');
}
```

**Indicator 3: Workout Adherence Drop**
```javascript
const missedWorkouts = logs.filter(l => !l.workout_completed).length;
if (missedWorkouts >= 4) {
  indicators.push('workout_adherence_drop');
}
```

**Result**: Array of stress indicators triggers warnings and recommendations

---

### Q20: What recommendations do you generate based on recovery status?
**Answer:**
Priority-based recommendations:

**Poor/Moderate Recovery:**

1. **Rest Recommendation** (High Priority)
```javascript
{
  type: 'rest',
  priority: 'high',
  title: 'Increase Rest Days',
  description: 'Add 1-2 extra rest days this week',
  action: 'reduce_training_frequency'
}
```

2. **Sleep Recommendation** (High Priority)
```javascript
{
  type: 'sleep',
  priority: 'high',
  title: 'Improve Sleep Quality',
  description: 'Current: 5.8h. Target: 7-9h',
  action: 'increase_sleep_duration'
}
```

3. **Nutrition Recommendation** (Medium Priority)
```javascript
{
  type: 'nutrition',
  priority: 'medium',
  title: 'Optimize Recovery Nutrition',
  description: 'Increase protein to 2.2g/kg',
  action: 'adjust_macros'
}
```

4. **Training Recommendation** (High Priority)
```javascript
{
  type: 'training',
  priority: 'high',
  title: 'Reduce Training Intensity',
  description: 'Lower weights by 20%',
  action: 'deload_week'
}
```

---

## 🌐 REST API Questions

### Q21: What HTTP methods do you use for premium endpoints and why?
**Answer:**

**GET** - Retrieve data (no modification)
- `/api/premium/status` - Get premium status
- `/api/premium/preferences` - Get user preferences
- `/api/premium/meals/swap-history` - Get swap history
- `/api/premium/recovery/analyze` - Get recovery analysis

**POST** - Create new resources or trigger actions
- `/api/premium/macros/calculate` - Calculate macros (action)
- `/api/premium/meals/swap` - Swap meal (creates history)
- `/api/premium/coaching/ask` - Get coaching response (action)
- `/api/premium/activate` - Activate premium (modification)

**PUT** - Update existing resources
- `/api/premium/preferences` - Update preferences (full update)
- `/api/premium/meals/rate-swap` - Rate a swap (update rating)

**DELETE** - Remove resources (not used in premium features)

**RESTful Principles:**
- GET is idempotent (same result every time)
- POST creates or triggers actions
- PUT updates existing data
- Proper status codes (200, 201, 400, 403, 500)

---

### Q22: How do you handle authentication in premium endpoints?
**Answer:**
JWT-based authentication with middleware:

**Step 1: Client Sends Token**
```javascript
headers: {
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
}
```

**Step 2: Middleware Verifies Token**
```javascript
// authMiddleware.js
export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user_id = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
```

**Step 3: Controller Uses user_id**
```javascript
export const getPremiumPreferences = async (req, res) => {
  const preferences = await PremiumPreferences.findOne({ 
    user_id: req.user_id  // From middleware
  });
  res.json(preferences);
};
```

**Security Benefits:**
- Stateless authentication
- No session storage needed
- Token expiration (24h)
- User identification without database lookup

---

### Q23: What HTTP status codes do you return and when?
**Answer:**

**200 OK** - Successful GET/PUT/POST
```javascript
res.status(200).json({ macros, strategy });
```

**201 Created** - Resource created (not used much in premium)
```javascript
res.status(201).json({ message: 'Preference created' });
```

**400 Bad Request** - Invalid input
```javascript
if (!diet_plan_id || !meal_number) {
  return res.status(400).json({ 
    error: 'diet_plan_id and meal_number are required' 
  });
}
```

**401 Unauthorized** - No/invalid token
```javascript
return res.status(401).json({ error: 'Invalid token' });
```

**403 Forbidden** - Not premium user
```javascript
if (!user.is_premium) {
  return res.status(403).json({ 
    error: 'Premium subscription required' 
  });
}
```

**404 Not Found** - Resource doesn't exist
```javascript
if (!dietPlan) {
  return res.status(404).json({ error: 'Diet plan not found' });
}
```

**500 Internal Server Error** - Server/database error
```javascript
catch (error) {
  console.error('Error:', error);
  res.status(500).json({ error: 'Failed to swap meal' });
}
```

---

### Q24: How do you structure API responses for consistency?
**Answer:**
Consistent JSON structure across all endpoints:

**Success Response:**
```javascript
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

**Error Response:**
```javascript
{
  "success": false,
  "error": "Error message",
  "details": "Additional context (dev only)"
}
```

**List Response:**
```javascript
{
  "success": true,
  "data": [...],
  "count": 10,
  "page": 1,
  "total_pages": 3
}
```

**Benefits:**
- Predictable structure
- Easy error handling on frontend
- Consistent parsing logic
- Clear success/failure indication

---

## 🗄️ Database & Data Flow Questions

### Q25: Why did you create separate collections for premium features?
**Answer:**
Separation of concerns and scalability:

**PremiumPreferences Collection:**
- Stores all premium-specific settings
- Doesn't pollute User collection
- Easy to query premium users
- Can be deleted if user cancels

**MealSwapHistory Collection:**
- Tracks all swaps for analytics
- Separate from DietPlan (doesn't bloat it)
- Easy to query user's swap history
- Can implement pagination

**Benefits:**
1. **Clean Data Model**: Each collection has single responsibility
2. **Performance**: Smaller documents, faster queries
3. **Scalability**: Can shard collections independently
4. **Flexibility**: Easy to add new premium collections
5. **Data Integrity**: Premium data isolated from core data

---

### Q26: How do you ensure data consistency across collections?
**Answer:**
Transactional operations and validation:

**Example: Meal Swap**
```javascript
async swapMeal(userId, dietPlanId, mealNumber, swapReason) {
  // 1. Fetch all required data
  const [dietPlan, preferences, profile] = await Promise.all([
    DietPlan.findById(dietPlanId),
    PremiumPreferences.findOne({ user_id: userId }),
    Profile.findOne({ user_id: userId })
  ]);
  
  // 2. Validate data exists
  if (!dietPlan) throw new Error('Diet plan not found');
  
  // 3. Generate swap
  const swappedMeal = await this._generateMealSwap(...);
  
  // 4. Save history (atomic operation)
  const swapHistory = await MealSwapHistory.create({
    user_id: userId,
    diet_plan_id: dietPlanId,
    original_meal: { ... },
    swapped_meal: swappedMeal
  });
  
  // 5. Update diet plan (atomic operation)
  dietPlan.meals[mealIndex] = swappedMeal;
  await dietPlan.save();
  
  // Both operations succeed or both fail
  return { success: true, swapped_meal };
}
```

**Consistency Mechanisms:**
1. **Atomic Operations**: Each save() is atomic
2. **Validation**: Check data exists before modifying
3. **Error Handling**: Rollback on failure (manual)
4. **Foreign Keys**: ObjectId references maintain relationships
5. **Indexes**: Ensure fast lookups and uniqueness

---

### Q27: How do you handle the relationship between User and PremiumPreferences?
**Answer:**
One-to-one relationship with unique constraint:

**Schema Definition:**
```javascript
const premiumPreferencesSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true  // One preference doc per user
  },
  macro_strategy: String,
  // ... other fields
});
```

**Creating Preferences:**
```javascript
// Auto-create when user activates premium
const preferences = new PremiumPreferences({
  user_id: req.user_id
});
await preferences.save();
```

**Querying:**
```javascript
// Find user's preferences
const preferences = await PremiumPreferences.findOne({ 
  user_id: userId 
});

// Populate user data
const preferences = await PremiumPreferences.findOne({ user_id })
  .populate('user_id', 'email name');
```

**Benefits:**
- Enforced one-to-one relationship
- Fast lookups with index on user_id
- Clean data model
- Easy to check if preferences exist

---

### Q28: Explain the complete data flow for calculating and applying macros.
**Answer:**
8-step end-to-end flow:

**Step 1: Frontend Request**
```javascript
// MacrosTab.jsx
const response = await premiumCoachingService.calculatePremiumMacros();
```

**Step 2: API Call**
```
POST /api/premium/macros/calculate
Authorization: Bearer <token>
```

**Step 3: Controller Receives**
```javascript
// premiumCoachingController.js
export const calculatePremiumMacros = async (req, res) => {
  const [profile, preferences] = await Promise.all([
    Profile.findOne({ user_id: req.user_id }),
    PremiumPreferences.findOne({ user_id: req.user_id })
  ]);
```

**Step 4: Service Calculates**
```javascript
// premiumCoachingService.js
const macros = await premiumCoachingService.calculatePremiumMacros(
  req.user_id, profile, preferences
);
// Returns: { protein_g: 150, carbs_g: 200, fat_g: 67, ... }
```

**Step 5: Apply to Diet Plan**
```javascript
const updatedDietPlan = await premiumCoachingService.applyMacrosToDietPlan(
  req.user_id, macros
);
```

**Step 6: Update Database**
```javascript
// Update plan-level macros
dietPlan.protein_grams = macros.protein_g;
dietPlan.carbs_grams = macros.carbs_g;
dietPlan.fat_grams = macros.fat_g;

// Redistribute across meals
dietPlan.meals.forEach(meal => {
  meal.macros = {
    protein_g: Math.round(macros.protein_g / mealsCount),
    carbs_g: Math.round(macros.carbs_g / mealsCount),
    fat_g: Math.round(macros.fat_g / mealsCount)
  };
});

await dietPlan.save();
```

**Step 7: Return Response**
```javascript
res.json({
  macros,
  strategy: preferences.macro_strategy,
  diet_plan_updated: true,
  message: 'Macros applied to your current diet plan'
});
```

**Step 8: Frontend Updates**
```javascript
// MacrosTab.jsx
setMacros(response.data.macros);
alert('✅ Macro preferences saved and applied!');
```

---

## 🎨 Frontend Implementation Questions

### Q29: How did you structure the premium page with tabs?
**Answer:**
Component-based architecture with state management:

**Main Component (PremiumPage.jsx):**
```javascript
const [activeTab, setActiveTab] = useState('overview');
const [premiumStatus, setPremiumStatus] = useState(null);
const [preferences, setPreferences] = useState(null);
const [macros, setMacros] = useState(null);
const [recovery, setRecovery] = useState(null);

// Fetch all data on mount
useEffect(() => {
  fetchPremiumData();
}, []);

// Tab navigation
<TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
  📊 Overview
</TabButton>

// Conditional rendering
{activeTab === 'overview' && <OverviewTab macros={macros} recovery={recovery} />}
{activeTab === 'macros' && <MacrosTab macros={macros} onRefresh={fetchPremiumData} />}
{activeTab === 'meals' && <MealsTab />}
```

**Tab Components:**
- **OverviewTab**: Summary of all premium features
- **MacrosTab**: Macro strategy selection and calculation
- **MealsTab**: Meal swap interface and history
- **RecoveryTab**: Recovery analysis and recommendations
- **SettingsTab**: Preferences and account management

**Benefits:**
- Clean separation of concerns
- Reusable tab components
- Easy to add new tabs
- Shared state via props
- Lazy loading (only active tab renders)

---

### Q30: How do you handle loading states in the premium UI?
**Answer:**
Multi-level loading states:

**Page-Level Loading:**
```javascript
const [loading, setLoading] = useState(true);

if (loading) {
  return (
    <div className="flex items-center justify-center">
      <div className="text-7xl mb-4 animate-bounce">💎</div>
      <p className="text-2xl font-bold">Loading Premium...</p>
    </div>
  );
}
```

**Action-Level Loading:**
```javascript
const [saving, setSaving] = useState(false);

const handleSave = async () => {
  setSaving(true);
  try {
    await premiumCoachingService.updatePreferences(data);
  } finally {
    setSaving(false);
  }
};

<button disabled={saving}>
  {saving ? 'Saving...' : 'Save Preferences'}
</button>
```

**Swap-Level Loading:**
```javascript
const [swapping, setSwapping] = useState(false);

<button disabled={swapping}>
  {swapping ? 'Swapping...' : 'Swap Meal'}
</button>
```

**Benefits:**
- Clear user feedback
- Prevents double-clicks
- Shows progress
- Improves UX

---

### Q31: How do you manage API calls in the frontend?
**Answer:**
Centralized API service with axios:

**API Service (apiService.jsx):**
```javascript
export const premiumCoachingService = {
  checkStatus: () => api.get('/premium/status'),
  
  getPreferences: () => api.get('/premium/preferences'),
  
  updatePreferences: (data) => api.put('/premium/preferences', data),
  
  calculatePremiumMacros: () => api.post('/premium/macros/calculate'),
  
  swapMeal: (dietPlanId, mealNumber, reason) => 
    api.post('/premium/meals/swap', {
      diet_plan_id: dietPlanId,
      meal_number: mealNumber,
      swap_reason: reason
    }),
  
  getMealSwapHistory: () => api.get('/premium/meals/swap-history'),
  
  getRecoveryAnalysis: () => api.get('/premium/recovery/analyze'),
  
  activatePremium: (months) => 
    api.post('/premium/activate', { duration_months: months }),
  
  deactivatePremium: () => api.post('/premium/deactivate')
};
```

**Usage in Components:**
```javascript
import { premiumCoachingService } from '../services/apiService';

const response = await premiumCoachingService.swapMeal(
  dietPlanId, mealNumber, reason
);
```

**Benefits:**
- Single source of truth for API calls
- Easy to update endpoints
- Consistent error handling
- Type safety (with TypeScript)
- Reusable across components

---

### Q32: How do you handle errors in the frontend?
**Answer:**
Try-catch with user-friendly messages:

**API Call Error Handling:**
```javascript
try {
  const result = await premiumCoachingService.swapMeal(
    dietPlan._id, mealNumber, reason
  );
  
  if (result.data && result.data.success) {
    alert(`✅ Meal swapped successfully!\n\nNew meal: ${result.data.swapped_meal.meal_name}`);
    await fetchData();
  } else {
    throw new Error('Swap failed');
  }
} catch (error) {
  console.error('❌ Error swapping meal:', error);
  const errorMessage = error.response?.data?.error || error.message || 'Failed to swap meal';
  alert(`Failed to swap meal:\n${errorMessage}\n\nPlease try again.`);
}
```

**Error Display Strategies:**
1. **Alert**: For critical errors (meal swap failed)
2. **Toast**: For minor errors (could implement)
3. **Inline**: For form validation errors
4. **Console**: For debugging (always log)

**User-Friendly Messages:**
- ❌ Bad: "Error: Cannot read property 'meals' of null"
- ✅ Good: "Failed to swap meal. Please try again or contact support."

---

## 🔒 Security & Performance Questions

### Q33: What security measures did you implement for premium features?
**Answer:**

**1. Authentication**
- JWT tokens with expiration (24h)
- Token verification on every request
- Secure token storage (httpOnly cookies or localStorage)

**2. Authorization**
- Premium status check: `user.is_premium === true`
- Expiration check: `premium_expires > current_date`
- User-specific data: Always filter by `user_id`

**3. Input Validation**
- Required field checks
- Type validation (numbers, strings)
- Range validation (protein: 1.2-3.5g/kg)
- Sanitization (prevent XSS)

**4. Data Isolation**
- Users can only access their own data
- MongoDB queries always include `user_id`
- No cross-user data leakage

**5. API Rate Limiting**
- Could implement rate limiting per user
- Prevent abuse of AI endpoints
- Groq has built-in rate limits

**6. Environment Variables**
- API keys in .env (not committed)
- Different keys for dev/prod
- Secure key rotation

---

### Q34: How do you optimize performance for premium features?
**Answer:**

**1. Database Optimization**
```javascript
// Indexes for fast queries
premiumPreferencesSchema.index({ user_id: 1 });
mealSwapHistorySchema.index({ user_id: 1, created_at: -1 });

// Parallel queries
const [dietPlan, preferences, profile] = await Promise.all([
  DietPlan.findById(dietPlanId),
  PremiumPreferences.findOne({ user_id: userId }),
  Profile.findOne({ user_id: userId })
]);
```

**2. Frontend Optimization**
```javascript
// Lazy loading tabs (only render active)
{activeTab === 'macros' && <MacrosTab />}

// Memoization (could implement)
const memoizedMacros = useMemo(() => calculateMacros(data), [data]);

// Debouncing (for search/filters)
const debouncedSearch = debounce(searchFunction, 300);
```

**3. API Optimization**
```javascript
// Limit query results
const history = await MealSwapHistory.find({ user_id })
  .sort({ created_at: -1 })
  .limit(20);  // Only last 20 swaps

// Select only needed fields
const user = await User.findById(userId)
  .select('is_premium premium_expires');
```

**4. Caching (Future Enhancement)**
- Cache macro calculations (5 min TTL)
- Cache recovery analysis (1 hour TTL)
- Redis for session storage

**5. AI Optimization**
- Use fast model (llama-3.1-8b-instant)
- Limit max_tokens (800-1000)
- Implement fallbacks (no retry delays)

---

### Q35: How would you scale premium features for 10,000+ users?
**Answer:**

**1. Database Scaling**
- **Sharding**: Partition by user_id
- **Read Replicas**: Separate read/write databases
- **Indexes**: Ensure all queries use indexes
- **Connection Pooling**: Reuse database connections

**2. API Scaling**
- **Load Balancer**: Distribute requests across servers
- **Horizontal Scaling**: Add more backend servers
- **Microservices**: Separate premium service
- **API Gateway**: Rate limiting, caching

**3. AI Scaling**
- **Multiple API Keys**: Rotate across keys
- **Queue System**: Bull/Redis for AI requests
- **Batch Processing**: Group similar requests
- **Caching**: Cache common meal swaps

**4. Frontend Scaling**
- **CDN**: Serve static assets from CDN
- **Code Splitting**: Load only needed code
- **Lazy Loading**: Load components on demand
- **Service Workers**: Offline support

**5. Monitoring**
- **APM**: Application Performance Monitoring
- **Logging**: Centralized logging (ELK stack)
- **Alerts**: Notify on errors/slowness
- **Analytics**: Track feature usage

---

## 🚀 Advanced Concepts Questions

### Q36: What is the difference between free and premium tiers in your architecture?
**Answer:**

**Free Tier:**
- Basic workout plans (standard templates)
- Standard diet plans (balanced macros)
- Progress tracking (basic metrics)
- Basic AI chat (limited responses)
- No customization
- No meal swaps
- No recovery insights

**Premium Tier:**
- Advanced macro customization (7 strategies)
- Intelligent meal swaps (AI-powered)
- Personalized meal adjustments (behavioral analysis)
- Extended AI coaching (detailed responses)
- Deep recovery insights (14-day analysis)
- Carb cycling
- Custom protein targets
- Priority support

**Technical Differences:**
```javascript
// Free user
if (!user.is_premium) {
  return basicWorkoutPlan();
}

// Premium user
if (user.is_premium) {
  const preferences = await PremiumPreferences.findOne({ user_id });
  return customizedWorkoutPlan(preferences);
}
```

**Database:**
- Free: User, Profile, DietPlan, WorkoutPlan
- Premium: + PremiumPreferences, MealSwapHistory

**API Endpoints:**
- Free: /api/diet, /api/workout, /api/progress
- Premium: + /api/premium/* (12 additional endpoints)

---

### Q37: How would you implement a subscription payment system?
**Answer:**
Integration with Stripe or Razorpay:

**Step 1: Frontend Payment**
```javascript
const handleSubscribe = async () => {
  // Create checkout session
  const response = await api.post('/premium/create-checkout', {
    plan: 'premium_monthly',
    price: 999  // ₹999/month
  });
  
  // Redirect to Stripe
  window.location.href = response.data.checkout_url;
};
```

**Step 2: Backend Checkout**
```javascript
export const createCheckout = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    payment_method_types: ['card'],
    line_items: [{
      price: 'price_premium_monthly',
      quantity: 1
    }],
    mode: 'subscription',
    success_url: 'https://fitai.com/premium/success',
    cancel_url: 'https://fitai.com/premium/cancel'
  });
  
  res.json({ checkout_url: session.url });
};
```

**Step 3: Webhook Handler**
```javascript
export const stripeWebhook = async (req, res) => {
  const event = stripe.webhooks.constructEvent(
    req.body, req.headers['stripe-signature'], webhookSecret
  );
  
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // Activate premium
    await User.findOneAndUpdate(
      { email: session.customer_email },
      {
        is_premium: true,
        subscription_tier: 'premium',
        premium_since: new Date(),
        premium_expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        subscription_id: session.subscription
      }
    );
  }
  
  res.json({ received: true });
};
```

**Step 4: Subscription Management**
- Cancel: Stripe API call + update database
- Renew: Automatic via Stripe
- Upgrade: Create new subscription
- Downgrade: Cancel at period end

---

### Q38: How would you implement A/B testing for premium features?
**Answer:**
Feature flags and user segmentation:

**Step 1: Feature Flag System**
```javascript
const featureFlags = {
  'premium_v2_macros': {
    enabled: true,
    rollout_percentage: 50,  // 50% of users
    target_users: []  // Specific user IDs
  },
  'ai_meal_swap_v2': {
    enabled: true,
    rollout_percentage: 25,
    target_users: ['user123', 'user456']
  }
};
```

**Step 2: Check Feature Flag**
```javascript
const isFeatureEnabled = (userId, featureName) => {
  const flag = featureFlags[featureName];
  
  if (!flag.enabled) return false;
  
  // Check if user is in target list
  if (flag.target_users.includes(userId)) return true;
  
  // Check rollout percentage
  const userHash = hashUserId(userId);
  return (userHash % 100) < flag.rollout_percentage;
};
```

**Step 3: Use in Code**
```javascript
if (isFeatureEnabled(userId, 'premium_v2_macros')) {
  // Use new macro calculation
  return calculateMacrosV2(profile, preferences);
} else {
  // Use old macro calculation
  return calculateMacros(profile, preferences);
}
```

**Step 4: Track Metrics**
```javascript
// Log feature usage
analytics.track('feature_used', {
  user_id: userId,
  feature: 'premium_v2_macros',
  variant: 'v2',
  timestamp: new Date()
});

// Compare metrics
// V1: 70% satisfaction, 5 min avg time
// V2: 85% satisfaction, 3 min avg time
// Winner: V2 → Roll out to 100%
```

---

### Q39: What improvements would you make to premium features?
**Answer:**

**1. AI Improvements**
- Use GPT-4 for better meal generation
- Fine-tune model on user feedback
- Multi-language support
- Image generation for meals

**2. Personalization**
- Machine learning for macro optimization
- Predictive analytics (predict plateaus)
- Adaptive difficulty (workout intensity)
- Seasonal meal recommendations

**3. Social Features**
- Share meal swaps with friends
- Community recipes
- Leaderboards
- Challenges and rewards

**4. Integration**
- Fitness tracker sync (Fitbit, Apple Watch)
- Grocery delivery integration
- Calendar sync for meal planning
- WhatsApp notifications

**5. Analytics**
- Advanced progress charts
- Body composition predictions
- Nutrition score
- Sleep quality analysis

**6. Gamification**
- Streak tracking
- Achievement badges
- Premium points system
- Referral rewards

---

### Q40: How would you handle premium feature deprecation?
**Answer:**
Graceful migration strategy:

**Step 1: Announce Deprecation**
```javascript
// Add deprecation notice
const response = {
  macros: calculatedMacros,
  deprecated: true,
  deprecation_message: 'This endpoint will be removed on 2026-06-01. Please migrate to /api/premium/v2/macros',
  migration_guide: 'https://docs.fitai.com/migration/macros-v2'
};
```

**Step 2: Dual Support Period**
```javascript
// Support both old and new endpoints
app.post('/api/premium/macros/calculate', calculateMacrosV1);  // Old
app.post('/api/premium/v2/macros/calculate', calculateMacrosV2);  // New

// Redirect old to new internally
export const calculateMacrosV1 = async (req, res) => {
  console.warn('⚠️  Using deprecated endpoint');
  return calculateMacrosV2(req, res);
};
```

**Step 3: Monitor Usage**
```javascript
// Track old endpoint usage
analytics.track('deprecated_endpoint_used', {
  endpoint: '/api/premium/macros/calculate',
  user_id: req.user_id,
  timestamp: new Date()
});

// Alert if usage > 10%
if (oldEndpointUsage > 0.1) {
  sendAlert('High usage of deprecated endpoint');
}
```

**Step 4: Remove Old Endpoint**
```javascript
// After 3 months, remove old endpoint
app.post('/api/premium/macros/calculate', (req, res) => {
  res.status(410).json({
    error: 'This endpoint has been removed',
    message: 'Please use /api/premium/v2/macros/calculate',
    migration_guide: 'https://docs.fitai.com/migration/macros-v2'
  });
});
```

**Communication:**
1. Email users 3 months before
2. In-app notification 1 month before
3. API response warnings 2 weeks before
4. Final removal with 410 Gone status

---

## 🎓 Summary

This documentation covers:
- ✅ 40 comprehensive viva questions
- ✅ Detailed answers with code examples
- ✅ Architecture and design decisions
- ✅ Groq AI integration details
- ✅ Database schema and relationships
- ✅ REST API implementation
- ✅ Frontend architecture
- ✅ Security and performance
- ✅ Advanced concepts and scaling

**Key Takeaways:**
1. Premium features use modular, service-based architecture
2. Groq AI provides fast, intelligent responses
3. 7 macro strategies with real-time application
4. AI-powered meal swaps with constraint matching
5. 14-day recovery analysis with overtraining detection
6. RESTful API with JWT authentication
7. React-based UI with 5 premium tabs
8. Scalable design for 10,000+ users

**For Viva Preparation:**
- Understand the complete data flow
- Know the Groq AI integration details
- Explain macro calculation formulas
- Describe meal swap algorithm
- Discuss recovery score calculation
- Be ready to explain any code snippet
- Prepare to discuss improvements and scaling

Good luck with your viva! 🚀
