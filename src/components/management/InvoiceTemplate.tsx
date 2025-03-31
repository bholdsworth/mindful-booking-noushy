
import React from "react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";

export interface InvoiceItem {
  id?: string;
  date?: Date;
  item: string;
  description: string;
  quantity: number;
  rate: number;
  discount?: number;
  tax?: number;
  total: number;
}

export interface PaymentItem {
  date: Date;
  method: string;
  amount: number;
}

export interface InvoiceData {
  id: string;
  date: Date;
  dueDate?: Date;
  patientName: string;
  patientAddress?: string;
  items: InvoiceItem[];
  payments: PaymentItem[];
  notes?: string;
  nextAppointment?: {
    date: Date;
    practitioner: string;
    service: string;
  };
}

export interface BusinessInfo {
  name: string;
  practitioner: string;
  qualification: string;
  address: string;
  abn: string;
  providerNumber?: string;
}

interface InvoiceTemplateProps {
  invoice: InvoiceData;
  businessInfo: BusinessInfo;
}

const InvoiceTemplate: React.FC<InvoiceTemplateProps> = ({
  invoice,
  businessInfo,
}) => {
  const calculateSubtotal = () => {
    return invoice.items.reduce((sum, item) => sum + item.rate * item.quantity, 0);
  };

  const calculateTotalTax = () => {
    return invoice.items.reduce((sum, item) => sum + (item.tax || 0), 0);
  };

  const calculateTotalPayments = () => {
    return invoice.payments.reduce((sum, payment) => sum + payment.amount, 0);
  };

  const calculateBalance = () => {
    const subtotal = calculateSubtotal();
    const payments = calculateTotalPayments();
    return subtotal - payments;
  };

  return (
    <Card className="p-6 max-w-4xl mx-auto bg-white text-black print:shadow-none print:border-none">
      {/* Header */}
      <div className="flex justify-between mb-8">
        <div>
          <p className="font-bold">{businessInfo.practitioner}</p>
          <p>{businessInfo.qualification}</p>
          {businessInfo.providerNumber && (
            <p className="mt-2">Prov. No. {businessInfo.providerNumber}</p>
          )}
          <div className="mt-4">
            <p>Invoice to</p>
            <p className="font-bold">{invoice.patientName}</p>
            {invoice.patientAddress && (
              <p className="whitespace-pre-line">{invoice.patientAddress}</p>
            )}
          </div>
          <div className="mt-4">
            <p className="font-bold text-lg">Tax Invoice #{invoice.id}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-xl">{businessInfo.name}</p>
          <p className="whitespace-pre-line">{businessInfo.address}</p>
          <p>ABN: {businessInfo.abn}</p>
          <div className="mt-4 text-right">
            <p>Printed: {format(new Date(), "dd-MMM-yyyy")}</p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Item</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Qty</th>
              <th className="border border-gray-300 px-4 py-2 text-right">Fee</th>
              <th className="border border-gray-300 px-4 py-2 text-right">Discount</th>
              <th className="border border-gray-300 px-4 py-2 text-right">Total GST</th>
              <th className="border border-gray-300 px-4 py-2 text-right">Total</th>
              <th className="border border-gray-300 px-4 py-2 text-right">Payment</th>
              <th className="border border-gray-300 px-4 py-2 text-right">Balance</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {item.date ? format(item.date, "dd/MM/yyyy") : format(invoice.date, "dd/MM/yyyy")}
                </td>
                <td className="border border-gray-300 px-4 py-2">{item.item}</td>
                <td className="border border-gray-300 px-4 py-2">{item.description}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{item.quantity}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  ${item.rate.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  ${(item.discount || 0).toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  ${(item.tax || 0).toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  ${(item.total).toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  ${index === 0 ? calculateTotalPayments().toFixed(2) : "0.00"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  ${index === 0 ? calculateBalance().toFixed(2) : "0.00"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payments Section */}
      <div className="mt-8">
        <h3 className="font-bold mb-2">Payments</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Method</th>
              <th className="border border-gray-300 px-4 py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.payments.map((payment, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {format(payment.date, "dd/MM/yyyy")}
                </td>
                <td className="border border-gray-300 px-4 py-2">{payment.method}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  ${payment.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals and Summary */}
      <div className="mt-6 flex justify-end">
        <div className="w-64">
          <div className="flex justify-between py-1">
            <span>Total GST</span>
            <span>${calculateTotalTax().toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Total Fees</span>
            <span>${calculateSubtotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Total Payments</span>
            <span>${calculateTotalPayments().toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1 font-bold">
            <span>Amount Due</span>
            <span>${calculateBalance().toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Next Appointment */}
      {invoice.nextAppointment && (
        <div className="mt-10 border border-gray-300 p-3 max-w-xs ml-auto">
          <h3 className="font-bold text-center">Next Appointment</h3>
          <p className="text-right">
            {format(invoice.nextAppointment.date, "EEEE, d MMMM yyyy h:mm a")}
          </p>
          <p className="text-right">{invoice.nextAppointment.practitioner}</p>
          <p className="text-right">{invoice.nextAppointment.service}</p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-16 border-t pt-4 flex justify-between">
        <div></div>
        <div className="text-right">
          <p className="font-bold">Amount Due: ${calculateBalance().toFixed(2)}</p>
          <p>Invoice Date: {format(invoice.date, "dd/MM/yyyy")}</p>
        </div>
      </div>
    </Card>
  );
};

export default InvoiceTemplate;
