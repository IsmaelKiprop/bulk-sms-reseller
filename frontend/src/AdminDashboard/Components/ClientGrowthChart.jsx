import React from "react";

export function ClientGrowthChart() {
  // Dummy data for the chart
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const values = [10, 15, 8, 12, 20, 25];
  
  // Calculate the maximum value for scale
  const maxValue = Math.max(...values);
  
  return (
    <div className="w-full">
      <div className="space-y-1 mb-4">
        <p className="text-xs text-gray-500 dark:text-gray-400">New Clients (Last 6 Months)</p>
        <p className="text-xl font-bold text-gray-800 dark:text-white">90 clients</p>
      </div>
      
      <div className="h-48 relative">
        {/* Line chart */}
        <svg className="w-full h-full">
          <g transform="translate(30, 10)">
            {/* Y-axis line */}
            <line 
              x1="0" 
              y1="0" 
              x2="0" 
              y2="160" 
              stroke="currentColor" 
              className="text-gray-300 dark:text-gray-700" 
              strokeWidth="1"
            />
            
            {/* X-axis line */}
            <line 
              x1="0" 
              y1="160" 
              x2="400" 
              y2="160" 
              stroke="currentColor" 
              className="text-gray-300 dark:text-gray-700" 
              strokeWidth="1"
            />
            
            {/* Line path */}
            <path 
              d={
                values.map((value, i) => {
                  const x = (i * 60) + 5;
                  const y = 160 - ((value / maxValue) * 150);
                  return `${i === 0 ? 'M' : 'L'}${x},${y}`;
                }).join(' ')
              } 
              fill="none" 
              stroke="currentColor" 
              className="text-blue-500 dark:text-blue-400" 
              strokeWidth="2"
            />
            
            {/* Data points */}
            {values.map((value, i) => {
              const x = (i * 60) + 5;
              const y = 160 - ((value / maxValue) * 150);
              return (
                <circle 
                  key={i} 
                  cx={x} 
                  cy={y} 
                  r="4" 
                  fill="currentColor" 
                  className="text-blue-500 dark:text-blue-400" 
                />
              );
            })}
            
            {/* X-axis labels */}
            {months.map((month, i) => (
              <text 
                key={i}
                x={(i * 60) + 5} 
                y="180" 
                textAnchor="middle" 
                className="text-xs fill-current text-gray-500 dark:text-gray-400"
              >
                {month}
              </text>
            ))}
          </g>
        </svg>
      </div>
      
      <div className="flex justify-center mt-4">
        <div className="flex items-center mr-6">
          <div className="w-3 h-3 rounded-full bg-blue-500 dark:bg-blue-400 mr-2"></div>
          <span className="text-xs text-gray-500 dark:text-gray-400">New Clients</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 dark:bg-green-400 mr-2"></div>
          <span className="text-xs text-gray-500 dark:text-gray-400">Active Clients</span>
        </div>
      </div>
    </div>
  );
} 