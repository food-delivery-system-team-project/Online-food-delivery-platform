import { useNavigate } from "react-router-dom";

const BackBtn = () => {
    const navigate = useNavigate();
  return (
    <div  className='z-9999 absolute top-25 left-5'>
        <div className="max-w-6xl mx-auto mb-6">
         <button
        onClick={() => {
         if (window.history.length > 1) {
         navigate(-1);
         } else {
         navigate("/");
         }
        }}
    className="flex items-center gap-2 px-5 py-2 text-[#ff6e4a] font-semibold rounded-full 
             bg-white/70 backdrop-blur-md 
             shadow-[0_0_25px_rgba(255,255,255,0.9)]
             border border-white/40
             hover:scale-105 transition" >
    ← Back
  </button>
</div>
    </div>
  )
}

export default BackBtn