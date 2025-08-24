import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface PDFDownloaderProps {
  documentRef: React.RefObject<HTMLDivElement>;
  companyName?: string;
  onDownloadStart?: () => void;
  onDownloadComplete?: () => void;
  onDownloadError?: (error: string) => void;
}

export const PDFDownloader: React.FC<PDFDownloaderProps> = ({
  documentRef,
  companyName = 'Company',
  onDownloadStart,
  onDownloadComplete,
  onDownloadError
}) => {
  const generatePDF = async () => {
    if (!documentRef.current) {
      onDownloadError?.('Document element not found');
      return;
    }

    try {
      onDownloadStart?.();

      // Create a clone of the document to avoid modifying the original
      const originalElement = documentRef.current;
      const clone = originalElement.cloneNode(true) as HTMLElement;
      
      // Style the clone for PDF generation
      clone.style.width = '210mm'; // A4 width
      clone.style.minHeight = '297mm'; // A4 height
      clone.style.padding = '20mm';
      clone.style.margin = '0';
      clone.style.backgroundColor = 'white';
      clone.style.color = 'black';
      clone.style.fontSize = '12px';
      clone.style.lineHeight = '1.4';
      
      // Remove interactive elements and buttons
      const buttons = clone.querySelectorAll('button');
      buttons.forEach(button => button.remove());
      
      // Remove the dynamic field integration notice
      const notice = clone.querySelector('.bg-blue-100');
      if (notice) {
        notice.remove();
      }

      // Temporarily append clone to body for rendering
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      clone.style.top = '0';
      document.body.appendChild(clone);

      // Generate canvas from the clone
      const canvas = await html2canvas(clone, {
        scale: 2, // Higher resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794, // A4 width in pixels at 96 DPI
        height: 1123, // A4 height in pixels at 96 DPI
        scrollX: 0,
        scrollY: 0,
        windowWidth: 794,
        windowHeight: 1123
      });

      // Remove the clone
      document.body.removeChild(clone);

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Add first page
      pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if content is longer than one page
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Generate filename
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `${companyName.replace(/[^a-zA-Z0-9]/g, '_')}_Prospectus_${timestamp}.pdf`;

      // Download the PDF
      pdf.save(filename);

      onDownloadComplete?.();

    } catch (error) {
      console.error('PDF generation error:', error);
      onDownloadError?.(error instanceof Error ? error.message : 'Failed to generate PDF');
    }
  };

  return (
    <button
      onClick={generatePDF}
      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
    >
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Download PDF
    </button>
  );
};
