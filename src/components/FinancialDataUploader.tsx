import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { UploadIcon, FileSpreadsheetIcon, AlertCircleIcon, CheckCircleIcon, XIcon } from 'lucide-react';
export interface FinancialData {
  headers: string[];
  rows: (string | number)[][];
  title: string;
  period?: string;
}
interface FinancialDataUploaderProps {
  onDataParsed: (data: FinancialData) => void;
  onReset?: () => void;
}
export function FinancialDataUploader({
  onDataParsed,
  onReset
}: FinancialDataUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [selectedSheet, setSelectedSheet] = useState<string>('');
  const [dataTitle, setDataTitle] = useState<string>('Financial Statements');
  const [dataPeriod, setDataPeriod] = useState<string>('For the years ended December 31, 2022, 2021, and 2020');
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
        onDataParsed({
          headers,
          rows,
          title: dataTitle,
          period: dataPeriod
        });
        setSuccess(true);
        setIsLoading(false);
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
  return <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Upload Financial Data
      </h3>
      {success ? <div className="mb-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
            <CheckCircleIcon size={20} className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-green-800 font-medium">
                Financial data uploaded successfully!
              </p>
              <p className="text-green-700 text-sm mt-1">
                Your financial data has been processed and is ready to be
                included in your prospectus.
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <button onClick={handleReset} className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 flex items-center">
              <XIcon size={16} className="mr-2" />
              Reset
            </button>
          </div>
        </div> : <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Financial Statement Title
            </label>
            <input type="text" value={dataTitle} onChange={e => setDataTitle(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Consolidated Balance Sheets" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Period Description
            </label>
            <input type="text" value={dataPeriod} onChange={e => setDataPeriod(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., For the years ended December 31, 2022, 2021, and 2020" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Excel File
            </label>
            <div className={`border-2 border-dashed rounded-lg p-6 text-center ${file ? 'border-blue-300 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}>
              {!file ? <div>
                  <UploadIcon size={24} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Drag and drop your Excel file here, or click to browse
                  </p>
                  <button onClick={() => document.getElementById('file-upload')?.click()} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 inline-flex items-center">
                    <FileSpreadsheetIcon size={16} className="mr-2" />
                    Browse Files
                  </button>
                  <input id="file-upload" type="file" accept=".xlsx,.xls,.csv" onChange={handleFileChange} className="hidden" />
                </div> : <div>
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
                </div>}
            </div>
          </div>
          {sheetNames.length > 0 && <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Worksheet
              </label>
              <select value={selectedSheet} onChange={e => setSelectedSheet(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                {sheetNames.map(name => <option key={name} value={name}>
                    {name}
                  </option>)}
              </select>
            </div>}
          {error && <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
              <AlertCircleIcon size={20} className="text-red-500 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-red-700">{error}</p>
            </div>}
          <div className="flex justify-end">
            <button onClick={parseExcel} disabled={!file || isLoading} className={`px-4 py-2 rounded flex items-center ${!file || isLoading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-700 text-white hover:bg-blue-800'}`}>
              {isLoading ? 'Processing...' : 'Upload and Process Data'}
            </button>
          </div>
        </>}
    </div>;
}