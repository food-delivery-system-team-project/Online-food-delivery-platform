import React, { useState } from "react";
import { Trash2 } from "lucide-react";

const orderItems = [
  {
    name: "Burger Combo",
    qty: 2,
    price: 120,
  },
  {
    name: "Pizza",
    qty: 1,
    price: 250,
  },
  {
    name: "Cold Drink",
    qty: 3,
    price: 50,
  },
];

export default function Orderdetails() {
  const [status, setStatus] = useState("On Delivery");

  return (
    <div className="grid md:grid-cols-3 gap-6">
      
      {/* LEFT SIDE */}
      <div className="space-y-6">
        
        {/* Customer Card */}
        <div className="bg-white p-6 rounded-2xl shadow border">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center justify-center text-xl">
              R
            </div>
            <div>
              <h3 className="font-bold">Rahul Sharma</h3>
              <p className="text-sm text-gray-500">Customer</p>
            </div>
          </div>
        </div>

        {/* Order Note */}
        <div className="bg-orange-50 p-5 rounded-2xl">
          <h4 className="font-semibold mb-2">Order Note</h4>
          <p className="text-sm text-gray-600">
            Please deliver fast and make it less spicy.
          </p>
        </div>

        {/* Delivery Info */}
        <div className="bg-white p-5 rounded-2xl shadow border">
          <h4 className="font-semibold mb-2">Delivery Address</h4>
          <p className="text-sm text-gray-600">
            Raipur, Chhattisgarh, India
          </p>
        </div>

        {/* Timeline */}
        <div className="bg-white p-5 rounded-2xl shadow border">
          <h4 className="font-semibold mb-4">Order Timeline</h4>

          <div className="space-y-4 text-sm">
            <Timeline text="Order Created" />
            <Timeline text="Payment Success" />
            <Timeline text="On Delivery" active />
            <Timeline text="Delivered" />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="md:col-span-2 space-y-6">

        {/* Top Actions */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            Order #ORD001
          </h2>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-400"
          >
            <option>Pending</option>
            <option>Preparing</option>
            <option>On Delivery</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>

        {/* Items Table */}
        <div className="bg-white rounded-2xl shadow border p-5">
          <h3 className="font-semibold mb-4">Order Items</h3>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-gray-500 text-left">
                <th className="pb-2">Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orderItems.map((item, i) => (
                <tr key={i} className="border-b">
                  <td className="py-3">{item.name}</td>
                  <td>{item.qty}</td>
                  <td>₹{item.price}</td>
                  <td>₹{item.qty * item.price}</td>
                  <td>
                    <Trash2 size={16} className="text-red-500 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total */}
          <div className="flex justify-end mt-4 font-semibold">
            Total: ₹
            {orderItems.reduce(
              (sum, item) => sum + item.qty * item.price,
              0
            )}
          </div>
        </div>

        {/* Delivery Person */}
        <div className="bg-white p-5 rounded-2xl shadow border">
          <h3 className="font-semibold mb-3">Delivery Person</h3>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Ramesh Kumar</p>
              <p className="text-sm text-gray-500">
                Phone: +91 9876543210
              </p>
            </div>

            <div className="text-sm text-gray-600">
              ETA: 15 mins
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* Timeline Component */
function Timeline({ text, active }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-3 h-3 rounded-full ${
          active
            ? "bg-orange-500"
            : "bg-gray-300"
        }`}
      />
      <p className="text-gray-600">{text}</p>
    </div>
  );
}