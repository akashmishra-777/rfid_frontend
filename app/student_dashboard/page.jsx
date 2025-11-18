
"use client"
"use client";

import React, { useState, useEffect } from 'react';
import {
  UserCircleIcon,
  CalendarIcon,
  ChartBarIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  BuildingOfficeIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BellIcon,
  Cog6ToothIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';

// Custom hook for page title
const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

const StudentAttendanceDashboard = () => {
  // Set page title
  usePageTitle('My Attendance - EduTrack');

  const [student, setStudent] = useState({
    name: 'Emma Wilson',
    id: 'STU-2024-002',
    branch: 'Computer Science',
    section: 'A',
    email: 'emma.wilson@university.edu',
    semester: '4th',
    academicYear: '2023-2024'
  });

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showDetails, setShowDetails] = useState(false);

  // Mock attendance data - day-wise college attendance
  const [attendanceData, setAttendanceData] = useState({
    overall: {
      totalDays: 60,
      present: 48,
      absent: 8,
      holiday: 4,
      percentage: 80.0
    },
    monthly: [
      { month: 'January', year: 2024, total: 22, present: 18, absent: 4, percentage: 81.8 },
      { month: 'February', year: 2024, total: 20, present: 17, absent: 3, percentage: 85.0 },
      { month: 'March', year: 2024, total: 18, present: 13, absent: 5, percentage: 72.2 }
    ],
    dailyRecords: [
      { date: '2024-03-25', day: 'Mon', status: 'present', checkIn: '08:45 AM', checkOut: '03:30 PM', hours: '6h 45m' },
      { date: '2024-03-24', day: 'Sun', status: 'holiday', checkIn: '-', checkOut: '-', hours: 'Holiday' },
      { date: '2024-03-23', day: 'Sat', status: 'holiday', checkIn: '-', checkOut: '-', hours: 'Holiday' },
      { date: '2024-03-22', day: 'Fri', status: 'present', checkIn: '09:00 AM', checkOut: '03:45 PM', hours: '6h 45m' },
      { date: '2024-03-21', day: 'Thu', status: 'absent', checkIn: '-', checkOut: '-', hours: 'Absent' },
      { date: '2024-03-20', day: 'Wed', status: 'present', checkIn: '08:50 AM', checkOut: '03:30 PM', hours: '6h 40m' },
      { date: '2024-03-19', day: 'Tue', status: 'present', checkIn: '09:05 AM', checkOut: '03:50 PM', hours: '6h 45m' },
      { date: '2024-03-18', day: 'Mon', status: 'present', checkIn: '08:55 AM', checkOut: '03:35 PM', hours: '6h 40m' },
      { date: '2024-03-17', day: 'Sun', status: 'holiday', checkIn: '-', checkOut: '-', hours: 'Holiday' },
      { date: '2024-03-16', day: 'Sat', status: 'holiday', checkIn: '-', checkOut: '-', hours: 'Holiday' },
      { date: '2024-03-15', day: 'Fri', status: 'present', checkIn: '09:10 AM', checkOut: '03:40 PM', hours: '6h 30m' },
      { date: '2024-03-14', day: 'Thu', status: 'present', checkIn: '08:45 AM', checkOut: '03:25 PM', hours: '6h 40m' },
      { date: '2024-03-13', day: 'Wed', status: 'absent', checkIn: '-', checkOut: '-', hours: 'Absent' },
      { date: '2024-03-12', day: 'Tue', status: 'present', checkIn: '09:00 AM', checkOut: '03:30 PM', hours: '6h 30m' },
      { date: '2024-03-11', day: 'Mon', status: 'present', checkIn: '08:50 AM', checkOut: '03:40 PM', hours: '6h 50m' }
    ]
  });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const years = [2023, 2024];

  // Calculate current month statistics
  const currentMonthStats = attendanceData.monthly.find(
    m => m.month === months[selectedMonth] && m.year === selectedYear
  ) || { total: 0, present: 0, absent: 0, percentage: 0 };

  // Calculate attendance trend
  const getTrend = () => {
    if (attendanceData.monthly.length < 2) return 0;
    const current = currentMonthStats.percentage;
    const previous = attendanceData.monthly[1]?.percentage || 0;
    return current - previous;
  };

  const trend = getTrend();

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const year = selectedYear;
    const month = selectedMonth;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    
    // Add empty slots for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push({ date: null, status: 'empty' });
    }
    
    // Add actual days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const record = attendanceData.dailyRecords.find(r => r.date === dateStr);
      const dayOfWeek = new Date(year, month, i).getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
      
      days.push({
        date: i,
        dateStr,
        status: record ? record.status : (isWeekend ? 'weekend' : 'future'),
        ...record
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <AcademicCapIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">EduTrack</h1>
                <p className="text-sm text-gray-500">Attendance Portal</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <BellIcon className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Cog6ToothIcon className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                  EW
                </div>
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-gray-900">{student.name}</p>
                  <p className="text-xs text-gray-500">{student.branch}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl p-6 text-white shadow-lg mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome back, {student.name}!</h2>
              <p className="text-emerald-100">Your college attendance overview</p>
            </div>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <div className="text-center">
                <p className="text-3xl font-bold">{attendanceData.overall.percentage}%</p>
                <p className="text-emerald-100 text-sm">Overall Attendance</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">{attendanceData.overall.present}</p>
                <p className="text-emerald-100 text-sm">Days Present</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total College Days</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{attendanceData.overall.totalDays}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <CalendarDaysIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Days Present</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{attendanceData.overall.present}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Days Absent</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{attendanceData.overall.absent}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <XCircleIcon className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Trend</p>
                <div className="flex items-center space-x-1 mt-1">
                  {trend >= 0 ? (
                    <ArrowTrendingUpIcon className="w-5 h-5 text-green-600" />
                  ) : (
                    <ArrowTrendingDownIcon className="w-5 h-5 text-red-600" />
                  )}
                  <p className={`text-xl font-bold ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {Math.abs(trend).toFixed(1)}%
                  </p>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <ChartBarIcon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                >
                  {months.map((month, index) => (
                    <option key={month} value={index}>{month}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

             
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center space-x-2 px-4 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors duration-200"
              >
                <ChartBarIcon className="w-5 h-5" />
                <span>{showDetails ? 'Hide Details' : 'Show Details'}</span>
              </button>
            </div>
          </div>

          {/* Current Month Stats */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <p className="text-sm text-blue-600 font-medium">Current Month</p>
              <p className="text-2xl font-bold text-blue-800">{months[selectedMonth]}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <p className="text-sm text-green-600 font-medium">Present</p>
              <p className="text-2xl font-bold text-green-800">{currentMonthStats.present}</p>
            </div>
            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
              <p className="text-sm text-red-600 font-medium">Absent</p>
              <p className="text-2xl font-bold text-red-800">{currentMonthStats.absent}</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <p className="text-sm text-purple-600 font-medium">Percentage</p>
              <p className="text-2xl font-bold text-purple-800">{currentMonthStats.percentage}%</p>
            </div>
          </div>
        </div>

        {/* Calendar View */}
    

        {/* List View */}
      

        {/* Monthly Progress */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Attendance Progress</h3>
          <div className="space-y-4">
            {attendanceData.monthly.map((month, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{month.month} {month.year}</span>
                    <span className={`text-sm font-semibold ${
                      month.percentage >= 75 ? 'text-green-600' : 
                      month.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {month.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${
                        month.percentage >= 75 ? 'bg-green-500' : 
                        month.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${month.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Present: {month.present}/{month.total}</span>
                    <span>Absent: {month.absent}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Info Card */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <UserCircleIcon className="w-8 h-8 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Student ID</p>
                <p className="font-semibold text-gray-900">{student.id}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <BuildingOfficeIcon className="w-8 h-8 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Branch</p>
                <p className="font-semibold text-gray-900">{student.branch}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <AcademicCapIcon className="w-8 h-8 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Section</p>
                <p className="font-semibold text-gray-900">{student.section}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <CalendarIcon className="w-8 h-8 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Academic Year</p>
                <p className="font-semibold text-gray-900">{student.academicYear}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendanceDashboard;