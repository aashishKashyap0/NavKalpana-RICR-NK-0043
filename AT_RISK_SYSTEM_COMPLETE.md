# At Risk System - Complete Functionality Guide

## 🎯 Overview

The "At Risk - Needs Attention" system is an intelligent monitoring feature that analyzes user behavior and provides personalized recommendations to prevent drop-off and maintain consistency.

---

## 📊 How It Works

### Data Sources
The system analyzes:
1. **Daily Logs** (last 14 days)
2. **Habit Score** (current score)
3. **Streak** (consecutive days with both workout & diet)
4. **Energy Levels** (from daily logs)
5. **Sleep Quality** (from daily logs)

### Risk Detection Algorithm

The system checks **8 different risk factors**:

#### 1. Logging Consistency
- **Checks:** Days since last log
- **Risk Trigger:** No log for 3+ days
- **Risk Points:** +25
- **Recommendation:** "Resume daily logging to maintain momentum"

#### 2. Workout Adherence (Last 7 Days)
- **Checks:** Percentage of workouts completed
- **Risk Trigger:** < 30% completion rate
- **Risk Points:** +30
- **Recommendation:** "Try shorter 15-20 minute workouts"

#### 3. Diet Adherence (Last 7 Days)
- **Checks:** Percentage of diet followed
- **Risk Trigger:** < 40% adherence
- **Risk Points:** +25
- **Recommendation:** "Meal prep on Sundays to stay on track"

#### 4. Consecutive Missed Days
- **Checks:** Days in a row with no activity
- **Risk Trigger:** 3+ consecutive days missed
- **Risk Points:** +20
- **Recommendation:** "Start fresh today - even small progress counts"

#### 5. Habit Score Trend
- **Checks:** Current habit score
- **Risk Trigger:** Score < 50
- **Risk Points:** +15
- **Recommendation:** "Focus on building one habit at a time"

#### 6. Streak Status
- **Checks:** Current streak count
- **Risk Trigger:** Streak = 0
- **Risk Points:** +10
- **Recommendation:** "Start a new streak today!"

#### 7. Energy Levels
- **Checks:** Low energy days in last 7 days
- **Risk Trigger:** 4+ days with low energy
- **Risk Points:** +10
- **Recommendation:** "Review sleep quality and hydration"

#### 8. Sleep Quality
- **Checks:** Average sleep hours
- **Risk Trigger:** < 6 hours average
- **Risk Points:** +10
- **Recommendation:** "Prioritize 7-9 hours of sleep"

---

## 🎨 Risk Levels

### Risk Score Calculation
Total risk score = Sum of all triggered risk points (0-100)

### Risk Levels

| Risk Level | Score Range | Color | Icon | Status |
|------------|-------------|-------|------|--------|
| **Low** | 0-24 | Green | ✅ | On Track |
| **Medium** | 25-49 | Amber | ⚡ | Needs Focus |
| **High** | 50-74 | Orange | ⚠️ | At Risk |
| **Critical** | 75-100 | Red | 🚨 | Critical |

---

## 💻 User Interface

### Dashboard Status Card

The status card shows:
1. **Risk Level Icon** (✅/⚡/⚠️/🚨)
2. **Status Text** (On Track/Needs Focus/At Risk/Critical)
3. **Risk Score Bar** (visual progress bar)
4. **Top 2 Issues** (if any)
5. **Top 2 Positive Notes** (if any)
6. **Click for Details** prompt

**Color Coding:**
- Green: Everything is good
- Amber: Minor issues, needs attention
- Orange: Significant issues, action needed
- Red: Critical issues, immediate action required

### Detailed Risk Modal

Click on the status card to see:

#### 1. What's Going Well (Green Section)
- Lists all positive achievements
- Examples:
  - "Logged today - great consistency!"
  - "Strong workout consistency: 85%"
  - "Excellent nutrition: 90% adherence"
  - "Amazing 7-day streak! 🔥"

#### 2. Areas Needing Attention (Red Section)
- Lists all detected issues
- Examples:
  - "No log for 5 days"
  - "Only 2 workouts in last 7 days (28%)"
  - "Diet adherence at 35% (last 7 days)"
  - "3 consecutive days with no activity"

#### 3. Action Plan (Blue Section)
- Numbered list of specific recommendations
- Examples:
  1. "Resume daily logging to maintain momentum"
  2. "Try shorter 15-20 minute workouts"
  3. "Meal prep on Sundays to stay on track"
  4. "Talk to AI Coach for motivation"

#### 4. Quick Actions
- **Log Today** button → Navigate to Daily Log
- **Talk to AI Coach** button → Navigate to Assistant

---

## 🔄 Real-Time Updates

### When Risk Status Updates:
1. **After Daily Log Save** - Risk recalculated immediately
2. **Dashboard Load** - Fresh risk analysis fetched
3. **Every Page Visit** - Latest data used

### Update Frequency:
- Real-time calculation based on latest daily logs
- No caching - always current status

---

## 📈 Example Scenarios

### Scenario 1: Perfect User (Low Risk)
```
Daily Logs: 7/7 days logged
Workouts: 6/7 completed (85%)
Diet: 6/7 followed (85%)
Streak: 5 days
Sleep: 8 hours average
Energy: High

Risk Score: 0/100
Status: ✅ On Track
Positive Notes:
- "Logged today - great consistency!"
- "Strong workout consistency: 85%"
- "Excellent nutrition: 85% adherence"
- "Amazing 5-day streak! 🔥"
```

### Scenario 2: Slipping User (Medium Risk)
```
Daily Logs: Last log 2 days ago
Workouts: 3/7 completed (42%)
Diet: 4/7 followed (57%)
Streak: 0 days
Sleep: 7 hours average

Risk Score: 35/100
Status: ⚡ Needs Focus
Issues:
- "No log for 2 days"
- "Only 3 workouts in last 7 days (42%)"
- "No active streak"
Recommendations:
1. "Resume daily logging to maintain momentum"
2. "Try shorter 15-20 minute workouts"
3. "Start a new streak today!"
```

### Scenario 3: At Risk User (High Risk)
```
Daily Logs: Last log 5 days ago
Workouts: 1/7 completed (14%)
Diet: 2/7 followed (28%)
Streak: 0 days
Sleep: 5.5 hours average
Energy: Low (5 days)

Risk Score: 65/100
Status: ⚠️ At Risk
Issues:
- "No log for 5 days"
- "Only 1 workout in last 7 days (14%)"
- "Diet adherence at 28% (last 7 days)"
- "No active streak"
- "Average sleep: 5.5 hours (below 6)"
- "Low energy reported 5 days this week"
Recommendations:
1. "Resume daily logging to maintain momentum"
2. "Try shorter 15-20 minute workouts"
3. "Meal prep on Sundays to stay on track"
4. "Start a new streak today!"
5. "Prioritize 7-9 hours of sleep"
6. "Review sleep quality and hydration"
```

### Scenario 4: Critical User (Critical Risk)
```
Daily Logs: No logs yet
Workouts: 0/7
Diet: 0/7
Streak: 0 days

Risk Score: 100/100
Status: 🚨 Critical
Issues:
- "No activity logged yet"
Recommendations:
1. "Start by logging your first day"
2. "Set a daily reminder to log your progress"
```

---

## 🎯 Benefits

### For Users:
1. **Early Warning System** - Catch issues before they become problems
2. **Personalized Guidance** - Specific recommendations based on behavior
3. **Motivation** - Positive reinforcement for good habits
4. **Accountability** - Visual reminder of consistency

### For Fitness Goals:
1. **Prevents Drop-off** - Identifies users at risk of quitting
2. **Improves Adherence** - Actionable steps to get back on track
3. **Builds Habits** - Encourages daily logging and consistency
4. **Tracks Progress** - Comprehensive view of all metrics

---

## 🔧 Technical Implementation

### Backend (Node.js)

**File:** `backend/utils/calculationUtils.js`
```javascript
export const detectDropoffRisk = (dailyLogs, habitScore, streak) => {
  // Analyzes 8 risk factors
  // Returns risk object with:
  // - at_risk (boolean)
  // - risk_level (low/medium/high/critical)
  // - risk_score (0-100)
  // - reasons (array of issues)
  // - recommendations (array of actions)
  // - positive_notes (array of wins)
}
```

**File:** `backend/services/progressService.js`
```javascript
export const checkDropoffRisk = async (user_id) => {
  // Fetches last 14 daily logs
  // Gets current habit score
  // Calculates current streak
  // Calls detectDropoffRisk()
}
```

### Frontend (React)

**File:** `frontend/src/pages/DashboardPage.jsx`
```javascript
// Fetches risk data on load
const [dropoffRisk, setDropoffRisk] = useState(null);

// Displays status card with color coding
// Shows detailed modal on click
// Provides quick action buttons
```

### API Endpoint

```
GET /api/progress/dropoff-risk
Authorization: Bearer <token>

Response:
{
  "at_risk": true,
  "risk_level": "high",
  "risk_score": 65,
  "reasons": ["No log for 5 days", "Only 1 workout in last 7 days"],
  "recommendations": ["Resume daily logging", "Try shorter workouts"],
  "positive_notes": []
}
```

---

## 🚀 Future Enhancements

Potential improvements:
1. **Email/Push Notifications** - Alert users when risk increases
2. **AI Coach Integration** - Automatic motivational messages
3. **Trend Analysis** - Show risk score over time
4. **Peer Comparison** - Compare with similar users
5. **Custom Risk Factors** - User-defined metrics
6. **Goal-Specific Risks** - Different thresholds for different goals

---

## ✅ Testing the System

### Test Case 1: New User
1. Register new account
2. Complete profile setup
3. Go to Dashboard
4. Should see: 🚨 Critical - "No activity logged yet"

### Test Case 2: Active User
1. Log daily for 7 days with workouts and diet
2. Go to Dashboard
3. Should see: ✅ On Track - Positive notes

### Test Case 3: Slipping User
1. Log for 3 days, then skip 4 days
2. Go to Dashboard
3. Should see: ⚠️ At Risk - "No log for 4 days"

### Test Case 4: Detailed View
1. Click on status card
2. Modal should open with:
   - Risk score bar
   - All issues listed
   - All recommendations listed
   - Quick action buttons

---

## 📝 Summary

The At Risk system provides:
- **8 risk factors** analyzed automatically
- **4 risk levels** with color coding
- **Personalized recommendations** for improvement
- **Positive reinforcement** for good habits
- **Detailed modal** with action plan
- **Real-time updates** based on daily logs

This creates a comprehensive safety net to keep users engaged and on track toward their fitness goals! 🎯💪
