import Footer from "./Footer";
import MiniNav from "../Components/NavComp/MiniNav";

const Contact = () => {
  return (
    <div>
        <MiniNav/>
         <div className='h-screen relative w-full grid grid-cols-2 grid-rows-1 gap-5 items-center bg-white justify-center'>
            
            <div className="h-full flex flex-col items-center justify-center gap-5">
                <h1 className='text-[#28282B] text-8xl font-bold'>FEEDBACK</h1>
                <form className="h-1/2 w-1/2 flex flex-col justify-center items-center p-5 bg-gray-100 rounded-2xl" action="post">
                    <input type="text" placeholder="Name" name="name" className='p-3 outline-0 bg-gray-200 rounded-lg w-full mb-5' />
                    <input type="email" placeholder="Email" name="email" className='p-3 outline-0 bg-gray-200 rounded-lg w-full mb-5' />
                    <textarea placeholder="Message" name="message" className='p-3 outline-0 bg-gray-200 rounded-lg w-full mb-5 h-40' />
                    <button className='bg-[#ff6e4a] w-full py-3 text-white font-bold rounded-lg'>Send Message</button>
                </form>
            </div>
            <div className="h-full w-full p-10 relative">
                <div className="h-4/5 w-full rounded-3xl bg-gray-100 flex justify-center items-center">
                    <h1 className='text-[#28282B] text-6xl font-bold absolute top-20 left-20'>FAQ</h1>
                    <span></span>
                </div>
                </div>
            </div>
            
            <Footer/>
    </div>
  )
}

export default Contact