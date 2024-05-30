import React from 'react';

interface BillFormatProps {
  patient: any;
  values: {
    fullname: string;
    mobile: string;
    treatment: string;
    total_amount: string;
    paid_amount: string;
    previous_paid: string;
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

    return (
      <div ref={ref} className="p-4" style={{ width: '12cm', height: '10.1cm' }}>
        <div className="border-dashed border-2 border-gray-200 p-4">
          <div className="flex justify-between pb-2 border-b border-dashed">
            <div>
              <p className="font-bold">BILL NO</p>
              <p>{patient.referenceNumber}</p>
            </div>
            <div>
              <p className="font-bold">BILL DATE</p>
              <p>{new Date().toLocaleString()}</p>
            </div>
          </div>

          <div className="pt-2 pb-2 border-b border-dashed">
            <p className="font-bold">PATIENT</p>
            <p>{patient.fullname}</p>
          </div>

          <div className="pt-2 pb-2 border-b border-dashed">
            <p className="font-bold">PATIENT ID</p>
            <p>{patient.patientRegistrationId}</p>
          </div>

          <div className="pt-2 pb-2 border-b border-dashed">
            <p className="font-bold">MOBILE</p>
            <p>{patient.mobile}</p>
          </div>

          <div className="pt-2 pb-2 border-b border-dashed">
            <p className="font-bold">TREATMENT</p>
            <p>{values.treatment}</p>
          </div>

          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr>
                <th className="text-left p-2 border-dashed border-t border-b border-gray-300">ITEM</th>
                <th className="text-center p-2 border-dashed border-t border-b border-gray-300">QTY</th>
                <th className="text-right p-2 border-dashed border-t border-b border-gray-300">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border-dashed border-b border-gray-300">{values.treatment}</td>
                <td className="text-center p-2 border-dashed border-b border-gray-300">1</td>
                <td className="text-right p-2 border-dashed border-b border-gray-300">
                  {formatNumberWithCommas(parseFloat(values.total_amount || '0'))}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4">
            <div className="flex justify-between">
              <p className="font-bold">TOTAL</p>
              <p>
                {formatNumberWithCommas(
                  parseFloat(values.total_amount || '0')
                )}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-bold">PREVIOUS PAYMENTS</p>
              <p>
                {formatNumberWithCommas(
                  parseFloat(values.previous_paid || '0')
                )}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-bold">PAID AMOUNT</p>
              <p>
                {formatNumberWithCommas(
                  parseFloat(values.paid_amount || '0')
                )}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-bold">AMOUNT DUE</p>
              <p>
                {formatNumberWithCommas(
                  parseFloat(values.total_amount || '0') -
                    parseFloat(values.previous_paid || '0') -
                    parseFloat(values.paid_amount || '0')
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

BillFormat.displayName = 'BillFormat';

export default BillFormat;
