import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { attendanceData } from "../../data/mockData";

function AttendanceChart() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-6">
        Attendance Trends
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={attendanceData}>
            <XAxis dataKey="month" stroke="#a1a1aa" />
            <YAxis stroke="#a1a1aa" />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="attendance"
              stroke="#10b981"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AttendanceChart;