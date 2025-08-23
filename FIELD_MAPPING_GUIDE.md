# Field Mapping Guide: Sample Prospectus to Application

## Overview
This guide maps the `[ ]` fields from the sample prospectus to the most relevant sections in the AI Prospectus application.

## Field Mapping by Section

### 1. COMPANY DETAILS (Step 1) - Manual Company Information

#### **Basic Company Information**
- `[LISTING COMPANY FULL NAME]` → **Company Name** field
- `[LISTING COMPANY ADDRESS]` → **NEW FIELD NEEDED** - Company Address
- `[LISTING COMPANY TELEPHONE]` → **NEW FIELD NEEDED** - Company Phone
- `[TICKER NUMBER]` → **NEW FIELD NEEDED** - Stock Ticker Symbol

#### **Legal/Professional Services**
- `[U.S. PROCESS AGENT]` → **NEW SECTION NEEDED** - Legal Services
- `[U.S. PROCESS AGENT ADDRESS]` → **NEW FIELD NEEDED** - Process Agent Address
- `[U.S. PROCESS AGENT TELEPHONE]` → **NEW FIELD NEEDED** - Process Agent Phone
- `[LAWYER NAME]` → **NEW FIELD NEEDED** - Legal Counsel Names
- `[U.S. LAWYERS]` → **NEW FIELD NEEDED** - US Law Firm
- `[U.S. LAWYERS ADDRESS]` → **NEW FIELD NEEDED** - US Lawyers Address
- `[U.S. LAWYERS TELEPHONE]` → **NEW FIELD NEEDED** - US Lawyers Phone
- `[UNDERWRITING LAWYERS]` → **NEW FIELD NEEDED** - Underwriting Counsel
- `[UNDERWRITING LAWYERS ADDRESS]` → **NEW FIELD NEEDED** - Underwriting Counsel Address
- `[UNDERWRITING LAWYERS TELEPHONE]` → **NEW FIELD NEEDED** - Underwriting Counsel Phone
- `[AUDITOR]` → **NEW FIELD NEEDED** - Audit Firm

#### **Key Personnel**
- `[CONTROLLING SHAREHOLDER/CEO NAME]` → **NEW SECTION NEEDED** - Management
- `[RELATED COMPANY NAME]` → **NEW FIELD NEEDED** - Related Company

#### **Dates**
- `[FILING DATE]` → **NEW FIELD NEEDED** - Filing Date

### 2. ADD CONTENT (Step 2) - Business Overview Section

#### **Business Description**
- `[LISTING COMPANY]` → **Company Name** (already mapped)
- `[RELATED COMPANY]` → **Related Company** (already mapped)
- `[CORPORATE STRUCTURE CHART TO BE INSERTED]` → **NEW SECTION NEEDED** - Corporate Structure

### 3. FINANCIAL INFORMATION (Step 3)
- Financial data fields are already handled by the Excel upload functionality
- Dynamic integration with `[REVENUE]`, `[ASSETS]`, `[LIABILITIES]`, etc. through uploaded data

### 4. ADDITIONAL SECTIONS NEEDED

#### **Risk Factors Section**
- Risk factors are already implemented in the current application

#### **Management Section**
- `[CONTROLLING SHAREHOLDER/CEO NAME]` → **NEW SECTION NEEDED** - Management Team

#### **Legal Matters Section**
- Legal service fields (already listed above)

#### **Use of Proceeds Section**
- **NEW SECTION NEEDED** - How IPO proceeds will be used

#### **Dividend Policy Section**
- **NEW SECTION NEEDED** - Company's dividend policy

#### **Capitalization Section**
- **NEW SECTION NEEDED** - Share capital structure

## Implementation Priority

### **HIGH PRIORITY (Essential for SEC Filing)**
1. Company Address
2. Company Phone
3. Stock Ticker Symbol
4. Filing Date
5. Legal Services Information
6. Audit Firm

### **MEDIUM PRIORITY (Important for Completeness)**
1. Management Team Information
2. Related Company Details
3. Corporate Structure Chart
4. Use of Proceeds

### **LOW PRIORITY (Nice to Have)**
1. Additional legal details
2. Enhanced management information

## Current Application Strengths
✅ Company Name field exists
✅ Company Website field exists  
✅ Company Description field exists
✅ Document upload functionality exists
✅ Additional resources functionality exists
✅ Financial data integration exists
✅ Risk factors management exists

## Missing Critical Fields
❌ Company Address
❌ Company Phone
❌ Stock Ticker Symbol
❌ Legal Services Information
❌ Management Information
❌ Filing Date
❌ Audit Firm Information

## Recommendations

### 1. **Expand Company Details Section**
Add the missing basic company information fields to Step 1.

### 2. **Add Legal Services Section**
Create a new subsection in Step 1 for legal and professional service information.

### 3. **Add Management Section**
Create a new section in Step 2 for management team information.

### 4. **Add Corporate Structure**
Create a section for corporate structure charts and related company information.

### 5. **Add Filing Information**
Add fields for filing dates and other SEC-specific information.

This mapping will ensure the application generates prospectuses that match the professional format of the sample document.
