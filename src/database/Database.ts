import path from 'path';
import { defaultStorageFolder } from '../main';
import Patient from './models/Patient';
import { DataSource, Like } from "typeorm"
import Invoice from './models/Invoice';
import Transaction from './models/Transaction';
import { IPatient } from '../types/electron-api';

export default class Database {
    private connection: DataSource;

    constructor() {
        this.init();
    }

    public async init(): Promise<void> {
        const AppDataSource = new DataSource({
            type: 'sqlite',
            database: path.join(defaultStorageFolder, 'doc_app.sqlite'),
            entities: [Patient, Invoice, Transaction],
            synchronize: true
        })

        AppDataSource.initialize()
            .then(() => {
                console.log("Data Source has been initialized!")
            })
            .catch((err) => {
                console.error("Error during Data Source initialization", err)
            })
        this.connection = AppDataSource;
    }

    public async insert(patientDetails: IPatient): Promise<Patient> {
        const patientRepository = this.connection.getRepository(Patient);
        const invoiceRepository = this.connection.getRepository(Invoice);
        const transactionRepository = this.connection.getRepository(Transaction);

        const patient = await patientRepository.save(patientDetails);

        const invoice = patientDetails.invoice as unknown as Invoice;
        invoice.patient = patient;
        invoice.paymentMethod = patientDetails.paymentMethod; // Set the payment method
        await invoiceRepository.save(patientDetails.invoice as unknown);

        invoice.transactions.forEach(async element => {
            element.invoice = invoice;
            await transactionRepository.save(element);
        });
    
        return patient;
    }

    public async fetchByNameOrMobile({ keyword }: { keyword: string }): Promise<Patient[]> {
        const patientRepository = this.connection.getRepository(Patient);

        return patientRepository
            .find({
                where: [
                    { fullname: Like(`${keyword}%`) },
                    { mobile: Like(`${keyword}%`) }
                ],
                relations: {
                    invoice: {
                        transactions: true
                    }
                }
            })
    }

    public async fetchAll(): Promise<Patient[]> {
        const patientRepository = this.connection.getRepository(Patient);

        return patientRepository.find({
            relations: {
                invoice: {
                    transactions: true
                }
            }
        });
    }
}
