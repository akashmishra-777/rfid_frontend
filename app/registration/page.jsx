"use client"
import React, { useState,useEffect } from 'react';




import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  AcademicCapIcon,
  UserCircleIcon,
  IdentificationIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  ShieldCheckIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const EduTrackRegister = () => {
  const [formData, setFormData] = useState({
    userType: 'student',
    id: '',
    name: '',
    email: '',
    phone: '',
    branch: '',
    section: '',
    department: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  const branches = ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Electronics'];
  const sections = ['A', 'B', 'C', 'D'];
  const departments = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'English'];

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
      console.log('Registration attempt:', formData);
      setIsLoading(false);
    }, 2000);
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email && formData.phone;
      case 2:
        return formData.userType === 'student' 
          ? formData.branch && formData.section
          : formData.department;
      case 3:
        return formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;
      default:
        return false;
    }
  };


  useEffect(() => {
    
   document.title = "Registration"
  }, []);

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

      {/* Main Registration Card */}
      <div className="relative w-full max-w-2xl transform hover:scale-[1.002] transition-transform duration-500">
        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4 bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-slate-200 shadow-sm">
            {[1, 2, 3].map(step => (
              <div key={step} className="flex items-center space-x-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                  step === currentStep 
                    ? 'bg-emerald-500 text-white scale-110 shadow-lg' 
                    : step < currentStep
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-200 text-slate-400'
                }`}>
                  {step < currentStep ? (
                    <CheckCircleIcon className="w-6 h-6" />
                  ) : (
                    step
                  )}
                </div>
                {step < 3 && (
                  <div className={`w-8 h-1 rounded-full transition-all duration-500 ${
                    step < currentStep ? 'bg-green-500' : 'bg-slate-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

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
                  <UserCircleIcon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full border-4 border-white flex items-center justify-center shadow-sm">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              
              {/* Text Content */}
              <div className="space-y-3">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight">
                  Join <span className="text-emerald-500">EduTrack</span>
                </h1>
                <div className="space-y-2">
                  <p className="text-slate-600 text-lg font-light tracking-wide">
                    Create Your Academic Account
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
              I am a...
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'student', label: 'Student', icon: '🎓', color: 'emerald' },
                { value: 'teacher', label: 'Teacher', icon: '👨‍🏫', color: 'blue' }
              ].map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: type.value })}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 transform hover:scale-105 ${
                    formData.userType === type.value
                      ? `border-${type.color}-500 bg-${type.color}-50 text-${type.color}-700 shadow-sm`
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-2xl">{type.icon}</span>
                    <span className="font-medium text-sm">{type.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* ID Field */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700 tracking-wide flex items-center space-x-2">
                      <IdentificationIcon className="w-4 h-4" />
                      <span>
                        {formData.userType === 'student' ? 'STUDENT ID' : 'STAFF ID'}
                      </span>
                    </label>
                    <div className={`relative group transition-all duration-300 ${
                      focusedField === 'id' ? 'transform scale-[1.02]' : ''
                    }`}>
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300">
                        <IdentificationIcon className={`h-5 w-5 transition-all duration-300 ${
                          focusedField === 'id' ? 'text-emerald-500 scale-110' : 'text-slate-400'
                        }`} />
                      </div>
                      <input
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('id')}
                        onBlur={() => setFocusedField(null)}
                        className="block w-full pl-12 pr-6 py-4 border-2 border-slate-200 rounded-2xl bg-white/80 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-slate-900 placeholder-slate-500 text-base font-medium tracking-wide shadow-sm hover:shadow-md"
                        placeholder={formData.userType === 'student' ? "STU2024001" : "STAFF2024001"}
                      />
                    </div>
                  </div>

                  {/* Name Field */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700 tracking-wide flex items-center space-x-2">
                      <UserCircleIcon className="w-4 h-4" />
                      <span>FULL NAME</span>
                    </label>
                    <div className={`relative group transition-all duration-300 ${
                      focusedField === 'name' ? 'transform scale-[1.02]' : ''
                    }`}>
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300">
                        <UserCircleIcon className={`h-5 w-5 transition-all duration-300 ${
                          focusedField === 'name' ? 'text-emerald-500 scale-110' : 'text-slate-400'
                        }`} />
                      </div>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className="block w-full pl-12 pr-6 py-4 border-2 border-slate-200 rounded-2xl bg-white/80 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-slate-900 placeholder-slate-500 text-base font-medium tracking-wide shadow-sm hover:shadow-md"
                        placeholder="John Alexander Doe"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email Field */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700 tracking-wide flex items-center space-x-2">
                      <EnvelopeIcon className="w-4 h-4" />
                      <span>EMAIL ADDRESS</span>
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
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="block w-full pl-12 pr-6 py-4 border-2 border-slate-200 rounded-2xl bg-white/80 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-slate-900 placeholder-slate-500 text-base font-medium tracking-wide shadow-sm hover:shadow-md"
                        placeholder={formData.userType === 'student' ? "student@university.edu" : "faculty@university.edu"}
                      />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700 tracking-wide flex items-center space-x-2">
                      <PhoneIcon className="w-4 h-4" />
                      <span>PHONE NUMBER</span>
                    </label>
                    <div className={`relative group transition-all duration-300 ${
                      focusedField === 'phone' ? 'transform scale-[1.02]' : ''
                    }`}>
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300">
                        <PhoneIcon className={`h-5 w-5 transition-all duration-300 ${
                          focusedField === 'phone' ? 'text-emerald-500 scale-110' : 'text-slate-400'
                        }`} />
                      </div>
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        className="block w-full pl-12 pr-6 py-4 border-2 border-slate-200 rounded-2xl bg-white/80 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-slate-900 placeholder-slate-500 text-base font-medium tracking-wide shadow-sm hover:shadow-md"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Academic Information */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                {formData.userType === 'student' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Branch Field */}
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-slate-700 tracking-wide flex items-center space-x-2">
                        <BuildingOfficeIcon className="w-4 h-4" />
                        <span>BRANCH</span>
                      </label>
                      <div className={`relative group transition-all duration-300 ${
                        focusedField === 'branch' ? 'transform scale-[1.02]' : ''
                      }`}>
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300">
                          <BuildingOfficeIcon className={`h-5 w-5 transition-all duration-300 ${
                            focusedField === 'branch' ? 'text-emerald-500 scale-110' : 'text-slate-400'
                          }`} />
                        </div>
                        <select
                          name="branch"
                          value={formData.branch}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('branch')}
                          onBlur={() => setFocusedField(null)}
                          className="block w-full pl-12 pr-10 py-4 border-2 border-slate-200 rounded-2xl bg-white/80 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-slate-900 text-base font-medium tracking-wide shadow-sm hover:shadow-md appearance-none cursor-pointer"
                        >
                          <option value="">Select Branch</option>
                          {branches.map(branch => (
                            <option key={branch} value={branch}>{branch}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ChevronDownIcon className="h-5 w-5 text-slate-400" />
                        </div>
                      </div>
                    </div>

                    {/* Section Field */}
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-slate-700 tracking-wide flex items-center space-x-2">
                        <AcademicCapIcon className="w-4 h-4" />
                        <span>SECTION</span>
                      </label>
                      <div className={`relative group transition-all duration-300 ${
                        focusedField === 'section' ? 'transform scale-[1.02]' : ''
                      }`}>
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300">
                          <AcademicCapIcon className={`h-5 w-5 transition-all duration-300 ${
                            focusedField === 'section' ? 'text-emerald-500 scale-110' : 'text-slate-400'
                          }`} />
                        </div>
                        <select
                          name="section"
                          value={formData.section}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('section')}
                          onBlur={() => setFocusedField(null)}
                          className="block w-full pl-12 pr-10 py-4 border-2 border-slate-200 rounded-2xl bg-white/80 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-slate-900 text-base font-medium tracking-wide shadow-sm hover:shadow-md appearance-none cursor-pointer"
                        >
                          <option value="">Select Section</option>
                          {sections.map(section => (
                            <option key={section} value={section}>Section {section}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ChevronDownIcon className="h-5 w-5 text-slate-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Teacher Department Field */
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700 tracking-wide flex items-center space-x-2">
                      <BuildingOfficeIcon className="w-4 h-4" />
                      <span>DEPARTMENT</span>
                    </label>
                    <div className={`relative group transition-all duration-300 ${
                      focusedField === 'department' ? 'transform scale-[1.02]' : ''
                    }`}>
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300">
                        <BuildingOfficeIcon className={`h-5 w-5 transition-all duration-300 ${
                          focusedField === 'department' ? 'text-emerald-500 scale-110' : 'text-slate-400'
                        }`} />
                      </div>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('department')}
                        onBlur={() => setFocusedField(null)}
                        className="block w-full pl-12 pr-10 py-4 border-2 border-slate-200 rounded-2xl bg-white/80 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-slate-900 text-base font-medium tracking-wide shadow-sm hover:shadow-md appearance-none cursor-pointer"
                      >
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ChevronDownIcon className="h-5 w-5 text-slate-400" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Academic Info Note */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <div className="flex items-start space-x-3">
                    <AcademicCapIcon className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-800 text-sm">Academic Information</h4>
                      <p className="text-blue-700 text-sm mt-1">
                        {formData.userType === 'student' 
                          ? 'Your branch and section information will be used for class assignments and attendance tracking.'
                          : 'Your department information will determine your teaching assignments and access privileges.'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Security Setup */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Password Field */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700 tracking-wide flex items-center space-x-2">
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
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        className="block w-full pl-12 pr-12 py-4 border-2 border-slate-200 rounded-2xl bg-white/80 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-slate-900 placeholder-slate-500 text-base font-medium tracking-wide shadow-sm hover:shadow-md"
                        placeholder="Create secure password"
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

                  {/* Confirm Password Field */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700 tracking-wide flex items-center space-x-2">
                      <LockClosedIcon className="w-4 h-4" />
                      <span>CONFIRM PASSWORD</span>
                    </label>
                    <div className={`relative group transition-all duration-300 ${
                      focusedField === 'confirmPassword' ? 'transform scale-[1.02]' : ''
                    }`}>
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300">
                        <LockClosedIcon className={`h-5 w-5 transition-all duration-300 ${
                          focusedField === 'confirmPassword' ? 'text-emerald-500 scale-110' : 'text-slate-400'
                        }`} />
                      </div>
                      <input
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('confirmPassword')}
                        onBlur={() => setFocusedField(null)}
                        className="block w-full pl-12 pr-12 py-4 border-2 border-slate-200 rounded-2xl bg-white/80 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-slate-900 placeholder-slate-500 text-base font-medium tracking-wide shadow-sm hover:shadow-md"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-4 flex items-center transition-all duration-300 hover:scale-110"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeSlashIcon className="h-5 w-5 text-slate-400 hover:text-emerald-500 transition-colors duration-200" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-slate-400 hover:text-emerald-500 transition-colors duration-200" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Password Match Indicator */}
                {formData.confirmPassword && (
                  <div className={`flex items-center space-x-2 p-3 rounded-xl ${
                    formData.password === formData.confirmPassword 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    {formData.password === formData.confirmPassword ? (
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    ) : (
                      <EyeSlashIcon className="w-5 h-5 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      formData.password === formData.confirmPassword ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {formData.password === formData.confirmPassword 
                        ? 'Passwords match perfectly!' 
                        : 'Passwords do not match'
                      }
                    </span>
                  </div>
                )}

                {/* Security Features */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                  <h4 className="font-semibold text-slate-700 mb-3 flex items-center space-x-2">
                    <ShieldCheckIcon className="w-4 h-4" />
                    <span>Security Features</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center space-x-2 text-slate-600">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span>End-to-end encryption</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-600">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span>Regular security audits</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-600">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span>GDPR compliant data handling</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-600">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span>Secure data storage</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 rounded-xl border border-slate-300 text-slate-600 hover:text-slate-800 hover:border-slate-400 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Back
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transform hover:scale-105 transition-all duration-300 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!isStepValid() || isLoading}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold hover:from-emerald-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    'Complete Registration'
                  )}
                </button>
              )}
            </div>
          </form>

          {/* Footer */}
          <div className="text-center pt-6 border-t border-slate-200/60 space-y-2">
            <p className="text-slate-600 text-sm">
              Already have an account?{' '}
              <a href="/" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors duration-200 hover:underline">
                Sign in here
              </a>
            </p>
            <div className="flex items-center justify-center space-x-4 text-xs">
              <span className="text-slate-500 font-medium">🔒 Secure Registration</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 font-medium">📊 Academic Tracking</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 font-medium">👤 Role-based Access</span>
            </div>
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
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
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
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

// Add missing ChevronDownIcon component
const ChevronDownIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export default EduTrackRegister;