import { motion } from "motion/react"
import img1 from "../Images/slides/1.png"
import img2 from "../Images/slides/2.png"
import img3 from "../Images/slides/3.png"
import img4 from "../Images/slides/4.png"
import img5 from "../Images/slides/5.png"
import img6 from "../Images/slides/6.png"
import img7 from "../Images/slides/7.png"
import img8 from "../Images/slides/4.png"
import img9 from "../Images/slides/5.png"
import img10 from "../Images/slides/6.png"
import img11 from "../Images/slides/7.png"
import img12 from "../Images/slides/4.png"
import img13 from "../Images/slides/5.png"



const Home = () => {


  return (
    <>
    <div className='h-screen w-full bg-[#ff6e4a] overflow-hidden relative'>
      <div className="h-200 w-200 absolute top-75 left-30" >
      <img className="absolute top-50 left-0 w-40 h-50" src="./src/Images/home-bag-logo.png" alt="" />
      <h1 className="absolute text-8xl top-0 font-bold text-white">Delicious Food, Delivered Fast</h1>
      <p className="absolute top-60 left-50 text-3xl text-white">Experience the joy of food delivery with us. Order now and savor the flavors!</p>
      <motion.button className="absolute top-85 left-50 bg-white text-[#ff6e4a] font-bold px-5 py-3 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        Order Now
      </motion.button>
      </div>
    <motion.div className="image top-100 right-[-400px]"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      {[img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13].map((img, index) => (
          <div key={index} className="item" style={{ "--i": index + 1 }}>
            <img
              className="item"
              src={img}
            />
          </div>
        ))}
      </motion.div>
      <div className="h-20 w-full bottom-0 flex justify-center items-center absolute z-10">
        <motion.div
        whileHover={{
    y: -20,
    transition: { type: "spring", stiffness: 300 }
  }}
         className="h-60 w-400 rounded-4xl bg-white/80 flex justify-between p-10 items-center">
          <h1 className="text-3xl font-bold text-center text-black/60 pt-5">Explore The Delicious Meal Here</h1>
          <div className="flex gap-5 mt-5">
            <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
             className="bg-[#ff6e4a] text-white font-bold px-5 py-3 rounded-lg">
              See All
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
    
    <div className="h-screen w-full bg-white overflow-hidden relative">

    </div>
    </>
  )
}

export default Home