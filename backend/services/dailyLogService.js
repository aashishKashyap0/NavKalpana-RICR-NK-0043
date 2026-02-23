import DailyLog from '../models/DailyLog.js';
import HabitScore from '../models/HabitScore.js';
import ProgressLog from '../models/ProgressLog.js';

// Create or update daily log
export const createOrUpdateDailyLog = async (user_id, date, logData) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  const dailyLog = await DailyLog.findOneAndUpdate(
    {
      user_id,
      date: { $gte: startOfDay, $lte: endOfDay }
    },
    {
      user_id,
      date: startOfDay,
      ...logData
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true
    }
  );
  
  // Update habit score after logging
  await updateHabitScore(user_id);
  
  return dailyLog;
};

// Get daily log for a specific date
export const getDailyLog = async (user_id, date) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  return await DailyLog.findOne({
    user_id,
    date: { $gte: startOfDay, $lte: endOfDay }
  });
};

// Get logs for a date range
export const getLogsInRange = async (user_id, startDate, endDate) => {
  return await DailyLog.find({
    user_id,
    date: { $gte: new Date(startDate), $lte: new Date(endDate) }
  }).sort({ date: -1 });
};

// Get recent logs
export const getRecentLogs = async (user_id, days = 30) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  return await DailyLog.find({
    user_id,
    date: { $gte: startDate }
  }).sort({ date: -1 });
};

// Calculate weekly adherence
export const calculateWeeklyAdherence = async (user_id, weekNumber) => {
  // Get logs for the specific week
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - (startDate.getDay() + (7 * (weekNumber - 1))));
  startDate.setHours(0, 0, 0, 0);
  
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);
  endDate.setHours(23, 59, 59, 999);
  
  const logs = await DailyLog.find({
    user_id,
    date: { $gte: startDate, $lte: endDate }
  });
  
  if (logs.length === 0) {
    return {
      workout_adherence: 0,
      diet_adherence: 0,
      total_days: 0
    };
  }
  
  const workoutDays = logs.filter(log => log.workout_completed).length;
  const dietDays = logs.filter(log => log.diet_followed).length;
  
  return {
    workout_adherence: Math.round((workoutDays / 7) * 100),
    diet_adherence: Math.round((dietDays / 7) * 100),
    total_days: logs.length,
    workout_days: workoutDays,
    diet_days: dietDays
  };
};

// Calculate current streak
export const calculateStreak = async (user_id) => {
  const logs = await DailyLog.find({ user_id }).sort({ date: -1 }).limit(90);
  
  if (logs.length === 0) {
    return 0;
  }
  
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
      break;
    }
    
    // Check if both workout and diet were completed
    if (logs[i].workout_completed && logs[i].diet_followed) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};

// Update habit score based on recent logs
export const updateHabitScore = async (user_id) => {
  const recentLogs = await getRecentLogs(user_id, 7);
  
  if (recentLogs.length === 0) {
    return null;
  }
  
  // Calculate adherence for the past 7 days
  const workoutDays = recentLogs.filter(log => log.workout_completed).length;
  const dietDays = recentLogs.filter(log => log.diet_followed).length;
  
  const workoutAdherence = Math.round((workoutDays / 7) * 100);
  const dietAdherence = Math.round((dietDays / 7) * 100);
  
  // Calculate habit score (weighted average)
  const habitScore = Math.round((workoutAdherence * 0.5) + (dietAdherence * 0.5));
  
  // Calculate streak
  const streak = await calculateStreak(user_id);
  
  // Get current week number
  const weekNumber = Math.ceil((new Date() - new Date(new Date().getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000));
  
  // Update or create habit score
  const habitScoreDoc = await HabitScore.findOneAndUpdate(
    { user_id, week_number: weekNumber },
    {
      user_id,
      week_number: weekNumber,
      habit_score: habitScore,
      streak_count: streak,
      workout_adherence_percent: workoutAdherence,
      diet_adherence_percent: dietAdherence
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true
    }
  );
  
  return habitScoreDoc;
};

// Get statistics for dashboard
export const getDailyStats = async (user_id) => {
  const recentLogs = await getRecentLogs(user_id, 30);
  const streak = await calculateStreak(user_id);
  
  const totalDays = recentLogs.length;
  const workoutDays = recentLogs.filter(log => log.workout_completed).length;
  const dietDays = recentLogs.filter(log => log.diet_followed).length;
  
  return {
    streak,
    total_days_logged: totalDays,
    workout_completion_rate: totalDays > 0 ? Math.round((workoutDays / totalDays) * 100) : 0,
    diet_completion_rate: totalDays > 0 ? Math.round((dietDays / totalDays) * 100) : 0,
    recent_logs: recentLogs.slice(0, 7)
  };
};

export default {
  createOrUpdateDailyLog,
  getDailyLog,
  getLogsInRange,
  getRecentLogs,
  calculateWeeklyAdherence,
  calculateStreak,
  updateHabitScore,
  getDailyStats
};
