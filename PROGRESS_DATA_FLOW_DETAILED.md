# Progress Page Data Flow - Detailed Explanation

## Overview
This document explains exactly how data flows from the Daily Log to the Progress Page charts, with code examples and visual representations.

---

## 🔄 Complete Data Flow

```
User Action → Daily Log Form → Backend API → Database → Progress Page → Charts
```

---

## 📝 Step 1: User Logs Daily Activity

### User Interface (DailyLogPage.jsx)
User fills out the form:
```javascript
{
  workout_completed: true,        // ✅ Checked
  workout_notes: "Great session!",
  diet_followed: true,            // ✅ Checked
  diet_notes: "Stayed on track",
  calories_consumed: 2000,
  water_intake_liters: 2.5,
  energy_level: "High",
  mood: "Great",
  sleep_hours: 8,
  weight_kg: 75.5,               // Optional
  notes: "Feeling strong!"
}
```

### Form Submission
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  await dailyLogService.logDaily({
    date: new Date().toISOString(),  // Today's date
    ...todayLog                       // All form data
  });
};
```

---

## 💾 Step 2: Data Saved to Database

### Backend API Call
```
POST /api/daily/log
```

### Backend Controller (dailyLogController.js)
```javascript
export const logDaily = async (req, res) => {
  const user_id = req.user_id;
  const { date, ...logData } = req.body;
  
  const dailyLog = await dailyLogService.createOrUpdateDailyLog(
    user_id,
    date || new Date(),
    logData
  );
  
  res.json(dailyLog);
};
```

### Backend Service (dailyLogService.js)
```javascript
export const createOrUpdateDailyLog = async (user_id, date, logData) => {
  // Find or create log for today
  const dailyLog = await DailyLog.findOneAndUpdate(
    { user_id, date: { $gte: startOfDay, $lte: endOfDay } },
    { user_id, date: startOfDay, ...logData },
    { new: true, upsert: true }
  );
  
  // AUTOMATICALLY update habit score
  await updateHabitScore(user_id);
  
  return dailyLog;
};
```

### Database Record Created
```javascript
{
  _id: "507f1f77bcf86cd799439011",
  user_id: "507f191e810c19729de860ea",
  date: "2024-01-15T00:00:00.000Z",
  workout_completed: true,
  workout_notes: "Great session!",
  diet_followed: true,
  diet_notes: "Stayed on track",
  calories_consumed: 2000,
  water_intake_liters: 2.5,
  energy_level: "High",
  mood: "Great",
  sleep_hours: 8,
  weight_kg: 75.5,
  notes: "Feeling strong!",
  createdAt: "2024-01-15T10:30:00.000Z",
  updatedAt: "2024-01-15T10:30:00.000Z"
}
```

---

## 📊 Step 3: Progress Page Fetches Data

### When User Opens Progress Page
```javascript
useEffect(() => {
  const fetchData = async () => {
    const [progressRes, habitsRes, logsRes] = await Promise.all([
      progressService.getRecentProgress(12),    // Old progress logs
      progressService.getHabitScores(),         // Habit scores
      dailyLogService.getRecentLogs(90)         // Last 90 days of daily logs
    ]);
    
    setProgress(progressRes.data.reverse());
    setHabitScores(habitsRes.data.reverse());
    setDailyLogs(logsRes.data.reverse());      // THIS IS THE KEY!
  };
  
  fetchData();
}, []);
```

### Backend Returns Daily Logs
```
GET /api/daily/recent?days=90
```

Returns array of daily logs:
```javascript
[
  {
    date: "2024-01-15T00:00:00.000Z",
    workout_completed: true,
    diet_followed: true,
    weight_kg: 75.5,
    ...
  },
  {
    date: "2024-01-14T00:00:00.000Z",
    workout_completed: true,
    diet_followed: false,
    weight_kg: 75.8,
    ...
  },
  {
    date: "2024-01-13T00:00:00.000Z",
    workout_completed: false,
    diet_followed: true,
    weight_kg: null,  // Not logged
    ...
  },
  // ... up to 90 days
]
```

---

## 📈 Step 4: Data Processing for Charts

### Chart 1: Weight Progress

#### Data Processing Code
```javascript
const weightData = dailyLogs
  .filter(log => log.weight_kg && log.weight_kg > 0)  // Only logs with weight
  .map((log, index) => ({
    day: index + 1,
    date: new Date(log.date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }),
    weight_kg: log.weight_kg
  }));
```

#### Example Output
```javascript
[
  { day: 1, date: "Jan 13", weight_kg: 76.2 },
  { day: 2, date: "Jan 14", weight_kg: 75.8 },
  { day: 3, date: "Jan 15", weight_kg: 75.5 },
  { day: 4, date: "Jan 16", weight_kg: 75.3 },
  { day: 5, date: "Jan 17", weight_kg: 75.0 },
  // ... continues for all days with weight logged
]
```

#### Chart Display
```javascript
<LineChart data={weightData}>
  <XAxis dataKey="date" />        // Shows: Jan 13, Jan 14, Jan 15...
  <YAxis />                        // Shows: 75.0, 75.5, 76.0...
  <Line 
    dataKey="weight_kg"            // Plots the weight values
    stroke="#06b6d4"               // Cyan color
  />
</LineChart>
```

#### Visual Result
```
Weight (kg)
76.5 |                    •
76.0 |              •   /
75.5 |        •   /   /
75.0 |  •   /   /
     |___________________
       Jan13 Jan14 Jan15
```

---

### Chart 2: Weekly Adherence

#### Data Processing Code
```javascript
// Step 1: Group daily logs by week
const adherenceByWeek = {};

dailyLogs.forEach(log => {
  // Calculate week number from date
  const weekNum = Math.ceil(
    (new Date(log.date) - new Date(new Date().getFullYear(), 0, 1)) 
    / (7 * 24 * 60 * 60 * 1000)
  );
  
  // Initialize week if not exists
  if (!adherenceByWeek[weekNum]) {
    adherenceByWeek[weekNum] = {
      week_number: weekNum,
      workout_days: 0,
      diet_days: 0,
      total_days: 0
    };
  }
  
  // Count completions
  adherenceByWeek[weekNum].total_days++;
  if (log.workout_completed) adherenceByWeek[weekNum].workout_days++;
  if (log.diet_followed) adherenceByWeek[weekNum].diet_days++;
});

// Step 2: Calculate percentages
const adherenceData = Object.values(adherenceByWeek)
  .map(week => ({
    week_number: week.week_number,
    workout_adherence_percent: Math.round((week.workout_days / 7) * 100),
    diet_adherence_percent: Math.round((week.diet_days / 7) * 100)
  }))
  .sort((a, b) => a.week_number - b.week_number)
  .slice(-12);  // Last 12 weeks only
```

#### Example: Week Calculation

**Daily Logs for Week 3:**
```javascript
[
  { date: "Jan 15", workout_completed: true,  diet_followed: true  },  // Mon
  { date: "Jan 16", workout_completed: true,  diet_followed: true  },  // Tue
  { date: "Jan 17", workout_completed: false, diet_followed: true  },  // Wed
  { date: "Jan 18", workout_completed: true,  diet_followed: false },  // Thu
  { date: "Jan 19", workout_completed: true,  diet_followed: true  },  // Fri
  { date: "Jan 20", workout_completed: false, diet_followed: false },  // Sat
  { date: "Jan 21", workout_completed: true,  diet_followed: true  },  // Sun
]
```

**Calculation:**
```javascript
Week 3: {
  workout_days: 5,        // 5 out of 7 days
  diet_days: 5,           // 5 out of 7 days
  workout_adherence_percent: (5/7) * 100 = 71%
  diet_adherence_percent: (5/7) * 100 = 71%
}
```

#### Example Output
```javascript
[
  { week_number: 1, workout_adherence_percent: 86, diet_adherence_percent: 71 },
  { week_number: 2, workout_adherence_percent: 71, diet_adherence_percent: 86 },
  { week_number: 3, workout_adherence_percent: 71, diet_adherence_percent: 71 },
  // ... up to 12 weeks
]
```

#### Chart Display
```javascript
<BarChart data={adherenceData}>
  <XAxis dataKey="week_number" />
  <YAxis label="Adherence (%)" />
  <Bar dataKey="workout_adherence_percent" fill="#06b6d4" name="Workout %" />
  <Bar dataKey="diet_adherence_percent" fill="#10b981" name="Diet %" />
</BarChart>
```

#### Visual Result
```
Adherence (%)
100 |
 80 |  ██    ██
 60 |  ██ ██ ██ ██
 40 |  ██ ██ ██ ██
 20 |  ██ ██ ██ ██
  0 |__██_██_██_██__
      W1 W2 W3 W4
      
Legend: ██ Workout (Cyan)  ██ Diet (Green)
```

---

### Chart 3: Habit Score Trend

#### How Habit Score is Calculated

**Automatic Calculation (happens when you save daily log):**
```javascript
export const updateHabitScore = async (user_id) => {
  // Get last 7 days of logs
  const recentLogs = await getRecentLogs(user_id, 7);
  
  // Count completions
  const workoutDays = recentLogs.filter(log => log.workout_completed).length;
  const dietDays = recentLogs.filter(log => log.diet_followed).length;
  
  // Calculate adherence percentages
  const workoutAdherence = Math.round((workoutDays / 7) * 100);
  const dietAdherence = Math.round((dietDays / 7) * 100);
  
  // Calculate habit score (weighted average)
  const habitScore = Math.round((workoutAdherence * 0.5) + (dietAdherence * 0.5));
  
  // Calculate streak
  const streak = await calculateStreak(user_id);
  
  // Get current week number
  const weekNumber = Math.ceil(
    (new Date() - new Date(new Date().getFullYear(), 0, 1)) 
    / (7 * 24 * 60 * 60 * 1000)
  );
  
  // Save to database
  await HabitScore.findOneAndUpdate(
    { user_id, week_number: weekNumber },
    {
      user_id,
      week_number: weekNumber,
      habit_score: habitScore,
      streak_count: streak,
      workout_adherence_percent: workoutAdherence,
      diet_adherence_percent: dietAdherence
    },
    { new: true, upsert: true }
  );
};
```

#### Example Calculation

**Last 7 Days:**
```javascript
[
  { date: "Jan 15", workout: ✅, diet: ✅ },
  { date: "Jan 16", workout: ✅, diet: ✅ },
  { date: "Jan 17", workout: ❌, diet: ✅ },
  { date: "Jan 18", workout: ✅, diet: ❌ },
  { date: "Jan 19", workout: ✅, diet: ✅ },
  { date: "Jan 20", workout: ❌, diet: ❌ },
  { date: "Jan 21", workout: ✅, diet: ✅ },
]
```

**Calculation:**
```javascript
workoutDays = 5 out of 7
dietDays = 5 out of 7

workoutAdherence = (5/7) * 100 = 71%
dietAdherence = (5/7) * 100 = 71%

habitScore = (71 * 0.5) + (71 * 0.5) = 71
```

#### Database Record
```javascript
{
  user_id: "507f191e810c19729de860ea",
  week_number: 3,
  habit_score: 71,
  streak_count: 2,
  workout_adherence_percent: 71,
  diet_adherence_percent: 71
}
```

#### Chart Display
```javascript
<LineChart data={habitScores}>
  <XAxis dataKey="week_number" />
  <YAxis domain={[0, 100]} />
  <Line 
    dataKey="habit_score" 
    stroke="#0ea5e9"
    name="Habit Score"
  />
</LineChart>
```

#### Visual Result
```
Habit Score
100 |
 80 |        •
 60 |    •       •
 40 |  •
 20 |
  0 |_______________
      W1  W2  W3  W4
```

---

## 🔥 Streak Calculation

### How Streak is Calculated
```javascript
export const calculateStreak = async (user_id) => {
  const logs = await DailyLog.find({ user_id })
    .sort({ date: -1 })
    .limit(90);
  
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < logs.length; i++) {
    const logDate = new Date(logs[i].date);
    logDate.setHours(0, 0, 0, 0);
    
    const expectedDate = new Date(today);
    expectedDate.setDate(expectedDate.getDate() - i);
    expectedDate.setHours(0, 0, 0, 0);
    
    // Check if log is for the expected date
    if (logDate.getTime() !== expectedDate.getTime()) {
      break;  // Gap in logs, streak ends
    }
    
    // Check if BOTH workout AND diet were completed
    if (logs[i].workout_completed && logs[i].diet_followed) {
      streak++;
    } else {
      break;  // Incomplete day, streak ends
    }
  }
  
  return streak;
};
```

### Example Streak Calculation

**Daily Logs (most recent first):**
```javascript
[
  { date: "Jan 21", workout: ✅, diet: ✅ },  // Today - Count it! Streak = 1
  { date: "Jan 20", workout: ✅, diet: ✅ },  // Yesterday - Count it! Streak = 2
  { date: "Jan 19", workout: ✅, diet: ✅ },  // 2 days ago - Count it! Streak = 3
  { date: "Jan 18", workout: ✅, diet: ❌ },  // 3 days ago - STOP! Diet not followed
  { date: "Jan 17", workout: ✅, diet: ✅ },  // Not counted (streak broken)
]
```

**Result:** Streak = 3 days 🔥🔥🔥

---

## 📱 Real-Time Updates

### When You Save a Daily Log:

1. **Immediate Database Update**
   ```
   DailyLog saved → Habit Score auto-calculated → Database updated
   ```

2. **Next Time You Open Progress Page**
   ```
   Fetch daily logs → Process data → Update charts → See new data!
   ```

### Example Timeline:

**Monday 10:00 AM:**
- Log workout ✅ and diet ✅
- Habit score updates automatically
- Streak increases to 5 days

**Monday 10:01 AM:**
- Open Progress Page
- Weight chart shows new weight point
- Adherence chart updates Week 3 percentages
- Habit score chart shows updated score

---

## 🎯 Summary

### Data Sources:
1. **Weight Progress** ← `DailyLog.weight_kg` (filtered for non-null values)
2. **Adherence** ← `DailyLog.workout_completed` + `DailyLog.diet_followed` (grouped by week)
3. **Habit Scores** ← `HabitScore` model (auto-calculated from last 7 daily logs)

### Update Frequency:
- **Real-time**: Data updates immediately when you save a daily log
- **Display**: Charts refresh when you open/reload Progress Page

### Key Points:
- ✅ All data comes from your daily logs
- ✅ Habit scores auto-calculate (no manual entry)
- ✅ Adherence auto-calculates (no manual entry)
- ✅ Weight tracking is optional
- ✅ Charts show last 90 days of data
- ✅ Empty states guide you to start logging

---

## 🚀 Quick Test

Want to see it in action?

1. Go to Daily Log page
2. Check ✅ Workout and ✅ Diet
3. Enter weight (e.g., 75.5 kg)
4. Save
5. Go to Progress Page
6. See your data in the charts!

Repeat for several days to see trends develop! 📈
