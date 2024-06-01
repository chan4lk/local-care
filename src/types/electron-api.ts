export interface IPatient {
    id?: number;
    fullname: string;
    mobile: string;
    treatment: string;
    invoice: IInvoice;
    createdAt?: Date;
    patientRegistrationId: string; 
    paymentMethod: string;


}
export interface IInvoice{
    id?: number;
    description?: string;
    total: number;
    transactions: ITransaction[];
    paymentMethod: string;

}

export enum ITransactionStatus {
    Pending = "pending",
    Paid = "paid",
}

export interface ITransaction {
    id?: number;
    description?: string;
    amount: number;
    status: ITransactionStatus
}

export interface ElectronAPI {
    insertPatient: (args: IPatient) =>  Promise<IPatient>
    fetchAll: () =>  Promise<IPatient[]>
    search: ({keyword}: {keyword:string}) =>  Promise<IPatient[]>
}