import React, { useState, useEffect } from "react";
import * as Slider from "@radix-ui/react-slider";
import { 
  Upload, Utensils, IndianRupee, FileText, Type, 
  Image as ImageIcon, Flame, Trash2, FolderPlus, 
  Layers3, Target, CheckCircle2, AlertCircle, X, ChevronDown
} from "lucide-react";

const initialFormState = {
  dishName: "",
  category: "Select Category",
  dietary: "veg",
  price: 199,
  calories: "",
  description: ""
};

const categories = ["Main Course", "Starters", "Beverages", "Desserts", "Fast Food"];

const Addfood = () => {
  const [form, setForm] = useState(() => {
    const savedDraft = localStorage.getItem("food_draft");
    return savedDraft ? JSON.parse(savedDraft) : initialFormState;
  });
  
  const [imagePreview, setImagePreview] = useState(null);
  const [draftStatus, setDraftStatus] = useState("idle");
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  // Auto-Save Logic
  useEffect(() => {
    if (JSON.stringify(form) !== JSON.stringify(initialFormState)) {
      setDraftStatus("saving");
      const timeout = setTimeout(() => {
        localStorage.setItem("food_draft", JSON.stringify(form));
        setDraftStatus("saved");
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [form]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const confirmDiscard = () => {
    setForm(initialFormState);
    setImagePreview(null);
    localStorage.removeItem("food_draft");
    setDraftStatus("idle");
    setShowDiscardModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto pb-10 animate-in fade-in duration-700 relative">
      
      {/* Header Area */}
      <div className="flex justify-between items-end mb-8 px-2">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Add New Dish</h1>
          <p className="text-slate-500 font-medium text-sm">Fill in the details to update your digital menu.</p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${draftStatus === 'saving' ? 'bg-orange-50 text-orange-500' : 'bg-green-50 text-green-600'}`}>
          <div className={`w-2 h-2 rounded-full ${draftStatus === 'saving' ? 'bg-orange-400 animate-pulse' : 'bg-green-500'}`}></div>
          {draftStatus === 'saving' ? 'Auto-Saving...' : 'Draft Saved'}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
            <SectionHeader icon={<Utensils size={18}/>} title="General Details" />
            
            <div className="grid md:grid-cols-2 gap-6">
              <CustomInput label="Dish Name" icon={<Type size={16}/>}>
                <input type="text" name="dishName" value={form.dishName} onChange={handleInputChange} placeholder="e.g. Special Thali" className="input-style" />
              </CustomInput>

              {/* CUSTOM CATEGORY DROPDOWN (Profile Style) */}
              <div className="flex flex-col gap-2 relative">
                <label className="label-style">Category</label>
                <button 
                  type="button"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="w-full flex items-center justify-between pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-orange-400/20 focus:border-orange-400 outline-none transition-all font-bold text-slate-700 text-left"
                >
                  <Layers3 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <span>{form.category}</span>
                  <ChevronDown size={16} className={`transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                </button>

                {isCategoryOpen && (
                  <div className="absolute top-[105%] left-0 w-full bg-white border border-slate-100 rounded-2xl shadow-xl z-50 p-2 animate-in zoom-in-95 duration-200">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => { setForm({...form, category: cat}); setIsCategoryOpen(false); }}
                        className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <CustomInput label="Calories" icon={<Flame size={16}/>}>
                <div className="relative">
                  <input type="number" name="calories" value={form.calories} onChange={handleInputChange} placeholder="450" className="input-style no-spinner pr-12" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest pointer-events-none">kcal</span>
                </div>
              </CustomInput>

              <div className="flex flex-col gap-2">
                <label className="label-style">Dietary Type</label>
                <div className="flex p-1 bg-slate-100 rounded-2xl h-[52px]">
                  {['veg', 'nonveg'].map(type => (
                    <button key={type} type="button" onClick={() => setForm({...form, dietary: type})} className={`flex-1 flex items-center justify-center rounded-xl text-[11px] font-black uppercase transition-all ${form.dietary === type ? 'bg-white shadow-sm text-orange-600 border border-slate-200/50' : 'text-slate-500'}`}>
                      {type === 'veg' ? '🌿 Veg' : '🍗 Non-Veg'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <CustomInput label="Description" icon={<FileText size={16}/>}>
              <textarea name="description" value={form.description} onChange={handleInputChange} rows="4" placeholder="Briefly describe the taste and ingredients..." className="input-style py-4 h-32 resize-none" />
            </CustomInput>

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button onClick={() => setShowDiscardModal(true)} type="button" className="flex-1 py-4 bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                <Trash2 size={16}/> Discard Changes
              </button>
              <button type="submit" className="flex-[2] py-4 bg-slate-900 text-white hover:bg-black rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2">
                <FolderPlus size={16}/> Publish to Menu
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-6">
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <SectionHeader icon={<ImageIcon size={18}/>} title="Dish Photo" />
            <div className="relative group aspect-[16/10] rounded-3xl overflow-hidden border-2 border-dashed border-slate-200 hover:border-orange-400 transition-all cursor-pointer bg-slate-50">
              <input type="file" accept="image/png" className="absolute inset-0 opacity-0 z-10 cursor-pointer" onChange={(e) => setImagePreview(URL.createObjectURL(e.target.files[0]))} />
              {imagePreview ? (
                <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 group-hover:text-orange-500 transition-colors text-center p-4">
                  <div className="p-4 bg-white rounded-2xl shadow-sm mb-3"><Upload size={24}/></div>
                  <p className="text-[10px] font-black uppercase">Drop PNG image here</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <SectionHeader icon={<IndianRupee size={18}/>} title="Price Settings" />
              <div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-xl">
                 <span className="text-orange-600 font-black text-xs">₹</span>
                 <input type="number" name="price" value={form.price} onChange={handleInputChange} className="w-14 bg-transparent font-black text-orange-600 outline-none text-right no-spinner" />
              </div>
            </div>
            <Slider.Root className="relative flex items-center select-none touch-none w-full h-5 mb-2" value={[form.price]} onValueChange={(val) => setForm({...form, price: val[0]})} max={2000} step={10}>
              <Slider.Track className="bg-slate-100 relative grow rounded-full h-1.5 overflow-hidden border border-slate-50">
                <Slider.Range className="absolute bg-gradient-to-r from-orange-400 to-red-500 h-full" />
              </Slider.Track>
              <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-orange-500 rounded-full shadow-lg cursor-pointer focus:ring-4 focus:ring-orange-100 transition-all" />
            </Slider.Root>
            <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase mt-1">
              <span>Min ₹0</span>
              <span>Max ₹2000</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-600 p-7 rounded-[2.5rem] text-white relative overflow-hidden group shadow-lg shadow-orange-100">
            <Target size={80} className="absolute -right-4 -bottom-4 opacity-10 group-hover:rotate-12 transition-transform duration-500" />
            <h4 className="text-sm font-black mb-2 flex items-center gap-2"><CheckCircle2 size={16}/> Marketing Insight</h4>
            <p className="text-xs text-orange-50 leading-relaxed font-medium">A clear PNG image with a precise price slider can increase your sales by up to <span className="font-black text-white">32%</span>.</p>
          </div>
        </div>
      </div>

      {/* MODAL POPUP */}
      {showDiscardModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowDiscardModal(false)}></div>
          <div className="relative bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200 text-center">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-[1.5rem] flex items-center justify-center mb-6 mx-auto">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">Discard Changes?</h3>
            <p className="text-slate-500 text-sm font-medium mb-8">Are you sure you want to discard this dish? All progress will be lost.</p>
            <div className="flex flex-col w-full gap-3">
              <button onClick={confirmDiscard} className="w-full py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all">Yes, Discard Everything</button>
              <button onClick={() => setShowDiscardModal(false)} className="w-full py-4 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-2xl text-xs font-black uppercase tracking-widest transition-all">No, Keep Editing</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .input-style {
          width: 100%;
          padding-left: 3rem;
          padding-right: 1rem;
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;
          background-color: #f8fafc;
          border: 1px solid #f1f5f9;
          border-radius: 1.25rem;
          outline: none;
          transition: all 0.2s;
          font-weight: 500;
        }
        .input-style:focus {
          border-color: #fb923c;
          box-shadow: 0 0 0 4px rgba(251, 146, 60, 0.1);
        }
        /* CSS to remove top/down arrows in number fields */
        .no-spinner::-webkit-inner-spin-button, 
        .no-spinner::-webkit-outer-spin-button { 
          -webkit-appearance: none; 
          margin: 0; 
        }
        .no-spinner {
          -moz-appearance: textfield;
        }
        .label-style {
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #94a3b8;
          margin-left: 0.25rem;
        }
      `}</style>
    </div>
  );
};

const SectionHeader = ({ icon, title }) => (
  <div className="flex items-center gap-3 mb-2">
    <div className="p-2.5 bg-orange-50 text-orange-500 rounded-xl">{icon}</div>
    <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.1em]">{title}</h3>
  </div>
);

const CustomInput = ({ label, icon, children }) => (
  <div className="flex flex-col gap-2 w-full">
    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</label>
    <div className="relative flex items-center">
      <div className="absolute left-4 z-10 text-slate-400">{icon}</div>
      {children}
    </div>
  </div>
);

export default Addfood;