import React from 'react';
import { FinancialData } from './FinancialDataUploader';
import { BarChartIcon, DollarSignIcon, TrendingUpIcon, FileSpreadsheetIcon } from 'lucide-react';

interface FinancialDataPreviewProps {
  data: FinancialData;
  onReset?: () => void;
}

export function FinancialDataPreview({
  data,
  onReset
}: FinancialDataPreviewProps) {
  // Add debugging and better error handling
  console.log('FinancialDataPreview received data:', data);
  
  if (!data) {
    console.log('No data provided to FinancialDataPreview');
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <p className="text-gray-500">No financial data available</p>
      </div>
    );
  }
  
  if (!data.headers || !Array.isArray(data.headers) || data.headers.length === 0) {
    console.log('No headers in financial data');
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <p className="text-gray-500">Invalid financial data format: missing headers</p>
      </div>
    );
  }
  
  if (!data.rows || !Array.isArray(data.rows) || data.rows.length === 0) {
    console.log('No rows in financial data');
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <p className="text-gray-500">Invalid financial data format: missing data rows</p>
      </div>
    );
  }

  const getDocumentTypeIcon = (type?: string) => {
    switch (type) {
      case 'liquidity': return BarChartIcon;
      case 'income': return TrendingUpIcon;
      case 'balance': return DollarSignIcon;
      case 'cashflow': return TrendingUpIcon;
      default: return FileSpreadsheetIcon;
    }
  };

  const getDocumentTypeColor = (type?: string) => {
    switch (type) {
      case 'liquidity': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'income': return 'text-green-600 bg-green-50 border-green-200';
      case 'balance': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'cashflow': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatValue = (value: string | number): string => {
    if (typeof value === 'number') {
      // Format numbers with commas and 2 decimal places if needed
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).format(value);
    }
    return String(value);
  };

  const isTotalRow = (row: (string | number)[]): boolean => {
    const firstCell = String(row[0]).toLowerCase();
    return firstCell.includes('total') || firstCell.includes('net');
  };

  const isSubtotalRow = (row: (string | number)[]): boolean => {
    const firstCell = String(row[0]).toLowerCase();
    return firstCell.includes('subtotal') || firstCell.includes('sub-total');
  };

  const getRowStyle = (row: (string | number)[], rowIndex: number) => {
    if (isTotalRow(row)) {
      return 'bg-blue-100 font-bold border-t-2 border-blue-300';
    }
    if (isSubtotalRow(row)) {
      return 'bg-gray-100 font-semibold border-t border-gray-300';
    }
    return rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50';
  };

  const IconComponent = getDocumentTypeIcon(data.type);
  const typeColor = getDocumentTypeColor(data.type);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header with document type indicator */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`p-2 rounded-lg border ${typeColor} mr-3`}>
            <IconComponent size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{data.title}</h3>
            {data.period && (
              <p className="text-sm text-gray-600">{data.period}</p>
            )}
          </div>
        </div>
        {data.type && (
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${typeColor}`}>
            {data.type.toUpperCase()}
          </div>
        )}
      </div>

      {/* Document type specific note */}
      {data.type === 'liquidity' && (
        <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-700">
            <strong>Note:</strong> This table shows current assets, current liabilities, and net current assets 
            for the specified periods. All amounts are in US dollars.
          </p>
        </div>
      )}

      {/* Data table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {data.headers.map((header, index) => (
                <th 
                  key={index} 
                  className={`px-4 py-3 text-left border-b border-r border-gray-300 font-medium text-gray-700 ${
                    index === 0 ? 'min-w-48' : 'text-right min-w-32'
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className={getRowStyle(row, rowIndex)}>
                {row.map((cell, cellIndex) => (
                  <td 
                    key={cellIndex} 
                    className={`px-4 py-3 border-b border-r border-gray-300 ${
                      cellIndex === 0 
                        ? 'font-medium text-gray-900' 
                        : 'text-right text-gray-700'
                    }`}
                  >
                    {formatValue(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer with additional information */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            <p>• Total rows are highlighted in blue</p>
            <p>• All amounts are in US dollars unless otherwise specified</p>
          </div>
          {onReset && (
            <button 
              onClick={onReset}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Upload Different Data
            </button>
          )}
        </div>
      </div>
    </div>
  );
}