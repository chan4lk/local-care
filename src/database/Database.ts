import path from 'path';
import { defaultStorageFolder } from '../main';
import Patient from './models/Patient';
import { DataSource, Like } from "typeorm"
import Invoice from './models/Invoice';
import Transaction from './models/Transaction';
import { IPatient, ITransaction, ITransactionStatus } from '../types/electron-api';
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

    public async fetchTransactionsByDate({ start, end }: { start: Date, end: Date }): Promise<ITransaction[]> {
        const transactionRepository = this.connection.getRepository(Transaction);
        
        const startDate = new Date(start.getTime()); // Creates a new Date object representing the current date and time
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);
        
        const endDate = new Date(end.getTime()); // Creates a new Date object with the same date and time as startDate
        endDate.setHours(23); // Sets the time to 23:59:59 for the same day
        endDate.setMinutes(59);
        endDate.setSeconds(59);
        console.log("report", startDate, endDate);
        
        return await transactionRepository
            .createQueryBuilder('transaction')
            .innerJoin('transaction.invoice', 'invoice')
            .innerJoin('invoice.patient', 'patient')  // <--- join invoice.patient to get patient data
            .where('transaction.status = :status', { status: ITransactionStatus.Paid })
            .andWhere("transaction.createdAt BETWEEN :startDate AND :endDate", {
                startDate,
                endDate,
            })
            .select([
                'transaction.id AS id',
                'transaction.createdAt AS createdAt',
                'transaction.description AS description',
                'transaction.status AS status',
                'transaction.amount AS amount',
                'transaction.paymentMethod AS paymentMethod',
                'patient.fullname AS name', // alias fullname as name
                'patient.mobile AS mobile', // alias mobile as mobile
            ])
            .getRawMany();
    }
}
