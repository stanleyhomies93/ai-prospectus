import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { UploadIcon, FileSpreadsheetIcon, AlertCircleIcon, CheckCircleIcon, XIcon, BarChartIcon, DollarSignIcon, TrendingUpIcon } from 'lucide-react';

export interface FinancialData {
  headers: string[];
  rows: (string | number)[][];
  title: string;
  period?: string;
  type?: 'general' | 'liquidity' | 'income' | 'balance' | 'cashflow';
}

interface FinancialDataUploaderProps {
  onDataParsed: (data: FinancialData) => void;
  onReset?: () => void;
  uploadedCount?: number;
}

export function FinancialDataUploader({
  onDataParsed,
  onReset,
  uploadedCount = 0
}: FinancialDataUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [selectedSheet, setSelectedSheet] = useState<string>('');
  const [dataTitle, setDataTitle] = useState<string>('Financial Statements');
  const [dataPeriod, setDataPeriod] = useState<string>('For the years ended December 31, 2022, 2021, and 2020');
  const [documentType, setDocumentType] = useState<'general' | 'liquidity' | 'income' | 'balance' | 'cashflow'>('general');

  const documentTypeOptions = [
    { value: 'general', label: 'General Financial Data', icon: FileSpreadsheetIcon, description: 'Standard financial statements and data' },
    { value: 'liquidity', label: 'Liquidity & Capital Resources', icon: BarChartIcon, description: 'Current assets, liabilities, and working capital' },
    { value: 'income', label: 'Income Statement', icon: TrendingUpIcon, description: 'Revenue, expenses, and profitability metrics' },
    { value: 'balance', label: 'Balance Sheet', icon: DollarSignIcon, description: 'Assets, liabilities, and shareholders equity' },
    { value: 'cashflow', label: 'Cash Flow Statement', icon: TrendingUpIcon, description: 'Operating, investing, and financing cash flows' }
  ];

  const getDefaultTitle = (type: string) => {
    switch (type) {
      case 'liquidity': return 'LIQUIDITY AND CAPITAL RESOURCES';
      case 'income': return 'CONSOLIDATED STATEMENTS OF OPERATIONS';
      case 'balance': return 'CONSOLIDATED BALANCE SHEETS';
      case 'cashflow': return 'CONSOLIDATED STATEMENTS OF CASH FLOWS';
      default: return 'Financial Statements';
    }
  };

  const getDefaultPeriod = (type: string) => {
    switch (type) {
      case 'liquidity': return 'As of March 31, 2024 and March 31, 2025';
      case 'income': return 'For the years ended March 31, 2024 and March 31, 2025';
      case 'balance': return 'As of March 31, 2024 and March 31, 2025';
      case 'cashflow': return 'For the years ended March 31, 2024 and March 31, 2025';
      default: return 'For the years ended December 31, 2022, 2021, and 2020';
    }
  };

  const handleDocumentTypeChange = (type: 'general' | 'liquidity' | 'income' | 'balance' | 'cashflow') => {
    setDocumentType(type);
    setDataTitle(getDefaultTitle(type));
    setDataPeriod(getDefaultPeriod(type));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setSuccess(false);
      // Read the Excel file to get sheet names
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, {
            type: 'array'
          });
          setSheetNames(workbook.SheetNames);
          setSelectedSheet(workbook.SheetNames[0]); // Default to first sheet
        } catch (err) {
          setError("Failed to read Excel file. Please make sure it's a valid Excel file.");
        }
      };
      reader.readAsArrayBuffer(selectedFile);
    }
  };

  const parseExcel = () => {
    if (!file || !selectedSheet) {
      setError('Please select a file and sheet first.');
      return;
    }
    setIsLoading(true);
    setError(null);
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, {
          type: 'array'
        });
        // Get the selected worksheet
        const worksheet = workbook.Sheets[selectedSheet];
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1
        });
        // Filter out empty rows
        const filteredData = jsonData.filter(row => Array.isArray(row) && row.some(cell => cell !== null && cell !== undefined && cell !== ''));
        if (filteredData.length < 2) {
          setError("The Excel sheet doesn't contain enough data. Please ensure it has headers and at least one row of data.");
          setIsLoading(false);
          return;
        }
        // First row is headers
        const headers = filteredData[0].map(header => String(header));
        // Rest are data rows
        const rows = filteredData.slice(1).map(row => {
          // Ensure row has same length as headers by padding with empty strings if needed
          const paddedRow = [...row];
          while (paddedRow.length < headers.length) {
            paddedRow.push('');
          }
          return paddedRow;
        });
        // Send the parsed data to parent component
        const parsedData = {
          headers,
          rows,
          title: dataTitle,
          period: dataPeriod,
          type: documentType
        };
        
        console.log('Parsed financial data:', parsedData);
        
        try {
          onDataParsed(parsedData);
          setSuccess(true);
          setIsLoading(false);
        } catch (error) {
          console.error('Error in onDataParsed callback:', error);
          setError('Failed to process financial data. Please try again.');
          setIsLoading(false);
        }
      } catch (err) {
        setError('Failed to parse Excel data. Please make sure the file is in the correct format.');
        setIsLoading(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleReset = () => {
    setFile(null);
    setError(null);
    setSuccess(false);
    setSheetNames([]);
    setSelectedSheet('');
    if (onReset) onReset();
  };

  const handleContinueUploading = () => {
    setSuccess(false);
    setFile(null);
    setError(null);
    setSheetNames([]);
    setSelectedSheet('');
    // Keep the current document type selected for convenience
  };

  const handleUploadAnother = () => {
    setSuccess(false);
    setFile(null);
    setError(null);
    setSheetNames([]);
    setSelectedSheet('');
    // Reset to general type for a fresh start
    setDocumentType('general');
    setDataTitle('Financial Statements');
    setDataPeriod('For the years ended December 31, 2022, 2021, and 2020');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Upload Financial Data
        </h3>
        {uploadedCount > 0 && (
          <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {uploadedCount} document{uploadedCount !== 1 ? 's' : ''} uploaded
          </div>
        )}
      </div>
      
      {success ? (
        <div className="mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
            <CheckCircleIcon size={20} className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-green-800 font-medium">
                Financial data uploaded successfully!
              </p>
              <p className="text-green-700 text-sm mt-1">
                Your {documentTypeOptions.find(opt => opt.value === documentType)?.label.toLowerCase()} has been processed and is ready to be
                included in your prospectus.
              </p>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex gap-3">
              <button 
                onClick={handleContinueUploading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center"
              >
                <PlusIcon size={16} className="mr-2" />
                Upload Another {documentTypeOptions.find(opt => opt.value === documentType)?.label}
              </button>
              <button 
                onClick={handleUploadAnother}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center justify-center"
              >
                <PlusIcon size={16} className="mr-2" />
                Upload Different Document Type
              </button>
            </div>
            <div className="flex justify-center">
              <button onClick={handleReset} className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 flex items-center">
                <XIcon size={16} className="mr-2" />
                Reset All
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Document Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Document Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {documentTypeOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleDocumentTypeChange(option.value as any)}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      documentType === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start">
                      <IconComponent 
                        size={20} 
                        className={`mr-3 mt-0.5 ${
                          documentType === option.value ? 'text-blue-600' : 'text-gray-400'
                        }`} 
                      />
                      <div>
                        <p className={`font-medium text-sm ${
                          documentType === option.value ? 'text-blue-900' : 'text-gray-900'
                        }`}>
                          {option.label}
                        </p>
                        <p className={`text-xs mt-1 ${
                          documentType === option.value ? 'text-blue-700' : 'text-gray-500'
                        }`}>
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Document Type Specific Instructions */}
          {documentType === 'liquidity' && (
            <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-900 mb-2">
                📊 Liquidity & Capital Resources Format
              </h4>
              <p className="text-xs text-blue-700 mb-2">
                Your Excel file should include columns for:
              </p>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Current assets (Cash, Deposits, Receivables)</li>
                <li>• Current liabilities (Payables, Borrowings, Leases)</li>
                <li>• Net current assets calculation</li>
                <li>• Multiple periods (e.g., 2024, 2025)</li>
              </ul>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Financial Statement Title
            </label>
            <input 
              type="text" 
              value={dataTitle} 
              onChange={e => setDataTitle(e.target.value)} 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
              placeholder="e.g., LIQUIDITY AND CAPITAL RESOURCES" 
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Period Description
            </label>
            <input 
              type="text" 
              value={dataPeriod} 
              onChange={e => setDataPeriod(e.target.value)} 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
              placeholder="e.g., As of March 31, 2024 and March 31, 2025" 
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Excel File
            </label>
            <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
              file ? 'border-blue-300 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
            }`}>
              {!file ? (
                <div>
                  <UploadIcon size={24} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Drag and drop your Excel file here, or click to browse
                  </p>
                  <button 
                    onClick={() => document.getElementById('file-upload')?.click()} 
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 inline-flex items-center"
                  >
                    <FileSpreadsheetIcon size={16} className="mr-2" />
                    Browse Files
                  </button>
                  <input 
                    id="file-upload" 
                    type="file" 
                    accept=".xlsx,.xls,.csv" 
                    onChange={handleFileChange} 
                    className="hidden" 
                  />
                </div>
              ) : (
                <div>
                  <FileSpreadsheetIcon size={24} className="mx-auto text-blue-500 mb-2" />
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                  <button onClick={handleReset} className="text-xs text-blue-700 hover:text-blue-800">
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {sheetNames.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Worksheet
              </label>
              <select 
                value={selectedSheet} 
                onChange={e => setSelectedSheet(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                {sheetNames.map(name => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
              <AlertCircleIcon size={20} className="text-red-500 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          <div className="flex justify-end">
            <button 
              onClick={parseExcel} 
              disabled={!file || isLoading} 
              className={`px-4 py-2 rounded flex items-center ${
                !file || isLoading 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-700 text-white hover:bg-blue-800'
              }`}
            >
              {isLoading ? 'Processing...' : 'Upload and Process Data'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}