"use client"
import React, { useState } from 'react';
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  AcademicCapIcon,
  UserCircleIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const EduTrackLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'student'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Login attempt:', formData);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-10 right-10 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}></div>
      </div>

      {/* Main Login Card */}
      <div className="relative w-full max-w-md transform hover:scale-[1.002] transition-transform duration-500">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/80 p-8 space-y-8 shadow-sm hover:shadow-lg transition-all duration-500 relative overflow-hidden">
          
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-50 to-blue-50 rounded-bl-3xl"></div>
          
          {/* Header */}
          <div className="text-center space-y-6 relative z-10">
            <div className="flex flex-col items-center space-y-4">
              {/* Logo */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                  <AcademicCapIcon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full border-4 border-white flex items-center justify-center shadow-sm">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              
              {/* Text Content */}
              <div className="space-y-3">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight">
                  Edu<span className="text-emerald-500">Track</span>
                </h1>
                <div className="space-y-2">
                  <p className="text-slate-600 text-lg font-light tracking-wide">
                    Welcome Back to Your Portal
                  </p>
                  <div className="flex justify-center space-x-2">
                    <div className="w-3 h-1 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="w-3 h-1 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                    <div className="w-3 h-1 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Type Selection */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <label className="block text-sm font-semibold text-slate-700 mb-3 text-center">
              Select Login Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'student', label: 'Student', color: 'emerald' },
                { value: 'teacher', label: 'Teacher', color: 'blue' }
              ].map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: type.value })}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                    formData.userType === type.value
                      ? `border-${type.color}-500 bg-${type.color}-50 text-${type.color}-700`
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <UserCircleIcon className={`w-5 h-5 ${
                      formData.userType === type.value ? `text-${type.color}-500` : 'text-slate-400'
                    }`} />
                    <span className="font-medium text-sm">{type.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Email Field */}
            <div className="space-y-3">
              <label htmlFor="email" className="text-sm font-semibold text-slate-700 tracking-wide flex items-center space-x-2">
                <EnvelopeIcon className="w-4 h-4" />
                <span>
                  {formData.userType === 'student' ? 'STUDENT EMAIL' : 'STAFF EMAIL'}
                </span>
              </label>
              <div className={`relative group transition-all duration-300 ${
                focusedField === 'email' ? 'transform scale-[1.02]' : ''
              }`}>
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300">
                  <EnvelopeIcon className={`h-5 w-5 transition-all duration-300 ${
                    focusedField === 'email' ? 'text-emerald-500 scale-110' : 'text-slate-400'
                  }`} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="block w-full pl-12 pr-6 py-4 border-2 border-slate-200 rounded-2xl bg-white/80 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-slate-900 placeholder-slate-500 text-base font-medium tracking-wide shadow-sm hover:shadow-md"
                  placeholder={
                    formData.userType === 'student' 
                      ? "student.id@university.edu" 
                      : "faculty.name@university.edu"
                  }
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-3">
              <label htmlFor="password" className="text-sm font-semibold text-slate-700 tracking-wide flex items-center space-x-2">
                <LockClosedIcon className="w-4 h-4" />
                <span>PASSWORD</span>
              </label>
              <div className={`relative group transition-all duration-300 ${
                focusedField === 'password' ? 'transform scale-[1.02]' : ''
              }`}>
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300">
                  <LockClosedIcon className={`h-5 w-5 transition-all duration-300 ${
                    focusedField === 'password' ? 'text-emerald-500 scale-110' : 'text-slate-400'
                  }`} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className="block w-full pl-12 pr-12 py-4 border-2 border-slate-200 rounded-2xl bg-white/80 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-slate-900 placeholder-slate-500 text-base font-medium tracking-wide shadow-sm hover:shadow-md"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center transition-all duration-300 hover:scale-110"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-slate-400 hover:text-emerald-500 transition-colors duration-200" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-slate-400 hover:text-emerald-500 transition-colors duration-200" />
                  )}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-3 cursor-pointer group">
                
                <a href='/registration' className="text-sm text-slate-600 font-medium group-hover:text-slate-800 transition-colors duration-200 pl-3">
                  Signup
                </a>
              </label>
              <a href="#" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors duration-200 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full group relative bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-slate-800/20 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 disabled:transform-none overflow-hidden"
            >
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {isLoading ? (
                <div className="flex items-center justify-center space-x-3 relative z-10">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="tracking-wide">
                    {formData.userType === 'student' ? 'Accessing Student Portal...' : 'Accessing Teacher Portal...'}
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-3 relative z-10">
                  <ShieldCheckIcon className="w-5 h-5 text-white transform group-hover:scale-110 transition-transform duration-200" />
                  <span>
                    {formData.userType === 'student' ? 'Enter Student Portal' : 'Enter Teacher Portal'}
                  </span>
                </div>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-slate-500">New to EduTrack?</span>
            </div>
          </div>

          {/* Registration Prompt */}
          <div className="text-center">
            <p className="text-slate-600 text-sm">
              Don't have an account?{' '}
              <a href="#" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors duration-200 hover:underline">
                Contact administrator
              </a>
            </p>
          </div>

          {/* Security Footer */}
          <div className="text-center pt-6 border-t border-slate-200/60 space-y-2">
            <div className="flex items-center justify-center space-x-4 text-xs">
              <span className="text-slate-500 font-medium flex items-center space-x-1">
                <ShieldCheckIcon className="w-3 h-3" />
                <span>Secure Login</span>
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 font-medium">TLS Encrypted</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 font-medium">GDPR Compliant</span>
            </div>
            <p className="text-xs text-slate-400">
              EduTrack v2.1 • {new Date().getFullYear()} • All access is monitored
            </p>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-blob {
          animation: blob 8s infinite cubic-bezier(0.455, 0.03, 0.515, 0.955);
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default EduTrackLogin;