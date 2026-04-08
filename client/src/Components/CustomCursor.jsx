import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-40 h-60 rounded-full pointer-events-none z-[9999] transition-transform duration-300 ease-out"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
    >
        <img className="h-65 w-60 rotate-300" src="./src/Images/Curser.png"/>
    </div>
    
  );
};

export default CustomCursor;