import React from 'react';
import { ClockIcon, ShieldIcon, UsersIcon, TrendingUpIcon } from 'lucide-react';
export function Benefits() {
  return <section id="benefits" className="w-full bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our IPO Prospectus Automation Platform delivers significant
            advantages over traditional methods.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <ClockIcon size={24} className="text-blue-700" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Time Efficiency
              </h3>
              <p className="text-gray-600">
                Reduce IPO documentation preparation time by up to 60% with
                automated workflows, templates, and collaboration tools. What
                typically takes months can be accomplished in weeks.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <ShieldIcon size={24} className="text-blue-700" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Reduced Risk
              </h3>
              <p className="text-gray-600">
                Our compliance validation engine and AI-assisted review process
                help identify potential issues early, reducing the risk of
                regulatory rejection or delays in the IPO process.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <UsersIcon size={24} className="text-blue-700" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Improved Collaboration
              </h3>
              <p className="text-gray-600">
                Bring all stakeholders together in one platform with role-based
                access, real-time commenting, and version control to eliminate
                silos and miscommunication.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <TrendingUpIcon size={24} className="text-blue-700" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Cost Savings
              </h3>
              <p className="text-gray-600">
                Significantly reduce billable hours from legal and financial
                consultants by streamlining document preparation, review, and
                revision processes in a centralized platform.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 bg-blue-50 p-8 rounded-lg">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              The Numbers Speak for Themselves
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-4xl font-bold text-blue-700">60%</p>
              <p className="text-gray-700">Reduction in preparation time</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-700">40%</p>
              <p className="text-gray-700">Lower consulting costs</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-700">90%</p>
              <p className="text-gray-700">First-time approval rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
}