
"use client"

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  UserCircleIcon,
  CalendarIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
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
    const [student, setStudent] = useState({});
    const [att,setAtt] = useState([])
    const [totalCount,setTotalCount] = useState(0);

  useEffect(()=>{
    const role = localStorage.getItem("role");
    if(role == "student"){
    }
      else if(role == "teacher"){
      window.location = "/teacher_dashboard"
    }else{
      window.location = "/"
    }
},[])

useEffect(()=>{
  const id = localStorage.getItem("id");

  (async()=>{
    const result = await axios.post("https://rfid-server-dun.vercel.app/v3/get_student_data",{id:id})
    if(result){
      setStudent(result.data.data[0])
      console.log(result.data.data[0])
    }else{
      alert(result.data)
    }
  })()
},[])


useEffect(()=>{
  const id = localStorage.getItem("idx");

  (async()=>{
    const result = await axios.post("https://rfid-server-dun.vercel.app/v1/get_total_attendence",{id:id})
    if(result){
     
      setAtt(result.data.data)
      setTotalCount(result.data.data.length)
    }else{
      alert(result.data.msg)
    }
  })()
},[])




  






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
              
              <div className="flex items-center space-x-3">
                
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
                <p className="text-3xl font-bold">{totalCount}</p>
                <p className="text-emerald-100 text-sm">Days Present</p>
              </div>
            </div>
          </div>
        </div>

     <div  className='flex justify-evenly items-center mt-3 bg-white rounded-2xl shadow-sm border border-gray-200 p-3 font-sans'>
          <span className='font-semibold '>ID</span>
          <span className='font-semibold '>Name</span>
          <span className='font-semibold '>Date</span>
          <span className='font-semibold '>Branch</span>
          <span className='font-semibold '>Section</span>
          <span className='font-semibold '>Status</span>
          
       </div>
       

        {att.map((data)=>{
          return <div key={data._id} className='flex justify-evenly items-center mt-3 bg-white rounded-2xl shadow-sm border border-gray-200 p-3 font-sans'>
          <span className=' text-slate-600 '>{data.idx}</span>
          <span className=' text-slate-600'>{data.name}</span>
          <span className='text-slate-600 '>{data.date}</span>
          <span className='text-slate-600 '>{data.branch}</span>
          <span className='text-slate-600 '>{data.section}</span>
          <span className='bg-green-500 px-4 py-1 rounded-full  font-semibold text-white'>Present</span>
       </div>

        })}


       

       

        {/* Student Info Card */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <UserCircleIcon className="w-8 h-8 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Student ID</p>
                <p className="font-semibold text-gray-900">{student.idx}</p>
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
                <p className="font-semibold text-gray-900">{"2025-26"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendanceDashboard;