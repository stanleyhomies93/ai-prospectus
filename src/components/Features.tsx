import React from 'react';
import { UserPlusIcon, FileTextIcon, UsersIcon, ShieldCheckIcon, PieChartIcon, BookOpenIcon, DatabaseIcon, FileOutputIcon } from 'lucide-react';
export function Features() {
  return <section id="features" className="w-full bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Core Platform Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive solution covers every aspect of the IPO prospectus
            preparation process.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <UserPlusIcon size={24} className="text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Company Onboarding
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Guided company detail collection</li>
              <li>• Document upload system</li>
              <li>• Secure information storage</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FileTextIcon size={24} className="text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Prospectus Generator
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Regulatory-aligned templates</li>
              <li>• Modular section forms</li>
              <li>• Smart content suggestions</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <UsersIcon size={24} className="text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Workflow & Collaboration
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Role-based access control</li>
              <li>• Task assignments with due dates</li>
              <li>• Version control & audit trail</li>
              <li>• Real-time commenting</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <ShieldCheckIcon size={24} className="text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Compliance & Validation
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Country-specific checklists</li>
              <li>• Auto-flagging of issues</li>
              <li>• AI-assisted red flag detection</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <PieChartIcon size={24} className="text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Cap Table Visualizer
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Manual or spreadsheet upload</li>
              <li>• Pre- and post-IPO structures</li>
              <li>• Interactive visualizations</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <BookOpenIcon size={24} className="text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Legal Clause Library
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Standard clause bank</li>
              <li>• AI-powered suggestions</li>
              <li>• Clause completion</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <DatabaseIcon size={24} className="text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Financial Data Integration
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Manual or upload options</li>
              <li>• Accounting software integration</li>
              <li>• Financial validation tools</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FileOutputIcon size={24} className="text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Output & Submission
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>• PDF and XBRL exports</li>
              <li>• Regulator-ready formatting</li>
              <li>• Submission guidance</li>
            </ul>
          </div>
        </div>
      </div>
    </section>;
}