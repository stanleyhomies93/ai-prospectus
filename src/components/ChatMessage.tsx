import React from 'react';
import { FinancialData } from './FinancialDataUploader';
import { FinancialDataPreview } from './FinancialDataPreview';
import { ChatOptions } from './ChatOptions';
import { BotIcon, UserIcon, InfoIcon } from 'lucide-react';
interface ChatMessageProps {
  message: {
    type: 'user' | 'assistant';
    content: string;
    options?: {
      label: string;
      value: string;
    }[];
    additionalInfo?: string;
    showTemplates?: boolean;
    showFileUploader?: boolean;
    showPreview?: boolean;
    financialData?: FinancialData;
    prospectusOverview?: boolean;
    riskFactors?: boolean;
  };
  onOptionSelect: (option: string) => void;
  financialData?: FinancialData | null;
}
export function ChatMessage({
  message,
  onOptionSelect,
  financialData
}: ChatMessageProps) {
  const isUser = message.type === 'user';
  return <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
          <BotIcon className="h-5 w-5 text-white" />
        </div>}
      <div className={`max-w-[80%] ${isUser ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200'} rounded-lg px-4 py-3 shadow-sm`}>
        <div className="text-sm">{message.content}</div>
        {message.additionalInfo && <div className="mt-2 flex items-start bg-blue-50 p-2 rounded text-xs text-blue-800 border border-blue-100">
            <InfoIcon className="h-4 w-4 mr-1 flex-shrink-0 mt-0.5" />
            <span>{message.additionalInfo}</span>
          </div>}
        {message.financialData && <div className="mt-3">
            <FinancialDataPreview data={message.financialData} />
          </div>}
        {message.options && <div className="mt-3">
            <ChatOptions options={message.options} onSelect={onOptionSelect} />
          </div>}
      </div>
      {isUser && <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center ml-2 flex-shrink-0">
          <UserIcon className="h-5 w-5 text-gray-600" />
        </div>}
    </div>;
}