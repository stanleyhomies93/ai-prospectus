import React, { useState } from 'react';
import { FileTextIcon, CheckIcon, PlusIcon, EditIcon, EyeIcon, DownloadIcon, ArrowLeftIcon, ArrowRightIcon, BookOpenIcon, ClipboardCheckIcon, PanelLeftIcon, PanelRightIcon, LayoutTemplateIcon, ExternalLinkIcon, FileSpreadsheetIcon, TableIcon, ChevronDownIcon, ChevronRightIcon, SaveIcon, FolderIcon, FileIcon, SearchIcon, SettingsIcon, AlertTriangleIcon, TrashIcon, PresentationIcon, MonitorIcon, ChevronsRightIcon } from 'lucide-react';
import { SECDocumentPreview } from './SECDocumentPreview';
import { FinancialDataUploader, FinancialData } from './FinancialDataUploader';
import { FinancialDataPreview } from './FinancialDataPreview';
import { PresentationPreview } from './PresentationPreview';
export function ProspectusGenerator() {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState('standard');
  const [expandedSection, setExpandedSection] = useState('businessOverview');
  const [showSECPreview, setShowSECPreview] = useState(false);
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showPresentationPreview, setShowPresentationPreview] = useState(false);
  const [riskFactors, setRiskFactors] = useState([{
    title: 'Competitive Market Risk',
    description: 'We operate in a highly competitive market with numerous established competitors who may have greater resources than us.'
  }, {
    title: 'Technology Risk',
    description: 'Our business depends on the continued functionality and security of our technology platform. Any significant disruption or breach could harm our operations and reputation.'
  }, {
    title: 'Regulatory Risk',
    description: 'We are subject to complex and evolving regulations. Changes in these regulations or failure to comply could adversely affect our business.'
  }]);
  const [newRiskTitle, setNewRiskTitle] = useState('');
  const [newRiskDescription, setNewRiskDescription] = useState('');
  const handleStepChange = step => {
    setActiveStep(step);
  };
  const handleTemplateSelect = template => {
    setSelectedTemplate(template);
  };
  const handleSectionToggle = section => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  const toggleSECPreview = () => {
    setShowSECPreview(!showSECPreview);
    setShowPresentationPreview(false);
  };
  const togglePresentationPreview = () => {
    setShowPresentationPreview(!showPresentationPreview);
    setShowSECPreview(false);
  };
  const handleFinancialDataParsed = (data: FinancialData) => {
    setFinancialData(data);
  };
  const resetFinancialData = () => {
    setFinancialData(null);
  };
  const handleAddRiskFactor = () => {
    if (newRiskTitle.trim() === '' || newRiskDescription.trim() === '') return;
    setRiskFactors([...riskFactors, {
      title: newRiskTitle,
      description: newRiskDescription
    }]);
    setNewRiskTitle('');
    setNewRiskDescription('');
  };
  const handleRemoveRiskFactor = (index: number) => {
    setRiskFactors(riskFactors.filter((_, i) => i !== index));
  };
  return <div className="h-full flex flex-col">
      {/* App Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <button className="mr-4 p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded" onClick={() => setShowSidebar(!showSidebar)}>
            {showSidebar ? <PanelLeftIcon size={20} /> : <PanelRightIcon size={20} />}
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            TechFin Solutions IPO Prospectus
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded flex items-center">
            <SaveIcon size={16} className="mr-1.5" />
            <span>Save</span>
          </button>
          <button className="px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded flex items-center">
            <SettingsIcon size={16} className="mr-1.5" />
            <span>Settings</span>
          </button>
          <button className="px-3 py-1.5 bg-blue-700 text-white rounded hover:bg-blue-800 flex items-center" onClick={toggleSECPreview}>
            <EyeIcon size={16} className="mr-1.5" />
            <span>Preview</span>
          </button>
        </div>
      </div>
      <div className="flex-1 flex">
        {/* Sidebar */}
        {showSidebar && <div className="w-64 border-r border-gray-200 bg-white flex flex-col">
            {/* Progress indicator */}
            <div className="px-4 py-3 border-b border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Document Progress
                </span>
                <span className="text-xs font-medium text-blue-700">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-blue-600 h-1.5 rounded-full w-[45%]"></div>
              </div>
            </div>
            {/* Steps */}
            <div className="overflow-y-auto flex-1">
              <div className="px-2 py-3">
                <div className={`px-2 py-1.5 rounded flex items-center ${activeStep === 1 ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleStepChange(1)}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${activeStep === 1 ? 'bg-blue-700 text-white' : activeStep > 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    {activeStep > 1 ? <CheckIcon size={12} /> : '1'}
                  </div>
                  <span className="text-sm font-medium">Select Template</span>
                </div>
              </div>
              <div className="px-2 py-3">
                <div className={`px-2 py-1.5 rounded flex items-center ${activeStep === 2 ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleStepChange(2)}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${activeStep === 2 ? 'bg-blue-700 text-white' : activeStep > 2 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    {activeStep > 2 ? <CheckIcon size={12} /> : '2'}
                  </div>
                  <span className="text-sm font-medium">Add Content</span>
                </div>
                {activeStep >= 2 && <div className="ml-7 mt-2 space-y-1">
                    <div className={`px-2 py-1.5 rounded flex items-center text-sm ${expandedSection === 'prospectusOverview' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`} onClick={() => handleSectionToggle('prospectusOverview')}>
                      <BookOpenIcon size={14} className="mr-2" />
                      <span>Prospectus Overview</span>
                      <CheckIcon size={14} className="ml-auto text-green-600" />
                    </div>
                    <div className={`px-2 py-1.5 rounded flex items-center text-sm ${expandedSection === 'riskFactors' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`} onClick={() => handleSectionToggle('riskFactors')}>
                      <ClipboardCheckIcon size={14} className="mr-2" />
                      <span>Risk Factors</span>
                      <CheckIcon size={14} className="ml-auto text-green-600" />
                    </div>
                    <div className={`px-2 py-1.5 rounded flex items-center text-sm ${expandedSection === 'businessOverview' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`} onClick={() => handleSectionToggle('businessOverview')}>
                      <PanelLeftIcon size={14} className="mr-2" />
                      <span>Business Overview</span>
                    </div>
                    <div className={`px-2 py-1.5 rounded flex items-center text-sm ${expandedSection === 'financialInfo' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`} onClick={() => handleSectionToggle('financialInfo')}>
                      <TableIcon size={14} className="mr-2" />
                      <span>Financial Information</span>
                      {financialData && <CheckIcon size={14} className="ml-auto text-green-600" />}
                    </div>
                    <div className="px-2 py-1.5 rounded flex items-center text-sm text-gray-400">
                      <PanelRightIcon size={14} className="mr-2" />
                      <span>Management Discussion</span>
                    </div>
                    <div className="px-2 py-1.5 rounded flex items-center text-sm text-gray-400">
                      <PanelRightIcon size={14} className="mr-2" />
                      <span>Executive Compensation</span>
                    </div>
                  </div>}
              </div>
              <div className="px-2 py-3">
                <div className={`px-2 py-1.5 rounded flex items-center ${activeStep === 3 ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleStepChange(3)}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${activeStep === 3 ? 'bg-blue-700 text-white' : activeStep > 3 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    {activeStep > 3 ? <CheckIcon size={12} /> : '3'}
                  </div>
                  <span className="text-sm font-medium">Review</span>
                </div>
              </div>
              <div className="px-2 py-3">
                <div className={`px-2 py-1.5 rounded flex items-center ${activeStep === 4 ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleStepChange(4)}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${activeStep === 4 ? 'bg-blue-700 text-white' : activeStep > 4 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    {activeStep > 4 ? <CheckIcon size={12} /> : '4'}
                  </div>
                  <span className="text-sm font-medium">Generate</span>
                </div>
              </div>
            </div>
            {/* Recent documents */}
            <div className="border-t border-gray-200 p-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Recent Documents
              </h3>
              <ul className="space-y-2">
                <li className="text-sm">
                  <a href="#" className="flex items-center text-gray-700 hover:text-blue-700">
                    <FileIcon size={14} className="mr-2 text-gray-400" />
                    <span>Q2 Financial Report</span>
                  </a>
                </li>
                <li className="text-sm">
                  <a href="#" className="flex items-center text-gray-700 hover:text-blue-700">
                    <FileIcon size={14} className="mr-2 text-gray-400" />
                    <span>Board Meeting Minutes</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>}
        {/* Main content area */}
        <div className="flex-1 bg-gray-50 overflow-auto">
          {showSECPreview ? <div className="p-6">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  SEC Filing Preview
                </h2>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 flex items-center" onClick={toggleSECPreview}>
                  <ArrowLeftIcon size={16} className="mr-2" />
                  Return to Editor
                </button>
              </div>
              <SECDocumentPreview financialData={financialData} />
            </div> : showPresentationPreview ? <div className="p-6">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Presentation Preview
                </h2>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 flex items-center" onClick={togglePresentationPreview}>
                  <ArrowLeftIcon size={16} className="mr-2" />
                  Return to Editor
                </button>
              </div>
              <PresentationPreview financialData={financialData} riskFactors={riskFactors} companyName="TechFin Solutions" tickerSymbol="TFIN" exchange="Nasdaq Global Market" />
            </div> : <div className="p-6">
              {/* Step 1: Select Template */}
              {activeStep === 1 && <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Select a Prospectus Template
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Choose from our library of regulatory-compliant templates
                    designed for different markets and company types.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedTemplate === 'standard' ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'}`} onClick={() => handleTemplateSelect('standard')}>
                      <div className="flex items-center mb-2">
                        <LayoutTemplateIcon size={20} className="text-blue-700 mr-2" />
                        <h4 className="font-semibold">
                          Standard IPO Prospectus
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        The most common format suitable for most companies.
                      </p>
                      <div className="mt-3 text-xs text-gray-500">
                        SEC Form S-1 Compliant
                      </div>
                    </div>
                    <div className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedTemplate === 'tech' ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'}`} onClick={() => handleTemplateSelect('tech')}>
                      <div className="flex items-center mb-2">
                        <LayoutTemplateIcon size={20} className="text-blue-700 mr-2" />
                        <h4 className="font-semibold">Technology Company</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Tailored for SaaS, fintech, and other tech companies.
                      </p>
                      <div className="mt-3 text-xs text-gray-500">
                        Enhanced IP and R&D sections
                      </div>
                    </div>
                    <div className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedTemplate === 'international' ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'}`} onClick={() => handleTemplateSelect('international')}>
                      <div className="flex items-center mb-2">
                        <LayoutTemplateIcon size={20} className="text-blue-700 mr-2" />
                        <h4 className="font-semibold">
                          International Dual-Listing
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        For companies listing on multiple exchanges.
                      </p>
                      <div className="mt-3 text-xs text-gray-500">
                        NYSE + International Exchange
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                    <h4 className="font-semibold text-blue-800 mb-2">
                      Template Preview
                    </h4>
                    <p className="text-gray-700">
                      The{' '}
                      {selectedTemplate === 'standard' ? 'Standard IPO Prospectus' : selectedTemplate === 'tech' ? 'Technology Company' : 'International Dual-Listing'}{' '}
                      template includes:
                    </p>
                    <ul className="mt-2 space-y-1 text-gray-600">
                      <li className="flex items-center">
                        <CheckIcon size={16} className="text-green-600 mr-2" />
                        <span>Complete required SEC disclosures</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon size={16} className="text-green-600 mr-2" />
                        <span>
                          {selectedTemplate === 'standard' ? 'Standard risk factors section' : selectedTemplate === 'tech' ? 'Technology-specific risk factors' : 'Multi-jurisdiction compliance sections'}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon size={16} className="text-green-600 mr-2" />
                        <span>
                          {selectedTemplate === 'standard' ? 'General business overview structure' : selectedTemplate === 'tech' ? 'R&D and IP-focused business sections' : 'Global operations and currency risk sections'}
                        </span>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <button className="text-blue-700 hover:text-blue-800 flex items-center text-sm font-medium" onClick={toggleSECPreview}>
                        <ExternalLinkIcon size={16} className="mr-1" />
                        View SEC filing example
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 flex items-center" onClick={() => handleStepChange(2)}>
                      Next: Add Content
                      <ArrowRightIcon size={16} className="ml-2" />
                    </button>
                  </div>
                </div>}
              {/* Step 2: Add Content */}
              {activeStep === 2 && <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Add Content to Your Prospectus
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Complete each section with guided forms. Click on a section
                    in the sidebar to expand and edit.
                  </p>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                    {expandedSection === 'prospectusOverview' && <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-lg">
                            Prospectus Overview Section
                          </h3>
                          <div className="flex space-x-2">
                            <button className="text-blue-700 hover:bg-blue-50 p-1 rounded">
                              <EditIcon size={18} />
                            </button>
                            <button className="text-blue-700 hover:bg-blue-50 p-1 rounded">
                              <EyeIcon size={18} />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Offering Size (number of shares)
                            </label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" defaultValue="10,000,000" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Price Range
                            </label>
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-500">$</span>
                              <input type="text" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" defaultValue="14.00" />
                              <span className="text-gray-500">to $</span>
                              <input type="text" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" defaultValue="16.00" />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Ticker Symbol
                            </label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" defaultValue="TFIN" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Exchange
                            </label>
                            <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                              <option>Nasdaq Global Market</option>
                              <option>New York Stock Exchange</option>
                              <option>NYSE American</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Use of Proceeds (Summary)
                            </label>
                            <textarea className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" rows={3} defaultValue="We intend to use the net proceeds from this offering for working capital and general corporate purposes, including research and development, sales and marketing activities, and capital expenditures."></textarea>
                          </div>
                        </div>
                        <div className="mt-6 flex justify-between">
                          <button className="text-blue-700 hover:underline flex items-center">
                            <SaveIcon size={16} className="mr-1" />
                            Save as Draft
                          </button>
                          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center">
                            <CheckIcon size={16} className="mr-2" />
                            Mark Section Complete
                          </button>
                        </div>
                      </div>}
                    {expandedSection === 'riskFactors' && <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-lg">
                            Risk Factors Section
                          </h3>
                          <div className="flex space-x-2">
                            <button className="text-blue-700 hover:bg-blue-50 p-1 rounded">
                              <EditIcon size={18} />
                            </button>
                            <button className="text-blue-700 hover:bg-blue-50 p-1 rounded">
                              <EyeIcon size={18} />
                            </button>
                          </div>
                        </div>
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                          <div className="flex items-start">
                            <AlertTriangleIcon size={20} className="text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                              <h5 className="font-medium text-blue-800">
                                Risk Factor Disclosure Requirements
                              </h5>
                              <p className="text-sm text-gray-700 mt-1">
                                The SEC requires comprehensive disclosure of
                                material risks. Being thorough and specific
                                helps protect your company from future
                                litigation.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4 mb-6">
                          {riskFactors.map((risk, index) => <div key={index} className="bg-gray-50 p-3 rounded-md border border-gray-200">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-800 mb-1">
                                    {risk.title}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {risk.description}
                                  </p>
                                </div>
                                <button className="text-gray-400 hover:text-red-500 ml-2" onClick={() => handleRemoveRiskFactor(index)}>
                                  <TrashIcon size={16} />
                                </button>
                              </div>
                            </div>)}
                        </div>
                        <div className="border border-gray-200 rounded-md p-4 bg-gray-50 mb-6">
                          <h4 className="font-medium text-gray-800 mb-3">
                            Add New Risk Factor
                          </h4>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Risk Title
                              </label>
                              <input type="text" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="E.g., Cybersecurity Risk" value={newRiskTitle} onChange={e => setNewRiskTitle(e.target.value)} />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Risk Description
                              </label>
                              <textarea className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" rows={2} placeholder="Describe the risk and its potential impact on the business" value={newRiskDescription} onChange={e => setNewRiskDescription(e.target.value)}></textarea>
                            </div>
                            <button className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center text-sm" onClick={handleAddRiskFactor}>
                              <PlusIcon size={14} className="mr-1" />
                              Add Risk Factor
                            </button>
                          </div>
                        </div>
                        <div className="mt-6 flex justify-between">
                          <div className="text-sm text-gray-500">
                            {riskFactors.length} risk factors added
                          </div>
                          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center">
                            <CheckIcon size={16} className="mr-2" />
                            Mark Section Complete
                          </button>
                        </div>
                      </div>}
                    {expandedSection === 'businessOverview' && <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-lg">
                            Business Overview Section
                          </h3>
                          <div className="flex space-x-2">
                            <button className="text-blue-700 hover:bg-blue-50 p-1 rounded">
                              <EditIcon size={18} />
                            </button>
                            <button className="text-blue-700 hover:bg-blue-50 p-1 rounded">
                              <EyeIcon size={18} />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Company Description
                            </label>
                            <textarea className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" rows={4} placeholder="Describe your company's main business activities..." defaultValue="TechFin Solutions is a financial technology company that provides innovative payment processing solutions for small and medium-sized businesses. Founded in 2015, we have developed proprietary software that integrates with existing point-of-sale systems."></textarea>
                            <div className="mt-1 flex items-center text-sm text-gray-500">
                              <span>
                                AI suggests adding details about market position
                                and competitive advantage
                              </span>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Products and Services
                            </label>
                            <div className="border border-gray-300 rounded-md p-3 space-y-2">
                              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <span>Payment Processing Platform</span>
                                <div className="flex space-x-1">
                                  <button className="text-gray-500 hover:text-blue-700">
                                    <EditIcon size={14} />
                                  </button>
                                </div>
                              </div>
                              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <span>Merchant Analytics Dashboard</span>
                                <div className="flex space-x-1">
                                  <button className="text-gray-500 hover:text-blue-700">
                                    <EditIcon size={14} />
                                  </button>
                                </div>
                              </div>
                              <button className="flex items-center text-blue-700 hover:text-blue-800 p-2">
                                <PlusIcon size={14} className="mr-1" />
                                <span>Add Product/Service</span>
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Intellectual Property
                            </label>
                            <div className="border border-gray-300 rounded-md p-3">
                              <div className="flex items-center mb-2">
                                <input type="checkbox" className="mr-2" defaultChecked />
                                <span>Patents</span>
                              </div>
                              <div className="flex items-center mb-2">
                                <input type="checkbox" className="mr-2" defaultChecked />
                                <span>Trademarks</span>
                              </div>
                              <div className="flex items-center mb-2">
                                <input type="checkbox" className="mr-2" />
                                <span>Copyrights</span>
                              </div>
                              <div className="flex items-center">
                                <input type="checkbox" className="mr-2" defaultChecked />
                                <span>Trade Secrets</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Growth Strategy
                            </label>
                            <textarea className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" rows={3} placeholder="Describe your company's growth strategy..."></textarea>
                            <div className="mt-1 text-sm text-blue-700 flex items-center">
                              <span>AI Suggestion: </span>
                              <button className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                Include international expansion plans
                              </button>
                              <button className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                Mention M&A strategy
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 flex justify-between">
                          <button className="text-blue-700 hover:underline flex items-center">
                            <SaveIcon size={16} className="mr-1" />
                            Save as Draft
                          </button>
                          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center">
                            <CheckIcon size={16} className="mr-2" />
                            Mark Section Complete
                          </button>
                        </div>
                      </div>}
                    {expandedSection === 'financialInfo' && <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-lg">
                            Financial Information Section
                          </h3>
                          <div className="flex space-x-2">
                            <button className="text-blue-700 hover:bg-blue-50 p-1 rounded">
                              <EditIcon size={18} />
                            </button>
                            <button className="text-blue-700 hover:bg-blue-50 p-1 rounded">
                              <EyeIcon size={18} />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                            <div className="flex items-start">
                              <FileSpreadsheetIcon size={20} className="text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                              <div>
                                <h5 className="font-medium text-blue-800">
                                  Excel Upload for Financial Data
                                </h5>
                                <p className="text-sm text-gray-700 mt-1">
                                  Upload your financial statements from Excel to
                                  automatically populate this section. We
                                  support balance sheets, income statements, and
                                  cash flow statements.
                                </p>
                              </div>
                            </div>
                          </div>
                          {financialData ? <div>
                              <div className="mb-4">
                                <h5 className="font-medium text-gray-800 mb-2">
                                  Preview of Financial Data
                                </h5>
                                <FinancialDataPreview data={financialData} />
                              </div>
                              <div className="flex justify-between mt-4">
                                <button onClick={resetFinancialData} className="text-blue-700 hover:underline flex items-center">
                                  Upload Different Data
                                </button>
                                <button onClick={() => handleSectionToggle('financialInfo')} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center">
                                  <CheckIcon size={16} className="mr-2" />
                                  Save and Continue
                                </button>
                              </div>
                            </div> : <FinancialDataUploader onDataParsed={handleFinancialDataParsed} />}
                        </div>
                      </div>}
                    {!expandedSection && <div className="p-8 text-center text-gray-500">
                        <FileTextIcon size={48} className="mx-auto mb-4 text-gray-300" />
                        <p>
                          Select a section from the sidebar to edit its content
                        </p>
                      </div>}
                  </div>
                  <div className="flex justify-between mt-6">
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 flex items-center" onClick={() => handleStepChange(1)}>
                      <ArrowLeftIcon size={16} className="mr-2" />
                      Back to Templates
                    </button>
                    <button className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 flex items-center" onClick={() => handleStepChange(3)}>
                      Next: Review
                      <ArrowRightIcon size={16} className="ml-2" />
                    </button>
                  </div>
                </div>}
              {/* Step 3: Review */}
              {activeStep === 3 && <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Review Your Prospectus
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Review the complete document, check for compliance issues,
                    and make final edits before generation.
                  </p>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
                    <div className="flex border-b border-gray-200">
                      <button className="px-4 py-2 border-b-2 border-blue-500 text-blue-700 font-medium">
                        Document Preview
                      </button>
                      <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                        Compliance Check
                      </button>
                      <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                        Comments (3)
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-end mb-2">
                        <button className="text-blue-700 hover:text-blue-800 flex items-center text-sm font-medium" onClick={toggleSECPreview}>
                          <ExternalLinkIcon size={16} className="mr-1" />
                          View full SEC filing format
                        </button>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-4">
                        <h4 className="text-lg font-semibold text-center mb-2">
                          PROSPECTUS
                        </h4>
                        <h5 className="text-center mb-4">
                          TechFin Solutions, Inc.
                        </h5>
                        <div className="text-center text-sm mb-6">
                          10,000,000 Shares of Common Stock
                        </div>
                        <div className="prose max-w-none text-sm">
                          <p className="mb-3">
                            This prospectus relates to the initial public
                            offering of 10,000,000 shares of common stock of
                            TechFin Solutions, Inc. Prior to this offering,
                            there has been no public market for our common
                            stock. The initial public offering price is expected
                            to be between $14.00 and $16.00 per share.
                          </p>
                          <p className="mb-3">
                            We have applied to list our common stock on the
                            Nasdaq Global Market under the symbol "TFIN."
                          </p>
                          <p className="mb-3 text-gray-400 italic">
                            [Table of Contents would appear here]
                          </p>
                          <h6 className="font-bold mt-4 mb-2">
                            BUSINESS OVERVIEW
                          </h6>
                          <p className="mb-3">
                            TechFin Solutions is a financial technology company
                            that provides innovative payment processing
                            solutions for small and medium-sized businesses.
                            Founded in 2015, we have developed proprietary
                            software that integrates with existing point-of-sale
                            systems.
                          </p>
                          <p className="mb-3">
                            Our primary products include our Payment Processing
                            Platform and Merchant Analytics Dashboard, which
                            together provide a comprehensive solution for
                            businesses to manage transactions and gain insights
                            into their financial performance.
                          </p>
                          {financialData && <>
                              <h6 className="font-bold mt-4 mb-2">
                                FINANCIAL INFORMATION
                              </h6>
                              <p className="mb-2">
                                The following table presents our{' '}
                                {financialData.title.toLowerCase()}:
                              </p>
                              <div className="text-xs italic text-gray-500 mb-2">
                                [Financial table will appear here in the final
                                document]
                              </div>
                            </>}
                          <p className="text-gray-400 italic">
                            [Document continues...]
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 text-sm mx-1">
                          Previous Page
                        </button>
                        <span className="px-3 py-1 text-sm text-gray-600">
                          Page 1 of 87
                        </span>
                        <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 text-sm mx-1">
                          Next Page
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">
                          Compliance Alert
                        </h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>
                            Our system has detected {financialData ? '1' : '2'}{' '}
                            potential compliance{' '}
                            {financialData ? 'issue' : 'issues'} that should be
                            addressed before finalizing:
                          </p>
                          <ul className="list-disc pl-5 mt-1 space-y-1">
                            <li>
                              Risk factors section requires more specific
                              technology risks
                            </li>
                            {!financialData && <li>
                                Financial information section needs three years
                                of audited statements
                              </li>}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 flex items-center" onClick={() => handleStepChange(2)}>
                      <ArrowLeftIcon size={16} className="mr-2" />
                      Back to Content
                    </button>
                    <button className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 flex items-center" onClick={() => handleStepChange(4)}>
                      Next: Generate
                      <ArrowRightIcon size={16} className="ml-2" />
                    </button>
                  </div>
                </div>}
              {/* Step 4: Generate */}
              {activeStep === 4 && <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Generate Your Prospectus
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Your prospectus is ready to be generated in multiple formats
                    for different purposes.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 text-center">
                    <CheckIcon size={48} className="mx-auto text-green-600 mb-4" />
                    <h4 className="text-xl font-semibold text-green-800 mb-2">
                      Prospectus Ready for Generation
                    </h4>
                    <p className="text-green-700 mb-4">
                      All required sections are complete and compliance issues
                      have been resolved.
                    </p>
                    <div className="inline-flex items-center justify-center bg-white text-sm font-medium text-gray-700 px-4 py-2 border border-gray-300 rounded-md shadow-sm">
                      TechFin_Solutions_IPO_Prospectus_Draft_v1.pdf
                    </div>
                    <div className="mt-4 flex justify-center space-x-4">
                      <button className="text-blue-700 hover:text-blue-800 flex items-center text-sm font-medium" onClick={toggleSECPreview}>
                        <ExternalLinkIcon size={16} className="mr-1" />
                        Preview SEC filing format
                      </button>
                      <button className="text-blue-700 hover:text-blue-800 flex items-center text-sm font-medium" onClick={togglePresentationPreview}>
                        <ExternalLinkIcon size={16} className="mr-1" />
                        Preview presentation format
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <DownloadIcon size={24} className="text-blue-700 mr-2" />
                        <h4 className="font-semibold">PDF Format</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Standard document format for sharing and printing.
                        Includes all formatting and graphics.
                      </p>
                      <button className="w-full px-3 py-2 bg-blue-700 text-white rounded hover:bg-blue-800">
                        Generate PDF
                      </button>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <DownloadIcon size={24} className="text-blue-700 mr-2" />
                        <h4 className="font-semibold">XBRL Format</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        SEC-required format with tagged financial data for
                        regulatory filing.
                      </p>
                      <button className="w-full px-3 py-2 bg-blue-700 text-white rounded hover:bg-blue-800">
                        Generate XBRL
                      </button>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <DownloadIcon size={24} className="text-blue-700 mr-2" />
                        <h4 className="font-semibold">Word Document</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Editable format for further modifications and legal
                        review.
                      </p>
                      <button className="w-full px-3 py-2 bg-blue-700 text-white rounded hover:bg-blue-800">
                        Generate DOCX
                      </button>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <PresentationIcon size={24} className="text-blue-700 mr-2" />
                        <h4 className="font-semibold">
                          PowerPoint Presentation
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Summarized slides for investor presentations and
                        roadshows.
                      </p>
                      <button className="w-full px-3 py-2 bg-blue-700 text-white rounded hover:bg-blue-800" onClick={togglePresentationPreview}>
                        Generate PPTX
                      </button>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                      <PresentationIcon size={20} className="mr-2 text-blue-700" />
                      About the PowerPoint Presentation
                    </h4>
                    <p className="text-gray-700 mb-4">
                      Our PowerPoint presentation generator creates a summarized
                      version of your prospectus, perfect for:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <CheckIcon size={18} className="text-blue-700 mr-2 mt-0.5" />
                        <span>Investor roadshow presentations</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon size={18} className="text-blue-700 mr-2 mt-0.5" />
                        <span>Board and executive briefings</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon size={18} className="text-blue-700 mr-2 mt-0.5" />
                        <span>Quick overviews for potential investors</span>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <button className="text-blue-700 hover:text-blue-800 flex items-center text-sm font-medium" onClick={togglePresentationPreview}>
                        <ExternalLinkIcon size={16} className="mr-1" />
                        Preview presentation format
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 flex items-center" onClick={() => handleStepChange(3)}>
                      <ArrowLeftIcon size={16} className="mr-2" />
                      Back to Review
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center">
                      <CheckIcon size={16} className="mr-2" />
                      Complete Process
                    </button>
                  </div>
                </div>}
            </div>}
        </div>
      </div>
    </div>;
}