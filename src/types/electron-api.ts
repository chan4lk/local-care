export interface IPatient {
    id?: number;
    fullname: string;
    mobile: string;
    total_amount: number;
    paid_amount: number;
    treatment_type: string;
}
export interface ElectronAPI {
    insertPatient: (args: IPatient) =>  Promise<IPatient>
    fetchAll: () =>  Promise<IPatient[]>
    search: ({keyword}: {keyword:string}) =>  Promise<IPatient[]>
}