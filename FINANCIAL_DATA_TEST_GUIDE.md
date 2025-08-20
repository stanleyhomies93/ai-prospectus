# Financial Data Integration Test Guide

## Overview
The SEC Document Preview now dynamically integrates financial data from uploaded Excel files throughout the prospectus narrative. Financial figures are highlighted in **yellow** to show which values are automatically populated from your uploaded data.

## How to Test the Feature

### 1. Create a Test Excel File
Create an Excel file with the following structure:

| Description | 2023 | 2022 | 2021 |
|-------------|------|------|------|
| Revenue | 50000000 | 35000000 | 20000000 |
| Net Loss | -12000000 | -18000000 | -22000000 |
| Total Assets | 75000000 | 60000000 | 45000000 |
| Total Liabilities | 28000000 | 25000000 | 20000000 |
| Cash | 35000000 | 25000000 | 15000000 |

### 2. Expected Data Format
- **Row 0**: Revenue data
- **Row 1**: Net Loss data  
- **Row 2**: Total Assets data
- **Row 3**: Total Liabilities data
- **Row 4**: Cash data
- **Column 0**: Description (not used in calculations)
- **Column 1**: 2023 data
- **Column 2**: 2022 data
- **Column 3**: 2021 data

### 3. Testing Steps
1. Go to Step 3: Financial Information
2. Upload your Excel file
3. Navigate to Step 4: Review
4. View the SEC Document Preview
5. Look for **yellow highlighted** figures throughout the document

### 4. What Gets Updated
The following sections will show dynamic financial figures:
- **Prospectus Summary**: Revenue growth figures
- **Financial Highlights Box**: All key financial metrics
- **Risk Factors**: Net loss figures
- **Business Section**: Assets and cash figures
- **Financial Information Section**: Complete uploaded table

### 5. Visual Indicators
- **Yellow highlighting**: Figures populated from uploaded data
- **Blue info box**: Confirms dynamic integration is active
- **Green note**: Indicates data is integrated throughout the document

## Sample Test Data
You can use these sample values to test:

**Conservative Growth Scenario:**
- Revenue: $20M → $35M → $50M
- Net Loss: -$22M → -$18M → -$12M
- Assets: $45M → $60M → $75M

**Aggressive Growth Scenario:**
- Revenue: $15M → $40M → $80M
- Net Loss: -$25M → -$15M → -$8M
- Assets: $40M → $70M → $100M

## Troubleshooting
- Ensure your Excel file has headers in the first row
- Make sure data starts from row 2 (after headers)
- Verify the column structure matches the expected format
- Check that numbers are formatted as numbers, not text

## Expected Behavior
When you upload different financial data:
1. All yellow-highlighted figures should update immediately
2. The financial table should show your uploaded data
3. Narrative sections should reflect the new figures
4. The blue info box should appear confirming integration is active
