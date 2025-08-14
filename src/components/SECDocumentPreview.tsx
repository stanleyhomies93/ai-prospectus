import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon, PrinterIcon, DownloadIcon } from 'lucide-react';
import { FinancialData } from './FinancialDataUploader';
interface SECDocumentPreviewProps {
  financialData?: FinancialData | null;
}
export function SECDocumentPreview({
  financialData
}: SECDocumentPreviewProps) {
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
                prospectus.
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