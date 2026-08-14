import MiniNav from "../Components/NavComp/MiniNav";

const Contact = () => {
  return (
    <div>
      <MiniNav />

      <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 gap-10 px-5 md:px-10 py-10 bg-white">

        {/* LEFT - FEEDBACK */}
        <div className="flex flex-col items-center justify-center gap-6">

          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-[#28282B] text-center">
            FEEDBACK
          </h1>

          <form className="w-full max-w-md flex flex-col p-5 md:p-8 bg-gray-100 rounded-2xl shadow">

            <input
              type="text"
              placeholder="Name"
              className="p-3 bg-gray-200 rounded-lg mb-4 outline-none"
            />

            <input
              type="email"
              placeholder="Email"
              className="p-3 bg-gray-200 rounded-lg mb-4 outline-none"
            />

            <textarea
              placeholder="Message"
              className="p-3 bg-gray-200 rounded-lg mb-4 outline-none h-32 md:h-40"
            />

            <button className="bg-[#ff6e4a] py-3 text-white font-bold rounded-lg hover:opacity-90">
              Send Message
            </button>

          </form>
        </div>

        {/* RIGHT - FAQ */}
        <div className="flex items-center justify-center">

          <div className="w-full max-w-lg h-[400px] md:h-[500px] rounded-3xl bg-gray-100 p-6 relative flex flex-col justify-start">

            <h1 className="text-2xl md:text-4xl font-bold text-[#28282B] mb-4">
              FAQ
            </h1>

            {/* SAMPLE FAQ */}
            <div className="flex flex-col gap-3 text-sm md:text-base">
              <p><strong>Q:</strong> How to order?</p>
              <p className="text-gray-600">Browse food and click order.</p>

              <p><strong>Q:</strong> Payment methods?</p>
              <p className="text-gray-600">UPI, Cards, COD supported.</p>

              <p><strong>Q:</strong> Delivery time?</p>
              <p className="text-gray-600">Usually 20–40 minutes.</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;