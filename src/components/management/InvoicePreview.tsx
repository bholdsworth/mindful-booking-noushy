
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer, Download } from "lucide-react";
import InvoiceTemplate, { InvoiceData, BusinessInfo } from "./InvoiceTemplate";

interface InvoicePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceData: InvoiceData;
  businessInfo: BusinessInfo;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({
  isOpen,
  onClose,
  invoiceData,
  businessInfo,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // In a real application, this would generate a PDF using a library like jsPDF
    // For this demo, we'll just trigger the print dialog which can save as PDF
    window.print();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto print:p-0 print:max-w-none print:max-h-none print:overflow-visible">
        <DialogHeader className="print:hidden">
          <DialogTitle>Invoice Preview</DialogTitle>
          <div className="flex space-x-2 mt-4">
            <Button onClick={handlePrint} className="print:hidden">
              <Printer className="mr-2 h-4 w-4" />
              Print Invoice
            </Button>
            <Button variant="outline" onClick={handleDownloadPDF} className="print:hidden">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </DialogHeader>
        <div className="print:m-0">
          <InvoiceTemplate invoice={invoiceData} businessInfo={businessInfo} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoicePreview;
