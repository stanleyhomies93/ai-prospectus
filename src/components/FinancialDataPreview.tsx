import React from 'react';
import { FinancialData } from './FinancialDataUploader';
interface FinancialDataPreviewProps {
  data: FinancialData;
}
export function FinancialDataPreview({
  data
}: FinancialDataPreviewProps) {
  if (!data || !data.headers || !data.rows || data.rows.length === 0) {
    return null;
  }
  const formatValue = (value: string | number): string => {
    if (typeof value === 'number') {
      // Format numbers with commas and 2 decimal places if needed
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).format(value);
    }
    return value;
  };
  return <div className="bg-white border border-gray-200 rounded-lg p-4 overflow-x-auto">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{data.title}</h3>
      {data.period && <p className="text-sm text-gray-600 mb-4">{data.period}</p>}
      <div className="text-xs text-gray-500 mb-1">
        (in thousands, except per share data)
      </div>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {data.headers.map((header, index) => <th key={index} className="px-4 py-2 text-left border-b border-r border-gray-300 font-medium text-gray-700">
                {header}
              </th>)}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, rowIndex) => <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {row.map((cell, cellIndex) => <td key={cellIndex} className={`px-4 py-2 border-b border-r border-gray-300 ${cellIndex === 0 ? 'font-medium' : 'text-right'}`}>
                  {formatValue(cell)}
                </td>)}
            </tr>)}
        </tbody>
      </table>
    </div>;
}