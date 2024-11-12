import React from 'react';

interface BillFormatProps {
  patient: {
    referenceNumber: string;
    fullname: string;
    patientRegistrationId?: string;
    mobile: string;
  };
  values: {
    treatment: string;
    total_amount: string;
    paid_amount: string;
    previous_paid: string;
    discount: string;
    referenceNumber: string;
  };
}

const BillFormat = React.forwardRef<HTMLDivElement, BillFormatProps>(
  ({ patient, values }, ref) => {
    const formatNumberWithCommas = (number: number): string => {
      return number.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    };

    const totalAmount = parseFloat(values.total_amount || '0');
    const discount = parseFloat(values.discount || '0');
    const netAmount = totalAmount - discount;
    const previousPaid = parseFloat(values.previous_paid || '0');
    const paidAmount = parseFloat(values.paid_amount || '0');
    const dueAmount = netAmount - previousPaid - paidAmount;

    return (
      <div
        ref={ref}
        className="p-2 text-[12px]"
        style={{ width: '10cm', height: '10.1cm', marginTop: '3cm', marginLeft: '0cm', marginRight: '0.2cm' }}
      >
        <div className="border-dashed border-2 border-gray-200 p-2 rounded-md">
          <div className="mb-2">
            <div className="flex mb-1">
              <p className="font-bold w-2/5">BILL NO</p>
              <p className="w-3/5">: {patient.referenceNumber || values.referenceNumber}</p>
            </div>
            <div className="flex mb-1">
              <p className="font-bold w-2/5">BILL DATE</p>
              <p className="w-3/5">: {new Date().toLocaleString()}</p>
            </div>
            <div className="flex mb-1">
              <p className="font-bold w-2/5">PATIENT</p>
              <p className="w-3/5">: {patient.fullname}</p>
            </div>
            <div className="flex mb-1">
              <p className="font-bold w-2/5">TELL NO</p>
              <p className="w-3/5">: {patient.mobile}</p>
            </div>
          </div>

          <table className="min-w-full border-collapse text-xxs">
            <thead className="bg-white">
              <tr>
                <th className="text-left p-1 border-dashed border-b border-gray-300">ITEM</th>
                <th className="text-left p-1 border-dashed border-b border-gray-300"></th>
                <th className="text-left p-1 border-dashed border-b border-gray-300"></th>
                <th className="text-left p-1 border-dashed border-b border-gray-300">QTY</th>
                <th className="text-left p-1 border-dashed border-b border-gray-300">AMOUNT(LKR)</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr>
                <td colSpan={3} className="text-[10px] text-left px-1 py-1 border-dashed border-b border-gray-300 whitespace-normal break-words">
                  {values.treatment}
                </td>
                <td className="text-left px-1 py-1 border-dashed border-b border-gray-300">1</td>
                <td className="px-1 p-0 text-right font-mono tabular-nums border-dashed border-b border-gray-300">
                  {formatNumberWithCommas(parseFloat(values.total_amount || '0'))}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="min-w-full border-collapse text-xxs">
            <tbody className="bg-white">
              <tr>
                <td className="px-1 p-0 font-bold">TOTAL</td>
                <td className="px-1 p-0 text-right font-mono tabular-nums">{formatNumberWithCommas(parseFloat(values.total_amount || '0'))}</td>
              </tr>
              <tr>
                <td className="px-1 p-0 font-bold">TOTAL DISCOUNT</td>
                <td className="px-1 p-0 text-right font-mono tabular-nums">{formatNumberWithCommas(discount)}</td>
              </tr>
              <tr>
                <td className="px-1 p-0 font-bold">NET AMOUNT</td>
                <td className="px-1 p-0 text-right font-mono tabular-nums">{formatNumberWithCommas(totalAmount - discount)}</td>
              </tr>
              <tr>
                <td className="px-1 p-0 font-bold border-dashed border-t border-white whitespace-nowrap">PREVIOUS PAYMENTS</td>
                <td className="px-1 p-0 text-right font-mono tabular-nums border-dashed border-t border-white">{formatNumberWithCommas(parseFloat(values.previous_paid || '0'))}</td>
              </tr>
              <tr>
                <td className="px-1 p-0 font-bold border-dashed border-t border-white">PAID AMOUNT</td>
                <td className="px-1 p-0 text-right font-mono tabular-nums border-dashed border-t border-white">{formatNumberWithCommas(parseFloat(values.paid_amount || '0'))}</td>
              </tr>
              <tr>
                <td className="px-1 p-0 font-bold border-dashed border-t border-white">DUE AMOUNT</td>
                <td className="px-1 p-0 text-right font-mono tabular-nums border-dashed border-t border-white">
                  {formatNumberWithCommas(
                    dueAmount
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
);

BillFormat.displayName = 'BillFormat';
export default BillFormat;