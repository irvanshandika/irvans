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

// Data dummy untuk grafik rating proyek
const generateRatingData = () => {
  // Simulasi data rating proyek selama 12 bulan terakhir
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

  return months.map(month => {
    // Simulasi rating proyek dengan nilai antara 3.5 dan 5.0
    const baseRating = 3.5 + Math.random() * 1.5;
    const rating = parseFloat(baseRating.toFixed(1));

    // Simulasi jumlah review dengan nilai antara 5 dan 30
    const reviews = Math.floor(5 + Math.random() * 25);

    return {
      name: month,
      rating: rating,
      reviews: reviews,
    };
  });
};

export function ProjectRatingChart() {
  const [data, setData] = useState(generateRatingData());

  // Simulasi pembaruan data real-time setiap 15 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateRatingData());
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" domain={[0, 5]} />
          <YAxis yAxisId="right" orientation="right" domain={[0, 50]} />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="rating"
            stroke="#ff7300"
            activeDot={{ r: 8 }}
            name="Rating Rata-rata"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="reviews"
            stroke="#387908"
            name="Jumlah Review"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
