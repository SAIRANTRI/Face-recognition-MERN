import React from 'react';
import { Upload, Info } from "lucide-react"
import { NavLink } from 'react-router-dom';

const Button = ({ children, className, ...props }) => (
    <button className={`px-4 py-2 rounded-md transition duration-300 ${className}`} {...props}>
      {children}
    </button>
  )
const Home = () => {
  return (
    <main className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-6 text-white">Image Page</h2>
          <p className="text-xl mb-8 text-white">Subtitle content</p>
          
            <NavLink to="/upload">
            <Button className="bg-purple-600 text-white hover:bg-purple-700 text-lg px-6 py-3">
              Get Started
            </Button> 
            </NavLink>

          
        </div>
      </main>
  );
};

export default Home;