import React, { useEffect, useState, useRef } from 'react';
import { SendIcon, PaperclipIcon, ChevronRightIcon, FileTextIcon, FileSpreadsheetIcon, CheckIcon, DownloadIcon, EyeIcon, AlertTriangleIcon, BookOpenIcon } from 'lucide-react';
import { FinancialData } from './FinancialDataUploader';
import { ChatMessage } from './ChatMessage';
import { ChatOptions } from './ChatOptions';
import { ChatFileUploader } from './ChatFileUploader';
import { SECDocumentPreview } from './SECDocumentPreview';
export function ChatInterface() {
  const [messages, setMessages] = useState<any[]>([{
    type: 'assistant',
    content: "👋 Welcome to IPO Prospectus Pro! I'm your virtual assistant and I'll help you create your IPO prospectus document. Would you like to get started?",
    options: [{
      label: "Yes, let's get started",
      value: 'start'
    }, {
      label: 'Tell me more about the process',
      value: 'info'
    }]
  }]);
  const [input, setInput] = useState('');
  const [showTemplateOptions, setShowTemplateOptions] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [currentSection, setCurrentSection] = useState('');
  const [financialData, setFinancialData] = useState<FinancialData[]>([]);
  const [showFileUploader, setShowFileUploader] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isSectionComplete, setIsSectionComplete] = useState({
    prospectusOverview: false,
    riskFactors: false,
    businessOverview: false,
    financialInfo: false
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const handleSendMessage = () => {
    if (input.trim() === '') return;
    // Add user message
    setMessages(prev => [...prev, {
      type: 'user',
      content: input
    }]);
    // Process user input and generate response
    setTimeout(() => {
      let response;
      if (currentSection === 'businessOverview') {
        response = {
          type: 'assistant',
          content: 'Thanks for providing that information about your business. Would you like to add more details or continue to the next section?',
          options: [{
            label: 'Add more details',
            value: 'more_business'
          }, {
            label: 'Continue to next section',
            value: 'next_section'
          }]
        };
        setIsSectionComplete(prev => ({
          ...prev,
          businessOverview: true
        }));
      } else if (currentSection === 'prospectusOverview') {
        response = {
          type: 'assistant',
          content: "I've recorded your prospectus overview details. This information will help potential investors understand your offering at a glance.",
          options: [{
            label: 'Edit this section',
            value: 'edit_overview'
          }, {
            label: 'Continue to next section',
            value: 'next_section'
          }]
        };
        setIsSectionComplete(prev => ({
          ...prev,
          prospectusOverview: true
        }));
      } else if (currentSection === 'riskFactors') {
        response = {
          type: 'assistant',
          content: 'Thank you for providing these risk factors. A comprehensive risk disclosure is crucial for regulatory compliance and investor transparency.',
          options: [{
            label: 'Add more risk factors',
            value: 'more_risks'
          }, {
            label: 'Continue to next section',
            value: 'next_section'
          }]
        };
        setIsSectionComplete(prev => ({
          ...prev,
          riskFactors: true
        }));
      } else {
        response = {
          type: 'assistant',
          content: "I've recorded your input. Let's continue with the process. What would you like to do next?",
          options: [{
            label: 'Go to next step',
            value: 'next_step'
          }, {
            label: 'Preview current document',
            value: 'preview'
          }]
        };
      }
      setMessages(prev => [...prev, response]);
    }, 1000);
    setInput('');
  };
  const handleOptionSelect = (option: string) => {
    // Add user selection as a message
    setMessages(prev => [...prev, {
      type: 'user',
      content: prev[prev.length - 1].options.find(opt => opt.value === option)?.label || option
    }]);
    // Process the selected option
    setTimeout(() => {
      let response;
      switch (option) {
        case 'start':
          response = {
            type: 'assistant',
            content: "Great! Let's start by selecting a template for your prospectus. Which type of company best describes yours?",
            showTemplates: true
          };
          setShowTemplateOptions(true);
          break;
        case 'info':
          response = {
            type: 'assistant',
            content: "The IPO prospectus creation process involves several steps: 1) Selecting a template suited to your company type, 2) Adding content for each required section, 3) Reviewing the document for compliance, and 4) Generating the final document in your preferred format. I'll guide you through each step. Ready to begin?",
            options: [{
              label: "Yes, let's start now",
              value: 'start'
            }, {
              label: 'I have more questions',
              value: 'more_questions'
            }]
          };
          break;
        case 'template_standard':
          response = {
            type: 'assistant',
            content: "You've selected the Standard IPO Prospectus template, which is suitable for most companies. This template includes all SEC-required sections and standard risk factors. Now, let's start adding content to your prospectus. Which section would you like to work on first?",
            options: [{
              label: 'Prospectus Overview',
              value: 'section_overview'
            }, {
              label: 'Business Description',
              value: 'section_business'
            }, {
              label: 'Financial Information',
              value: 'section_financial'
            }, {
              label: 'Risk Factors',
              value: 'section_risks'
            }]
          };
          setSelectedTemplate('standard');
          setShowTemplateOptions(false);
          break;
        case 'template_tech':
          response = {
            type: 'assistant',
            content: "You've selected the Technology Company template, which is tailored for SaaS, fintech, and other tech companies. This template includes enhanced IP and R&D sections. Now, let's start adding content to your prospectus. Which section would you like to work on first?",
            options: [{
              label: 'Prospectus Overview',
              value: 'section_overview'
            }, {
              label: 'Business Description',
              value: 'section_business'
            }, {
              label: 'Financial Information',
              value: 'section_financial'
            }, {
              label: 'Risk Factors',
              value: 'section_risks'
            }]
          };
          setSelectedTemplate('tech');
          setShowTemplateOptions(false);
          break;
        case 'template_international':
          response = {
            type: 'assistant',
            content: "You've selected the International Dual-Listing template, which is designed for companies listing on multiple exchanges. This template includes multi-jurisdiction compliance sections. Now, let's start adding content to your prospectus. Which section would you like to work on first?",
            options: [{
              label: 'Prospectus Overview',
              value: 'section_overview'
            }, {
              label: 'Business Description',
              value: 'section_business'
            }, {
              label: 'Financial Information',
              value: 'section_financial'
            }, {
              label: 'Risk Factors',
              value: 'section_risks'
            }]
          };
          setSelectedTemplate('international');
          setShowTemplateOptions(false);
          break;
        case 'section_overview':
          response = {
            type: 'assistant',
            content: "Let's work on the Prospectus Overview section. This is a summary that appears at the beginning of your prospectus and provides key information about your offering.",
            prospectusOverview: true
          };
          setCurrentSection('prospectusOverview');
          break;
        case 'section_business':
          response = {
            type: 'assistant',
            content: "Let's work on the Business Description section. Please provide a brief description of your company's main business activities, products/services, and any intellectual property. You can type your response below or upload a document.",
            additionalInfo: "This section should highlight your company's unique value proposition and competitive advantages."
          };
          setCurrentSection('businessOverview');
          break;
        case 'section_financial':
          response = {
            type: 'assistant',
            content: "Let's work on the Financial Information section. You can either type in your financial data or upload an Excel spreadsheet containing your financial statements.",
            options: [{
              label: 'Upload Excel file',
              value: 'upload_financial'
            }, {
              label: 'Enter data manually',
              value: 'manual_financial'
            }]
          };
          setCurrentSection('financialInfo');
          break;
        case 'section_risks':
          response = {
            type: 'assistant',
            content: "Let's work on the Risk Factors section. This is a critical part of your prospectus where you disclose potential risks that investors should consider before investing in your company.",
            riskFactors: true
          };
          setCurrentSection('riskFactors');
          break;
        case 'upload_financial':
          response = {
            type: 'assistant',
            content: 'Please upload your Excel file containing financial data. The file should include your income statement, balance sheet, or cash flow statement.',
            showFileUploader: true
          };
          setShowFileUploader(true);
          break;
        case 'preview':
          response = {
            type: 'assistant',
            content: "Here's a preview of your prospectus document based on the information provided so far.",
            showPreview: true
          };
          setShowPreview(true);
          break;
        case 'next_section':
          const completedSections = Object.values(isSectionComplete).filter(Boolean).length;
          if (completedSections >= 2) {
            response = {
              type: 'assistant',
              content: "You've completed several sections of your prospectus. Would you like to review the document now or continue adding more content?",
              options: [{
                label: 'Review document',
                value: 'preview'
              }, {
                label: 'Add more content',
                value: 'more_content'
              }]
            };
          } else {
            const remainingSections = [];
            if (!isSectionComplete.prospectusOverview) remainingSections.push({
              label: 'Prospectus Overview',
              value: 'section_overview'
            });
            if (!isSectionComplete.businessOverview) remainingSections.push({
              label: 'Business Description',
              value: 'section_business'
            });
            if (!isSectionComplete.financialInfo) remainingSections.push({
              label: 'Financial Information',
              value: 'section_financial'
            });
            if (!isSectionComplete.riskFactors) remainingSections.push({
              label: 'Risk Factors',
              value: 'section_risks'
            });
            response = {
              type: 'assistant',
              content: 'Which section would you like to work on next?',
              options: remainingSections
            };
          }
          break;
        default:
          response = {
            type: 'assistant',
            content: "I didn't understand that option. Let's continue with the process. What would you like to do next?",
            options: [{
              label: 'Go back to template selection',
              value: 'start'
            }, {
              label: 'Preview current document',
              value: 'preview'
            }]
          };
      }
      setMessages(prev => [...prev, response]);
    }, 1000);
  };
  const handleFileUpload = (data: FinancialData) => {
    setFinancialData(data);
    setShowFileUploader(false);
    setMessages(prev => [...prev, {
      type: 'assistant',
      content: "I've successfully processed your financial data. Here's a preview of how it will appear in your prospectus.",
      financialData: data
    }]);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: 'Would you like to make any adjustments to the financial data or continue to the next section?',
        options: [{
          label: 'Make adjustments',
          value: 'adjust_financial'
        }, {
          label: 'Continue to next section',
          value: 'next_section'
        }]
      }]);
      setIsSectionComplete(prev => ({
        ...prev,
        financialInfo: true
      }));
    }, 1500);
  };
  const closePreview = () => {
    setShowPreview(false);
    setMessages(prev => [...prev, {
      type: 'assistant',
      content: "Now that you've reviewed your document, what would you like to do next?",
      options: [{
        label: 'Generate final document',
        value: 'generate_document'
      }, {
        label: 'Continue editing',
        value: 'continue_editing'
      }]
    }]);
  };
  return <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FileTextIcon className="h-6 w-6 text-blue-600 mr-2" />
            <h1 className="text-xl font-semibold text-gray-900">
              IPO Prospectus Pro
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900">
              <EyeIcon className="h-5 w-5" />
            </button>
            <button className="text-gray-600 hover:text-gray-900">
              <DownloadIcon className="h-5 w-5" />
            </button>
            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-medium">
              JS
            </div>
          </div>
        </div>
      </header>
      {showPreview ? <div className="flex-1 overflow-auto p-6">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Document Preview
            </h2>
            <button onClick={closePreview} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Close Preview
            </button>
          </div>
          <SECDocumentPreview financialData={financialData} />
        </div> : <>
          {/* Chat messages area */}
          <div className="flex-1 overflow-auto p-4 bg-gray-50">
            <div className="max-w-3xl mx-auto space-y-4">
              {messages.map((message, index) => <ChatMessage key={index} message={message} onOptionSelect={handleOptionSelect} financialData={message.financialData} />)}
              {showTemplateOptions && <div className="ml-12 mt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md cursor-pointer transition-all" onClick={() => handleOptionSelect('template_standard')}>
                    <h4 className="font-medium text-gray-900 mb-1">
                      Standard IPO Prospectus
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Suitable for most companies
                    </p>
                    <div className="text-xs text-gray-500">
                      SEC Form S-1 Compliant
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md cursor-pointer transition-all" onClick={() => handleOptionSelect('template_tech')}>
                    <h4 className="font-medium text-gray-900 mb-1">
                      Technology Company
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      For SaaS, fintech, and tech companies
                    </p>
                    <div className="text-xs text-gray-500">
                      Enhanced IP and R&D sections
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md cursor-pointer transition-all" onClick={() => handleOptionSelect('template_international')}>
                    <h4 className="font-medium text-gray-900 mb-1">
                      International Dual-Listing
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      For listing on multiple exchanges
                    </p>
                    <div className="text-xs text-gray-500">
                      Multi-jurisdiction compliance
                    </div>
                  </div>
                </div>}
              {showFileUploader && <div className="ml-12 mt-2">
                  <ChatFileUploader onDataParsed={handleFileUpload} />
                </div>}
              {messages[messages.length - 1]?.prospectusOverview && <div className="ml-12 mt-2 bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <BookOpenIcon size={18} className="text-blue-600 mr-2" />
                    <h3 className="font-medium text-gray-800">
                      Prospectus Overview
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Offering Size (number of shares)
                      </label>
                      <input type="text" className="w-full p-2 border border-gray-300 rounded-md" defaultValue="10,000,000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price Range
                      </label>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">$</span>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md" defaultValue="14.00" />
                        <span className="text-gray-500">to $</span>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md" defaultValue="16.00" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ticker Symbol
                      </label>
                      <input type="text" className="w-full p-2 border border-gray-300 rounded-md" defaultValue="TFIN" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Exchange
                      </label>
                      <select className="w-full p-2 border border-gray-300 rounded-md">
                        <option>Nasdaq Global Market</option>
                        <option>New York Stock Exchange</option>
                        <option>NYSE American</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Use of Proceeds (Summary)
                      </label>
                      <textarea className="w-full p-2 border border-gray-300 rounded-md" rows={3} defaultValue="We intend to use the net proceeds from this offering for working capital and general corporate purposes, including research and development, sales and marketing activities, and capital expenditures."></textarea>
                    </div>
                    <div className="flex justify-end">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={handleSendMessage}>
                        Save Section
                      </button>
                    </div>
                  </div>
                </div>}
              {messages[messages.length - 1]?.riskFactors && <div className="ml-12 mt-2 bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <AlertTriangleIcon size={18} className="text-orange-500 mr-2" />
                    <h3 className="font-medium text-gray-800">Risk Factors</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 mb-1">
                            Competitive Market Risk
                          </h4>
                          <p className="text-sm text-gray-600">
                            We operate in a highly competitive market with
                            numerous established competitors who may have
                            greater resources than us.
                          </p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <CheckIcon size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 mb-1">
                            Technology Risk
                          </h4>
                          <p className="text-sm text-gray-600">
                            Our business depends on the continued functionality
                            and security of our technology platform. Any
                            significant disruption or breach could harm our
                            operations and reputation.
                          </p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <CheckIcon size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 mb-1">
                            Regulatory Risk
                          </h4>
                          <p className="text-sm text-gray-600">
                            We are subject to complex and evolving regulations.
                            Changes in these regulations or failure to comply
                            could adversely affect our business.
                          </p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <CheckIcon size={16} />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Add New Risk Factor
                      </label>
                      <input type="text" className="w-full p-2 border border-gray-300 rounded-md mb-2" placeholder="Risk factor title" />
                      <textarea className="w-full p-2 border border-gray-300 rounded-md" rows={2} placeholder="Describe the risk and its potential impact on the business"></textarea>
                    </div>
                    <div className="flex justify-end">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={handleSendMessage}>
                        Save Risk Factors
                      </button>
                    </div>
                  </div>
                </div>}
              <div ref={messagesEndRef} />
            </div>
          </div>
          {/* Chat input area */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center">
                <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex items-center">
                  <input type="text" placeholder="Type your message..." className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} />
                  <button className="p-1 text-gray-500 hover:text-gray-700">
                    <PaperclipIcon className="h-5 w-5" />
                  </button>
                  <button className="ml-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700" onClick={handleSendMessage}>
                    <SendIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500 text-center">
                IPO Prospectus Pro will guide you through creating your
                prospectus document
              </div>
            </div>
          </div>
        </>}
    </div>;
}