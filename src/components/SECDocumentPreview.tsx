import React, { useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, PrinterIcon, DownloadIcon } from 'lucide-react';
import { FinancialData } from './FinancialDataUploader';
import { PDFDownloader } from './PDFDownloader';

interface SECDocumentPreviewProps {
  financialData?: FinancialData[] | null;
  riskFactors?: Array<{title: string; description: string}>;
  // Company Information
  companyName?: string;
  companyDescription?: string;
  companyAddress?: string;
  companyPhone?: string;
  tickerSymbol?: string;
  filingDate?: string;
  auditor?: string;
  usProcessAgent?: string;
  usProcessAgentAddress?: string;
  usProcessAgentPhone?: string;
  legalCounsel?: string;
  usLawFirm?: string;
  usLawFirmAddress?: string;
  usLawFirmPhone?: string;
  underwritingCounsel?: string;
  underwritingCounselAddress?: string;
  underwritingCounselPhone?: string;
  ceoName?: string;
  relatedCompany?: string;
}

export function SECDocumentPreview({
  financialData,
  riskFactors = [],
  companyName = 'TechFin Solutions, Inc.',
  companyDescription = 'A leading technology company providing innovative solutions.',
  companyAddress = '123 Main Street, San Francisco, CA 94105',
  companyPhone = '+1 (555) 123-4567',
  tickerSymbol = 'TFIN',
  filingDate = 'October 15, 2023',
  auditor = 'Deloitte & Touche LLP',
  usProcessAgent = 'Corporation Service Company',
  usProcessAgentAddress = '251 Little Falls Drive, Wilmington, DE 19808',
  usProcessAgentPhone = '+1 (302) 636-5400',
  legalCounsel = 'John Smith, Esq.',
  usLawFirm = 'Skadden, Arps, Slate, Meagher & Flom LLP',
  usLawFirmAddress = 'One Manhattan West, New York, NY 10001',
  usLawFirmPhone = '+1 (212) 735-3000',
  underwritingCounsel = 'Davis Polk & Wardwell LLP',
  underwritingCounselAddress = '450 Lexington Avenue, New York, NY 10017',
  underwritingCounselPhone = '+1 (212) 450-4000',
  ceoName = 'John Smith',
  relatedCompany = 'TechFin Holdings Ltd.'
}: SECDocumentPreviewProps) {
  const documentRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  // Function to extract financial figures from uploaded data
  const getFinancialFigure = (rowIndex: number, columnIndex: number, defaultValue: string, documentType?: string): string => {
    if (!financialData || financialData.length === 0) {
      return defaultValue;
    }
    
    // If documentType is specified, look for that specific document type
    if (documentType) {
      const targetDoc = financialData.find(doc => doc.type === documentType);
      if (targetDoc && targetDoc.rows[rowIndex] && targetDoc.rows[rowIndex][columnIndex]) {
        const value = targetDoc.rows[rowIndex][columnIndex];
        if (typeof value === 'number') {
          return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
          }).format(value);
        }
        return String(value);
      }
    }
    
    // Fallback to first document if no specific type found
    const firstDoc = financialData[0];
    if (firstDoc && firstDoc.rows[rowIndex] && firstDoc.rows[rowIndex][columnIndex]) {
      const value = firstDoc.rows[rowIndex][columnIndex];
      if (typeof value === 'number') {
        return new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2
        }).format(value);
      }
      return String(value);
    }
    
    return defaultValue;
  };

  // Function to highlight financial figures in text
  const highlightFinancialFigure = (text: string, figure: string, defaultValue: string): JSX.Element => {
    const displayFigure = figure !== defaultValue ? figure : defaultValue;
    const isHighlighted = figure !== defaultValue;
    
    return (
      <span>
        {text.replace(/\$\d+(?:\.\d+)?(?:M|B|K)?/g, (match) => {
          if (isHighlighted) {
            return `<span class="bg-yellow-200 px-1 rounded font-semibold">$${displayFigure}</span>`;
          }
          return match;
        })}
      </span>
    );
  };

  // Intelligent financial data extraction functions
  const getTotalAssets = (): string => {
    if (!financialData || financialData.length === 0) return '192,500';
    
    // Look for balance sheet data first
    const balanceSheet = financialData.find(doc => doc.type === 'balance');
    if (balanceSheet) {
      // Look for "Total Assets" row
      const totalAssetsRow = balanceSheet.rows.find(row => 
        row[0] && String(row[0]).toLowerCase().includes('total assets')
      );
      if (totalAssetsRow && totalAssetsRow[1]) {
        const value = totalAssetsRow[1];
        if (typeof value === 'number') {
          return new Intl.NumberFormat('en-US').format(value);
        }
        return String(value);
      }
    }
    
    // Fallback to first document's first significant number
    const firstDoc = financialData[0];
    if (firstDoc && firstDoc.rows.length > 0) {
      for (let row of firstDoc.rows) {
        for (let cell of row) {
          if (typeof cell === 'number' && cell > 1000) {
            return new Intl.NumberFormat('en-US').format(cell);
          }
        }
      }
    }
    
    return '192,500';
  };

  const getCashBalance = (): string => {
    if (!financialData || financialData.length === 0) return '28.5M';
    
    // Look for balance sheet data first
    const balanceSheet = financialData.find(doc => doc.type === 'balance');
    if (balanceSheet) {
      // Look for "Cash" or "Cash and Cash Equivalents" row
      const cashRow = balanceSheet.rows.find(row => 
        row[0] && String(row[0]).toLowerCase().includes('cash')
      );
      if (cashRow && cashRow[1]) {
        const value = cashRow[1];
        if (typeof value === 'number') {
          return new Intl.NumberFormat('en-US').format(value);
        }
        return String(value);
      }
    }
    
    // Look for liquidity data
    const liquidityDoc = financialData.find(doc => doc.type === 'liquidity');
    if (liquidityDoc && liquidityDoc.rows.length > 0) {
      for (let row of liquidityDoc.rows) {
        if (row[0] && String(row[0]).toLowerCase().includes('cash')) {
          if (row[1] && typeof row[1] === 'number') {
            return new Intl.NumberFormat('en-US').format(row[1]);
          }
        }
      }
    }
    
    return '28.5M';
  };

  const getRevenue = (): string => {
    if (!financialData || financialData.length === 0) return '15.2M';
    
    // Look for income statement data
    const incomeStatement = financialData.find(doc => doc.type === 'income');
    if (incomeStatement) {
      // Look for "Revenue" or "Sales" row
      const revenueRow = incomeStatement.rows.find(row => 
        row[0] && (String(row[0]).toLowerCase().includes('revenue') || 
                  String(row[0]).toLowerCase().includes('sales'))
      );
      if (revenueRow && revenueRow[1]) {
        const value = revenueRow[1];
        if (typeof value === 'number') {
          return new Intl.NumberFormat('en-US').format(value);
        }
        return String(value);
      }
    }
    
    return '15.2M';
  };

  // Intelligent market analysis based on company description
  const generateMarketAnalysis = (): string => {
    const description = companyDescription || companyName || '';
    const isEducation = description.toLowerCase().includes('education') || 
                       description.toLowerCase().includes('learning') ||
                       description.toLowerCase().includes('academy') ||
                       description.toLowerCase().includes('english');
    const isTech = description.toLowerCase().includes('tech') || 
                  description.toLowerCase().includes('software') ||
                  description.toLowerCase().includes('digital') ||
                  description.toLowerCase().includes('technology');
    const isFinance = description.toLowerCase().includes('finance') || 
                     description.toLowerCase().includes('payment') ||
                     description.toLowerCase().includes('banking') ||
                     description.toLowerCase().includes('financial');
    
    if (isEducation) {
      return `The English language education market in Hong Kong is experiencing steady growth, driven by increasing demand for English proficiency among children and the importance of English in Hong Kong's international business environment. The market is expected to grow at a compound annual growth rate of 8.5% over the next five years, with parents increasingly investing in quality English education for their children's future success.`;
    } else if (isTech) {
      return `The technology sector in Hong Kong continues to expand rapidly, supported by government initiatives to develop the city as a regional tech hub. The fintech market, in particular, is experiencing unprecedented growth with increasing adoption of digital payment solutions and financial technology innovations.`;
    } else if (isFinance) {
      return `The financial services market in Hong Kong remains robust, with the city maintaining its position as a leading global financial center. The fintech sector is experiencing rapid transformation, driven by regulatory support and increasing demand for innovative financial solutions.`;
    } else {
      return `The market for ${companyName}'s services is experiencing positive growth trends, driven by increasing demand for specialized solutions and the company's strong market positioning. The industry continues to evolve with new opportunities emerging from technological advancements and changing consumer preferences.`;
    }
  };

  // Generate intelligent financial strength statement
  const generateFinancialStrengthStatement = (): JSX.Element => {
    const totalAssets = getTotalAssets();
    const cashBalance = getCashBalance();
    const revenue = getRevenue();
    
    return (
      <>
        Our strong financial position, with total assets of <span className="bg-yellow-200 px-1 rounded font-semibold">${totalAssets}</span> and cash reserves of <span className="bg-yellow-200 px-1 rounded font-semibold">${cashBalance}</span>, provides us with the resources needed to continue our growth and expansion plans. Our solid revenue base of <span className="bg-yellow-200 px-1 rounded font-semibold">${revenue}</span> demonstrates our ability to generate sustainable income while maintaining healthy cash flow.
      </>
    );
  };

  // Intelligent risk factors content generation
  const generateRiskFactorsContent = (): JSX.Element => {
    if (!riskFactors || riskFactors.length === 0) {
      return (
        <div className="my-12">
          <p className="text-xl font-bold mb-4">RISK FACTORS</p>
          <p className="mb-4 text-sm">
            Investing in our common stock involves a high degree of risk. You should carefully consider the risks described below, together with all of the other information included in this prospectus, before making an investment decision. If any of the following risks actually occur, our business, financial condition, results of operations, and prospects could be materially and adversely affected.
          </p>
          <p className="text-sm text-gray-500 italic">
            [Risk factors will be populated based on your industry and country selection]
          </p>
        </div>
      );
    }

    const totalAssets = getTotalAssets();
    const cashBalance = getCashBalance();
    const revenue = getRevenue();
    const totalLiabilities = getTotalLiabilities();

    return (
      <div className="my-12">
        <p className="text-xl font-bold mb-4">RISK FACTORS</p>
        <p className="mb-4 text-sm">
          Investing in our common stock involves a high degree of risk. You should carefully consider the risks described below, together with all of the other information included in this prospectus, before making an investment decision. If any of the following risks actually occur, our business, financial condition, results of operations, and prospects could be materially and adversely affected.
        </p>
        
        <p className="mb-4 text-sm">
          The following risk factors are based on our current business operations, financial position, and market conditions. Our total assets of <span className="bg-yellow-200 px-1 rounded font-semibold">${totalAssets}</span>, cash reserves of <span className="bg-yellow-200 px-1 rounded font-semibold">${cashBalance}</span>, and annual revenue of <span className="bg-yellow-200 px-1 rounded font-semibold">${revenue}</span> provide context for understanding these risks in relation to our financial capacity to address them.
        </p>

        {riskFactors.map((risk, index) => (
          <div key={index} className="mb-6">
            <p className="font-bold text-sm mb-2">
              {index + 1}. {risk.title}
            </p>
            <p className="text-sm mb-3">
              {generateIntelligentRiskDescription(risk, totalAssets, cashBalance, revenue, totalLiabilities)}
            </p>
          </div>
        ))}

        <p className="text-sm mt-6">
          The risks described above are not the only risks we face. Additional risks and uncertainties not currently known to us or that we currently deem immaterial may also materially and adversely affect our business, financial condition, results of operations, and prospects.
        </p>
      </div>
    );
  };

  // Generate intelligent risk descriptions with financial context
  const generateIntelligentRiskDescription = (
    risk: {title: string; description: string}, 
    totalAssets: string, 
    cashBalance: string, 
    revenue: string, 
    totalLiabilities: string
  ): string => {
    const baseDescription = risk.description;
    
    // Add financial context based on risk type
    if (risk.title.toLowerCase().includes('financial') || risk.title.toLowerCase().includes('economic')) {
      return `${baseDescription} [Advanced financial risk analysis and economic impact assessment will be provided when sophisticated AI reasoning capabilities are integrated.]`;
    }
    
    if (risk.title.toLowerCase().includes('regulatory') || risk.title.toLowerCase().includes('compliance')) {
      return `${baseDescription} [Comprehensive regulatory compliance analysis and resource impact assessment will be provided when advanced AI capabilities are integrated.]`;
    }
    
    if (risk.title.toLowerCase().includes('competition')) {
      return `${baseDescription} [Detailed competitive analysis and strategic resource allocation assessment will be provided when advanced AI reasoning capabilities are integrated.]`;
    }
    
    if (risk.title.toLowerCase().includes('technology') || risk.title.toLowerCase().includes('cybersecurity')) {
      return `${baseDescription} [Comprehensive technology risk analysis and investment impact assessment will be provided when advanced AI capabilities are integrated.]`;
    }
    
    if (risk.title.toLowerCase().includes('talent') || risk.title.toLowerCase().includes('recruitment')) {
      return `${baseDescription} [Detailed talent acquisition analysis and compensation strategy assessment will be provided when advanced AI reasoning capabilities are integrated.]`;
    }
    
    if (risk.title.toLowerCase().includes('supply chain') || risk.title.toLowerCase().includes('logistics')) {
      return `${baseDescription} [Comprehensive supply chain risk analysis and operational impact assessment will be provided when advanced AI capabilities are integrated.]`;
    }
    
    if (risk.title.toLowerCase().includes('currency') || risk.title.toLowerCase().includes('exchange rate')) {
      return `${baseDescription} [Detailed currency risk analysis and exchange rate impact assessment will be provided when advanced AI reasoning capabilities are integrated.]`;
    }
    
    if (risk.title.toLowerCase().includes('political') || risk.title.toLowerCase().includes('social')) {
      return `${baseDescription} [Comprehensive political and social risk analysis will be provided when advanced AI capabilities are integrated.]`;
    }
    
    // Default enhanced description
    return `${baseDescription} [Additional risk analysis and financial impact assessment will be provided when advanced AI reasoning capabilities are integrated into the system.]`;
  };

  // Get total liabilities for risk analysis
  const getTotalLiabilities = (): string => {
    if (!financialData || financialData.length === 0) return '150,000';
    
    // Look for balance sheet data first
    const balanceSheet = financialData.find(doc => doc.type === 'balance');
    if (balanceSheet) {
      // Look for "Total Liabilities" row
      const totalLiabilitiesRow = balanceSheet.rows.find(row => 
        row[0] && String(row[0]).toLowerCase().includes('total liabilities')
      );
      if (totalLiabilitiesRow && totalLiabilitiesRow[1]) {
        const value = totalLiabilitiesRow[1];
        if (typeof value === 'number') {
          return new Intl.NumberFormat('en-US').format(value);
        }
        return String(value);
      }
    }
    
    return '150,000';
  };

  // Intelligent data summarization functions
  const generateTableSummary = (doc: FinancialData): JSX.Element => {
    const summary = analyzeFinancialData(doc);
    
    return (
      <div className="mb-4">
        <p className="text-sm text-gray-700 mb-2">
          <strong>Data Analysis Summary:</strong> {summary.join(' ')}
        </p>
      </div>
    );
  };

  const analyzeFinancialData = (doc: FinancialData): string[] => {
    const insights: string[] = [];
    
    if (!doc.rows || doc.rows.length === 0) {
      return ['No data available for analysis.'];
    }

    // Analyze document type and generate relevant insights
    if (doc.type === 'income') {
      insights.push(...analyzeIncomeStatement(doc));
    } else if (doc.type === 'balance') {
      insights.push(...analyzeBalanceSheet(doc));
    } else if (doc.type === 'liquidity') {
      insights.push(...analyzeLiquidityData(doc));
    } else {
      insights.push(...analyzeGeneralFinancialData(doc));
    }

    return insights;
  };

  const analyzeIncomeStatement = (doc: FinancialData): string[] => {
    const insights: string[] = [];
    
    try {
      // Find revenue and profit/loss data
      const revenueRow = doc.rows.find(row => 
        row[0] && String(row[0]).toLowerCase().includes('revenue') || 
        String(row[0]).toLowerCase().includes('sales')
      );
      
      const profitRow = doc.rows.find(row => 
        row[0] && (String(row[0]).toLowerCase().includes('net income') || 
                  String(row[0]).toLowerCase().includes('net loss') ||
                  String(row[0]).toLowerCase().includes('profit'))
      );

      // Revenue Analysis Paragraph
      if (revenueRow && revenueRow.length > 1) {
        const currentRevenue = typeof revenueRow[1] === 'number' ? revenueRow[1] : 0;
        const previousRevenue = typeof revenueRow[2] === 'number' ? revenueRow[2] : 0;
        
        if (previousRevenue > 0) {
          const growthRate = ((currentRevenue - previousRevenue) / previousRevenue) * 100;
          if (growthRate > 0) {
            insights.push(`Revenue performance shows strong growth momentum, with a ${growthRate.toFixed(1)}% increase from ${formatCurrency(previousRevenue)} to ${formatCurrency(currentRevenue)}. This substantial growth indicates successful business expansion and market penetration, suggesting effective execution of the company's growth strategy. The consistent upward trajectory in revenue demonstrates the company's ability to capture market opportunities and maintain competitive positioning in the industry.`);
          } else {
            insights.push(`Revenue performance reflects a challenging period, with a ${Math.abs(growthRate).toFixed(1)}% decrease from ${formatCurrency(previousRevenue)} to ${formatCurrency(currentRevenue)}. This decline may be attributed to market conditions, competitive pressures, or operational challenges. However, the current revenue level of ${formatCurrency(currentRevenue)} still represents a significant business scale, providing a foundation for recovery and future growth initiatives.`);
          }
        } else {
          insights.push(`The company has established a solid revenue foundation with current revenue of ${formatCurrency(currentRevenue)}. This represents the initial phase of revenue generation, setting the stage for future growth and expansion opportunities. The revenue base provides essential cash flow for operational needs and strategic investments.`);
        }
      }

      // Profitability Analysis Paragraph
      if (profitRow && profitRow.length > 1) {
        const currentProfit = typeof profitRow[1] === 'number' ? profitRow[1] : 0;
        const previousProfit = typeof profitRow[2] === 'number' ? profitRow[2] : 0;
        
        if (currentProfit > 0) {
          insights.push(`Profitability metrics demonstrate strong financial performance, with net income of ${formatCurrency(currentProfit)}. This positive profitability indicates effective cost management and operational efficiency. The company's ability to generate consistent profits reflects a sustainable business model and strong market positioning. This profitability provides the financial foundation for future investments, debt repayment, and shareholder returns.`);
        } else {
          insights.push(`The company is currently experiencing a net loss of ${formatCurrency(Math.abs(currentProfit))}, which is common during growth phases or market transition periods. This loss may be attributed to strategic investments in expansion, market development, or operational restructuring. While the current loss presents challenges, it's important to note that many successful companies experience losses during their growth phases before achieving sustainable profitability.`);
        }
        
        if (previousProfit !== 0) {
          const profitChange = ((currentProfit - previousProfit) / Math.abs(previousProfit)) * 100;
          if (profitChange > 0) {
            insights.push(`Profitability trends show significant improvement, with a ${profitChange.toFixed(1)}% enhancement compared to the previous period. This improvement reflects successful implementation of cost optimization strategies, operational efficiency gains, and improved market positioning. The positive trend in profitability indicates the company's ability to translate revenue growth into bottom-line results, demonstrating strong financial management and business execution.`);
          } else {
            insights.push(`Profitability has declined by ${Math.abs(profitChange).toFixed(1)}% compared to the previous period, which may be due to increased investment in growth initiatives, market expansion costs, or competitive pressures. This decline, while concerning, should be viewed in the context of the company's strategic objectives and long-term growth plans. The company's management team is actively addressing these challenges through operational improvements and strategic initiatives.`);
          }
        }
      }

      // Expense Analysis Paragraph
      const expenseRows = doc.rows.filter(row => 
        row[0] && (String(row[0]).toLowerCase().includes('expense') || 
                  String(row[0]).toLowerCase().includes('cost'))
      );

      if (expenseRows.length > 0) {
        const totalExpenses = expenseRows.reduce((sum, row) => {
          const value = typeof row[1] === 'number' ? row[1] : 0;
          return sum + value;
        }, 0);
        
        const expenseBreakdown = expenseRows.map(row => {
          const name = String(row[0]);
          const value = typeof row[1] === 'number' ? row[1] : 0;
          return `${name} (${formatCurrency(value)})`;
        }).join(', ');
        
        insights.push(`Operating expenses analysis reveals total costs of ${formatCurrency(totalExpenses)}, comprising ${expenseBreakdown}. This expense structure reflects the company's operational complexity and investment in various business functions. The expense composition indicates strategic allocation of resources across different operational areas, supporting the company's growth objectives and market expansion efforts. Management continues to focus on optimizing these expenses while maintaining service quality and competitive positioning.`);
      }

    } catch (error) {
      insights.push('The income statement analysis reveals important trends in the company\'s financial performance, though some data points require additional context for complete interpretation. The available metrics provide valuable insights into revenue generation, profitability trends, and cost management effectiveness. Further analysis of specific line items would enhance understanding of the company\'s financial position and operational efficiency.');
    }

    return insights;
  };

  const analyzeBalanceSheet = (doc: FinancialData): string[] => {
    const insights: string[] = [];
    
    try {
      // Find key balance sheet items
      const totalAssetsRow = doc.rows.find(row => 
        row[0] && String(row[0]).toLowerCase().includes('total assets')
      );
      
      const totalLiabilitiesRow = doc.rows.find(row => 
        row[0] && String(row[0]).toLowerCase().includes('total liabilities')
      );
      
      const cashRow = doc.rows.find(row => 
        row[0] && String(row[0]).toLowerCase().includes('cash')
      );

      // Asset Analysis Paragraph
      if (totalAssetsRow && totalAssetsRow.length > 1) {
        const totalAssets = typeof totalAssetsRow[1] === 'number' ? totalAssetsRow[1] : 0;
        insights.push(`The company's asset base demonstrates substantial financial strength, with total assets of ${formatCurrency(totalAssets)}. This significant asset base provides the foundation for business operations, growth initiatives, and strategic investments. The asset composition reflects the company's investment in operational infrastructure, technology, and market expansion capabilities. This robust asset base positions the company well for continued growth and competitive advantage in the marketplace.`);
      }

      // Liability Analysis Paragraph
      if (totalLiabilitiesRow && totalLiabilitiesRow.length > 1) {
        const totalLiabilities = typeof totalLiabilitiesRow[1] === 'number' ? totalLiabilitiesRow[1] : 0;
        insights.push(`Financial obligations are managed through total liabilities of ${formatCurrency(totalLiabilities)}, which represent the company's debt and other financial commitments. These liabilities include both short-term operational obligations and long-term financing arrangements. The company's liability management strategy balances the need for growth capital with maintaining financial flexibility. This liability structure supports the company's strategic objectives while ensuring sustainable financial health and operational stability.`);
      }

      // Leverage Analysis Paragraph
      if (totalAssetsRow && totalLiabilitiesRow && totalAssetsRow.length > 1 && totalLiabilitiesRow.length > 1) {
        const totalAssets = typeof totalAssetsRow[1] === 'number' ? totalAssetsRow[1] : 0;
        const totalLiabilities = typeof totalLiabilitiesRow[1] === 'number' ? totalLiabilitiesRow[1] : 0;
        
        if (totalAssets > 0) {
          const debtRatio = (totalLiabilities / totalAssets) * 100;
          const leverageLevel = debtRatio > 50 ? 'high' : debtRatio > 30 ? 'moderate' : 'low';
          let leverageContext = '';
          if (debtRatio > 50) {
            leverageContext = 'This higher leverage level indicates significant debt financing, which may provide growth capital but also increases financial risk. The company\'s management team actively monitors this leverage to ensure it remains sustainable and supports long-term value creation.';
          } else if (debtRatio > 30) {
            leverageContext = 'This moderate leverage level suggests a balanced approach to capital structure, utilizing debt financing for growth while maintaining financial flexibility. This leverage ratio provides the company with access to capital for strategic initiatives while keeping financial risk at manageable levels.';
          } else {
            leverageContext = 'This low leverage level indicates conservative financial management and strong financial flexibility. The company\'s minimal debt burden provides significant financial stability and positions it well for future financing needs and strategic opportunities.';
          }
          
          insights.push(`Financial leverage analysis reveals a debt-to-asset ratio of ${debtRatio.toFixed(1)}%, indicating ${leverageLevel} leverage. ${leverageContext}`);
        }
      }

      // Cash Position Analysis Paragraph
      if (cashRow && cashRow.length > 1) {
        const cashBalance = typeof cashRow[1] === 'number' ? cashRow[1] : 0;
        insights.push(`Liquidity position is supported by cash and cash equivalents of ${formatCurrency(cashBalance)}, providing essential working capital for day-to-day operations and strategic initiatives. This cash position enables the company to meet short-term obligations, invest in growth opportunities, and maintain operational flexibility. The strong cash position reflects effective cash management practices and provides a buffer against market uncertainties and operational challenges. This liquidity foundation supports the company's ability to execute its strategic plans and respond to market opportunities.`);
      }

    } catch (error) {
      insights.push('The balance sheet analysis provides valuable insights into the company\'s financial structure and capital management, though some specific metrics require additional context for complete interpretation. The available data demonstrates the company\'s financial foundation and resource allocation strategies. Further analysis of specific asset and liability categories would enhance understanding of the company\'s financial position and strategic priorities.');
    }

    return insights;
  };

  const analyzeLiquidityData = (doc: FinancialData): string[] => {
    const insights: string[] = [];
    
    try {
      // Find current assets and liabilities
      const currentAssetsRow = doc.rows.find(row => 
        row[0] && String(row[0]).toLowerCase().includes('current assets')
      );
      
      const currentLiabilitiesRow = doc.rows.find(row => 
        row[0] && String(row[0]).toLowerCase().includes('current liabilities')
      );

      // Liquidity Ratio Analysis Paragraph
      if (currentAssetsRow && currentLiabilitiesRow && currentAssetsRow.length > 1 && currentLiabilitiesRow.length > 1) {
        const currentAssets = typeof currentAssetsRow[1] === 'number' ? currentAssetsRow[1] : 0;
        const currentLiabilities = typeof currentLiabilitiesRow[1] === 'number' ? currentLiabilitiesRow[1] : 0;
        
        if (currentLiabilities > 0) {
          const currentRatio = currentAssets / currentLiabilities;
          const liquidityStrength = currentRatio > 1.5 ? 'strong' : currentRatio > 1 ? 'adequate' : 'weak';
          const liquidityContext = currentRatio > 1.5 ? 'This strong liquidity position provides significant financial flexibility and demonstrates the company\'s ability to meet short-term obligations comfortably. The robust current ratio indicates effective working capital management and positions the company well for operational stability and growth opportunities.' :
                                  currentRatio > 1 ? 'This adequate liquidity level suggests the company can meet its short-term obligations while maintaining operational efficiency. The current ratio indicates balanced working capital management, providing sufficient financial flexibility for ongoing operations and moderate growth initiatives.' :
                                  'This liquidity level requires attention as it indicates potential challenges in meeting short-term obligations. The company\'s management team is actively addressing working capital management to improve liquidity position and ensure operational stability.';
          
          insights.push(`Short-term liquidity analysis reveals a current ratio of ${currentRatio.toFixed(2)}, indicating ${liquidityStrength} short-term liquidity. ${liquidityContext}`);
        }
      }

      // Working Capital Analysis Paragraph
      const workingCapitalRow = doc.rows.find(row => 
        row[0] && String(row[0]).toLowerCase().includes('working capital') ||
        String(row[0]).toLowerCase().includes('net current assets')
      );

      if (workingCapitalRow && workingCapitalRow.length > 1) {
        const workingCapital = typeof workingCapitalRow[1] === 'number' ? workingCapitalRow[1] : 0;
        if (workingCapital > 0) {
          insights.push(`Working capital management demonstrates positive net current assets of ${formatCurrency(workingCapital)}, providing essential financial resources for day-to-day operations and strategic initiatives. This positive working capital position enables the company to maintain operational efficiency, invest in growth opportunities, and respond to market changes. The strong working capital foundation supports the company\'s ability to manage cash flow effectively and maintain competitive positioning in the marketplace.`);
        } else {
          insights.push(`Working capital analysis reveals negative net current assets of ${formatCurrency(Math.abs(workingCapital))}, which may indicate current liquidity challenges. This situation requires careful management of cash flow and operational efficiency to ensure continued business operations. The company\'s management team is implementing strategies to improve working capital position through operational optimization, cost management, and strategic initiatives. This focus on working capital improvement is essential for maintaining business continuity and supporting future growth objectives.`);
        }
      }

      // Trend Analysis for Multiple Periods
      if (currentAssetsRow && currentAssetsRow.length > 2) {
        const currentAssets = typeof currentAssetsRow[1] === 'number' ? currentAssetsRow[1] : 0;
        const previousAssets = typeof currentAssetsRow[2] === 'number' ? currentAssetsRow[2] : 0;
        
        if (previousAssets > 0) {
          const assetChange = ((currentAssets - previousAssets) / previousAssets) * 100;
          insights.push(`Current assets have ${assetChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(assetChange).toFixed(1)}% from ${formatCurrency(previousAssets)} to ${formatCurrency(currentAssets)}. This ${assetChange > 0 ? 'positive' : 'negative'} trend in current assets ${assetChange > 0 ? 'strengthens' : 'impacts'} the company\'s liquidity position and ${assetChange > 0 ? 'supports' : 'requires attention to'} operational flexibility. The management team continues to monitor and optimize asset utilization to maintain optimal liquidity levels.`);
        }
      }

    } catch (error) {
      insights.push('The liquidity analysis provides important insights into the company\'s short-term financial health and operational efficiency, though some specific metrics require additional context for complete interpretation. The available data demonstrates the company\'s working capital management and liquidity position. Further analysis of specific current asset and liability categories would enhance understanding of the company\'s operational financial management.');
    }

    return insights;
  };

  const analyzeGeneralFinancialData = (doc: FinancialData): string[] => {
    const insights: string[] = [];
    
    try {
      // Comprehensive analysis for general financial data
      const totalRows = doc.rows.length;
      const totalColumns = doc.headers.length;
      
      // Data Structure Analysis Paragraph
      if (totalRows > 0) {
        insights.push(`Financial data structure analysis reveals a comprehensive dataset containing ${totalRows} rows and ${totalColumns} columns of financial information. This substantial data volume indicates detailed financial reporting and comprehensive business operations. The multi-dimensional nature of this financial data provides a thorough view of the company's financial position, performance metrics, and operational details. This comprehensive data structure enables detailed analysis of various financial aspects and supports informed decision-making processes.`);
      }

      // Numerical Data Analysis Paragraph
      const numericalData = doc.rows.flat().filter(cell => typeof cell === 'number' && cell !== 0) as number[];
      
      if (numericalData.length > 0) {
        const totalValue = numericalData.reduce((sum, value) => sum + value, 0);
        const averageValue = totalValue / numericalData.length;
        const maxValue = Math.max(...numericalData);
        const minValue = Math.min(...numericalData);
        
        // Calculate variance and standard deviation for more sophisticated analysis
        const variance = numericalData.reduce((sum, value) => sum + Math.pow(value - averageValue, 2), 0) / numericalData.length;
        const standardDeviation = Math.sqrt(variance);
        const coefficientOfVariation = (standardDeviation / averageValue) * 100;
        
        const dataVariability = coefficientOfVariation > 50 ? 'high' : coefficientOfVariation > 25 ? 'moderate' : 'low';
        const variabilityContext = coefficientOfVariation > 50 ? 'This high variability suggests diverse financial activities and significant fluctuations in financial metrics, which may indicate dynamic business operations or seasonal variations in performance.' :
                                  coefficientOfVariation > 25 ? 'This moderate variability indicates balanced financial operations with some variation in performance metrics, reflecting normal business fluctuations and operational diversity.' :
                                  'This low variability suggests consistent financial performance and stable operational metrics, indicating predictable business operations and steady financial management.';
        
        insights.push(`Financial metrics analysis reveals ${numericalData.length} significant numerical values with a total aggregate value of ${formatCurrency(totalValue)} and an average of ${formatCurrency(averageValue)}. The data range spans from ${formatCurrency(minValue)} to ${formatCurrency(maxValue)}, demonstrating the scope and scale of the company's financial operations. Statistical analysis shows ${dataVariability} variability in the financial data with a coefficient of variation of ${coefficientOfVariation.toFixed(1)}%. ${variabilityContext} This comprehensive financial dataset provides valuable insights into the company's operational performance, financial health, and business complexity.`);
      }

      // Summary and Total Analysis Paragraph
      const summaryRows = doc.rows.filter(row => 
        row[0] && (String(row[0]).toLowerCase().includes('total') ||
                  String(row[0]).toLowerCase().includes('sum') ||
                  String(row[0]).toLowerCase().includes('net') ||
                  String(row[0]).toLowerCase().includes('balance'))
      );

      if (summaryRows.length > 0) {
        const summaryBreakdown = summaryRows.map(row => {
          const name = String(row[0]);
          const value = typeof row[1] === 'number' ? row[1] : 0;
          return `${name} (${formatCurrency(value)})`;
        }).join(', ');
        
        insights.push(`Financial summary analysis identifies ${summaryRows.length} key summary metrics including ${summaryBreakdown}. These summary figures represent critical financial aggregates that provide essential insights into the company's overall financial position and performance. The presence of multiple summary metrics indicates comprehensive financial reporting and detailed business analysis. These aggregated figures serve as key performance indicators and support strategic decision-making processes. The summary data demonstrates the company's commitment to transparent financial reporting and provides stakeholders with clear insights into business performance and financial health.`);
      }

      // Trend Analysis for Multiple Periods
      if (totalColumns > 1) {
        const firstColumnValues = doc.rows.map(row => typeof row[1] === 'number' ? row[1] : 0).filter(val => val > 0) as number[];
        const secondColumnValues = doc.rows.map(row => typeof row[2] === 'number' ? row[2] : 0).filter(val => val > 0) as number[];
        
        if (firstColumnValues.length > 0 && secondColumnValues.length > 0) {
          const currentTotal = firstColumnValues.reduce((sum, val) => sum + val, 0);
          const previousTotal = secondColumnValues.reduce((sum, val) => sum + val, 0);
          
          if (previousTotal > 0) {
            const periodChange = ((currentTotal - previousTotal) / previousTotal) * 100;
            const trendDirection = periodChange > 0 ? 'positive' : 'negative';
            const trendContext = periodChange > 0 ? 'This positive trend indicates improving financial performance and suggests successful execution of business strategies. The growth in aggregate financial metrics demonstrates the company\'s ability to generate value and maintain competitive positioning in the market.' :
                                'This negative trend may indicate challenges in current business operations or market conditions. However, this should be viewed in the context of the company\'s strategic objectives and long-term growth plans. Management is actively addressing these challenges through operational improvements and strategic initiatives.';
            
            insights.push(`Period-over-period analysis reveals a ${trendDirection} trend with a ${Math.abs(periodChange).toFixed(1)}% change in aggregate financial metrics from ${formatCurrency(previousTotal)} to ${formatCurrency(currentTotal)}. ${trendContext} This trend analysis provides valuable insights into the company\'s financial trajectory and supports strategic planning and performance evaluation. The management team continues to monitor these trends to ensure alignment with business objectives and market opportunities.`);
          }
        }
      }

      // Data Quality and Completeness Analysis
      const emptyCells = doc.rows.flat().filter(cell => cell === null || cell === undefined || cell === '').length;
      const totalCells = doc.rows.flat().length;
      const dataCompleteness = ((totalCells - emptyCells) / totalCells) * 100;
      
      const completenessLevel = dataCompleteness > 90 ? 'excellent' : dataCompleteness > 75 ? 'good' : dataCompleteness > 50 ? 'moderate' : 'poor';
      const completenessContext = dataCompleteness > 90 ? 'This excellent data completeness indicates comprehensive financial reporting and thorough data collection processes. The high-quality data provides reliable foundation for financial analysis and decision-making.' :
                                  dataCompleteness > 75 ? 'This good data completeness suggests reliable financial reporting with minor gaps that don\'t significantly impact overall analysis quality. The data provides solid foundation for financial assessment.' :
                                  dataCompleteness > 50 ? 'This moderate data completeness indicates some gaps in financial reporting that may require additional context for complete analysis. However, the available data still provides valuable insights into business performance.' :
                                  'This data completeness level suggests significant gaps in financial reporting that may impact analysis accuracy. Additional data sources or clarification may be needed for comprehensive financial assessment.';
      
      insights.push(`Data quality assessment reveals ${dataCompleteness.toFixed(1)}% data completeness with ${emptyCells} empty cells out of ${totalCells} total data points. ${completenessContext} The data quality directly impacts the reliability of financial analysis and the confidence level in business insights derived from this information. Management continues to improve data collection and reporting processes to enhance data quality and analytical accuracy.`);

    } catch (error) {
      insights.push('The general financial data analysis provides valuable insights into the company\'s financial structure and performance metrics, though some specific data points require additional context for complete interpretation. The available data demonstrates the company\'s financial complexity and operational scope. Further analysis of specific financial categories and detailed line items would enhance understanding of the company\'s financial position and strategic priorities. The comprehensive nature of this financial dataset supports thorough business analysis and informed decision-making processes.');
    }

    return insights;
  };

  const formatCurrency = (value: number): string => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    } else {
      return `$${value.toLocaleString()}`;
    }
  };

  // Extract common financial figures for use throughout the document
  // Try to get data from specific document types first, then fall back to general data
  const revenue2023 = getFinancialFigure(0, 1, '45.2M', 'income');
  const revenue2022 = getFinancialFigure(0, 2, '32.1M', 'income');
  const revenue2021 = getFinancialFigure(0, 3, '18.7M', 'income');
  const netLoss2023 = getFinancialFigure(1, 1, '8.9M', 'income');
  const netLoss2022 = getFinancialFigure(1, 2, '12.8M', 'income');
  const netLoss2021 = getFinancialFigure(1, 3, '15.2M', 'income');
  const totalAssets = getFinancialFigure(2, 1, '67.3M', 'balance');
  const totalLiabilities = getFinancialFigure(3, 1, '23.1M', 'balance');
  const cashBalance = getFinancialFigure(4, 1, '28.5M', 'balance');
  
  // Extract liquidity data if available
  const currentAssets2024 = getFinancialFigure(2, 1, '15,466,233', 'liquidity');
  const currentAssets2025 = getFinancialFigure(2, 2, '3,344,458', 'liquidity');
  const currentLiabilities2024 = getFinancialFigure(9, 1, '8,990,995', 'liquidity');
  const currentLiabilities2025 = getFinancialFigure(9, 2, '2,999,156', 'liquidity');
  const netCurrentAssets2024 = getFinancialFigure(10, 1, '6,475,238', 'liquidity');
  const netCurrentAssets2025 = getFinancialFigure(10, 2, '345,302', 'liquidity');
  return <div className="w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
      <div className="border-b border-gray-300 bg-gray-100 p-3 flex justify-between items-center">
        <div className="flex items-center">
          <span className="font-medium text-gray-800">SEC Filing Preview</span>
          <span className="ml-3 text-sm text-gray-500">Form S-1</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-1 text-gray-600 hover:text-blue-700">
            <PrinterIcon size={18} />
          </button>
          <PDFDownloader
            documentRef={documentRef}
            companyName={companyName}
            onDownloadStart={() => setIsGeneratingPDF(true)}
            onDownloadComplete={() => {
              setIsGeneratingPDF(false);
              setPdfError(null);
            }}
            onDownloadError={(error) => {
              setIsGeneratingPDF(false);
              setPdfError(error);
            }}
          />
        </div>
      </div>
      <div className="p-6 overflow-auto max-h-[70vh]" style={{
      fontFamily: 'Times New Roman, serif'
    }}>
        <div ref={documentRef} className="max-w-4xl mx-auto">
          {/* PDF Generation Status */}
          {isGeneratingPDF && (
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-2"></div>
                <p className="text-sm text-yellow-800 font-semibold">
                  Generating PDF... Please wait while we prepare your prospectus for download.
                </p>
              </div>
            </div>
          )}
          
          {pdfError && (
            <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-800 font-semibold mb-2">
                PDF Generation Error
              </p>
              <p className="text-sm text-red-700">
                {pdfError}
              </p>
              <button
                onClick={() => setPdfError(null)}
                className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
              >
                Dismiss
              </button>
            </div>
          )}
          
          <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800 font-semibold mb-2">
              📊 Dynamic Field Integration Active
            </p>
            <p className="text-xs text-blue-700 mb-2">
              Fields highlighted in <span className="bg-green-200 px-1 rounded font-semibold">green</span> are dynamically populated from your form inputs. 
              Financial figures highlighted in <span className="bg-yellow-200 px-1 rounded font-semibold">yellow</span> are from uploaded financial data.
            </p>
            <p className="text-xs text-blue-700">
              These fields will update automatically as you modify the form inputs.
            </p>
          </div>
          <div className="text-center mb-10">
            <p className="text-sm mb-4">
              As filed with the Securities and Exchange Commission on <span className="bg-green-200 px-1 rounded font-semibold">{filingDate}</span>
            </p>
            <p className="text-sm mb-4">Registration No. [ ]</p>
            <div className="border-t border-b border-black py-4 my-6">
              <p className="text-lg font-bold">UNITED STATES</p>
              <p className="text-lg font-bold">
                SECURITIES AND EXCHANGE COMMISSION
              </p>
              <p className="text-lg">Washington, D.C. 20549</p>
            </div>
            <div className="my-6">
              <p className="text-2xl font-bold">FORM F-1</p>
              <p className="text-lg mt-2">REGISTRATION STATEMENT</p>
              <p className="text-lg">UNDER</p>
              <p className="text-lg">THE SECURITIES ACT OF 1933</p>
            </div>
            <div className="my-10">
              <p className="text-2xl font-bold"><span className="bg-green-200 px-2 rounded">{companyName.toUpperCase()}</span></p>
              <p className="text-sm mt-2">
                (Exact name of registrant as specified in its charter)
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 my-8 text-sm">
              <div>
                <p className="font-bold">Cayman Islands</p>
                <p>
                  (State or other jurisdiction of incorporation or organization)
                </p>
              </div>
              <div>
                <p className="font-bold">Not Applicable</p>
                <p>(I.R.S. Employer Identification Number)</p>
              </div>
            </div>
            <div className="text-sm my-8">
              <div className="bg-green-200 px-2 py-1 rounded mb-1" dangerouslySetInnerHTML={{ __html: companyAddress.replace(/\n/g, '<br/>') }}></div>
              <p className="bg-green-200 px-2 py-1 rounded">{companyPhone}</p>
              <p>
                (Address, including zip code, and telephone number, including
                area code, of registrant's principal executive offices)
              </p>
            </div>
            <div className="text-sm my-8">
              <p className="font-bold bg-green-200 px-2 py-1 rounded">{usProcessAgent}</p>
              <div className="bg-green-200 px-2 py-1 rounded mb-1" dangerouslySetInnerHTML={{ __html: usProcessAgentAddress.replace(/\n/g, '<br/>') }}></div>
              <p className="bg-green-200 px-2 py-1 rounded">{usProcessAgentPhone}</p>
              <p>
                (Name, address, including zip code, and telephone number,
                including area code, of agent for service)
              </p>
            </div>
            <div className="text-sm my-8">
              <p className="font-bold">Copies to:</p>
              <p className="bg-green-200 px-2 py-1 rounded">{legalCounsel}</p>
              <p className="bg-green-200 px-2 py-1 rounded">{usLawFirm}</p>
              <div className="bg-green-200 px-2 py-1 rounded mb-1" dangerouslySetInnerHTML={{ __html: usLawFirmAddress.replace(/\n/g, '<br/>') }}></div>
              <p className="bg-green-200 px-2 py-1 rounded">{usLawFirmPhone}</p>
            </div>
            <div className="text-sm my-8">
              <p className="bg-green-200 px-2 py-1 rounded">{legalCounsel}</p>
              <p className="bg-green-200 px-2 py-1 rounded">{underwritingCounsel}</p>
              <div className="bg-green-200 px-2 py-1 rounded mb-1" dangerouslySetInnerHTML={{ __html: underwritingCounselAddress.replace(/\n/g, '<br/>') }}></div>
              <p className="bg-green-200 px-2 py-1 rounded">{underwritingCounselPhone}</p>
            </div>
          </div>
          <div className="page-break"></div>
          <div className="my-12">
            <p className="text-center text-2xl font-bold mb-8">PROSPECTUS</p>
            <p className="text-center font-bold text-lg mb-2">
              <span className="bg-green-200 px-2 rounded">{companyName.toUpperCase()}</span>
            </p>
            <p className="text-center mb-6">
              1,650,000 Class A Ordinary Shares
            </p>
            <p className="mb-4">
              This is an initial public offering of Class A Ordinary Shares of{' '}
              <span className="bg-green-200 px-1 rounded font-semibold">{companyName}</span>, an exempted company incorporated in the Cayman
              Islands with limited liability whose principal place of business is in Hong Kong ("<span className="bg-green-200 px-1 rounded font-semibold">{companyName}</span>" or the
              "Company"). We are offering 1,650,000 Class A Ordinary Shares. Prior to this offering, there has been no public
              market for our Class A Ordinary Shares. We anticipate that the initial public
              offering price will be between $14.00 and $16.00 per share.
            </p>
            <p className="mb-4">
              We have applied to list our Class A Ordinary Shares on the Nasdaq Global
              Market under the symbol <span className="bg-green-200 px-1 rounded font-semibold">"{tickerSymbol}"</span>. The closing of this initial public offering is contingent upon the final approval
              of the listing application by Nasdaq.
            </p>
            <p className="mb-4">
              <span className="bg-green-200 px-1 rounded font-semibold">{companyName}</span>'s share capital structure is a dual-class structure consisting of Class A Ordinary Shares
              and Class B Ordinary Shares. Each Class A Ordinary Share is entitled to one vote, and each Class B Ordinary Share is entitled to ten votes.
              Following this offering, our controlling shareholder, <span className="bg-green-200 px-1 rounded font-semibold">{ceoName}</span>, will beneficially own all of our Class B Ordinary Shares,
              representing approximately 87.3% of the total voting power of our share capital.
            </p>
            <p className="mb-4">
              <span className="bg-green-200 px-1 rounded font-semibold">{companyName}</span> is not a Chinese or Hong Kong operating company, but is a holding company
              incorporated in the Cayman Islands. As a holding company, we conduct our operations through our subsidiaries in Hong Kong.
            </p>
            <p className="mb-4">
              This is an initial public offering of Class A Ordinary Shares of <span className="bg-green-200 px-1 rounded font-semibold">{companyName}</span> and not of any securities of
              our Hong Kong subsidiaries. As a result, U.S. investors may face difficulties in effecting service of process on or enforcing
              judgments against us or our Hong Kong subsidiaries, or in bringing actions against us or our Hong Kong subsidiaries in
              courts in jurisdictions outside the United States based on U.S. securities laws.
            </p>
            <p className="mb-4">
              We are an "emerging growth company" as defined under the federal
              securities laws and, as such, may elect to comply with certain
              reduced public company reporting requirements.
            </p>
            <div className="border border-black p-4 my-8">
              <p className="font-bold mb-2">
                Investing in our common stock involves risks. See "Risk Factors"
                beginning on page 12.
              </p>
            </div>
            <table className="w-full text-sm my-8">
              <thead>
                <tr className="border-b-2 border-gray-800">
                  <th className="p-2 text-left"></th>
                  <th className="p-2 text-center">
                    Per Share
                  </th>
                  <th className="p-2 text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-blue-50">
                  <td className="p-2">
                    Initial public offering price
                  </td>
                  <td className="p-2 text-center">
                    $15.00
                  </td>
                  <td className="p-2 text-center">$150,000,000</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-2">
                    Underwriting discounts and commissions(1)
                  </td>
                  <td className="p-2 text-center">
                    $1.05
                  </td>
                  <td className="p-2 text-center">$10,500,000</td>
                </tr>
                <tr className="bg-blue-50 border-b-2 border-gray-800">
                  <td className="p-2 font-semibold">
                    Proceeds, before expenses, to us
                  </td>
                  <td className="p-2 text-center font-semibold">
                    $13.95
                  </td>
                  <td className="p-2 text-center font-semibold">$139,500,000</td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm mb-6">
              (1) See "Underwriting" for a description of the compensation
              payable to the underwriters.
            </p>
            <p className="mb-4">
              We have granted the underwriters an option for a period of 30 days
              to purchase up to an additional 1,500,000 shares of common stock
              at the initial public offering price less underwriting discounts
              and commissions.
            </p>
            <p className="mb-4">
              Neither the Securities and Exchange Commission nor any state
              securities commission has approved or disapproved of these
              securities or determined if this prospectus is truthful or
              complete. Any representation to the contrary is a criminal
              offense.
            </p>
            <p className="mb-4">
              The underwriters expect to deliver the shares of common stock to
              purchasers on or about November 1, 2023.
            </p>
            <div className="text-center my-8">
              <p className="font-bold mb-2">MORGAN STANLEY</p>
              <div className="flex justify-center space-x-12 mt-4">
                <p className="font-bold">GOLDMAN SACHS & CO. LLC</p>
                <p className="font-bold">J.P. MORGAN</p>
                <p className="font-bold">BOFA SECURITIES</p>
              </div>
            </div>
            <p className="text-center mt-8">
              Prospectus dated October 15, 2023
            </p>
          </div>
          <div className="page-break"></div>
          <div className="my-12">
            <p className="text-center text-xl font-bold mb-8">
              TABLE OF CONTENTS
            </p>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="py-2 pr-4">Prospectus Summary</td>
                  <td className="py-2 text-right">1</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Risk Factors</td>
                  <td className="py-2 text-right">12</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">
                    Special Note Regarding Forward-Looking Statements
                  </td>
                  <td className="py-2 text-right">45</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Market, Industry and Other Data</td>
                  <td className="py-2 text-right">47</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Use of Proceeds</td>
                  <td className="py-2 text-right">48</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Dividend Policy</td>
                  <td className="py-2 text-right">49</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Capitalization</td>
                  <td className="py-2 text-right">50</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Dilution</td>
                  <td className="py-2 text-right">52</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">
                    Selected Consolidated Financial Data
                  </td>
                  <td className="py-2 text-right">54</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">
                    Management's Discussion and Analysis of Financial Condition
                    and Results of Operations
                  </td>
                  <td className="py-2 text-right">56</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Business</td>
                  <td className="py-2 text-right">80</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Management</td>
                  <td className="py-2 text-right">105</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Executive Compensation</td>
                  <td className="py-2 text-right">112</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">
                    Certain Relationships and Related Party Transactions
                  </td>
                  <td className="py-2 text-right">123</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Principal Stockholders</td>
                  <td className="py-2 text-right">125</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Description of Capital Stock</td>
                  <td className="py-2 text-right">127</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Shares Eligible for Future Sale</td>
                  <td className="py-2 text-right">132</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">
                    Material U.S. Federal Income Tax Considerations for Non-U.S.
                    Holders
                  </td>
                  <td className="py-2 text-right">134</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Underwriting</td>
                  <td className="py-2 text-right">138</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Legal Matters</td>
                  <td className="py-2 text-right">143</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Experts</td>
                  <td className="py-2 text-right">143</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">
                    Where You Can Find Additional Information
                  </td>
                  <td className="py-2 text-right">143</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Index to Financial Statements</td>
                  <td className="py-2 text-right">F-1</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-8 mb-4">
              <p>
                Neither we nor the underwriters have authorized anyone to
                provide any information or to make any representations other
                than those contained in this prospectus or in any free writing
                prospectuses prepared by or on behalf of us or to which we have
                referred you. We and the underwriters take no responsibility
                for, and can provide no assurance as to the reliability of, any
                other information that others may give you. This prospectus is
                an offer to sell only the shares offered hereby, but only under
                circumstances and in jurisdictions where it is lawful to do so.
                The information contained in this prospectus is current only as
                of its date.
              </p>
            </div>
          </div>
          <div className="page-break"></div>
          <div className="my-12">
            <p className="text-xl font-bold mb-4">PROSPECTUS SUMMARY</p>
            <p className="mb-4 text-sm">
              This summary highlights information contained elsewhere in this
              prospectus. This summary does not contain all of the information
              you should consider before investing in our Class A Ordinary Shares. You
              should read this entire prospectus carefully, including the
              sections titled "Risk Factors," "Management's Discussion and
              Analysis of Financial Condition and Results of Operations," and
              our consolidated financial statements and the related notes
              included elsewhere in this prospectus, before making an investment
              decision. Unless the context otherwise requires, the terms
              "<span className="bg-green-200 px-1 rounded font-semibold">{companyName}</span>," "the company," "we," "us," and "our" in this prospectus
              refer to <span className="bg-green-200 px-1 rounded font-semibold">{companyName}</span> and its subsidiaries.
            </p>
            <p className="text-lg font-bold mb-2">Our Mission</p>
            <p className="mb-4 text-sm">
              Our mission is to provide high-quality English language education to children in Hong Kong through our well-established "<span className="bg-green-200 px-1 rounded font-semibold">{companyName}</span>" brand.
            </p>
            <p className="text-lg font-bold mb-2">Overview</p>
            <p className="mb-4 text-sm">
              <span className="bg-green-200 px-1 rounded font-semibold">{companyName}</span> is a leading English language education provider in Hong Kong, specializing in English courses for children.
              We operate through a well-established brand of "<span className="bg-green-200 px-1 rounded font-semibold">{companyName}</span>" and offer our courses through various learning centers operated by our Hong Kong subsidiaries.
              Our courses are offered under our well-established "<span className="bg-green-200 px-1 rounded font-semibold">{companyName}</span>" brand, which was established by our controlling shareholder in 2009, and is owned by <span className="bg-green-200 px-1 rounded font-semibold">{relatedCompany}</span> as at the date of this prospectus.
            </p>
            <p className="mb-4 text-sm">
              Our primary products include our Payment Processing Platform and
              Merchant Analytics Dashboard, which together provide a
              comprehensive solution for businesses to manage transactions and
              gain insights into their financial performance. As of June 30,
              2023, we served over 15,000 merchants across the United States,
              processing more than $4.5 billion in annual transaction volume.
              Our revenue has grown from <span className="bg-yellow-200 px-1 rounded font-semibold">${revenue2021}</span> in 2021 to <span className="bg-yellow-200 px-1 rounded font-semibold">${revenue2022}</span> in 2022, and <span className="bg-yellow-200 px-1 rounded font-semibold">${revenue2023}</span> in 2023, representing a compound annual growth rate of 55.2%.
            </p>
            <p className="text-lg font-bold mb-2">Industry Background</p>
            <p className="mb-4 text-sm">
              The global payments industry is undergoing rapid transformation,
              driven by technological innovation, changing consumer preferences,
              and regulatory developments. According to industry reports, the
              global digital payments market is expected to reach $12.4 trillion
              by 2025, growing at a compound annual growth rate of 23.8% from
              2020 to 2025. Small and medium-sized businesses, which represent a
              significant portion of the economy, often lack access to
              sophisticated payment processing solutions that can help them
              compete effectively in an increasingly digital marketplace.
            </p>
            
            <div className="border border-black p-4 my-6">
              <p className="font-bold mb-2">Key Investment Highlights</p>
              <ul className="text-sm space-y-1">
                <li>• Leading position in the rapidly growing fintech sector</li>
                <li>• Proven technology platform with strong customer retention</li>
                <li>• Experienced management team with deep industry expertise</li>
                <li>• Significant market opportunity with limited competition</li>
                <li>• Strong financial performance with consistent revenue growth</li>
              </ul>
            </div>
            
            <div className="border border-blue-300 bg-blue-50 p-4 my-6">
              <p className="font-bold mb-3 text-blue-800">Financial Highlights (Dynamic from Uploaded Data)</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold">Revenue Growth:</p>
                  <p>2021: <span className="bg-yellow-200 px-1 rounded font-semibold">${revenue2021}</span></p>
                  <p>2022: <span className="bg-yellow-200 px-1 rounded font-semibold">${revenue2022}</span></p>
                  <p>2023: <span className="bg-yellow-200 px-1 rounded font-semibold">${revenue2023}</span></p>
                </div>
                <div>
                  <p className="font-semibold">Financial Position:</p>
                  <p>Total Assets: <span className="bg-yellow-200 px-1 rounded font-semibold">${totalAssets}</span></p>
                  <p>Cash Balance: <span className="bg-yellow-200 px-1 rounded font-semibold">${cashBalance}</span></p>
                  <p>Total Liabilities: <span className="bg-yellow-200 px-1 rounded font-semibold">${totalLiabilities}</span></p>
                </div>
              </div>
              {financialData && (
                <p className="text-xs text-blue-600 mt-2">
                  💡 <strong>Test Tip:</strong> Upload an Excel file with financial data to see these figures update automatically throughout the prospectus!
                </p>
              )}
            </div>
            
            <p className="text-lg font-bold mb-2">Competitive Strengths</p>
            <p className="mb-4 text-sm">
              We believe our competitive strengths include our proprietary
              technology platform, strong customer relationships, experienced
              management team, and scalable business model. Our platform is
              designed to be highly secure, reliable, and user-friendly,
              providing merchants with the tools they need to succeed in an
              increasingly digital economy.
            </p>
          </div>
          
          <div className="page-break"></div>
          {generateRiskFactorsContent()}
          
                      {financialData && financialData.length > 0 && (
                        <div className="my-12">
                          <p className="text-xl font-bold mb-4">FINANCIAL INFORMATION</p>
                          <p className="mb-4 text-sm">
                            The following tables present our financial data. The financial data should
                            be read in conjunction with our consolidated financial
                            statements and related notes, "Selected Consolidated Financial
                            Data" and "Management's Discussion and Analysis of Financial
                            Condition and Results of Operations" appearing elsewhere in this
                            prospectus. <span className="bg-green-100 px-1 rounded text-xs">This uploaded data is also dynamically integrated throughout the prospectus narrative above.</span>
                          </p>
                          
                          {financialData.map((doc, docIndex) => (
                            <div key={docIndex} className="mb-8">
                              <p className="text-sm mb-2 font-bold">{doc.title}</p>
                              {doc.period && <p className="text-sm mb-4">{doc.period}</p>}
                              <div className="text-xs text-gray-700 mb-2">
                                (in thousands, except per share data)
                              </div>
                              <table className="w-full text-sm mb-4">
                                <thead>
                                  <tr className="border-b-2 border-gray-800">
                                    {doc.headers.map((header: string, index: number) => (
                                      <th key={index} className={`p-2 ${index === 0 ? 'text-left' : 'text-center'}`}>
                                        {header}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {doc.rows.map((row: (string | number)[], rowIndex: number) => {
                                    const isEvenRow = rowIndex % 2 === 0;
                                    const isLastRow = rowIndex === doc.rows.length - 1;
                                    const isTotalRow = row[0] && String(row[0]).toLowerCase().includes('total');
                                    
                                    return (
                                      <tr key={rowIndex} className={`${isEvenRow ? 'bg-blue-50' : 'bg-white'} ${isLastRow || isTotalRow ? 'border-b-2 border-gray-800' : ''}`}>
                                        {row.map((cell: string | number, cellIndex: number) => {
                                          const formattedValue = typeof cell === 'number' ? new Intl.NumberFormat('en-US', {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 2
                                          }).format(cell) : cell;
                                          return (
                                            <td key={cellIndex} className={`p-2 ${cellIndex === 0 ? '' : 'text-right'} ${isTotalRow ? 'font-semibold' : ''}`}>
                                              {formattedValue}
                                            </td>
                                          );
                                        })}
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                              
                              {/* Data Analysis Summary */}
                              {generateTableSummary(doc)}
                            </div>
                          ))}
                          
                          <p className="text-sm mb-4">
                            (1) See "Management's Discussion and Analysis of Financial
                            Condition and Results of Operations" for a description of the
                            items affecting our financial performance.
                          </p>
                        </div>
                      )}
            
            <div className="page-break"></div>
            <div className="my-12">
              <p className="text-xl font-bold mb-4">INDEPENDENT AUDITORS</p>
              <p className="mb-4 text-sm">
                The consolidated financial statements of <span className="bg-green-200 px-1 rounded font-semibold">{companyName}</span> as of December 31, 2023 and 2022, 
                and for each of the three years in the period ended December 31, 2023, have been audited by{' '}
                <span className="bg-green-200 px-1 rounded font-semibold">{auditor}</span>, independent registered public accounting firm, 
                as stated in their report which is included elsewhere in this prospectus.
              </p>
            </div>
            
            <div className="page-break"></div>
            <div className="my-12">
              <p className="text-xl font-bold mb-4">BUSINESS</p>
              <p className="mb-4 text-sm">
                We are a leading English language education provider in Hong Kong, specializing in English courses for children under our "<span className="bg-green-200 px-1 rounded font-semibold">{companyName}</span>" brand, through various learning centers operated by our Hong Kong subsidiaries in Hong Kong. <span className="bg-green-200 px-1 rounded font-semibold">{companyName}</span>, the Cayman Islands exempted company is the holding company with operations conducted in Hong Kong through the Hong Kong subsidiaries.
              </p>
              
              <p className="text-lg font-bold mb-2">Our Business Model</p>
              <p className="mb-4 text-sm">
                Our courses are offered under our well-established "<span className="bg-green-200 px-1 rounded font-semibold">{companyName}</span>" brand, which was established by our controlling shareholder in 2009, and is owned by <span className="bg-green-200 px-1 rounded font-semibold">{relatedCompany}</span> as at the date of this prospectus. We believe the "<span className="bg-green-200 px-1 rounded font-semibold">{companyName}</span>" brand gives parents confidence in the consistency and quality of the English courses that we provide.
              </p>
              
              <p className="mb-4 text-sm">
                Although <span className="bg-green-200 px-1 rounded font-semibold">{relatedCompany}</span> is not part of our Company, we are licensed by <span className="bg-green-200 px-1 rounded font-semibold">{relatedCompany}</span> to use the "<span className="bg-green-200 px-1 rounded font-semibold">{companyName}</span>" brand in the course of our business under certain franchise agreements entered by us with <span className="bg-green-200 px-1 rounded font-semibold">{relatedCompany}</span>.
              </p>
              
              <p className="text-lg font-bold mb-2">Our Learning Centers</p>
              <p className="mb-4 text-sm">
                Other than the 20 "<span className="bg-green-200 px-1 rounded font-semibold">{companyName}</span>" learning centers operated by us, <span className="bg-green-200 px-1 rounded font-semibold">{relatedCompany}</span> has licensed to other operators to operate approximately 38 "<span className="bg-green-200 px-1 rounded font-semibold">{companyName}</span>" learning centers in Hong Kong as at the date of this prospectus.
              </p>
              
              <p className="text-lg font-bold mb-2">Market Opportunity</p>
              <p className="mb-4 text-sm">
                {generateMarketAnalysis()}
              </p>
              <p className="mb-4 text-sm">
                {generateFinancialStrengthStatement()}
              </p>
            </div>
        </div>
      </div>
      <div className="border-t border-gray-300 bg-gray-100 p-3 flex justify-between items-center">
        <button className="flex items-center text-gray-600 hover:text-blue-700">
          <ChevronLeftIcon size={18} className="mr-1" />
          <span>Previous Page</span>
        </button>
        <span className="text-sm text-gray-600">Page 1 of 143</span>
        <button className="flex items-center text-gray-600 hover:text-blue-700">
          <span>Next Page</span>
          <ChevronRightIcon size={18} className="ml-1" />
        </button>
      </div>
    </div>;
}