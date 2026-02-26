import React from 'react';
import { useAuth } from '../context/AuthContext';

export const LandingPage = () => {
  const { token } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      
      
      <nav className="flex justify-between items-center p-4 sm:p-6 md:px-12 relative z-10 animate-slide-down backdrop-blur-sm bg-white/70 border-b border-gray-200">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="text-3xl sm:text-4xl animate-bounce-subtle">🤖</div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">FitAI</h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          {token ? (
            <a href="/dashboard" className="group relative px-3 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm sm:text-base font-bold rounded-lg sm:rounded-xl shadow-lg hover:shadow-violet-500/50 transition-all duration-300 transform hover:scale-105 overflow-hidden">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative">Dashboard</span>
            </a>
          ) : (
            <>
              <a href="/login" className="text-gray-700 hover:text-violet-600 text-sm sm:text-base font-semibold transition-all hover:scale-110 inline-block">Login</a>
              <a href="/register" className="group relative px-3 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm sm:text-base font-bold rounded-lg sm:rounded-xl shadow-lg hover:shadow-violet-500/50 transition-all duration-300 transform hover:scale-105 overflow-hidden">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative">Sign Up</span>
              </a>
            </>
          )}
        </div>
      </nav>
      
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-24 md:pb-32">
        <div className="text-center">
          
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-violet-100 border border-violet-300 rounded-full text-violet-700 text-xs sm:text-sm font-semibold mb-6 sm:mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-600 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-600"></span>
            </span>
            AI-Powered Fitness Platform
          </div>
          
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 animate-scale-in leading-tight px-4">
            <span className="gradient-text block mb-2">Transform Your Body</span>
            <span className="text-gray-900">With AI Intelligence</span>
          </h1>
          
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto animate-fade-in leading-relaxed px-4">
            Get personalized workout plans, nutrition guidance, and an AI coach that adapts to your progress in real-time. Your fitness journey, scientifically optimized.
          </p>
          
          
          {!token && (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-slide-up px-4">
              <a href="/register" className="w-full sm:w-auto group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-violet-500/50 transition-all duration-300 transform hover:scale-105 overflow-hidden text-base sm:text-lg">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center gap-2">
                  <span>🚀</span>
                  <span>Start Free Trial</span>
                </span>
              </a>
              <a href="/login" className="w-full sm:w-auto group px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-violet-400 transition-all duration-300 transform hover:scale-105 text-base sm:text-lg">
                <span className="flex items-center justify-center gap-2">
                  <span>🔐</span>
                  <span>Login</span>
                </span>
              </a>
            </div>
          )}
          
          {token && (
            <a href="/dashboard" className="w-full sm:w-auto group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-violet-500/50 transition-all duration-300 transform hover:scale-105 overflow-hidden text-base sm:text-lg inline-block animate-scale-in">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center justify-center gap-2">
                <span>🏠</span>
                <span>Go to Dashboard</span>
              </span>
            </a>
          )}
          
          
          <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto mt-12 sm:mt-16 md:mt-20 animate-fade-in px-4">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-1 sm:mb-2">10K+</div>
              <div className="text-gray-600 text-xs sm:text-sm md:text-base">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-1 sm:mb-2">50K+</div>
              <div className="text-gray-600 text-xs sm:text-sm md:text-base">Workouts Generated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-1 sm:mb-2">95%</div>
              <div className="text-gray-600 text-xs sm:text-sm md:text-base">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
      
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4 text-gray-900">
          Everything You Need to <span className="gradient-text">Succeed</span>
        </h2>
        <p className="text-center text-gray-600 text-base sm:text-lg mb-10 sm:mb-12 md:mb-16 max-w-2xl mx-auto px-4">
          Powered by advanced AI algorithms, our platform provides comprehensive fitness solutions tailored to your unique goals.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          
          <div className="group bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 hover:-translate-y-2 animate-scale-in">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">💪</div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900">AI Workout Plans</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Personalized workout routines that adapt to your fitness level, goals, and available equipment. Progressive overload built-in.
            </p>
            <div className="mt-3 sm:mt-4 inline-flex items-center text-violet-600 text-sm sm:text-base font-semibold group-hover:gap-2 transition-all">
              Learn more <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
          
          
          <div className="group bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 hover:-translate-y-2 animate-scale-in" style={{animationDelay: '0.1s'}}>
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">🥗</div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900">Smart Nutrition</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Custom meal plans with macro tracking, dietary preferences, and allergen filtering. Achieve your goals with proper nutrition.
            </p>
            <div className="mt-3 sm:mt-4 inline-flex items-center text-pink-600 text-sm sm:text-base font-semibold group-hover:gap-2 transition-all">
              Learn more <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
          
          
          <div className="group bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-2 animate-scale-in" style={{animationDelay: '0.2s'}}>
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">🤖</div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900">AI Coach</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              24/7 AI assistant for motivation, form tips, and answering fitness questions. Like having a personal trainer in your pocket.
            </p>
            <div className="mt-3 sm:mt-4 inline-flex items-center text-purple-600 text-sm sm:text-base font-semibold group-hover:gap-2 transition-all">
              Learn more <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
          
          
          <div className="group bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2 animate-scale-in" style={{animationDelay: '0.3s'}}>
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">📊</div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900">Progress Tracking</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Comprehensive analytics with weight trends, adherence rates, and habit scores. See your transformation in real-time.
            </p>
            <div className="mt-3 sm:mt-4 inline-flex items-center text-blue-600 text-sm sm:text-base font-semibold group-hover:gap-2 transition-all">
              Learn more <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
          
          
          <div className="group bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-2 animate-scale-in" style={{animationDelay: '0.4s'}}>
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">📝</div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900">Daily Logging</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Track workouts, meals, energy, sleep, and more. Build consistency with streak tracking and habit formation.
            </p>
            <div className="mt-3 sm:mt-4 inline-flex items-center text-green-600 text-sm sm:text-base font-semibold group-hover:gap-2 transition-all">
              Learn more <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
          
          
          <div className="group bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-2 animate-scale-in" style={{animationDelay: '0.5s'}}>
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">⚡</div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900">Adaptive System</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Plans automatically adjust based on your progress, feedback, and performance. Always optimized for maximum results.
            </p>
            <div className="mt-3 sm:mt-4 inline-flex items-center text-orange-600 text-sm sm:text-base font-semibold group-hover:gap-2 transition-all">
              Learn more <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </div>
      </div>
      
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 sm:mb-12 md:mb-16 text-gray-900">
          How It <span className="gradient-text">Works</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          <div className="text-center animate-slide-up">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold mx-auto mb-4 sm:mb-6 shadow-lg">1</div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Create Your Profile</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed px-4">
              Tell us about your goals, fitness level, dietary preferences, and available equipment. Takes just 2 minutes.
            </p>
          </div>
          
          <div className="text-center animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold mx-auto mb-4 sm:mb-6 shadow-lg">2</div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Get Your AI Plan</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed px-4">
              Our AI generates personalized workout and nutrition plans tailored specifically to you. Updated weekly.
            </p>
          </div>
          
          <div className="text-center animate-slide-up" style={{animationDelay: '0.4s'}}>
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold mx-auto mb-4 sm:mb-6 shadow-lg">3</div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Track & Transform</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed px-4">
              Log your progress daily, watch your stats improve, and let AI adapt your plan for optimal results.
            </p>
          </div>
        </div>
      </div>
      
      
      {!token && (
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 text-center text-white shadow-2xl animate-scale-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Ready to Transform?</h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-violet-100 px-4">
              Join thousands of users achieving their fitness goals with AI-powered guidance.
            </p>
            <a href="/register" className="inline-block w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-violet-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-base sm:text-lg">
              Start Your Free Trial →
            </a>
          </div>
        </div>
      )}
      
      {/* Footer is provided globally via Footer component in App.jsx */}
    </div>
  );
};

export default LandingPage;
