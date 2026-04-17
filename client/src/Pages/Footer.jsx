import { FaInstagram } from "react-icons/fa";   
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
        <div className='h-full w-full bg-gray-200 grid rounded-t-3xl grid-cols-1 gird-rows-3'>
            <div className='h-full w-full grid gap-5 grid-cols-3 gird-rows-1 p-10'>
                <span className='flex flex-col gap-5 items-center bg-[#ff6e4a] p-10 rounded-2xl'>
                    <h1 className='text-[#28282B] text-5xl font-bold'>Email Support</h1>
                    <p className='text-[#28282B] text-xl text-center font-bold'>General Support: support@foodexpress.com
                        Orders & Refunds: orders@foodexpress.com
                        Business/Partners: partners@foodexpress.com</p>
                </span>
                 <span className='flex flex-col gap-5 items-center bg-[#ff6e4a] p-10 rounded-2xl'>
                    <h1 className='text-[#28282B] text-5xl font-bold'>Office Address</h1>
                    <p className='text-[#28282B] text-xl text-center font-bold'>FoodExpress Pvt. Ltd.2nd Floor, Tech Park Plaza MG Road, Indore, Madhya Pradesh – 452001 India</p>
                </span>
                 <span className='flex flex-col gap-5 items-center bg-[#ff6e4a] p-10 rounded-2xl'>
                    <h1 className='text-[#28282B] text-5xl font-bold'>Customer Support</h1>
                    <p className='text-[#28282B] text-xl text-center font-bold'>
                        Phone: +91 98765 43210<br/>
                        Alternate Phone: +91 91234 56780
                    </p>
                 </span>
            </div>
            <div className='h-full w-full justify-items-center grid gap-5 grid-cols-2 gird-rows-1 p-10'>
            <span>
            <h1 className='text-[#28282B] text-8xl font-bold'>Social Media</h1>
            <ul className="flex gap-5 mt-5 text-2xl font-bold">
                    <li>
                        <FaInstagram />
                        <a href="/pagenotfound">@foodexpress_app</a>
                    </li>
                    <li>
                        <FaXTwitter />
                        <a href="/pagenotfound">@foodexpress_in</a>
                    </li>
                    <li>
                        <FaFacebook />
                        <a href="/pagenotfound">FoodExpress India</a>
                    </li>
                </ul>
            </span>
            <span className="flex gap-5 flex-col justify-center items-center">
               <h1 className='text-[#28282B] text-8xl font-bold'>Working Hours</h1>
               <p className="text-2xl font-bold">Monday to Sunday: 8:00 AM - 11:00 PM (IST)</p>
            </span>
            </div>


        </div>
    </div>
  )
}

export default Footer