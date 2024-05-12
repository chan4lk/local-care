import path from 'path';
import { defaultStorageFolder } from '../main';
import Patient from './models/Patient';
import { DataSource, Like } from "typeorm"
import Invoice from './models/Invoice';
import Transaction from './models/Transaction';
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

    public async insert(patientDetails: Patient): Promise<Patient> {
        const patientRepository = this.connection.getRepository(Patient);
        console.log('patinet', patientDetails);
        return patientRepository.save(patientDetails);
    }

    public async fetchByNameOrMobile({ keyword }: { keyword: string }): Promise<Patient[]> {
        const patientRepository = this.connection.getRepository(Patient);

        return patientRepository
            .find({
                where: [
                    { fullname: Like(`${keyword}%`) },
                    { mobile: Like(`${keyword}%`) }
                ]
            })
    }

    public async fetchAll(): Promise<Patient[]> {
        const patientRepository = this.connection.getRepository(Patient);

        return patientRepository.find();
    }
}
