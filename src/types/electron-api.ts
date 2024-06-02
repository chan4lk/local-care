export interface IPatient {
    id?: number;
    fullname: string;
    mobile: string;
    treatment: string;
    invoice: IInvoice;
    createdAt?: Date;
    patientRegistrationId: string; // Add this line

}
export interface IInvoice{
    id?: number;
    description?: string;
    total: number;
    transactions: ITransaction[];
}

export enum ITransactionStatus {
    Pending = "pending",
    Paid = "paid",
}

export interface ITransaction {
    id?: number;
    description?: string;
    amount: number;
    status: ITransactionStatus;
    name?:string;
    mobile?:string;
}

export interface ElectronAPI {
    insertPatient: (args: IPatient) =>  Promise<IPatient>
    fetchAll: () =>  Promise<IPatient[]>
    search: ({keyword}: {keyword:string}) =>  Promise<IPatient[]>
    fetchPaidByDateRange: (args: { start: Date, end: Date }) =>  Promise<ITransaction[]>
}