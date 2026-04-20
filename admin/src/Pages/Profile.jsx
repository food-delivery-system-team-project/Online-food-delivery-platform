import React from "react";
import { 
  User, Mail, Shield, Calendar, MapPin, Award, 
  Zap, Clock, Fingerprint, Edit3, ArrowUpRight, Target
} from "lucide-react";

export default function Profile({ setPage }) {
  const adminData = {
    name: "Admin User",
    email: "admin@gmail.com",
    role: "System Administrator",
    joined: "January 2024",
    location: "Raipur, India",
    status: "Active",
    bio: "Passionate about building scalable food delivery solutions and optimizing system performance for high-traffic applications.",
    skills: ["System Architecture", "Security", "UI Architecture", "Database Management"]
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* --- HERO SECTION --- */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="h-40 bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 relative overflow-hidden">
             {/* Subtle noise/mesh pattern for professional texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          </div>
          
          <div className="px-8 pb-8">
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-end -mt-12 gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-[1.8rem] bg-white p-1.5 shadow-2xl">
                  <div className="w-full h-full rounded-[1.5rem] bg-slate-50 flex items-center justify-center text-slate-300 border border-slate-100">
                    <User size={60} strokeWidth={1.2} />
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 w-7 h-7 bg-green-500 border-4 border-white rounded-full shadow-lg"></div>
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">{adminData.name}</h1>
                  <span className="px-2.5 py-0.5 bg-orange-100 text-orange-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-orange-200">
                    Verified Admin
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-1 text-slate-500 font-bold text-sm">
                  <p className="flex items-center gap-1.5 text-orange-600"><Shield size={14} /> {adminData.role}</p>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <p className="flex items-center gap-1.5"><MapPin size={14} /> {adminData.location}</p>
                </div>
              </div>

              {/* Navigation to Settings */}
              <button 
                onClick={() => setPage("settings")}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black hover:bg-black transition-all active:scale-95 shadow-lg shadow-slate-200"
              >
                <Edit3 size={16} /> Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* --- LEFT COLUMN --- */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute -right-4 -top-4 text-slate-50 opacity-[0.03]">
                <Fingerprint size={150} />
              </div>
              <h3 className="text-base font-black text-slate-800 mb-3 flex items-center gap-2">
                <Target size={18} className="text-orange-500" /> Executive Summary
              </h3>
              <p className="text-slate-500 leading-relaxed font-medium text-sm">
                {adminData.bio}
              </p>
              
              <div className="mt-5 flex flex-wrap gap-2">
                {adminData.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-[10px] font-bold border border-slate-100 hover:border-orange-200 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <InfoItem icon={<Mail className="text-orange-500" size={18}/>} label="Email" value={adminData.email} />
              <InfoItem icon={<Calendar className="text-blue-500" size={18}/>} label="Member Since" value={adminData.joined} />
              <InfoItem icon={<Clock className="text-purple-500" size={18}/>} label="Activity" value="Online Now" />
              <InfoItem icon={<Award className="text-yellow-500" size={18}/>} label="Standing" value="Super Admin" />
            </div>
          </div>

          {/* --- RIGHT COLUMN --- */}
          <div className="space-y-6">
            {/* System Security Bento */}
            <div className="bg-slate-900 text-white p-7 rounded-[2rem] shadow-xl relative overflow-hidden group">
               <Zap className="absolute -right-4 -top-4 w-20 h-20 text-white/5 group-hover:rotate-12 transition-transform duration-500" />
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Security Health</p>
               <h3 className="text-3xl font-black mb-4 tracking-tighter">98.4<span className="text-sm text-orange-400 font-medium">%</span></h3>
               <div className="w-full bg-slate-800 h-1.5 rounded-full mb-6">
                  <div className="bg-gradient-to-r from-orange-400 to-red-500 h-full w-[98%] rounded-full"></div>
               </div>
               <button className="w-full py-2.5 bg-white/10 hover:bg-white/15 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/5 flex items-center justify-center gap-2">
                 Compliance Audit <ArrowUpRight size={12} />
               </button>
            </div>

            {/* Platform Impact Stats */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <h3 className="text-xs font-black text-slate-800 mb-5 tracking-widest uppercase">Performance</h3>
              <div className="space-y-5">
                <ImpactBar label="Uptime" value="100%" color="bg-green-500" />
                <ImpactBar label="Resolution" value="82%" color="bg-orange-500" />
                <ImpactBar label="Capacity" value="64%" color="bg-blue-500" />
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="h-6"></div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="group flex items-center gap-4 p-4 bg-white rounded-[1.2rem] border border-slate-100 transition-all hover:border-orange-100 hover:shadow-sm">
      <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-orange-50 transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-xs font-black text-slate-700">{value}</p>
      </div>
    </div>
  );
}

function ImpactBar({ label, value, color }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
        <span>{label}</span>
        <span className="text-slate-800">{value}</span>
      </div>
      <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: value }}></div>
      </div>
    </div>
  );
}