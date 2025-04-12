import React from "react";

export function AdminRevenueChart() {
  // Dummy data for the chart
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const values = [65, 78, 62, 95, 85, 97, 105, 120, 110, 125, 115, 130];
  
  // Calculate the maximum value for scale
  const maxValue = Math.max(...values);
  
  return (
    <div className="w-full">
      <div className="flex justify-between mb-4">
        <div className="space-y-1">
          <p className="text-xs text-gray-500 dark:text-gray-400">Total Revenue</p>
          <p className="text-xl font-bold text-gray-800 dark:text-white">KSh 1,245,890</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-gray-500 dark:text-gray-400">YoY Growth</p>
          <p className="text-xl font-bold text-green-600 dark:text-green-400">+24.5%</p>
        </div>
      </div>
      
      <div className="h-64 relative">
        {/* Chart bars */}
        <div className="flex items-end justify-between h-56 border-b border-l border-gray-200 dark:border-gray-700">
          {values.map((value, i) => (
            <div key={i} className="flex flex-col items-center">
              <div 
                className="w-8 bg-blue-500 dark:bg-blue-600 rounded-t-sm hover:bg-blue-600 dark:hover:bg-blue-500 transition-all"
                style={{ height: `${(value / maxValue) * 100}%` }}
              ></div>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{months[i]}</span>
            </div>
          ))}
        </div>
        
        {/* Y-axis scale */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>KSh {maxValue}K</span>
          <span>KSh {Math.floor(maxValue * 0.75)}K</span>
          <span>KSh {Math.floor(maxValue * 0.5)}K</span>
          <span>KSh {Math.floor(maxValue * 0.25)}K</span>
          <span>0</span>
        </div>
      </div>
    </div>
  );
} 