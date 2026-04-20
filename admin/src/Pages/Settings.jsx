import React, { useState } from "react";
import { User, Mail, Lock, Bell, Moon, LogOut, Edit3, Camera, Save, X, AlertTriangle } from "lucide-react";

export default function ProfileSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [form, setForm] = useState({
    name: "Admin User",
    email: "admin@gmail.com",
    role: "System Administrator",
    password: "••••••••",
    notifications: true,
    darkMode: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const confirmLogout = () => {
    console.log("Logged out successfully");
    setShowLogoutModal(false);
  };

  return (
    /* MAIN WRAPPER: Fixed height and independent scroll */
    <div className=" w-full bg-slate-50 overflow-y-auto overflow-x-hidden scrollbar-hide">
      
      {/* --- CENTERED LOGOUT MODAL --- */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setShowLogoutModal(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">Logout</h3>
            <p className="text-slate-500 text-sm mb-8 font-medium">Are you sure you want to exit the admin panel?</p>
            <div className="flex gap-3">
              <button onClick={() => setShowLogoutModal(false)} className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-sm transition-all">Cancel</button>
              <button onClick={confirmLogout} className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm shadow-lg transition-all">Logout</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto py-10 px-4">
        
        {/* --- PROFILE HEADER CARD --- */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-r from-orange-500 to-red-600"></div>
          <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-12">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg">
                  <div className="w-full h-full rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                    <User size={40} />
                  </div>
                </div>
                {isEditing && (
                  <button className="absolute bottom-1 -right-1 bg-white p-1.5 rounded-lg shadow-md border border-slate-100 text-orange-600">
                    <Camera size={16} />
                  </button>
                )}
              </div>
              
              <div className="flex gap-3 mb-2">
                {!isEditing ? (
                  <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all">
                    <Edit3 size={16} /> Edit
                  </button>
                ) : (
                  <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all">
                    <X size={16} /> Cancel
                  </button>
                )}
                <button onClick={() => setShowLogoutModal(true)} className="flex items-center gap-2 px-5 py-2.5 border border-red-100 text-red-600 rounded-xl text-sm font-bold hover:bg-red-50 transition-all">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
            
            <div className="mt-4">
              <h2 className="text-2xl font-black text-slate-900">{form.name}</h2>
              <p className="text-slate-500 font-medium">{form.role}</p>
            </div>
          </div>
        </div>

        {/* --- FORM SECTION --- */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
            <h3 className="text-lg font-bold text-slate-800">Account Settings</h3>
          </div>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input name="name" disabled={!isEditing} value={form.name} onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-all ${isEditing ? "border-orange-200 focus:ring-4 focus:ring-orange-50 bg-white" : "border-transparent bg-slate-50 text-slate-500"}`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input name="email" disabled={!isEditing} value={form.email} onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-all ${isEditing ? "border-orange-200 focus:ring-4 focus:ring-orange-50 bg-white" : "border-transparent bg-slate-50 text-slate-500"}`}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="password" name="password" disabled={!isEditing} placeholder="Update password"
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-all ${isEditing ? "border-orange-200 focus:ring-4 focus:ring-orange-50 bg-white" : "border-transparent bg-slate-50 text-slate-500"}`}
                />
              </div>
            </div>

            <div className="h-px bg-slate-100 my-4"></div>

            <div className="grid md:grid-cols-2 gap-6">
              <ToggleSwitch icon={<Bell size={18}/>} label="Notifications" name="notifications" checked={form.notifications} onChange={handleChange} />
              <ToggleSwitch icon={<Moon size={18}/>} label="Dark Mode" name="darkMode" checked={form.darkMode} onChange={handleChange} dark />
            </div>

            {isEditing && (
              <button type="submit" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white font-black uppercase tracking-widest py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98]">
                <Save size={20} /> Update Profile
              </button>
            )}
          </form>
        </div>
        
        {/* Padding at bottom to ensure scroll visibility */}
        <div className="h-10"></div>
      </div>
    </div>
  );
}

/* Internal Reusable Component for Toggles */
function ToggleSwitch({ icon, label, name, checked, onChange, dark }) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${dark ? 'bg-slate-800 text-white' : 'bg-blue-100 text-blue-600'}`}>{icon}</div>
        <div>
          <p className="text-sm font-bold text-slate-700">{label}</p>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Status: {checked ? 'On' : 'Off'}</p>
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" name={name} checked={checked} onChange={onChange} className="sr-only peer" />
        <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
      </label>
    </div>
  );
}