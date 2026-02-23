import React, { useState, useEffect } from 'react';
import { dailyLogService } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export const DailyLogPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState(null);
  const [todayLog, setTodayLog] = useState({
    workout_completed: false,
    workout_notes: '',
    diet_followed: false,
    diet_notes: '',
    calories_consumed: 0,
    water_intake_liters: 0,
    energy_level: 'Medium',
    mood: 'Good',
    sleep_hours: 0,
    weight_kg: '',
    notes: ''
  });

  useEffect(() => {
    fetchTodayLog();
    fetchStats();
  }, []);

  const fetchTodayLog = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const res = await dailyLogService.getDailyLog(today);
      if (res.data && res.data._id) {
        setTodayLog(res.data);
      }
    } catch (err) {
      console.error('Error fetching today log:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await dailyLogService.getDailyStats();
      setStats(res.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const handleChange = (field, value) => {
    setTodayLog(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const loadingToast = toast.loading('Saving your daily log...');
    try {
      await dailyLogService.logDaily({
        date: new Date().toISOString(),
        ...todayLog
      });
      toast.success('Daily log saved! Keep up the great work! 🎉', { id: loadingToast });
      fetchStats(); // Refresh stats
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save log', { id: loadingToast });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="text-7xl mb-4 animate-bounce-subtle">⏳</div>
        <p className="text-2xl font-bold text-white">Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8 animate-slide-down">
          <div>
            <h1 className="text-5xl font-bold gradient-text mb-2">📝 Daily Log</h1>
            <p className="text-gray-400">Track your daily progress and maintain your streak</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="group relative px-6 py-3 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700 text-white font-bold rounded-xl hover:bg-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              <span className="relative flex items-center gap-2">
                <span className="text-xl">🏠</span>
                <span>Dashboard</span>
              </span>
            </button>
            <button
              onClick={() => { logout(); navigate('/login'); }}
              className="group relative px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white font-bold rounded-xl shadow-lg hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-rose-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-2">
                <span className="text-xl">🚪</span>
                <span>Logout</span>
              </span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="stat-card bg-gradient-to-br from-cyan-500 to-sky-600 text-white animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Current Streak</h3>
                <span className="text-4xl">🔥</span>
              </div>
              <div className="text-6xl font-bold mb-2">{stats.streak}</div>
              <div className="text-cyan-100 text-lg">days in a row</div>
            </div>

            <div className="stat-card bg-gradient-to-br from-emerald-500 to-green-600 text-white animate-slide-up" style={{animationDelay: '0.1s'}}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Workout Rate</h3>
                <span className="text-4xl">💪</span>
              </div>
              <div className="text-6xl font-bold mb-2">{stats.workout_completion_rate}%</div>
              <div className="text-emerald-100 text-lg">completion</div>
            </div>

            <div className="stat-card bg-gradient-to-br from-orange-500 to-amber-500 text-white animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Diet Rate</h3>
                <span className="text-4xl">🥗</span>
              </div>
              <div className="text-6xl font-bold mb-2">{stats.diet_completion_rate}%</div>
              <div className="text-orange-100 text-lg">adherence</div>
            </div>

            <div className="stat-card bg-gradient-to-br from-purple-500 to-pink-500 text-white animate-slide-up" style={{animationDelay: '0.3s'}}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Days Logged</h3>
                <span className="text-4xl">📊</span>
              </div>
              <div className="text-6xl font-bold mb-2">{stats.total_days_logged}</div>
              <div className="text-purple-100 text-lg">last 30 days</div>
            </div>
          </div>
        )}

        {/* Daily Log Form */}
        <form onSubmit={handleSubmit} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 animate-scale-in">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-4xl">📅</span>
            Today's Log - {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </h2>

          {/* Workout Section */}
          <div className="mb-8 p-6 bg-slate-700/30 rounded-xl border border-cyan-500/30">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-3xl">💪</span>
              Workout
            </h3>
            
            <div className="flex items-center gap-4 mb-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={todayLog.workout_completed}
                  onChange={(e) => handleChange('workout_completed', e.target.checked)}
                  className="w-6 h-6 rounded border-2 border-cyan-500 text-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                />
                <span className="text-lg text-white font-semibold">I completed my workout today</span>
              </label>
            </div>

            <textarea
              value={todayLog.workout_notes}
              onChange={(e) => handleChange('workout_notes', e.target.value)}
              placeholder="How did your workout go? Any notes or achievements?"
              className="w-full px-4 py-3 bg-slate-900/50 border-2 border-slate-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none"
              rows="3"
            />
          </div>

          {/* Diet Section */}
          <div className="mb-8 p-6 bg-slate-700/30 rounded-xl border border-emerald-500/30">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-3xl">🥗</span>
              Diet
            </h3>
            
            <div className="flex items-center gap-4 mb-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={todayLog.diet_followed}
                  onChange={(e) => handleChange('diet_followed', e.target.checked)}
                  className="w-6 h-6 rounded border-2 border-emerald-500 text-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
                <span className="text-lg text-white font-semibold">I followed my diet plan today</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">Calories Consumed</label>
                <input
                  type="number"
                  value={todayLog.calories_consumed}
                  onChange={(e) => handleChange('calories_consumed', parseInt(e.target.value) || 0)}
                  placeholder="2000"
                  className="w-full px-4 py-3 bg-slate-900/50 border-2 border-slate-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">Water Intake (Liters)</label>
                <input
                  type="number"
                  step="0.1"
                  value={todayLog.water_intake_liters}
                  onChange={(e) => handleChange('water_intake_liters', parseFloat(e.target.value) || 0)}
                  placeholder="2.5"
                  className="w-full px-4 py-3 bg-slate-900/50 border-2 border-slate-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                />
              </div>
            </div>

            <textarea
              value={todayLog.diet_notes}
              onChange={(e) => handleChange('diet_notes', e.target.value)}
              placeholder="Any notes about your meals or nutrition today?"
              className="w-full px-4 py-3 bg-slate-900/50 border-2 border-slate-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 resize-none"
              rows="3"
            />
          </div>

          {/* Wellness Section */}
          <div className="mb-8 p-6 bg-slate-700/30 rounded-xl border border-sky-500/30">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-3xl">🌟</span>
              Wellness
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">Energy Level</label>
                <select
                  value={todayLog.energy_level}
                  onChange={(e) => handleChange('energy_level', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/50 border-2 border-slate-600 rounded-xl text-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all duration-300"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">Mood</label>
                <select
                  value={todayLog.mood}
                  onChange={(e) => handleChange('mood', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/50 border-2 border-slate-600 rounded-xl text-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all duration-300"
                >
                  <option value="Poor">Poor</option>
                  <option value="Fair">Fair</option>
                  <option value="Good">Good</option>
                  <option value="Great">Great</option>
                  <option value="Excellent">Excellent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">Sleep (Hours)</label>
                <input
                  type="number"
                  step="0.5"
                  value={todayLog.sleep_hours}
                  onChange={(e) => handleChange('sleep_hours', parseFloat(e.target.value) || 0)}
                  placeholder="8"
                  className="w-full px-4 py-3 bg-slate-900/50 border-2 border-slate-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">Weight (kg) - Optional</label>
              <input
                type="number"
                step="0.1"
                value={todayLog.weight_kg}
                onChange={(e) => handleChange('weight_kg', e.target.value)}
                placeholder="Leave empty if not weighing today"
                className="w-full px-4 py-3 bg-slate-900/50 border-2 border-slate-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all duration-300"
              />
            </div>
          </div>

          {/* Additional Notes */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-300 mb-2">Additional Notes</label>
            <textarea
              value={todayLog.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Any other thoughts, feelings, or observations about today?"
              className="w-full px-4 py-3 bg-slate-900/50 border-2 border-slate-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none"
              rows="4"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={saving}
            className="w-full group relative px-6 py-4 bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden text-lg"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-sky-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center justify-center gap-2">
              {saving ? (
                <>
                  <span className="animate-spin">⏳</span>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <span>💾</span>
                  <span>Save Daily Log</span>
                </>
              )}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default DailyLogPage;
