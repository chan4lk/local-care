export interface IPatient {
    id?: number;
    fullname: string;
    mobile: string;
    treatment: string;
    invoice: IInvoice;
    createdAt?: Date;
    patientRegistrationId: string; 


}
export interface IInvoice{
    id?: number;
    description?: string;
    total: number;
    transactions: ITransaction[];
    referenceNumber: string; // Add this property


}

export enum ITransactionStatus {
    Pending = "pending",
    Paid = "paid",
}
export enum PaymentMethod {
    cash = "cash",
    card = "card",
    None = "none"

}
export interface ITransaction {
    id?: number;
    description?: string;
    amount: number;
    status: ITransactionStatus;
    totalAmount?: number; // Add this line
    name?:string;
    mobile?:string;
    paymentMethod: PaymentMethod;
    createdAt?: Date; // Add the 'timestamp' property
    
}

export interface ElectronAPI {
    insertPatient: (args: IPatient) =>  Promise<IPatient>
    fetchAll: () =>  Promise<IPatient[]>
    search: ({keyword}: {keyword:string}) =>  Promise<IPatient[]>
    fetchPaidByDateRange: (args: { start: Date, end: Date }) =>  Promise<ITransaction[]>
}
