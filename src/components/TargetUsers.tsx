import React from 'react';
import { UsersIcon, ScaleIcon, BarChart3Icon, BriefcaseIcon, ClipboardCheckIcon, CalendarIcon } from 'lucide-react';
export function TargetUsers() {
  return <section id="users" className="w-full bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Who Benefits from Our Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform is designed for all stakeholders involved in the IPO
            process, providing specialized tools for each role.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <UsersIcon size={24} className="text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Company Founders & Executives
            </h3>
            <p className="text-gray-600">
              Gain full visibility into the IPO process, track progress, and
              make informed decisions with real-time data.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <ScaleIcon size={24} className="text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Legal Counsels
            </h3>
            <p className="text-gray-600">
              Access legal clause libraries, ensure regulatory compliance, and
              collaborate on document drafting efficiently.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <BarChart3Icon size={24} className="text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Auditors
            </h3>
            <p className="text-gray-600">
              Streamline financial data integration, validate figures, and
              ensure consistency across all documents.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <BriefcaseIcon size={24} className="text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Investment Bankers
            </h3>
            <p className="text-gray-600">
              Visualize cap tables, review prospectus sections, and coordinate
              with all parties in one centralized platform.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <ClipboardCheckIcon size={24} className="text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Regulatory Reviewers
            </h3>
            <p className="text-gray-600">
              Access submission-ready documents in required formats with
              comprehensive compliance validation.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <CalendarIcon size={24} className="text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Project Managers
            </h3>
            <p className="text-gray-600">
              Track progress, assign tasks, manage deadlines, and ensure all
              stakeholders stay aligned throughout the process.
            </p>
          </div>
        </div>
      </div>
    </section>;
}