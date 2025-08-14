import React from 'react';
import { MenuIcon } from 'lucide-react';
export function Header() {
  return <header className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-blue-700">
            IPO Prospectus Pro
          </h1>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#features" className="text-gray-600 hover:text-blue-700">
            Features
          </a>
          <a href="#users" className="text-gray-600 hover:text-blue-700">
            Who It's For
          </a>
          <a href="#demo" className="text-gray-600 hover:text-blue-700">
            Demo
          </a>
          <a href="#benefits" className="text-gray-600 hover:text-blue-700">
            Benefits
          </a>
          <a href="#contact" className="text-gray-600 hover:text-blue-700">
            Contact
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="hidden md:block px-4 py-2 text-blue-700 border border-blue-700 rounded hover:bg-blue-50">
            Login
          </button>
          <button className="hidden md:block px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800">
            Get Started
          </button>
          <button className="md:hidden text-gray-600">
            <MenuIcon size={24} />
          </button>
        </div>
      </div>
    </header>;
}