import React, { useState } from 'react';
import { Users, GraduationCap, PlayCircle, DollarSign } from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatCard from './StatCard';
import AlertCard from './AlertCard';

const Dashboard: React.FC = () => {
  const { systemStats, alerts, dismissAlert } = useApp();

  const stats = [
    {
      title: 'Total Users',
      value: systemStats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'blue' as const,
      trend: { value: '12%', isPositive: true }
    },
    {
      title: 'Active Mentors',
      value: systemStats.activeMentors.toString(),
      icon: GraduationCap,
      color: 'green' as const,
      trend: { value: '8%', isPositive: true }
    },
    {
      title: 'Active Classes',
      value: systemStats.activeClasses.toString(),
      icon: PlayCircle,
      color: 'purple' as const,
      trend: { value: '3%', isPositive: false }
    },
    {
      title: "Today's Revenue",
      value: `$${systemStats.todayRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'orange' as const,
      trend: { value: '15%', isPositive: true }
    }
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-green-500 rounded-2xl p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              Welcome back, Admin! 👋
            </h1>
            <p className="text-blue-100 text-lg mb-4 lg:mb-0">
              Here's what's happening with KidCoderClub today
            </p>
          </div>
          <div className="text-right">
            <p className="text-blue-100">Today's Date</p>
            <p className="text-xl font-semibold">{new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Daily System Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              trend={stat.trend}
            />
          ))}
        </div>
      </div>

      {/* Alerts and Quick Actions */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <AlertCard alerts={alerts} onDismiss={dismissAlert} />
        
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-100">
              <Users className="w-6 h-6 text-blue-600 mb-2" />
              <p className="font-medium text-blue-800">Add New User</p>
            </button>
            <button className="p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors border border-green-100">
              <PlayCircle className="w-6 h-6 text-green-600 mb-2" />
              <p className="font-medium text-green-800">Create Class</p>
            </button>
            <button className="p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors border border-purple-100">
              <GraduationCap className="w-6 h-6 text-purple-600 mb-2" />
              <p className="font-medium text-purple-800">Issue Certificate</p>
            </button>
            <button className="p-4 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors border border-orange-100">
              <DollarSign className="w-6 h-6 text-orange-600 mb-2" />
              <p className="font-medium text-orange-800">View Payments</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;