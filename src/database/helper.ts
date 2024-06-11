import { IPatient, ITransactionStatus } from "../types/electron-api";

export function GenerateReferenceNumber(): string {
    const now = new Date();
    const random = Math.floor(Math.random() * 100);
    const referenceNumber = `REF-${now.getFullYear().toString().slice(-2)}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}${now.getMilliseconds().toString().padStart(2, '0')}${random}`;
    return referenceNumber;
}

export function calculateTotalPaid(patient: IPatient){
    return patient.invoice.transactions
              .filter((t) => t.status === ITransactionStatus.Paid)
              .map((t) => t.amount)
              .reduce((sum, current) => sum + current, 0);
}