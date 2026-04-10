import React, { useState } from "react";
import { MoreVertical } from "lucide-react";

const ordersData = [
  {
    id: "#555231",
    date: "26 March 2026, 12:42 AM",
    customer: "Rahul Sharma",
    order: "Burger",
    location: "Raipur, Chhattisgarh",
    amount: 164,
    status: "New Order"
  },
  {
    id: "#555232",
    date: "26 March 2026, 11:42 AM",
    customer: "Aman Verma",
    order: "Veg Biryani",
    location: "Bilaspur, CG",
    amount: 184,
    status: "On Delivery"
  },
  {
    id: "#555233",
    date: "26 March 2026, 10:22 AM",
    customer: "Priya Singh",
    order: "Pulao",
    location: "Durg, CG",
    amount: 364,
    status: "Delivered"
  }
];

export default function Orders() {
  const [open, setOpen] = useState(null);

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">

      {/* Top */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Your Orders
          </h2>
          <p className="text-gray-500 text-sm">
            This is your order list data
          </p>
        </div>

        <div className="flex gap-3">
          <select className="border px-4 py-2 rounded-lg">
            <option>All Status</option>
            <option>New Order</option>
            <option>On Delivery</option>
            <option>Delivered</option>
          </select>

          <input
            type="date"
            className="border px-4 py-2 rounded-lg"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          
          <thead>
            <tr className="bg-orange-500 text-white">
              <th className="py-3 px-4 text-left">Order ID</th>
              <th className="text-left">Date</th>
              <th className="text-left">Customer Name</th>
              <th className="text-left">Order Items</th>
              <th className="text-left">Location</th>
              <th className="text-left">Amount</th>
              <th className="text-left">Status</th>
              <th className="text-left"></th>
            </tr>
          </thead>

          <tbody>
            {ordersData.map((order, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                
                <td className="py-4 px-4 font-medium">
                  {order.id}
                </td>

                <td className="text-gray-500">
                  {order.date}
                </td>

                <td className="font-medium">
                  {order.customer}
                </td>

                <td className="font-medium">
                  {order.order}
                </td>

                <td className="text-gray-500">
                  {order.location}
                </td>

                <td className="font-semibold">
                  ${order.amount}.00
                </td>

                <td>
                  <StatusBadge status={order.status} />
                </td>

                <td className="relative">
                  <button
                    onClick={() =>
                      setOpen(open === index ? null : index)
                    }
                  >
                    <MoreVertical size={18} />
                  </button>

                  {open === index && (
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-xl border z-10">
                      
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-50">
                        Accept Order
                      </button>

                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-red-500">
                        Reject Order
                      </button>

                    </div>
                  )}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-500">
          Showing 1-3 from 12 data
        </p>

        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded">1</button>
          <button className="px-3 py-1 border rounded">2</button>
          <button className="px-3 py-1 border rounded">3</button>
        </div>
      </div>

    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    "New Order": "bg-red-100 text-red-500",
    "On Delivery": "bg-blue-100 text-blue-500",
    Delivered: "bg-green-100 text-green-500"
  };

  return (
    <span className={`px-3 py-1 rounded-lg text-xs ${styles[status]}`}>
      {status}
    </span>
  );
}