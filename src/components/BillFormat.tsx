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
          <div className="">
            <div className="flex">
              <p className="font-bold w-2/5">BILL NO</p>
              <p className="w-3/5">: {patient.referenceNumber}</p>
            </div>
            <div className="flex">
              <p className="font-bold w-2/5">BILL DATE</p>
              <p className="w-3/5">: {new Date().toLocaleString()}</p>
            </div>
            <div className="flex">
              <p className="font-bold w-2/5">PATIENT</p>
              <p className="w-3/5">: {patient.fullname}</p>
            </div>
            <div className="flex">
              <p className="font-bold w-2/5">PATIENT ID</p>
              <p className="w-3/5">: {patient.patientRegistrationId || ''}</p>
            </div>
            <div className="flex">
              <p className="font-bold w-2/5">APPOINTMENT NO</p>
              <p className="w-3/5">: {''}</p>
            </div>
            <div className="flex justify-between">
              <div className="flex">
                <p className="font-bold ">GENDER</p>
              </div>
              <div className="w-1/6 mr-2"> {/* Adjust the width and add margin */}
                <p className="font-bold">AGE :</p>
              </div>
            </div>
            
            <div className="flex">
              <p className="font-bold w-2/5">TELL NO</p>
              <p className="w-3/5">: {patient.mobile}</p>
            </div>
          </div>

          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr>
                <th className="text-left p-1 border-dashed border-t border-b border-gray-300">ITEM</th>
                <th className="text-center p-1 border-dashed border-t border-b border-gray-300">QTY</th>
                <th className="text-right p-1 border-dashed border-t border-b border-gray-300">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-1 border-dashed border-b border-gray-300">{values.treatment}</td>
                <td className="text-center p-1 border-dashed border-b border-gray-300">1</td>
                <td className="text-right p-1 border-dashed border-b border-gray-300">
                  {formatNumberWithCommas(parseFloat(values.total_amount || '0'))}
                </td>
              </tr>
              <tr>
                <td className="p-0 border-dashed border-t border-white"></td>
                <td className="font-bold p-0 border-dashed border-t border-white">TOTAL (LKR)</td>
                <td className="text-right p-0 border-dashed border-t border-white">{formatNumberWithCommas(parseFloat(values.total_amount || '0'))}</td>
              </tr>
              <tr>
                <td className="p-0 border-dashed border-t border-white"></td>
                <td className="font-bold p-0 border-dashed border-t border-white">PREVIOUS PAYMENTS (LKR)</td>
                <td className="text-right p-0 border-dashed border-t border-white">{formatNumberWithCommas(parseFloat(values.previous_paid || '0'))}</td>
              </tr>
              <tr>
                <td className="p-0 border-dashed border-t border-white"></td>
                <td className="font-bold p-0 border-dashed border-t border-white">PAID AMOUNT (LKR)</td>
                <td className="text-right p-0 border-dashed border-t border-white">{formatNumberWithCommas(parseFloat(values.paid_amount || '0'))}</td>
              </tr>
              <tr>
                <td className="p-0 border-dashed border-t border-white"></td>
                <td className="font-bold p-0 border-dashed border-t border-white">DUE AMOUNT (LKR)</td>
                <td className="text-right p-0 border-dashed border-t border-white">{formatNumberWithCommas(
                  parseFloat(values.total_amount || '0') -
                  parseFloat(values.previous_paid || '0') -
                  parseFloat(values.paid_amount || '0')
                )}</td>
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
