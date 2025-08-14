import React, { useState } from 'react';
import { BellIcon, HelpCircleIcon, UserIcon, MenuIcon, XIcon } from 'lucide-react';
export function AppHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-xl font-bold text-blue-700 mr-8">
            IPO Prospectus Pro
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-900 font-medium">
              Dashboard
            </a>
            <a href="#" className="text-blue-700 font-medium border-b-2 border-blue-700 pb-1">
              Prospectus Generator
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Documents
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Templates
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
            <HelpCircleIcon size={20} />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
            <BellIcon size={20} />
          </button>
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 border border-gray-300 rounded-full hover:bg-gray-50 cursor-pointer">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <UserIcon size={16} className="text-blue-700" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              John Smith
            </span>
          </div>
          <button className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {menuOpen && <div className="md:hidden bg-white border-b border-gray-200 py-2">
          <nav className="flex flex-col space-y-2 px-4">
            <a href="#" className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Dashboard
            </a>
            <a href="#" className="px-3 py-2 bg-blue-50 text-blue-700 font-medium rounded">
              Prospectus Generator
            </a>
            <a href="#" className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Documents
            </a>
            <a href="#" className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Templates
            </a>
            <div className="border-t border-gray-200 my-2 pt-2">
              <div className="flex items-center space-x-2 px-3 py-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserIcon size={16} className="text-blue-700" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  John Smith
                </span>
              </div>
            </div>
          </nav>
        </div>}
    </header>;
}