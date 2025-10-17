'use client';

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Data dummy untuk grafik pengguna
const generateUserData = () => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const currentMonth = new Date().getMonth();

  return months.map((month, index) => {
    // Simulasi pertumbuhan pengguna dengan beberapa fluktuasi
    const baseValue = 10 + index * 5;
    const randomFactor = Math.random() * 10 - 5; // Nilai acak antara -5 dan 5
    const value = Math.max(0, Math.round(baseValue + randomFactor));

    // Highlight bulan saat ini dengan nilai yang lebih tinggi
    const isCurrentMonth = index === currentMonth;
    const finalValue = isCurrentMonth ? value + 15 : value;

    return {
      name: month,
      users: finalValue,
      active: Math.round(finalValue * 0.7), // 70% pengguna aktif
    };
  });
};

export function UserChart() {
  const [data, setData] = useState(generateUserData());

  // Simulasi pembaruan data real-time setiap 10 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateUserData());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            name="Total Pengguna"
          />
          <Line type="monotone" dataKey="active" stroke="#82ca9d" name="Pengguna Aktif" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
