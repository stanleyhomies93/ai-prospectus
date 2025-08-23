# Liquidity & Capital Resources Data Upload Guide

## Overview
This guide helps you format your Excel file for uploading liquidity and capital resources data to the AI Prospectus application.

## Expected Excel Format

### File Structure
Your Excel file should have the following structure to match the "LIQUIDITY AND CAPITAL RESOURCES" table:

### Column Headers
```
A1: [Empty or "Item"] | B1: "March 31, 2024" | C1: "March 31, 2025"
```

### Data Rows

#### Current Assets Section
```
A2: "Current assets:"
A3: "Cash and cash equivalents" | B3: 776330 | C3: 698225
A4: "Deposits" | B4: 673755 | C4: 651265
A5: "Amount due from a related party" | B5: 14016148 | C5: 1994968
A6: "Total current assets" | B6: 15466233 | C6: 3344458
```

#### Current Liabilities Section
```
A7: "Current liabilities:"
A8: "Accounts payables – related parties" | B8: 5254401 | C8: "-"
A9: "Other payables and accrued liabilities" | B9: 30580 | C9: 30201
A10: "Contract liabilities" | B10: 308390 | C10: 418668
A11: "Amounts due to a director" | B11: 298113 | C11: "-"
A12: "Bank borrowings" | B12: 2142899 | C12: 1759784
A13: "Operating lease liabilities – current" | B13: 862810 | C13: 605980
A14: "Finance lease liabilities – current" | B14: 23805 | C14: 25470
A15: "Taxes payables" | B15: 69997 | C15: 159053
A16: "Total current liabilities" | B16: 8990995 | C16: 2999156
```

#### Net Current Assets Section
```
A17: "Net current assets:"
A18: "Net current assets" | B18: 6475238 | C18: 345302
```

## Key Formatting Rules

### 1. **Number Formatting**
- Use plain numbers (no currency symbols, commas, or formatting)
- Example: `776330` not `$776,330` or `776,330`

### 2. **Empty Values**
- Use `-` (dash) for zero or not applicable values
- Example: `-` for accounts payables in 2025

### 3. **Section Headers**
- Use descriptive section headers like "Current assets:" and "Current liabilities:"
- These help the system identify different sections

### 4. **Total Rows**
- Include "Total current assets", "Total current liabilities", and "Net current assets"
- The system will automatically highlight these as total rows

### 5. **Column Structure**
- **Column A**: Item descriptions
- **Column B**: First period values (e.g., March 31, 2024)
- **Column C**: Second period values (e.g., March 31, 2025)

## Sample Excel File Structure

| Item | March 31, 2024 | March 31, 2025 |
|------|----------------|----------------|
| Current assets: | | |
| Cash and cash equivalents | 776330 | 698225 |
| Deposits | 673755 | 651265 |
| Amount due from a related party | 14016148 | 1994968 |
| **Total current assets** | **15466233** | **3344458** |
| Current liabilities: | | |
| Accounts payables – related parties | 5254401 | - |
| Other payables and accrued liabilities | 30580 | 30201 |
| Contract liabilities | 308390 | 418668 |
| Amounts due to a director | 298113 | - |
| Bank borrowings | 2142899 | 1759784 |
| Operating lease liabilities – current | 862810 | 605980 |
| Finance lease liabilities – current | 23805 | 25470 |
| Taxes payables | 69997 | 159053 |
| **Total current liabilities** | **8990995** | **2999156** |
| Net current assets: | | |
| **Net current assets** | **6475238** | **345302** |

## Upload Process

1. **Select Document Type**: Choose "Liquidity & Capital Resources" from the document type options
2. **Upload Excel File**: Select your formatted Excel file
3. **Verify Data**: The system will automatically parse and display your data
4. **Review**: Check that all values are correctly formatted and displayed
5. **Save**: Your liquidity data will be integrated into the prospectus

## Tips for Best Results

### ✅ **Do:**
- Use consistent number formatting
- Include clear section headers
- Add total rows for each section
- Use descriptive item names
- Keep data in a clean, tabular format

### ❌ **Don't:**
- Include currency symbols or formatting
- Use merged cells
- Add extra formatting or styling
- Include empty rows between sections
- Use inconsistent naming conventions

## Troubleshooting

### Common Issues:
1. **"Not enough data" error**: Ensure you have at least 2 rows (headers + data)
2. **"Invalid format" error**: Check that numbers don't include currency symbols
3. **Missing totals**: Make sure to include total rows for each section
4. **Empty values**: Use `-` for zero or not applicable values

### Need Help?
If you encounter issues with your data format, refer to the sample structure above or contact support for assistance.

---

**Note**: This guide is specifically for liquidity and capital resources data. For other financial statement types (income statements, balance sheets, cash flow statements), different formatting may be required.
