import React, { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, ChevronRightIcon, BarChart3Icon, TargetIcon, TrendingUpIcon, AlertTriangleIcon, BookOpenIcon, BuildingIcon, PresentationIcon } from 'lucide-react';
import { FinancialData } from './FinancialDataUploader';
interface PresentationPreviewProps {
  financialData: FinancialData | null;
  riskFactors: Array<{
    title: string;
    description: string;
  }>;
  companyName: string;
  tickerSymbol: string;
  exchange: string;
}
export function PresentationPreview({
  financialData,
  riskFactors,
  companyName,
  tickerSymbol,
  exchange
}: PresentationPreviewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [{
    id: 'title',
    title: 'Title Slide',
    content: <div className="flex flex-col items-center justify-center text-center h-full">
          <h1 className="text-3xl font-bold text-blue-800 mb-4">
            {companyName}, Inc.
          </h1>
          <h2 className="text-xl text-gray-600 mb-6">
            Initial Public Offering
          </h2>
          <div className="flex items-center justify-center mb-6">
            <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded font-medium">
              {tickerSymbol}: {exchange}
            </div>
          </div>
          <p className="text-gray-500 text-sm">
            This presentation contains summary information about {companyName}'s
            IPO
          </p>
        </div>
  }, {
    id: 'investment-highlights',
    title: 'Investment Highlights',
    content: <div className="h-full">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6 pb-2 border-b border-gray-200">
            Investment Highlights
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <TrendingUpIcon size={20} className="text-blue-700" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    Market Leadership
                  </h3>
                  <p className="text-sm text-gray-600">
                    Leading provider of financial technology solutions with
                    proven market traction
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <TargetIcon size={20} className="text-blue-700" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    Scalable Business Model
                  </h3>
                  <p className="text-sm text-gray-600">
                    Highly scalable SaaS platform with recurring revenue streams
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <BuildingIcon size={20} className="text-blue-700" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    Strong IP Portfolio
                  </h3>
                  <p className="text-sm text-gray-600">
                    Robust patent portfolio protecting our proprietary
                    technology
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <BarChart3Icon size={20} className="text-blue-700" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    Growth Trajectory
                  </h3>
                  <p className="text-sm text-gray-600">
                    Consistent revenue growth with expanding profit margins
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
  }, {
    id: 'business-overview',
    title: 'Business Overview',
    content: <div className="h-full">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6 pb-2 border-b border-gray-200">
            Business Overview
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">
                Company Profile
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {companyName} is a financial technology company that provides
                innovative payment processing solutions for small and
                medium-sized businesses. Founded in 2015, we have developed
                proprietary software that integrates with existing point-of-sale
                systems.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Payment Processing
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Financial Technology
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  SMB Solutions
                </span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">
                Key Products & Services
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <ChevronRightIcon size={16} className="text-blue-600 mt-0.5 mr-1 flex-shrink-0" />
                  <span>
                    <strong>Payment Processing Platform:</strong> Secure,
                    compliant payment processing with multi-channel support
                  </span>
                </li>
                <li className="flex items-start">
                  <ChevronRightIcon size={16} className="text-blue-600 mt-0.5 mr-1 flex-shrink-0" />
                  <span>
                    <strong>Merchant Analytics Dashboard:</strong> Real-time
                    business intelligence and performance metrics
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
  }, {
    id: 'offering-details',
    title: 'Offering Details',
    content: <div className="h-full">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6 pb-2 border-b border-gray-200">
            Offering Details
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Offering Size
                  </h3>
                  <p className="text-lg font-semibold text-gray-900">
                    10,000,000 shares
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Price Range
                  </h3>
                  <p className="text-lg font-semibold text-gray-900">
                    $14.00 - $16.00
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Ticker Symbol
                  </h3>
                  <p className="text-lg font-semibold text-gray-900">
                    {tickerSymbol}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Exchange
                  </h3>
                  <p className="text-lg font-semibold text-gray-900">
                    {exchange}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">
                Use of Proceeds
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                We intend to use the net proceeds from this offering for:
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <ChevronRightIcon size={16} className="text-blue-600 mt-0.5 mr-1 flex-shrink-0" />
                  <span>Research and development of new product features</span>
                </li>
                <li className="flex items-start">
                  <ChevronRightIcon size={16} className="text-blue-600 mt-0.5 mr-1 flex-shrink-0" />
                  <span>Expansion of sales and marketing initiatives</span>
                </li>
                <li className="flex items-start">
                  <ChevronRightIcon size={16} className="text-blue-600 mt-0.5 mr-1 flex-shrink-0" />
                  <span>Potential strategic acquisitions</span>
                </li>
                <li className="flex items-start">
                  <ChevronRightIcon size={16} className="text-blue-600 mt-0.5 mr-1 flex-shrink-0" />
                  <span>Working capital and general corporate purposes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
  }, {
    id: 'financial-highlights',
    title: 'Financial Highlights',
    content: <div className="h-full">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6 pb-2 border-b border-gray-200">
            Financial Highlights
          </h2>
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-900 mb-4">
              Key Financial Metrics
            </h3>
            {financialData ? <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Metric
                      </th>
                      <th className="px-4 py-2 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        2021
                      </th>
                      <th className="px-4 py-2 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        2022
                      </th>
                      <th className="px-4 py-2 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        2023
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {financialData.rows.slice(0, 4).map((row, i) => <tr key={i}>
                        <td className="px-4 py-2 text-sm font-medium text-gray-900">
                          {row.label}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-500 text-right">
                          ${row.values[0]?.toLocaleString() || '-'}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-500 text-right">
                          ${row.values[1]?.toLocaleString() || '-'}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-500 text-right">
                          ${row.values[2]?.toLocaleString() || '-'}
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div> : <div className="text-center py-8 text-gray-500">
                <p>Financial data will be displayed here when available</p>
              </div>}
            <div className="mt-4 bg-blue-50 p-3 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> The above financial information is a
                summary. Please refer to the full prospectus for detailed
                financial statements and notes.
              </p>
            </div>
          </div>
        </div>
  }, {
    id: 'risk-factors',
    title: 'Risk Factors',
    content: <div className="h-full">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6 pb-2 border-b border-gray-200">
            Key Risk Factors
          </h2>
          <div className="space-y-4">
            {riskFactors.slice(0, 3).map((risk, index) => <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <AlertTriangleIcon size={20} className="text-orange-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">
                      {risk.title}
                    </h3>
                    <p className="text-sm text-gray-600">{risk.description}</p>
                  </div>
                </div>
              </div>)}
            {riskFactors.length > 3 && <div className="bg-gray-50 p-3 rounded-md text-center">
                <p className="text-sm text-gray-600">
                  Plus {riskFactors.length - 3} additional risk factors detailed
                  in the full prospectus
                </p>
              </div>}
            <div className="bg-blue-50 p-4 rounded-md">
              <div className="flex items-start">
                <BookOpenIcon size={20} className="text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-sm text-blue-800">
                  <strong>Important:</strong> This is a summary of select risk
                  factors. Investors should review the full prospectus for a
                  complete discussion of all risk factors before making an
                  investment decision.
                </p>
              </div>
            </div>
          </div>
        </div>
  }];
  const nextSlide = () => {
    setCurrentSlide(prev => prev === slides.length - 1 ? 0 : prev + 1);
  };
  const prevSlide = () => {
    setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1);
  };
  return <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="bg-gray-100 p-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <PresentationIcon size={18} className="text-blue-700 mr-2" />
          <h3 className="font-medium text-gray-800">
            {companyName} IPO Presentation
          </h3>
        </div>
        <div className="text-sm text-gray-500">
          Slide {currentSlide + 1} of {slides.length}
        </div>
      </div>
      <div className="p-6 h-[500px] bg-gray-50">
        <div className="bg-white h-full rounded-lg border border-gray-200 shadow-sm p-6 overflow-auto">
          {slides[currentSlide].content}
        </div>
      </div>
      <div className="bg-gray-100 p-3 border-t border-gray-200 flex items-center justify-between">
        <button className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 flex items-center" onClick={prevSlide}>
          <ArrowLeftIcon size={14} className="mr-1" />
          Previous
        </button>
        <div className="flex space-x-1">
          {slides.map((slide, index) => <button key={slide.id} className={`w-2.5 h-2.5 rounded-full ${currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'}`} onClick={() => setCurrentSlide(index)} aria-label={`Go to slide ${index + 1}`} />)}
        </div>
        <button className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 flex items-center" onClick={nextSlide}>
          Next
          <ArrowRightIcon size={14} className="ml-1" />
        </button>
      </div>
    </div>;
}