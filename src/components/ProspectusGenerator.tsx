import React, { useState, useRef } from 'react';
import { FileTextIcon, CheckIcon, PlusIcon, EditIcon, EyeIcon, DownloadIcon, ArrowLeftIcon, ArrowRightIcon, BookOpenIcon, ClipboardCheckIcon, PanelLeftIcon, PanelRightIcon, LayoutTemplateIcon, ExternalLinkIcon, FileSpreadsheetIcon, TableIcon, ChevronDownIcon, ChevronRightIcon, SaveIcon, FolderIcon, FileIcon, SearchIcon, SettingsIcon, AlertTriangleIcon, TrashIcon, PresentationIcon, MonitorIcon, ChevronsRightIcon, UploadIcon, GlobeIcon, LinkIcon, BuildingIcon, BriefcaseIcon, InfoIcon, BotIcon, ZapIcon, RefreshCwIcon, CreditCardIcon, DollarSignIcon, BarChartIcon, ShoppingCartIcon, UserIcon, XIcon } from 'lucide-react';
import { SECDocumentPreview } from './SECDocumentPreview';
import { FinancialDataUploader, FinancialData } from './FinancialDataUploader';
import { FinancialDataPreview } from './FinancialDataPreview';
import { PresentationPreview } from './PresentationPreview';
export function ProspectusGenerator() {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState('standard');
  const [expandedSection, setExpandedSection] = useState('businessOverview');
  const [showSECPreview, setShowSECPreview] = useState(false);
  const [financialData, setFinancialData] = useState<FinancialData[]>([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showPresentationPreview, setShowPresentationPreview] = useState(false);
  const [isProcessComplete, setIsProcessComplete] = useState(false);
  const [riskFactors, setRiskFactors] = useState([{
    title: 'Dependence on Brand License',
    description: 'We depend on our license from our related company to use the brand name for our business operations. Any termination or modification of this license could materially adversely affect our business and results of operations.'
  }, {
    title: 'Competition in English Education Market',
    description: 'The English language education market in Hong Kong is highly competitive. We compete with numerous established English language schools and tutoring centers, some of which may have greater financial resources and brand recognition than us.'
  }, {
    title: 'Regulatory Changes in Education Sector',
    description: 'We are subject to regulations governing private education providers in Hong Kong. Changes in education policies or regulations could require us to modify our operations or incur additional compliance costs.'
  }, {
    title: 'Franchise Model Risks',
    description: 'Our business model relies on franchise agreements with our related company. Any disputes, changes in franchise terms, or termination of these agreements could adversely impact our operations.'
  }, {
    title: 'Limited Geographic Diversification',
    description: 'Our operations are concentrated in Hong Kong, making us susceptible to local economic conditions, regulatory changes, and market dynamics specific to Hong Kong.'
  }, {
    title: 'Key Personnel Dependence',
    description: 'Our success depends on our ability to attract, retain and motivate qualified teaching staff and management personnel. The loss of key personnel could adversely affect our business operations.'
  }, {
    title: 'Economic Sensitivity',
    description: 'Demand for our English education services may be affected by economic downturns, as families may reduce discretionary spending on supplemental education during difficult economic times.'
  }, {
    title: 'Technology and Online Learning Competition',
    description: 'The increasing adoption of online learning platforms and educational technology could reduce demand for traditional in-person English language courses.'
  }]);
  const [newRiskTitle, setNewRiskTitle] = useState('');
  const [newRiskDescription, setNewRiskDescription] = useState('');
  const [companyInfoMethod, setCompanyInfoMethod] = useState<'manual' | 'ai' | null>('manual');
  const [companyWebsite, setCompanyWebsite] = useState('www.englishlearning.hk');
  const [companyName, setCompanyName] = useState('English Learning Academy Ltd.');
  const [companyDescription, setCompanyDescription] = useState('We are a leading English language education provider in Hong Kong, specializing in English courses for children. We operate through a well-established brand and offer our courses through various learning centers operated by our Hong Kong subsidiaries. Our mission is to provide high-quality English language education to children in Hong Kong through our comprehensive curriculum and experienced teaching staff.');
  // NEW FIELDS for SEC filing requirements
  const [companyAddress, setCompanyAddress] = useState('Units 1501-1503, 15/F\nTower 1, Admiralty Centre\n18 Harcourt Road, Admiralty\nHong Kong');
  const [companyPhone, setCompanyPhone] = useState('+852 2123-4567');
  const [tickerSymbol, setTickerSymbol] = useState('ELAN');
  const [filingDate, setFilingDate] = useState('2024-01-15');
  const [auditor, setAuditor] = useState('Deloitte Touche Tohmatsu');
  const [usProcessAgent, setUsProcessAgent] = useState('Corporation Service Company');
  const [usProcessAgentAddress, setUsProcessAgentAddress] = useState('251 Little Falls Drive\nWilmington, DE 19808\nUnited States');
  const [usProcessAgentPhone, setUsProcessAgentPhone] = useState('+1 (302) 636-5400');
  const [legalCounsel, setLegalCounsel] = useState('Michael Chen, Esq.');
  const [usLawFirm, setUsLawFirm] = useState('Skadden, Arps, Slate, Meagher & Flom LLP');
  const [usLawFirmAddress, setUsLawFirmAddress] = useState('One Manhattan West\nNew York, NY 10001\nUnited States');
  const [usLawFirmPhone, setUsLawFirmPhone] = useState('+1 (212) 735-3000');
  const [underwritingCounsel, setUnderwritingCounsel] = useState('Davis Polk & Wardwell LLP');
  const [underwritingCounselAddress, setUnderwritingCounselAddress] = useState('450 Lexington Avenue\nNew York, NY 10017\nUnited States');
  const [underwritingCounselPhone, setUnderwritingCounselPhone] = useState('+1 (212) 450-4000');
  const [ceoName, setCeoName] = useState('David Wong');
  const [relatedCompany, setRelatedCompany] = useState('English Learning Holdings Ltd.');
  const [companyDeckUploaded, setCompanyDeckUploaded] = useState(false);
  const [additionalResources, setAdditionalResources] = useState<Array<{
    url: string;
    addedAt: Date;
  }>>([
    {
      url: 'https://www.englishlearning.hk/about-us',
      addedAt: new Date()
    },
    {
      url: 'https://www.englishlearning.hk/our-programs',
      addedAt: new Date()
    },
    {
      url: 'https://www.englishlearning.hk/investor-relations',
      addedAt: new Date()
    }
  ]);
  const [resourceInputs, setResourceInputs] = useState<Array<{
    id: string;
    value: string;
  }>>([{ id: '1', value: '' }]);
  const [uploadedDocuments, setUploadedDocuments] = useState<Array<{
    name: string;
    size: number;
    type: string;
    uploadedAt: Date;
  }>>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedSimilarCompanies, setSelectedSimilarCompanies] = useState<string[]>([]);
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
    console.log('ProspectusGenerator received financial data:', data);
    try {
      setFinancialData(prev => [...prev, data]);
      console.log('Financial data added successfully');
    } catch (error) {
      console.error('Error adding financial data:', error);
    }
  };
  
  const resetFinancialData = () => {
    setFinancialData([]);
  };
  
  const removeFinancialData = (index: number) => {
    setFinancialData(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleCompleteProcess = () => {
    setIsProcessComplete(true);
    // In a real implementation, this would trigger the actual document generation
    // For now, we'll just show the completion state
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
  const handleCompanyInfoMethodSelect = (method: 'manual' | 'ai') => {
    setCompanyInfoMethod(method);
  };
  const handleCompanyDeckUpload = () => {
    setCompanyDeckUploaded(true);
  };
  const handleSimilarCompanySelect = (ticker: string) => {
    setSelectedSimilarCompanies(prev => {
      // If already selected, remove it, otherwise add it
      if (prev.includes(ticker)) {
        return prev.filter(t => t !== ticker);
      } else {
        return [...prev, ticker];
      }
    });
    // In a real implementation, we would fetch company data here
    // For demo purposes, we'll still update the company name and description
    // based on the most recently selected/deselected company
    if (ticker === 'SQ') {
      setCompanyName('Block, Inc.');
      setCompanyDescription('Block, Inc. (formerly Square, Inc.) is a financial services and digital payments company that provides various tools and services to help businesses and individuals participate in the economy.');
    } else if (ticker === 'PYPL') {
      setCompanyName('PayPal Holdings, Inc.');
      setCompanyDescription('PayPal Holdings, Inc. operates a global online payment system that supports online money transfers and serves as an electronic alternative to traditional paper methods like checks and money orders.');
    } else if (ticker === 'AFRM') {
      setCompanyName('Affirm Holdings, Inc.');
      setCompanyDescription('Affirm Holdings, Inc. operates a platform for digital and mobile-first commerce. It offers a point-of-sale payment solution for consumers, merchant commerce solutions, and a consumer-focused app.');
    }
  };
  const similarCompanies = [{
    ticker: 'SQ',
    name: 'Block, Inc.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Block_Inc_logo.svg'
  }, {
    ticker: 'PYPL',
    name: 'PayPal',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/PayPal_2014_logo.svg'
  }, {
    ticker: 'AFRM',
    name: 'Affirm',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Affirm_Logo.svg'
  }, {
    ticker: 'ADYEY',
    name: 'Adyen',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Adyen_Corporate_Logo.svg'
  }, {
    ticker: 'TOST',
    name: 'Toast',
    logo: 'https://d2odgkulk9w7if.cloudfront.net/images/default-source/logos/toast-logo-primary-rgb.svg'
  }];
  const handleCompanyDetailsSubmit = () => {
    // In a real implementation, we would process the company details here
    handleStepChange(2); // Move to the add content step
  };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploading(true);
    // Simulate upload process
    setTimeout(() => {
      const newDocuments = Array.from(files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date()
      }));
      setUploadedDocuments(prev => [...prev, ...newDocuments]);
      setIsUploading(false);
      setCompanyDeckUploaded(true);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 1500); // Simulate 1.5 second upload time
  };
  const handleRemoveDocument = (index: number) => {
    setUploadedDocuments(prev => prev.filter((_, i) => i !== index));
    if (uploadedDocuments.length <= 1) {
      setCompanyDeckUploaded(false);
    }
  };
  const handleAddResourceInput = () => {
    const newId = Date.now().toString();
    setResourceInputs(prev => [...prev, { id: newId, value: '' }]);
  };

  const handleRemoveResourceInput = (id: string) => {
    if (resourceInputs.length > 1) {
      setResourceInputs(prev => prev.filter(input => input.id !== id));
    }
  };

  const handleResourceInputChange = (id: string, value: string) => {
    setResourceInputs(prev => prev.map(input => 
      input.id === id ? { ...input, value } : input
    ));
  };

  const handleResourceInputBlur = (id: string, value: string) => {
    if (value.trim()) {
      // Basic URL validation
      let url = value.trim();
      if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
      }
      
      // Add to resources if not already added
      const isDuplicate = additionalResources.some(resource => resource.url === url);
      if (!isDuplicate) {
        setAdditionalResources(prev => [...prev, {
          url,
          addedAt: new Date()
        }]);
      }
      
      // Clear this input field
      setResourceInputs(prev => prev.map(input => 
        input.id === id ? { ...input, value: '' } : input
      ));
    }
  };

  const handleRemoveResource = (index: number) => {
    setAdditionalResources(prev => prev.filter((_, i) => i !== index));
  };
  return <div className="h-screen min-h-screen flex flex-col">
      {/* App Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <button className="mr-4 p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded" onClick={() => setShowSidebar(!showSidebar)}>
            {showSidebar ? <PanelLeftIcon size={20} /> : <PanelRightIcon size={20} />}
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            {companyName} IPO Prospectus
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
      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar */}
        {showSidebar && <div className="w-64 border-r border-gray-200 bg-white flex flex-col h-full">
            {/* Progress indicator */}
            <div className="px-4 py-3 border-b border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Document Progress
                </span>
                <span className="text-xs font-medium text-blue-700">
                  {activeStep === 1 ? '10%' : activeStep === 2 ? '25%' : activeStep === 3 ? '40%' : activeStep === 4 ? '60%' : activeStep === 5 ? '80%' : '90%'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-blue-600 h-1.5 rounded-full" style={{
              width: activeStep === 1 ? '10%' : activeStep === 2 ? '25%' : activeStep === 3 ? '40%' : activeStep === 4 ? '60%' : activeStep === 5 ? '80%' : '90%'
            }}></div>
              </div>
            </div>
            {/* Steps */}
            <div className="overflow-y-auto flex-1">
              <div className="px-2 py-3">
                <div className={`px-2 py-1.5 rounded flex items-center ${activeStep === 1 ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleStepChange(1)}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${activeStep === 1 ? 'bg-blue-700 text-white' : activeStep > 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    {activeStep > 1 ? <CheckIcon size={12} /> : '1'}
                  </div>
                  <span className="text-sm font-medium">Company Details</span>
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
                  <span className="text-sm font-medium">Financial Information</span>
                  {financialData && <CheckIcon size={14} className="ml-auto text-green-600" />}
                </div>
              </div>
              <div className="px-2 py-3">
                <div className={`px-2 py-1.5 rounded flex items-center ${activeStep === 4 ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleStepChange(4)}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${activeStep === 4 ? 'bg-blue-700 text-white' : activeStep > 4 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    {activeStep > 4 ? <CheckIcon size={12} /> : '4'}
                  </div>
                  <span className="text-sm font-medium">Review</span>
                </div>
              </div>
              <div className="px-2 py-3">
                <div className={`px-2 py-1.5 rounded flex items-center ${activeStep === 5 ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleStepChange(5)}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${activeStep === 5 ? 'bg-blue-700 text-white' : activeStep > 5 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    {activeStep > 5 ? <CheckIcon size={12} /> : '5'}
                  </div>
                  <span className="text-sm font-medium">Generate</span>
                </div>
              </div>
            </div>
            {/* Recent documents */}
            <div className="border-t border-gray-200 p-4 mt-auto">
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
        <div className="flex-1 bg-gray-50 overflow-auto pb-20">
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
              <SECDocumentPreview 
                financialData={financialData}
                companyName={companyName}
                companyAddress={companyAddress}
                companyPhone={companyPhone}
                tickerSymbol={tickerSymbol}
                filingDate={filingDate}
                auditor={auditor}
                usProcessAgent={usProcessAgent}
                usProcessAgentAddress={usProcessAgentAddress}
                usProcessAgentPhone={usProcessAgentPhone}
                legalCounsel={legalCounsel}
                usLawFirm={usLawFirm}
                usLawFirmAddress={usLawFirmAddress}
                usLawFirmPhone={usLawFirmPhone}
                underwritingCounsel={underwritingCounsel}
                underwritingCounselAddress={underwritingCounselAddress}
                underwritingCounselPhone={underwritingCounselPhone}
                ceoName={ceoName}
                relatedCompany={relatedCompany}
              />
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
              <PresentationPreview financialData={financialData} riskFactors={riskFactors} companyName={companyName} tickerSymbol="TFIN" exchange="Nasdaq Global Market" />
            </div> : <div className="p-6">
              {/* Step 1: Company Details */}
              {activeStep === 1 && <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Add Company Details
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Let's start by gathering information about your company.
                    This will help us create a more accurate and relevant
                    prospectus.
                  </p>
                  {!companyInfoMethod && <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-white p-6 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer" onClick={() => handleCompanyInfoMethodSelect('manual')}>
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                          <UploadIcon size={24} className="text-blue-700" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Manual Input
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Provide your company details manually by uploading
                          documents, entering your company website, and
                          describing your business.
                        </p>
                        <div className="text-blue-700 font-medium flex items-center">
                          Get Started{' '}
                          <ArrowRightIcon size={16} className="ml-1" />
                        </div>
                      </div>
                      <div className="bg-white p-6 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer" onClick={() => handleCompanyInfoMethodSelect('ai')}>
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                          <BotIcon size={24} className="text-blue-700" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          AI-Assisted
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Let our AI help you by finding similar public
                          companies. We'll use their data as a starting point
                          for your prospectus.
                        </p>
                        <div className="text-blue-700 font-medium flex items-center">
                          Find Similar Companies{' '}
                          <ArrowRightIcon size={16} className="ml-1" />
                        </div>
                      </div>
                    </div>}
                  {companyInfoMethod === 'manual' && <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Manual Company Information
                      </h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column - Manual Company Information */}
                        <div className="space-y-6">
                          {/* Basic Company Information */}
                          <div className="border-b border-gray-200 pb-4">
                            <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                              <BuildingIcon size={18} className="mr-2 text-blue-700" />
                              Basic Company Information
                            </h4>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Company Name *
                                </label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., TechFin Solutions, Inc." value={companyName} onChange={e => setCompanyName(e.target.value)} />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Company Address *
                                </label>
                                <textarea className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" rows={2} placeholder="Full company address including city, state, and zip code" value={companyAddress} onChange={e => setCompanyAddress(e.target.value)}></textarea>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Company Phone *
                                </label>
                                <input type="tel" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="+1 (555) 123-4567" value={companyPhone} onChange={e => setCompanyPhone(e.target.value)} />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Stock Ticker Symbol *
                                </label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., TFIN" value={tickerSymbol} onChange={e => setTickerSymbol(e.target.value)} />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Filing Date *
                                </label>
                                <input type="date" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" value={filingDate} onChange={e => setFilingDate(e.target.value)} />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Company Website
                                </label>
                                <div className="flex">
                                  <div className="flex items-center bg-gray-100 border border-gray-300 rounded-l-md px-3">
                                    <GlobeIcon size={16} className="text-gray-500" />
                                  </div>
                                  <input type="text" className="w-full p-2 border border-gray-300 border-l-0 rounded-r-md focus:ring-blue-500 focus:border-blue-500" placeholder="www.techfinsolutions.com" value={companyWebsite} onChange={e => setCompanyWebsite(e.target.value)} />
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  We'll analyze your website to gather information about your business.
                                </p>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Company Description
                                </label>
                                <textarea className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" rows={4} placeholder="Describe your company's business model, products/services, and target market..." value={companyDescription} onChange={e => setCompanyDescription(e.target.value)}></textarea>
                              </div>
                            </div>
                          </div>

                          {/* Legal & Professional Services */}
                          <div className="border-b border-gray-200 pb-4">
                            <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                              <BriefcaseIcon size={18} className="mr-2 text-blue-700" />
                              Legal & Professional Services
                            </h4>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Audit Firm *
                                </label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Deloitte & Touche LLP" value={auditor} onChange={e => setAuditor(e.target.value)} />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  US Process Agent *
                                </label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Corporation Service Company" value={usProcessAgent} onChange={e => setUsProcessAgent(e.target.value)} />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Process Agent Address *
                                </label>
                                <textarea className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" rows={2} placeholder="Full address of US process agent" value={usProcessAgentAddress} onChange={e => setUsProcessAgentAddress(e.target.value)}></textarea>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Process Agent Phone *
                                </label>
                                <input type="tel" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="+1 (555) 123-4567" value={usProcessAgentPhone} onChange={e => setUsProcessAgentPhone(e.target.value)} />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Legal Counsel Name *
                                </label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., John Smith, Esq." value={legalCounsel} onChange={e => setLegalCounsel(e.target.value)} />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  US Law Firm *
                                </label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Skadden, Arps, Slate, Meagher & Flom LLP" value={usLawFirm} onChange={e => setUsLawFirm(e.target.value)} />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  US Law Firm Address *
                                </label>
                                <textarea className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" rows={2} placeholder="Full address of US law firm" value={usLawFirmAddress} onChange={e => setUsLawFirmAddress(e.target.value)}></textarea>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  US Law Firm Phone *
                                </label>
                                <input type="tel" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="+1 (555) 123-4567" value={usLawFirmPhone} onChange={e => setUsLawFirmPhone(e.target.value)} />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Underwriting Counsel *
                                </label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Davis Polk & Wardwell LLP" value={underwritingCounsel} onChange={e => setUnderwritingCounsel(e.target.value)} />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Underwriting Counsel Address *
                                </label>
                                <textarea className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" rows={2} placeholder="Full address of underwriting counsel" value={underwritingCounselAddress} onChange={e => setUnderwritingCounselAddress(e.target.value)}></textarea>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Underwriting Counsel Phone *
                                </label>
                                <input type="tel" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="+1 (555) 123-4567" value={underwritingCounselPhone} onChange={e => setUnderwritingCounselPhone(e.target.value)} />
                              </div>
                            </div>
                          </div>

                          {/* Management & Related Companies */}
                          <div>
                            <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                              <UserIcon size={18} className="mr-2 text-blue-700" />
                              Management & Related Companies
                            </h4>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  CEO/Controlling Shareholder Name *
                                </label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., John Smith" value={ceoName} onChange={e => setCeoName(e.target.value)} />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Related Company Name
                                </label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Parent company or related entity" value={relatedCompany} onChange={e => setRelatedCompany(e.target.value)} />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Column - Document Uploads and Additional Resources */}
                        <div className="space-y-6">
                          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                              <UploadIcon size={18} className="mr-2 text-blue-700" />
                              Upload Company Documents
                            </h4>
                            <p className="text-sm text-gray-600 mb-3">
                              Upload any relevant company documents to help create
                              a more accurate prospectus. You can add multiple
                              documents.
                            </p>
                            {/* List of uploaded documents */}
                            <div className="space-y-3 mb-4">
                              {uploadedDocuments.map((doc, index) => <div key={index} className="border border-green-300 bg-green-50 rounded-md p-3 flex items-center justify-between">
                                  <div className="flex items-center">
                                    <FileTextIcon size={20} className="mr-3 text-green-600" />
                                    <div>
                                      <p className="text-sm font-medium text-gray-700">
                                        {doc.name}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {(doc.size / 1024 / 1024).toFixed(2)} MB •
                                        Uploaded{' '}
                                        {doc.uploadedAt.toLocaleTimeString()}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center">
                                    <button className="p-1 text-gray-500 hover:text-red-600 mr-2" onClick={() => handleRemoveDocument(index)}>
                                      <TrashIcon size={16} />
                                    </button>
                                    <div className="flex items-center text-green-600 text-sm">
                                      <CheckIcon size={16} className="mr-1" />
                                      Uploaded
                                    </div>
                                  </div>
                                </div>)}
                            </div>
                            {/* Hidden file input */}
                            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelect} multiple accept=".pdf,.docx,.xlsx,.ppt,.pptx" />
                            {/* Document upload area */}
                            <div className="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center bg-white hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => fileInputRef.current?.click()}>
                              {isUploading ? <>
                                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700 mb-2"></div>
                                  <p className="text-sm font-medium text-blue-700 mb-1">
                                    Uploading document...
                                  </p>
                                </> : <>
                                  <UploadIcon size={24} className="text-blue-600 mb-2" />
                                  <p className="text-sm font-medium text-blue-700 mb-1">
                                    Drag and drop files or click to browse
                                  </p>
                                  <p className="text-xs text-gray-500 mb-3">
                                    PDF, DOCX, XLSX, PPT, PPTX (max 20MB per file)
                                  </p>
                                  <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors" onClick={e => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}>
                                    Select Files
                                  </button>
                                </>}
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                              <p className="text-xs text-gray-500">
                                {uploadedDocuments.length > 0 ? `${uploadedDocuments.length} document${uploadedDocuments.length > 1 ? 's' : ''} uploaded` : 'No documents uploaded yet'}
                              </p>
                              <button className="text-blue-700 text-sm flex items-center hover:text-blue-800">
                                <RefreshCwIcon size={14} className="mr-1" />
                                Scan Documents with AI
                              </button>
                            </div>
                          </div>

                          <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                            <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                              <LinkIcon size={18} className="mr-2 text-blue-700" />
                              Add Additional Resources
                            </h4>
                            <p className="text-sm text-gray-700 mb-3">
                              Add multiple links to additional resources that can help us
                              understand your business better. You can add company websites, 
                              press releases, investor relations pages, and more.
                            </p>
                            
                            {/* Resource counter and clear all button */}
                            {additionalResources.length > 0 && (
                              <div className="flex justify-between items-center mb-3">
                                <p className="text-sm font-medium text-blue-700">
                                  {additionalResources.length} resource{additionalResources.length !== 1 ? 's' : ''} added
                                </p>
                                <button 
                                  onClick={() => setAdditionalResources([])} 
                                  className="text-xs text-red-600 hover:text-red-800 hover:bg-red-50 px-2 py-1 rounded"
                                >
                                  Clear All
                                </button>
                              </div>
                            )}
                            
                            {/* List of added resources */}
                            {additionalResources.length > 0 && (
                              <div className="space-y-2 mb-4 max-h-32 overflow-y-auto">
                                {additionalResources.map((resource, index) => (
                                  <div key={index} className="flex items-center justify-between bg-white rounded-md p-3 border border-blue-200 hover:border-blue-300 transition-colors">
                                    <div className="flex items-center flex-1 min-w-0">
                                      <LinkIcon size={16} className="text-blue-600 mr-2 flex-shrink-0" />
                                      <a 
                                        href={resource.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-blue-600 hover:text-blue-800 text-sm truncate flex-1"
                                        title={resource.url}
                                      >
                                        {resource.url}
                                      </a>
                                    </div>
                                    <div className="flex items-center ml-2">
                                      <span className="text-xs text-gray-500 mr-2">
                                        {resource.addedAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                      </span>
                                      {additionalResources.length > 1 && (
                                        <button 
                                          onClick={() => handleRemoveResource(index)} 
                                          className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50"
                                          title="Remove resource"
                                        >
                                          <TrashIcon size={14} />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                                                          {/* Add new resource inputs */}
                              <div className="space-y-3">
                                {resourceInputs.map((input, index) => (
                                  <div key={input.id} className="flex items-center space-x-2">
                                    <input 
                                      type="text" 
                                      className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                                      placeholder="https://example.com/about-us, press releases, investor relations..." 
                                      value={input.value} 
                                      onChange={e => handleResourceInputChange(input.id, e.target.value)}
                                      onBlur={e => handleResourceInputBlur(input.id, e.target.value)}
                                      onKeyPress={e => e.key === 'Enter' && handleResourceInputBlur(input.id, input.value)}
                                    />
                                    {resourceInputs.length > 1 && (
                                      <button 
                                        onClick={() => handleRemoveResourceInput(input.id)}
                                        className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50"
                                        title="Remove input field"
                                      >
                                        <TrashIcon size={16} />
                                      </button>
                                    )}
                                  </div>
                                ))}
                                
                                {/* Add Link text button */}
                                <div className="flex justify-center">
                                  <button 
                                    className="text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1 rounded transition-colors"
                                    onClick={handleAddResourceInput}
                                  >
                                    + Add Link
                                  </button>
                                </div>
                              </div>
                          </div>
                        </div>
                      </div>
                      {/* Navigation handled by sticky bar */}
                    </div>}
                  {companyInfoMethod === 'ai' && <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <BotIcon size={20} className="text-blue-700" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          AI-Assisted Company Selection
                        </h3>
                      </div>
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                        <div className="flex items-start">
                          <InfoIcon size={20} className="text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                          <div>
                            <h5 className="font-medium text-blue-800">
                              How This Works
                            </h5>
                            <p className="text-sm text-gray-700 mt-1">
                              Select a similar public company from the list
                              below. Our AI will use this company's data as a
                              reference to help create your prospectus, adapting
                              it to your specific business.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Search for a Similar Company
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon size={16} className="text-gray-400" />
                          </div>
                          <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Search by company name or ticker..." />
                        </div>
                      </div>
                      <h4 className="font-medium text-gray-800 mb-3">
                        Select a Similar Company
                      </h4>
                      <div className="space-y-3 mb-6">
                        {similarCompanies.map(company => <div key={company.ticker} className={`border ${selectedSimilarCompanies.includes(company.ticker) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} rounded-lg p-3 flex items-center cursor-pointer hover:border-blue-300 transition-colors`} onClick={() => handleSimilarCompanySelect(company.ticker)}>
                            <div className="w-10 h-10 bg-white rounded border border-gray-200 flex items-center justify-center mr-3 overflow-hidden">
                              {company.ticker === 'SQ' && <div className="text-blue-600">
                                  <BuildingIcon size={24} />
                                </div>}
                              {company.ticker === 'PYPL' && <div className="text-indigo-600">
                                  <CreditCardIcon size={24} />
                                </div>}
                              {company.ticker === 'AFRM' && <div className="text-purple-600">
                                  <DollarSignIcon size={24} />
                                </div>}
                              {company.ticker === 'ADYEY' && <div className="text-green-600">
                                  <BarChartIcon size={24} />
                                </div>}
                              {company.ticker === 'TOST' && <div className="text-orange-600">
                                  <ShoppingCartIcon size={24} />
                                </div>}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h5 className="font-medium text-gray-900">
                                  {company.name}
                                </h5>
                                <span className="text-sm font-mono text-gray-500">
                                  {company.ticker}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">
                                Financial Technology
                              </p>
                            </div>
                            {selectedSimilarCompanies.includes(company.ticker) && <div className="ml-3 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                <CheckIcon size={14} className="text-white" />
                              </div>}
                          </div>)}
                      </div>
                      {selectedSimilarCompanies.length > 0 && <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                          <div className="flex items-start">
                            <ZapIcon size={20} className="text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                              <h5 className="font-medium text-green-800">
                                {selectedSimilarCompanies.length === 1 ? 'Company Selected' : `${selectedSimilarCompanies.length} Companies Selected`}
                              </h5>
                              <p className="text-sm text-gray-700 mt-1">
                                {selectedSimilarCompanies.length === 1 ? `We'll use ${similarCompanies.find(c => c.ticker === selectedSimilarCompanies[0])?.name}'s data as a reference.` : `We'll use data from ${selectedSimilarCompanies.map(ticker => similarCompanies.find(c => c.ticker === ticker)?.name).join(', ')} as references.`}{' '}
                                You'll be able to customize all information in
                                the next steps.
                              </p>
                            </div>
                          </div>
                        </div>}
                      {/* Navigation handled by sticky bar */}
                    </div>}
                </div>}
              {/* Step 2: Add Content (formerly Step 3) */}
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
                            <textarea className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" rows={4} placeholder="Describe your company's main business activities..." defaultValue={companyDescription || `${companyName} is a financial technology company that provides innovative payment processing solutions for small and medium-sized businesses. Founded in 2015, we have developed proprietary software that integrates with existing point-of-sale systems.`}></textarea>
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
                      Back to Company Details
                    </button>
                    <button className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 flex items-center" onClick={() => handleStepChange(3)}>
                      Next: Review
                      <ArrowRightIcon size={16} className="ml-2" />
                    </button>
                  </div>
                </div>}
              {/* Step 3: Financial Information */}
              {activeStep === 3 && <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Financial Information
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Upload and configure your financial data to include in the prospectus.
                    This information is crucial for investor decision-making.
                  </p>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
                    <div className="p-6">
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Upload Financial Data
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Upload multiple financial statements, balance sheets, income statements, 
                          and other financial documents. Each document will be added as a separate 
                          section in your prospectus.
                        </p>
                        {financialData.length > 0 && (
                          <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p className="text-sm text-blue-800">
                              <strong>Tip:</strong> You've uploaded {financialData.length} document{financialData.length !== 1 ? 's' : ''}. 
                              Consider uploading different document types to create a comprehensive financial section:
                            </p>
                            <ul className="text-xs text-blue-700 mt-2 space-y-1">
                              {financialData.length === 1 && <li>• <strong>Income Statement</strong> - for revenue and profitability data</li>}
                              {financialData.length === 1 && <li>• <strong>Balance Sheet</strong> - for assets and liabilities</li>}
                              {financialData.length === 1 && <li>• <strong>Cash Flow Statement</strong> - for cash flow analysis</li>}
                              {financialData.length >= 2 && <li>• <strong>Liquidity & Capital Resources</strong> - for working capital analysis</li>}
                              {financialData.length >= 2 && <li>• <strong>Additional financial metrics</strong> - for comprehensive coverage</li>}
                            </ul>
                          </div>
                        )}
                        <FinancialDataUploader 
                          onDataParsed={handleFinancialDataParsed} 
                          uploadedCount={financialData.length}
                        />
                      </div>
                      
                      {financialData.length > 0 && (
                        <div className="mt-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                              Financial Data Preview ({financialData.length} document{financialData.length !== 1 ? 's' : ''})
                            </h3>
                            <button 
                              onClick={resetFinancialData}
                              className="text-sm text-red-600 hover:text-red-800 flex items-center"
                            >
                              <XIcon size={16} className="mr-1" />
                              Clear All
                            </button>
                          </div>
                          <div className="space-y-6">
                            {financialData.map((data, index) => (
                              <div key={index} className="relative">
                                <div className="absolute top-2 right-2 z-10">
                                  <button
                                    onClick={() => removeFinancialData(index)}
                                    className="p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                                    title="Remove this document"
                                  >
                                    <XIcon size={16} />
                                  </button>
                                </div>
                                <FinancialDataPreview data={data} />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>}
              {/* Step 4: Review (formerly Step 3) */}
              {activeStep === 4 && <div>
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
                          {companyName}, Inc.
                        </h5>
                        <div className="text-center text-sm mb-6">
                          10,000,000 Shares of Common Stock
                        </div>
                        <div className="prose max-w-none text-sm">
                          <p className="mb-3">
                            This prospectus relates to the initial public
                            offering of 10,000,000 shares of common stock of
                            {companyName}, Inc. Prior to this offering, there
                            has been no public market for our common stock. The
                            initial public offering price is expected to be
                            between $14.00 and $16.00 per share.
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
                            {companyDescription || `${companyName} is a financial technology company that provides innovative payment processing solutions for small and medium-sized businesses. Founded in 2015, we have developed proprietary software that integrates with existing point-of-sale systems.`}
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
              {/* Step 5: Generate (formerly Step 4) */}
              {activeStep === 5 && <div>
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
                      {companyName.replace(/\s+/g, '_')}
                      _IPO_Prospectus_Draft_v1.pdf
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
              
              {/* Completion State */}
              {isProcessComplete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
                  <div className="bg-white rounded-lg p-8 max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckIcon size={32} className="text-green-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Prospectus Generation Complete!
                      </h2>
                      <p className="text-gray-600">
                        Your IPO prospectus has been successfully generated and is ready for download.
                      </p>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h3 className="font-semibold text-green-800 mb-2">Generated Documents:</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <CheckIcon size={16} className="text-green-600 mr-2" />
                            <span className="font-medium">{companyName.replace(/\s+/g, '_')}_IPO_Prospectus.pdf</span>
                            <span className="text-gray-500 ml-2">(SEC Filing Format)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckIcon size={16} className="text-green-600 mr-2" />
                            <span className="font-medium">{companyName.replace(/\s+/g, '_')}_IPO_Prospectus.docx</span>
                            <span className="text-gray-500 ml-2">(Editable Word Document)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckIcon size={16} className="text-green-600 mr-2" />
                            <span className="font-medium">{companyName.replace(/\s+/g, '_')}_IPO_Prospectus.xbrl</span>
                            <span className="text-gray-500 ml-2">(XBRL Format for SEC)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckIcon size={16} className="text-green-600 mr-2" />
                            <span className="font-medium">{companyName.replace(/\s+/g, '_')}_Investor_Presentation.pptx</span>
                            <span className="text-gray-500 ml-2">(PowerPoint Presentation)</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="font-semibold text-blue-800 mb-2">Next Steps:</h3>
                        <ol className="space-y-2 text-sm text-blue-700">
                          <li>1. Review all generated documents for accuracy</li>
                          <li>2. Have legal counsel review the prospectus</li>
                          <li>3. Submit to SEC for review (if applicable)</li>
                          <li>4. Prepare for investor roadshow</li>
                        </ol>
                      </div>
                    </div>
                    
                    <div className="flex justify-center space-x-4">
                      <button 
                        className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 flex items-center"
                        onClick={() => {
                          // In a real implementation, this would trigger downloads
                          alert('Download functionality would be implemented here');
                        }}
                      >
                        <DownloadIcon size={20} className="mr-2" />
                        Download All Documents
                      </button>
                      <button 
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        onClick={() => setIsProcessComplete(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>}
        </div>
        
        {/* Sticky Navigation Bar */}
        <div className={`fixed bottom-0 bg-white border-t border-gray-200 px-6 py-4 shadow-lg z-50 transition-all duration-300 ${showSidebar ? 'left-64' : 'left-0'} right-0`}>
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <button 
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 flex items-center transition-colors"
                onClick={() => {
                  if (activeStep === 1 && companyInfoMethod) {
                    setCompanyInfoMethod(null);
                  } else if (activeStep > 1) {
                    handleStepChange(activeStep - 1);
                  }
                }}
                disabled={activeStep === 1 && !companyInfoMethod}
              >
                <ArrowLeftIcon size={16} className="mr-2" />
                Back
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Step {activeStep} of 5
              </span>
              <button 
                className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 flex items-center transition-colors"
                onClick={() => {
                  if (activeStep === 1 && !companyInfoMethod) {
                    // Do nothing - user needs to select method first
                  } else if (activeStep === 1 && companyInfoMethod) {
                    handleCompanyDetailsSubmit();
                  } else if (activeStep < 5) {
                    handleStepChange(activeStep + 1);
                  } else if (activeStep === 5) {
                    handleCompleteProcess();
                  }
                }}
                disabled={activeStep === 1 && !companyInfoMethod}
              >
                {activeStep === 1 && !companyInfoMethod ? 'Select Method' :
                 activeStep === 1 && companyInfoMethod ? 'Next: Add Content' :
                 activeStep === 2 ? 'Next: Financial Information' :
                 activeStep === 3 ? 'Next: Review' :
                 activeStep === 4 ? 'Next: Generate' :
                 'Complete Process'}
                <ArrowRightIcon size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>;
}