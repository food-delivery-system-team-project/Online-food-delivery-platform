import React, { useEffect, useState } from "react";
import { MoreVertical } from "lucide-react";
import API from "../api";

export default function Orders() {
  const [orders,setOrders] = useState([])
  const [open, setOpen] = useState(null);

  useEffect(() => {
    fetchOrders(); 
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await API.get('/api/admin/all')
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const formatStatus = (status) =>{
    if (status === "pending") return "New Order";
    if (status === "onway") return "On Delivery";
    if (status === "delivered") return "Delivered";
    return status;
  }

  const updateStatus = async (id,status) =>{
    try {
      await API.put(`/api/admin/${id}`, {status});
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  }
  

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
      <div className="overflow-x-auto h-110">
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
            {orders.map((order, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                
                <td className="py-4 px-4 font-medium">
                  {order._id.slice(-6)}
                </td>

                <td className="text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </td>

                <td className="font-medium">
                  {order.user?.name}
                </td>

                <td className="font-medium">
                  {order.items.map((item)=> item.name).join(", ")}
                </td>

                <td className="text-gray-500">
                  {order.location}
                </td>

                <td className="font-semibold">
                  ₹{order.totalAmount}
                </td>

                <td>
                  <StatusBadge status={formatStatus(order.status)} />
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
                      
                      <button 
                        onClick={()=> updateStatus(order._id, "onway")}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-50">
                        Accept Order
                      </button>

                      <button 
                        onClick={()=> updateStatus(order._id,"cancelled")}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-red-500">
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
          Showing 1-{orders.length} orders
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