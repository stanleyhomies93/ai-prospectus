import React from 'react';
export function CTA() {
  return <section id="contact" className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Transform Your IPO Process?
        </h2>
        <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
          Join companies that have successfully streamlined their IPO prospectus
          preparation with our platform.
        </p>
        <div className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Request a Demo
          </h3>
          <form>
            <div className="mb-4">
              <input type="text" placeholder="Company Name" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-4">
              <input type="email" placeholder="Email Address" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-4">
              <input type="tel" placeholder="Phone Number" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button type="submit" className="w-full bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 transition-colors">
              Schedule Demo
            </button>
          </form>
        </div>
      </div>
    </section>;
}