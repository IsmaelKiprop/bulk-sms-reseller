import React from "react";
import { Link } from "react-router-dom";

export function RecentPaymentsTable() {
  // Dummy data for the table
  const payments = [
    {
      id: "pay-123456",
      client: {
        name: "ABC Company",
        email: "billing@abccompany.com"
      },
      amount: "KSh 12,500",
      date: "Jul 12, 2023",
      status: "Completed"
    },
    {
      id: "pay-123457",
      client: {
        name: "XYZ Ltd",
        email: "accounts@xyzltd.com"
      },
      amount: "KSh 8,200",
      date: "Jul 10, 2023",
      status: "Completed"
    },
    {
      id: "pay-123458",
      client: {
        name: "123 Group",
        email: "finance@123group.com"
      },
      amount: "KSh 15,000",
      date: "Jul 8, 2023",
      status: "Pending"
    },
    {
      id: "pay-123459",
      client: {
        name: "Acme Corp",
        email: "payments@acmecorp.com"
      },
      amount: "KSh 9,750",
      date: "Jul 5, 2023",
      status: "Completed"
    },
    {
      id: "pay-123460",
      client: {
        name: "Summit Inc",
        email: "invoices@summitinc.com"
      },
      amount: "KSh 5,200",
      date: "Jul 1, 2023",
      status: "Failed"
    }
  ];
  
  // Function to get status badge class based on status
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };
  
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-3 text-left">Client</th>
            <th className="px-4 py-3 text-left">Amount</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {payments.map((payment) => (
            <tr key={payment.id} className="bg-white dark:bg-gray-800">
              <td className="px-4 py-3">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{payment.client.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{payment.client.email}</div>
                </div>
              </td>
              <td className="px-4 py-3 font-medium">{payment.amount}</td>
              <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{payment.date}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(payment.status)}`}>
                  {payment.status}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <Link
                  to={`/admin/payments/${payment.id}`}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 