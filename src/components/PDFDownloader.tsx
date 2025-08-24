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
      clone.style.padding = '20mm';
      clone.style.margin = '0';
      clone.style.backgroundColor = 'white';
      clone.style.color = 'black';
      clone.style.fontSize = '12px';
      clone.style.lineHeight = '1.4';
      clone.style.position = 'relative';
      clone.style.overflow = 'visible';
      
      // Remove interactive elements and buttons
      const buttons = clone.querySelectorAll('button');
      buttons.forEach(button => button.remove());
      
      // Remove the dynamic field integration notice
      const notice = clone.querySelector('.bg-blue-100');
      if (notice) {
        notice.remove();
      }

      // Remove loading and error indicators if present
      const loadingIndicator = clone.querySelector('.bg-yellow-100');
      if (loadingIndicator) {
        loadingIndicator.remove();
      }
      
      const errorIndicator = clone.querySelector('.bg-red-100');
      if (errorIndicator) {
        errorIndicator.remove();
      }

      // Temporarily append clone to body for rendering
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      clone.style.top = '0';
      clone.style.height = 'auto';
      document.body.appendChild(clone);

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const contentWidth = 794; // Content width in pixels
      const contentHeight = 1123; // Content height in pixels

      // Generate the full document as one canvas first
      const fullCanvas = await html2canvas(clone, {
        scale: 2, // Higher resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: contentWidth,
        height: clone.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: contentWidth,
        windowHeight: clone.scrollHeight
      });

      // Calculate how many pages we need
      const totalHeight = fullCanvas.height;
      const pageHeightPixels = contentHeight * 2; // Account for scale
      const totalPages = Math.ceil(totalHeight / pageHeightPixels);

      // Split the canvas into pages
      for (let page = 0; page < totalPages; page++) {
        if (page > 0) {
          pdf.addPage();
        }

        // Create a temporary canvas for this page
        const pageCanvas = document.createElement('canvas');
        const ctx = pageCanvas.getContext('2d');
        if (!ctx) continue;

        // Set canvas size for this page
        pageCanvas.width = fullCanvas.width;
        pageCanvas.height = Math.min(pageHeightPixels, totalHeight - (page * pageHeightPixels));

        // Draw the portion of the full canvas for this page
        ctx.drawImage(
          fullCanvas,
          0, page * pageHeightPixels, // Source x, y
          fullCanvas.width, pageCanvas.height, // Source width, height
          0, 0, // Destination x, y
          pageCanvas.width, pageCanvas.height // Destination width, height
        );

        // Convert canvas to image and add to PDF
        const imgData = pageCanvas.toDataURL('image/png');
        const imgWidth = pageWidth;
        const imgHeight = (pageCanvas.height * pageWidth) / pageCanvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      }

      // Remove the clone
      document.body.removeChild(clone);

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
