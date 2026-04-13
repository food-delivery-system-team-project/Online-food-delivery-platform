import React, { useState, useMemo } from "react";
import { MoreVertical, Search, Plus, Trash2, Edit3, Eye, Download, ChevronRight } from "lucide-react";

const customersData = [
  { id: "#C-004560", name: "Rahul Sharma", join: "27 March 2026", location: "Raipur", spent: 78.92, status: "Active" },
  { id: "#C-004561", name: "Aman Verma", join: "28 March 2026", location: "Bilaspur", spent: 120.5, status: "VIP" },
  { id: "#C-004562", name: "Priya Singh", join: "29 March 2026", location: "Durg", spent: 16.87, status: "Active" }
];

export default function Customers() {
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => 
    customersData.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) || 
      c.id.toLowerCase().includes(search.toLowerCase())
    ), [search]);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* --- HEADER BAR --- */}
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/50 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900">User Directory</h2>
            <p className="text-sm text-gray-500 font-medium">Manage and monitor customer activity</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search customers..."
                className="pl-10 pr-4 py-2 bg-gray-100 border-transparent border rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-orange-500 outline-none w-64 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-lg shadow-blue-100">
              <Plus size={18} />
              Add New
            </button>
          </div>
        </div>

        {/* --- TABLE AREA (Scrollbar Safe) --- */}
        <div className="overflow-x-auto relative min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-[10px] uppercase font-bold tracking-widest">
                <th className="py-4 px-8">Client</th>
                <th className="py-4 px-4">ID</th>
                <th className="py-4 px-4">Location</th>
                <th className="py-4 px-4">Revenue</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-8 text-right">Options</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {filtered.map((c, index) => (
                <tr key={c.id} className="hover:bg-blue-50/40 transition-colors group">
                  <td className="py-5 px-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-sm">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{c.name}</p>
                        <p className="text-[11px] text-gray-400 font-medium">Joined {c.join}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-5 px-4 font-mono text-xs text-gray-500">{c.id}</td>
                  <td className="py-5 px-4 text-sm text-gray-600 font-medium">{c.location}</td>
                  <td className="py-5 px-4 text-sm font-bold text-gray-900">${c.spent}</td>
                  
                  <td className="py-5 px-4">
                    <StatusBadge status={c.status} />
                  </td>

                  {/* --- ACTION DROPDOWN FIX --- */}
                  <td className="py-5 px-8 text-right relative">
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className={`p-2 rounded-lg transition-colors ${openIndex === index ? 'bg-gray-200 text-gray-900' : 'text-gray-400 hover:bg-gray-100'}`}
                    >
                      <MoreVertical size={18} />
                    </button>

                    {openIndex === index && (
                      <>
                        {/* Invisible Backdrop to handle clicks anywhere else */}
                        <div className="fixed inset-0 z-[100]" onClick={() => setOpenIndex(null)} />
                        
                        {/* FIX: Using absolute positioning with a very high z-index.
                           For vertical scrollbar issues, ensures it stays on top.
                        */}
                        <div className="absolute right-8 top-12 w-48 bg-white border border-gray-100 shadow-2xl rounded-xl py-2 z-[101] animate-in fade-in slide-in-from-top-2 duration-150">
                          <button className="flex items-center gap-3 w-full px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                            <Eye size={14} className="text-gray-400" /> View Details
                          </button>
                          <button className="flex items-center gap-3 w-full px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                            <Edit3 size={14} className="text-gray-400" /> Edit User
                          </button>
                          <div className="h-px bg-gray-100 my-1 mx-2" />
                          <button className="flex items-center gap-3 w-full px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors">
                            <Trash2 size={14} /> Remove Client
                          </button>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- PAGINATION --- */}
        <div className="px-8 py-5 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
            Showing {filtered.length} of 46 Users
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 border border-gray-200 rounded-lg text-xs font-bold bg-white hover:bg-gray-50 transition-all">Previous</button>
            <button className="px-4 py-1.5 bg-orange-500 text-white rounded-lg text-xs font-bold shadow-md shadow-blue-100">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-green-50 text-green-700 ring-green-600/20",
    VIP: "bg-purple-50 text-purple-700 ring-purple-600/20"
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ring-1 ring-inset ${styles[status]}`}>
      {status}
    </span>
  );
}