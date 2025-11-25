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
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  UsersIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';

// Custom hook for page title
const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

const TeacherAttendanceDashboard = () => {
  // Set page title
  usePageTitle('Teacher Dashboard - EduTrack');

  useEffect(()=>{
      const role = localStorage.getItem("role");
      if(role == "student"){
         window.location = "/student_dashboard"
      }
        else if(role == "teacher"){
       
      }else{
        window.location = "/"
      }
  },[])

  const [teacher, setTeacher] = useState({
    name: 'Dr. Sarah Johnson',
    id: 'TEA-2024-001',
    department: 'Computer Science',
    email: 'sarah.j@university.edu',
    academicYear: '2023-2024'
  });

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedSection, setSelectedSection] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('overview'); // 'overview', 'students', 'calendar'

  // Mock data - teacher's class attendance overview
  const [attendanceData, setAttendanceData] = useState({
    overall: {
      totalStudents: 85,
      presentToday: 78,
      absentToday: 7,
      averageAttendance: 87.5,
      classesTaken: 45
    },
    branchWise: [
      { branch: 'Computer Science', total: 45, present: 40, absent: 5, percentage: 88.9 },
      { branch: 'Electrical', total: 25, present: 22, absent: 3, percentage: 88.0 },
      { branch: 'Mechanical', total: 15, present: 12, absent: 3, percentage: 80.0 }
    ],
    sectionWise: [
      { section: 'A', total: 30, present: 28, absent: 2, percentage: 93.3 },
      { section: 'B', total: 30, present: 26, absent: 4, percentage: 86.7 },
      { section: 'C', total: 25, present: 20, absent: 5, percentage: 80.0 }
    ],
    students: [
      { id: 'STU-2024-001', name: 'John Smith', branch: 'Computer Science', section: 'A', present: 42, absent: 3, percentage: 93.3, today: 'present' },
      { id: 'STU-2024-002', name: 'Emma Wilson', branch: 'Computer Science', section: 'A', present: 44, absent: 1, percentage: 97.8, today: 'present' },
      { id: 'STU-2024-003', name: 'Michael Brown', branch: 'Computer Science', section: 'B', present: 40, absent: 5, percentage: 88.9, today: 'absent' },
      { id: 'STU-2024-004', name: 'Sophia Davis', branch: 'Electrical', section: 'A', present: 38, absent: 7, percentage: 84.4, today: 'present' },
      { id: 'STU-2024-005', name: 'James Miller', branch: 'Electrical', section: 'B', present: 42, absent: 3, percentage: 93.3, today: 'present' },
      { id: 'STU-2024-006', name: 'Olivia Garcia', branch: 'Mechanical', section: 'A', present: 35, absent: 10, percentage: 77.8, today: 'present' },
      { id: 'STU-2024-007', name: 'William Martinez', branch: 'Mechanical', section: 'B', present: 37, absent: 8, percentage: 82.2, today: 'absent' },
      { id: 'STU-2024-008', name: 'Isabella Rodriguez', branch: 'Computer Science', section: 'C', present: 39, absent: 6, percentage: 86.7, today: 'present' }
    ],
    dailyOverview: [
      { date: '2024-03-25', day: 'Mon', total: 85, present: 78, absent: 7, percentage: 91.8 },
      { date: '2024-03-22', day: 'Fri', total: 85, present: 75, absent: 10, percentage: 88.2 },
      { date: '2024-03-21', day: 'Thu', total: 85, present: 72, absent: 13, percentage: 84.7 },
      { date: '2024-03-20', day: 'Wed', total: 85, present: 80, absent: 5, percentage: 94.1 },
      { date: '2024-03-19', day: 'Tue', total: 85, present: 77, absent: 8, percentage: 90.6 },
      { date: '2024-03-18', day: 'Mon', total: 85, present: 79, absent: 6, percentage: 92.9 }
    ]
  });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const years = [2023, 2024];
  const branches = ['all', 'Computer Science', 'Electrical', 'Mechanical', 'Civil'];
  const sections = ['all', 'A', 'B', 'C'];

  // Filter students based on filters and search
  const filteredStudents = attendanceData.students.filter(student => {
    const matchesBranch = selectedBranch === 'all' || student.branch === selectedBranch;
    const matchesSection = selectedSection === 'all' || student.section === selectedSection;
    const matchesSearch = !searchTerm || 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesBranch && matchesSection && matchesSearch;
  });

  // Calculate statistics for filtered students
  const filteredStats = {
    total: filteredStudents.length,
    present: filteredStudents.filter(s => s.today === 'present').length,
    absent: filteredStudents.filter(s => s.today === 'absent').length,
    averagePercentage: filteredStudents.length > 0 
      ? (filteredStudents.reduce((sum, student) => sum + student.percentage, 0) / filteredStudents.length).toFixed(1)
      : 0
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedBranch('all');
    setSelectedSection('all');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <AcademicCapIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">EduTrack</h1>
                <p className="text-sm text-gray-500">Teacher Portal</p>
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
                  SJ
                </div>
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-gray-900">{teacher.name}</p>
                  <p className="text-xs text-gray-500">{teacher.department}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-lg mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome, {teacher.name}!</h2>
              <p className="text-blue-100">Your class attendance overview for today</p>
            </div>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <div className="text-center">
                <p className="text-3xl font-bold">{attendanceData.overall.averageAttendance}%</p>
                <p className="text-blue-100 text-sm">Avg Attendance</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">{attendanceData.overall.presentToday}</p>
                <p className="text-blue-100 text-sm">Present Today</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{attendanceData.overall.totalStudents}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Present Today</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{attendanceData.overall.presentToday}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Absent Today</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{attendanceData.overall.absentToday}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <XCircleIcon className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Classes Taken</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">{attendanceData.overall.classesTaken}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <CalendarDaysIcon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search students by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('overview')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === 'overview'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setViewMode('students')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === 'students'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Students
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === 'calendar'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Calendar
                </button>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                <FunnelIcon className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Filters</span>
                {showFilters ? (
                  <ChevronUpIcon className="w-4 h-4 text-gray-600" />
                ) : (
                  <ChevronDownIcon className="w-4 h-4 text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Branch Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <BuildingOfficeIcon className="w-4 h-4 inline mr-1" />
                    Branch
                  </label>
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {branches.map(branch => (
                      <option key={branch} value={branch}>
                        {branch === 'all' ? 'All Branches' : branch}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Section Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <AcademicCapIcon className="w-4 h-4 inline mr-1" />
                    Section
                  </label>
                  <select
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {sections.map(section => (
                      <option key={section} value={section}>
                        {section === 'all' ? 'All Sections' : `Section ${section}`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Month Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <CalendarIcon className="w-4 h-4 inline mr-1" />
                    Month
                  </label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {months.map((month, index) => (
                      <option key={month} value={index}>{month}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* Filtered Stats */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <p className="text-sm text-blue-600 font-medium">Filtered Students</p>
              <p className="text-2xl font-bold text-blue-800">{filteredStats.total}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <p className="text-sm text-green-600 font-medium">Present</p>
              <p className="text-2xl font-bold text-green-800">{filteredStats.present}</p>
            </div>
            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
              <p className="text-sm text-red-600 font-medium">Absent</p>
              <p className="text-2xl font-bold text-red-800">{filteredStats.absent}</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <p className="text-sm text-purple-600 font-medium">Avg Percentage</p>
              <p className="text-2xl font-bold text-purple-800">{filteredStats.averagePercentage}%</p>
            </div>
          </div>
        </div>

        {/* Overview View */}
        {viewMode === 'overview' && (
          <div className="space-y-8">
            {/* Branch-wise Performance */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Branch-wise Attendance</h3>
              <div className="space-y-4">
                {attendanceData.branchWise.map((branch, index) => (
                  <div key={branch.branch} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{branch.branch}</span>
                        <span className={`text-sm font-semibold ${
                          branch.percentage >= 85 ? 'text-green-600' : 
                          branch.percentage >= 75 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {branch.percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${
                            branch.percentage >= 85 ? 'bg-green-500' : 
                            branch.percentage >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${branch.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Present: {branch.present}/{branch.total}</span>
                        <span>Absent: {branch.absent}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section-wise Performance */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Section-wise Attendance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {attendanceData.sectionWise.map((section, index) => (
                  <div key={section.section} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                    <div className="text-center">
                      <h4 className="font-semibold text-gray-900 mb-2">Section {section.section}</h4>
                      <div className={`text-3xl font-bold mb-2 ${
                        section.percentage >= 85 ? 'text-green-600' : 
                        section.percentage >= 75 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {section.percentage}%
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Present: {section.present}</span>
                        <span>Absent: {section.absent}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Overview */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Daily Overview</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Day
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Present
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Absent
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Attendance %
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {attendanceData.dailyOverview.map((day, index) => (
                      <tr key={day.date} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900">{day.date}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600">{day.day}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-green-600">{day.present}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-red-600">{day.absent}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  day.percentage >= 85 ? 'bg-green-500' : 
                                  day.percentage >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${day.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900">{day.percentage}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Students View */}
        {viewMode === 'students' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Student Attendance Records</h3>
              <p className="text-sm text-gray-600 mt-1">
                Showing {filteredStudents.length} of {attendanceData.students.length} students
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Branch
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Section
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Present
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Absent
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Attendance %
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Today
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStudents.map((student, index) => (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{student.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium mr-3">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm font-medium text-gray-900">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">{student.branch}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Section {student.section}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-green-600">{student.present}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-red-600">{student.absent}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                student.percentage >= 85 ? 'bg-green-500' : 
                                student.percentage >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${student.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{student.percentage}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          student.today === 'present' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {student.today === 'present' ? (
                            <>
                              <CheckCircleIcon className="w-3 h-3 mr-1" />
                              Present
                            </>
                          ) : (
                            <>
                              <XCircleIcon className="w-3 h-3 mr-1" />
                              Absent
                            </>
                          )}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredStudents.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UsersIcon className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              {months[selectedMonth]} {selectedYear} - Attendance Calendar
            </h3>
            
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarDaysIcon className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Calendar View</h3>
              <p className="text-gray-600">Monthly calendar view with daily attendance statistics coming soon.</p>
            </div>
          </div>
        )}

        {/* Teacher Info Card */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Teacher Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <UserCircleIcon className="w-8 h-8 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Teacher ID</p>
                <p className="font-semibold text-gray-900">{teacher.id}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <BuildingOfficeIcon className="w-8 h-8 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Department</p>
                <p className="font-semibold text-gray-900">{teacher.department}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <AcademicCapIcon className="w-8 h-8 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Classes Assigned</p>
                <p className="font-semibold text-gray-900">3 Sections</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <CalendarIcon className="w-8 h-8 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Academic Year</p>
                <p className="font-semibold text-gray-900">{teacher.academicYear}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAttendanceDashboard;