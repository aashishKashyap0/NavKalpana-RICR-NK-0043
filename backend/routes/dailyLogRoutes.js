import express from 'express';
import * as dailyLogController from '../controllers/dailyLogController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Create or update daily log
router.post('/log', dailyLogController.logDaily);

// Get daily log for a specific date
router.get('/date/:date', dailyLogController.getDailyLog);

// Get logs in a date range
router.get('/range', dailyLogController.getLogsInRange);

// Get recent logs
router.get('/recent', dailyLogController.getRecentLogs);

// Get current streak
router.get('/streak', dailyLogController.getStreak);

// Get daily statistics
router.get('/stats', dailyLogController.getDailyStats);

// Get weekly adherence
router.get('/adherence/:weekNumber', dailyLogController.getWeeklyAdherence);

export default router;
