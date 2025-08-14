import React from 'react';
import { CheckCircleIcon } from 'lucide-react';
export function Hero() {
  return <section className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Streamline Your IPO Prospectus Preparation
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            The complete platform that automates, simplifies, and ensures
            compliance for your IPO documentation process.
          </p>
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <CheckCircleIcon size={20} className="text-green-600 mr-2" />
              <span className="text-gray-700">
                Reduce preparation time by up to 60%
              </span>
            </div>
            <div className="flex items-center mb-2">
              <CheckCircleIcon size={20} className="text-green-600 mr-2" />
              <span className="text-gray-700">
                Ensure regulatory compliance
              </span>
            </div>
            <div className="flex items-center">
              <CheckCircleIcon size={20} className="text-green-600 mr-2" />
              <span className="text-gray-700">
                Seamless collaboration across teams
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button className="px-6 py-3 bg-blue-700 text-white rounded-md hover:bg-blue-800 text-center">
              Request Demo
            </button>
            <button className="px-6 py-3 border border-blue-700 text-blue-700 rounded-md hover:bg-blue-50 text-center">
              Learn More
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="IPO Prospectus Platform Dashboard" className="rounded-lg shadow-xl w-full max-w-md" />
        </div>
      </div>
    </section>;
}