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
import Navbar from "../Components/Navbar"
import Footer from "./Footer"
import FoodCard from "../Components/Card/FoodCard"



const Home = () => {
  const data = [
  {
    "id": 1,
    "foodName": "Cheese Burger",
    "prepTime": "25 min",
    "isSaved": false,
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    "storeName": "Burger Hub",
    "rating": 4.5,
    "totalRatings": 120,
    "price": 8.99
  },
  {
    "id": 2,
    "foodName": "Margherita Pizza",
    "prepTime": "30 min",
    "isSaved": true,
    "image": "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    "storeName": "Italiano Pizza",
    "rating": 4.7,
    "totalRatings": 210,
    "price": 12.49
  },
  {
    "id": 3,
    "foodName": "Chicken Momos",
    "prepTime": "20 min",
    "isSaved": false,
    "image": "https://images.unsplash.com/photo-1625944195735-8c5f9e1f0f6e",
    "storeName": "Momo Street",
    "rating": 4.3,
    "totalRatings": 95,
    "price": 6.99
  },
  {
    "id": 4,
    "foodName": "Pasta Alfredo",
    "prepTime": "35 min",
    "isSaved": true,
    "image": "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5",
    "storeName": "Pasta Palace",
    "rating": 4.6,
    "totalRatings": 180,
    "price": 10.99
  },
  {
    "id": 5,
    "foodName": "Paneer Tikka",
    "prepTime": "28 min",
    "isSaved": false,
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    "storeName": "Spice Garden",
    "rating": 4.4,
    "totalRatings": 150,
    "price": 9.49
  },
  {
    "id": 6,
    "foodName": "Chicken Biryani",
    "prepTime": "40 min",
    "isSaved": true,
    "image": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
    "storeName": "Biryani House",
    "rating": 4.8,
    "totalRatings": 320,
    "price": 13.99
  },
  {
    "id": 7,
    "foodName": "Veg Sandwich",
    "prepTime": "15 min",
    "isSaved": false,
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
    "storeName": "Snack Corner",
    "rating": 4.2,
    "totalRatings": 80,
    "price": 5.49
  },
  {
    "id": 8,
    "foodName": "Chocolate Cake",
    "prepTime": "45 min",
    "isSaved": true,
    "image": "https://images.unsplash.com/photo-1605478520508-7c3b1b2fbb17",
    "storeName": "Sweet Treats",
    "rating": 4.9,
    "totalRatings": 410,
    "price": 15.99
  },
  {
    "id": 9,
    "foodName": "French Fries",
    "prepTime": "18 min",
    "isSaved": false,
    "image": "https://images.unsplash.com/photo-1576107232684-1279f390859f",
    "storeName": "Fry World",
    "rating": 4.1,
    "totalRatings": 60,
    "price": 4.99
  },
  {
    "id": 10,
    "foodName": "Tandoori Chicken",
    "prepTime": "38 min",
    "isSaved": true,
    "image": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    "storeName": "Grill Master",
    "rating": 4.7,
    "totalRatings": 275,
    "price": 14.49
  },
  {
    "id": 11,
    "foodName": "Veg Biryani",
    "prepTime": "35 min",
    "isSaved": false,
    "image": "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
    "storeName": "Biryani Junction",
    "rating": 4.3,
    "totalRatings": 140,
    "price": 11.49
  },
  {
    "id": 12,
    "foodName": "Masala Dosa",
    "prepTime": "20 min",
    "isSaved": true,
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976",
    "storeName": "South Spice",
    "rating": 4.6,
    "totalRatings": 200,
    "price": 7.99
  },
  {
    "id": 13,
    "foodName": "Chole Bhature",
    "prepTime": "25 min",
    "isSaved": false,
    "image": "https://images.unsplash.com/photo-1626132647523-66e7b4f6b31a",
    "storeName": "Delhi Delight",
    "rating": 4.5,
    "totalRatings": 175,
    "price": 8.49
  },
  {
    "id": 14,
    "foodName": "Spring Rolls",
    "prepTime": "18 min",
    "isSaved": false,
    "image": "https://images.unsplash.com/photo-1604908177522-4321dc9f5a9d",
    "storeName": "Asian Bites",
    "rating": 4.2,
    "totalRatings": 90,
    "price": 6.49
  },
  {
    "id": 15,
    "foodName": "Fried Rice",
    "prepTime": "22 min",
    "isSaved": true,
    "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
    "storeName": "Wok Express",
    "rating": 4.4,
    "totalRatings": 130,
    "price": 9.99
  },
  {
    "id": 16,
    "foodName": "Ice Cream Sundae",
    "prepTime": "10 min",
    "isSaved": false,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
    "storeName": "Cool Scoops",
    "rating": 4.7,
    "totalRatings": 220,
    "price": 5.99
  },
  {
    "id": 17,
    "foodName": "Grilled Sandwich",
    "prepTime": "15 min",
    "isSaved": true,
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
    "storeName": "Snack Stop",
    "rating": 4.1,
    "totalRatings": 75,
    "price": 5.49
  },
  {
    "id": 18,
    "foodName": "Chicken Nuggets",
    "prepTime": "18 min",
    "isSaved": false,
    "image": "https://images.unsplash.com/photo-1606756790138-261d2b21cdcf",
    "storeName": "Fast Bites",
    "rating": 4.5,
    "totalRatings": 160,
    "price": 7.99
  },
  {
    "id": 19,
    "foodName": "Paneer Butter Masala",
    "prepTime": "30 min",
    "isSaved": true,
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7",
    "storeName": "Royal Kitchen",
    "rating": 4.8,
    "totalRatings": 300,
    "price": 12.99
  },
  {
    "id": 20,
    "foodName": "Garlic Bread",
    "prepTime": "12 min",
    "isSaved": false,
    "image": "https://images.unsplash.com/photo-1585238342024-78d387f4a707",
    "storeName": "Bake House",
    "rating": 4.3,
    "totalRatings": 110,
    "price": 4.99
  },
  {
    "id": 21,
    "foodName": "Chicken Shawarma",
    "prepTime": "20 min",
    "isSaved": true,
    "image": "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56",
    "storeName": "Arabian Nights",
    "rating": 4.6,
    "totalRatings": 190,
    "price": 8.99
  },
  {
    "id": 22,
    "foodName": "Veg Noodles",
    "prepTime": "18 min",
    "isSaved": false,
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246",
    "storeName": "Noodle Bar",
    "rating": 4.2,
    "totalRatings": 95,
    "price": 7.49
  },
  {
    "id": 23,
    "foodName": "Tacos",
    "prepTime": "20 min",
    "isSaved": true,
    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
    "storeName": "Mexican Fiesta",
    "rating": 4.5,
    "totalRatings": 145,
    "price": 9.99
  },
  {
    "id": 24,
    "foodName": "Hot Dog",
    "prepTime": "15 min",
    "isSaved": false,
    "image": "https://images.unsplash.com/photo-1550547660-d9450f859349",
    "storeName": "Street Bites",
    "rating": 4.1,
    "totalRatings": 70,
    "price": 5.99
  },
  {
    "id": 25,
    "foodName": "Pav Bhaji",
    "prepTime": "22 min",
    "isSaved": true,
    "image": "https://images.unsplash.com/photo-1617191519105-d07b98b10de1",
    "storeName": "Mumbai Tadka",
    "rating": 4.7,
    "totalRatings": 210,
    "price": 6.99
  },
  {
    "id": 26,
    "foodName": "Samosa",
    "prepTime": "12 min",
    "isSaved": false,
    "image": "https://images.unsplash.com/photo-1601050690117-2d5c9b0a3f6d",
    "storeName": "Desi Snacks",
    "rating": 4.4,
    "totalRatings": 130,
    "price": 2.99
  },
  {
    "id": 27,
    "foodName": "Cupcakes",
    "prepTime": "30 min",
    "isSaved": true,
    "image": "https://images.unsplash.com/photo-1589308078054-8323c6b74c4c",
    "storeName": "Sweet Tooth",
    "rating": 4.8,
    "totalRatings": 260,
    "price": 7.49
  },
  {
    "id": 28,
    "foodName": "Chicken Wrap",
    "prepTime": "18 min",
    "isSaved": false,
    "image": "https://images.unsplash.com/photo-1600891963935-c8c1b5d1a3e6",
    "storeName": "Wrap & Roll",
    "rating": 4.3,
    "totalRatings": 120,
    "price": 8.49
  },
  {
    "id": 29,
    "foodName": "Falafel",
    "prepTime": "20 min",
    "isSaved": true,
    "image": "https://images.unsplash.com/photo-1604908176995-431e3cdb4e9f",
    "storeName": "Middle East Hub",
    "rating": 4.5,
    "totalRatings": 150,
    "price": 7.99
  },
  {
    "id": 30,
    "foodName": "Brownie",
    "prepTime": "25 min",
    "isSaved": false,
    "image": "https://images.unsplash.com/photo-1606312619349-4b1cdb9cbd58",
    "storeName": "Bake Bliss",
    "rating": 4.9,
    "totalRatings": 340,
    "price": 6.49
  }
  
]


  return (
    <>
    <Navbar />
    <div className='h-screen w-full bg-[#ff6e4a] overflow-hidden relative'>

      {/* text content  */}
      <div className="h-200 w-200 absolute top-75 left-30" >
      <img className="absolute top-50 left-0 w-40 h-50" src="./src/Images/home-bag-logo.png" alt="" />
      <h1 className="absolute text-8xl top-0 font-bold text-white">Delicious Food, Delivered Fast</h1>
      <p className="absolute top-60 left-50 text-3xl text-white">Experience the joy of food delivery with us. Order now and savor the flavors!</p>
      <motion.button className="absolute top-85 left-50 bg-white text-[#ff6e4a] font-bold px-5 py-3 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        Order Now
      </motion.button>
      </div>

      {/* rotating images */}
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

      {/* food section */}
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
    
    {/* 2nd page */}
    <div className="h-screen w-full bg-[#faf1ee] overflow-y-scroll flex-wrap flex gap-5 p-10 relative">
      {data.map((items)=>(
        <FoodCard key={items.id} props={items} />
      ))}

    </div>

    {/* 3rd page */}
    <div className="h-screen w-full bg-[#faf1ee] overflow-hidden relative">

    </div>

    <Footer/>
    </>
  )
}

export default Home