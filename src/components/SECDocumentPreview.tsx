import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon, PrinterIcon, DownloadIcon } from 'lucide-react';
import { FinancialData } from './FinancialDataUploader';

interface SECDocumentPreviewProps {
  financialData?: FinancialData | null;
}

export function SECDocumentPreview({
  financialData
}: SECDocumentPreviewProps) {
  // Function to extract financial figures from uploaded data
  const getFinancialFigure = (rowIndex: number, columnIndex: number, defaultValue: string): string => {
    if (!financialData || !financialData.rows[rowIndex] || !financialData.rows[rowIndex][columnIndex]) {
      return defaultValue;
    }
    const value = financialData.rows[rowIndex][columnIndex];
    if (typeof value === 'number') {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).format(value);
    }
    return String(value);
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

  // Extract common financial figures for use throughout the document
  // Expected Excel format: Row 0 = Revenue, Row 1 = Net Loss, Row 2 = Total Assets, Row 3 = Total Liabilities, Row 4 = Cash
  // Columns: 0 = Description, 1 = 2023, 2 = 2022, 3 = 2021
  const revenue2023 = getFinancialFigure(0, 1, '45.2M');
  const revenue2022 = getFinancialFigure(0, 2, '32.1M');
  const revenue2021 = getFinancialFigure(0, 3, '18.7M');
  const netLoss2023 = getFinancialFigure(1, 1, '8.9M');
  const netLoss2022 = getFinancialFigure(1, 2, '12.8M');
  const netLoss2021 = getFinancialFigure(1, 3, '15.2M');
  const totalAssets = getFinancialFigure(2, 1, '67.3M');
  const totalLiabilities = getFinancialFigure(3, 1, '23.1M');
  const cashBalance = getFinancialFigure(4, 1, '28.5M');
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
          <button className="p-1 text-gray-600 hover:text-blue-700">
            <DownloadIcon size={18} />
          </button>
        </div>
      </div>
      <div className="p-6 overflow-auto max-h-[70vh]" style={{
      fontFamily: 'Times New Roman, serif'
    }}>
        <div className="max-w-4xl mx-auto">
          {financialData && (
            <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800 font-semibold mb-2">
                📊 Dynamic Financial Data Integration Active
              </p>
              <p className="text-xs text-blue-700">
                Financial figures highlighted in <span className="bg-yellow-200 px-1 rounded font-semibold">yellow</span> are automatically 
                populated from your uploaded financial data. These figures will update automatically 
                when you upload new financial documents.
              </p>
            </div>
          )}
          <div className="text-center mb-10">
            <p className="text-sm mb-4">
              As filed with the Securities and Exchange Commission on October
              15, 2023
            </p>
            <p className="text-sm mb-4">Registration No. 333-XXXXX</p>
            <div className="border-t border-b border-black py-4 my-6">
              <p className="text-lg font-bold">UNITED STATES</p>
              <p className="text-lg font-bold">
                SECURITIES AND EXCHANGE COMMISSION
              </p>
              <p className="text-lg">Washington, D.C. 20549</p>
            </div>
            <div className="my-6">
              <p className="text-2xl font-bold">FORM S-1</p>
              <p className="text-lg mt-2">REGISTRATION STATEMENT</p>
              <p className="text-lg">UNDER</p>
              <p className="text-lg">THE SECURITIES ACT OF 1933</p>
            </div>
            <div className="my-10">
              <p className="text-2xl font-bold">TECHFIN SOLUTIONS, INC.</p>
              <p className="text-sm mt-2">
                (Exact name of registrant as specified in its charter)
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 my-8 text-sm">
              <div>
                <p className="font-bold">Delaware</p>
                <p>
                  (State or other jurisdiction of incorporation or organization)
                </p>
              </div>
              <div>
                <p className="font-bold">82-1234567</p>
                <p>(I.R.S. Employer Identification Number)</p>
              </div>
            </div>
            <div className="text-sm my-8">
              <p>123 Tech Avenue</p>
              <p>Suite 400</p>
              <p>San Francisco, CA 94107</p>
              <p>(555) 123-4567</p>
              <p>
                (Address, including zip code, and telephone number, including
                area code, of registrant's principal executive offices)
              </p>
            </div>
            <div className="text-sm my-8">
              <p className="font-bold">John Smith</p>
              <p>Chief Executive Officer</p>
              <p>123 Tech Avenue</p>
              <p>Suite 400</p>
              <p>San Francisco, CA 94107</p>
              <p>(555) 123-4567</p>
              <p>
                (Name, address, including zip code, and telephone number,
                including area code, of agent for service)
              </p>
            </div>
          </div>
          <div className="page-break"></div>
          <div className="my-12">
            <p className="text-center text-2xl font-bold mb-8">PROSPECTUS</p>
            <p className="text-center font-bold text-lg mb-2">
              TECHFIN SOLUTIONS, INC.
            </p>
            <p className="text-center mb-6">
              10,000,000 Shares of Common Stock
            </p>
            <p className="mb-4">
              This is an initial public offering of shares of common stock of
              TechFin Solutions, Inc. We are offering 10,000,000 shares of our
              common stock. Prior to this offering, there has been no public
              market for our common stock. We anticipate that the initial public
              offering price will be between $14.00 and $16.00 per share.
            </p>
            <p className="mb-4">
              We have applied to list our common stock on the Nasdaq Global
              Market under the symbol "TFIN."
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
            <table className="w-full border-collapse border border-black text-sm my-8">
              <thead>
                <tr className="border-b border-black">
                  <th className="border-r border-black p-2 text-left"></th>
                  <th className="border-r border-black p-2 text-center">
                    Per Share
                  </th>
                  <th className="p-2 text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-black">
                  <td className="border-r border-black p-2">
                    Initial public offering price
                  </td>
                  <td className="border-r border-black p-2 text-center">
                    $15.00
                  </td>
                  <td className="p-2 text-center">$150,000,000</td>
                </tr>
                <tr className="border-b border-black">
                  <td className="border-r border-black p-2">
                    Underwriting discounts and commissions(1)
                  </td>
                  <td className="border-r border-black p-2 text-center">
                    $1.05
                  </td>
                  <td className="p-2 text-center">$10,500,000</td>
                </tr>
                <tr>
                  <td className="border-r border-black p-2">
                    Proceeds, before expenses, to us
                  </td>
                  <td className="border-r border-black p-2 text-center">
                    $13.95
                  </td>
                  <td className="p-2 text-center">$139,500,000</td>
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
              you should consider before investing in our common stock. You
              should read this entire prospectus carefully, including the
              sections titled "Risk Factors," "Management's Discussion and
              Analysis of Financial Condition and Results of Operations," and
              our consolidated financial statements and the related notes
              included elsewhere in this prospectus, before making an investment
              decision. Unless the context otherwise requires, the terms
              "TechFin," "the company," "we," "us," and "our" in this prospectus
              refer to TechFin Solutions, Inc. and its subsidiaries.
            </p>
            <p className="text-lg font-bold mb-2">Our Mission</p>
            <p className="mb-4 text-sm">
              Our mission is to empower small and medium-sized businesses with
              innovative payment processing solutions that are secure, reliable,
              and cost-effective.
            </p>
            <p className="text-lg font-bold mb-2">Overview</p>
            <p className="mb-4 text-sm">
              TechFin Solutions is a financial technology company that provides
              innovative payment processing solutions for small and medium-sized
              businesses. Founded in 2015, we have developed proprietary
              software that integrates with existing point-of-sale systems. Our
              platform enables merchants to accept various payment methods,
              including credit cards, mobile payments, and digital wallets,
              while providing real-time analytics and insights into their
              business operations.
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
          <div className="my-12">
            <p className="text-xl font-bold mb-4">RISK FACTORS</p>
            <p className="mb-4 text-sm">
              Investing in our common stock involves a high degree of risk. You
              should carefully consider the risks described below, together with
              all of the other information included in this prospectus, before
              making an investment decision. If any of the following risks
              actually occur, our business, financial condition, results of
              operations, and prospects could be materially and adversely
              affected. In that case, the trading price of our common stock
              could decline, and you could lose part or all of your investment.
            </p>
            
            <p className="text-lg font-bold mb-2">Risks Related to Our Business</p>
            
            <p className="text-sm font-bold mb-1">We have a history of losses and may not achieve or maintain profitability.</p>
            <p className="mb-4 text-sm">
              We have incurred net losses in each year since our inception in 2015.
              We had net losses of <span className="bg-yellow-200 px-1 rounded font-semibold">${netLoss2021}</span>, <span className="bg-yellow-200 px-1 rounded font-semibold">${netLoss2022}</span>, and <span className="bg-yellow-200 px-1 rounded font-semibold">${netLoss2023}</span>
              for the years ended December 31, 2021, 2022, and 2023, respectively.
              We expect to continue to incur significant expenses and operating
              losses for the foreseeable future as we continue to invest in our
              business, expand our operations, and develop new products and
              services.
            </p>
            
            <p className="text-sm font-bold mb-1">We face intense competition in the payment processing industry.</p>
            <p className="mb-4 text-sm">
              The payment processing industry is highly competitive and
              fragmented. We compete with large, well-established companies such
              as Square, PayPal, Stripe, and others, as well as numerous smaller
              regional and local competitors. Many of our competitors have
              significantly greater financial, technical, and marketing
              resources than we do.
            </p>
            
            <p className="text-sm font-bold mb-1">Our business depends on maintaining and expanding our customer base.</p>
            <p className="mb-4 text-sm">
              Our success depends on our ability to maintain and expand our
              customer base. If we are unable to attract new customers or retain
              existing customers, our revenue growth and profitability would be
              adversely affected. Customer acquisition costs are significant,
              and we may not be able to recover these costs through customer
              relationships.
            </p>
            
            <p className="text-lg font-bold mb-2">Risks Related to Our Industry</p>
            
            <p className="text-sm font-bold mb-1">Changes in payment processing regulations could adversely affect our business.</p>
            <p className="mb-4 text-sm">
              The payment processing industry is subject to extensive regulation
              at the federal, state, and international levels. Changes in these
              regulations, including those related to data privacy, consumer
              protection, and financial services, could require us to modify
              our business practices, increase our compliance costs, or
              otherwise adversely affect our business.
            </p>
            
            <p className="text-sm font-bold mb-1">Cybersecurity threats and data breaches could harm our business.</p>
            <p className="mb-4 text-sm">
              We process, store, and transmit large amounts of sensitive
              financial and personal information. Any security breach or
              unauthorized access to this information could result in
              significant legal and financial consequences, damage to our
              reputation, and loss of customer trust.
            </p>
          </div>
          
                      {financialData && <div className="my-12">
              <p className="text-xl font-bold mb-4">FINANCIAL INFORMATION</p>
              <p className="mb-4 text-sm">
                The following table presents our{' '}
                {financialData.title.toLowerCase()}. The financial data should
                be read in conjunction with our consolidated financial
                statements and related notes, "Selected Consolidated Financial
                Data" and "Management's Discussion and Analysis of Financial
                Condition and Results of Operations" appearing elsewhere in this
                prospectus. <span className="bg-green-100 px-1 rounded text-xs">This uploaded data is also dynamically integrated throughout the prospectus narrative above.</span>
              </p>
              <p className="text-sm mb-2 font-bold">{financialData.title}</p>
              {financialData.period && <p className="text-sm mb-4">{financialData.period}</p>}
              <div className="text-xs text-gray-700 mb-2">
                (in thousands, except per share data)
              </div>
              <table className="w-full border-collapse border border-black text-sm mb-8">
                <thead>
                  <tr className="border-b border-black">
                    {financialData.headers.map((header, index) => <th key={index} className={`border-r border-black p-2 ${index === 0 ? 'text-left' : 'text-center'}`}>
                        {header}
                      </th>)}
                  </tr>
                </thead>
                <tbody>
                  {financialData.rows.map((row, rowIndex) => <tr key={rowIndex} className="border-b border-black">
                      {row.map((cell, cellIndex) => {
                  const formattedValue = typeof cell === 'number' ? new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2
                  }).format(cell) : cell;
                  return <td key={cellIndex} className={`border-r border-black p-2 ${cellIndex === 0 ? '' : 'text-right'}`}>
                            {formattedValue}
                          </td>;
                })}
                    </tr>)}
                </tbody>
              </table>
              <p className="text-sm mb-4">
                (1) See "Management's Discussion and Analysis of Financial
                Condition and Results of Operations" for a description of the
                items affecting our financial performance.
              </p>
            </div>}
            
            <div className="page-break"></div>
            <div className="my-12">
              <p className="text-xl font-bold mb-4">BUSINESS</p>
              <p className="mb-4 text-sm">
                We are a leading financial technology company that provides
                innovative payment processing solutions for small and medium-sized
                businesses. Our mission is to democratize access to sophisticated
                financial tools that were previously only available to large
                enterprises.
              </p>
              
              <p className="text-lg font-bold mb-2">Our Products and Services</p>
              <p className="mb-4 text-sm">
                Our core product is the TechFin Payment Platform, a comprehensive
                solution that enables merchants to accept payments through multiple
                channels including in-store, online, and mobile transactions. The
                platform integrates seamlessly with existing point-of-sale systems
                and provides real-time analytics and reporting capabilities.
              </p>
              
              <p className="mb-4 text-sm">
                Our Merchant Analytics Dashboard provides businesses with
                actionable insights into their transaction data, customer behavior,
                and financial performance. This tool helps merchants optimize their
                operations, identify growth opportunities, and make data-driven
                business decisions.
              </p>
              
              <p className="text-lg font-bold mb-2">Our Technology</p>
              <p className="mb-4 text-sm">
                Our proprietary technology platform is built on modern cloud
                infrastructure and utilizes advanced encryption and security
                protocols to protect sensitive financial data. The platform is
                designed to be highly scalable, processing millions of transactions
                daily while maintaining sub-second response times.
              </p>
              
              <p className="text-lg font-bold mb-2">Market Opportunity</p>
              <p className="mb-4 text-sm">
                The global digital payments market is experiencing rapid growth,
                driven by increasing consumer adoption of digital payment methods,
                the rise of e-commerce, and the ongoing digital transformation of
                traditional retail. According to industry research, the global
                digital payments market is expected to reach $12.4 trillion by
                2025, representing a compound annual growth rate of 23.8% from
                2020 to 2025.
              </p>
              
              <p className="mb-4 text-sm">
                Small and medium-sized businesses represent a significant portion
                of this market opportunity, yet many lack access to sophisticated
                payment processing solutions. We believe our platform addresses
                this gap by providing enterprise-grade capabilities at a price
                point accessible to smaller businesses. Our strong financial
                position, with total assets of <span className="bg-yellow-200 px-1 rounded font-semibold">${totalAssets}</span> and cash
                reserves of <span className="bg-yellow-200 px-1 rounded font-semibold">${cashBalance}</span>, provides us with the
                resources needed to continue our growth and expansion plans.
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