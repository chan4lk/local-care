import path from 'path';
import { defaultStorageFolder } from '../main';
import Patient from './models/Patient';
import { DataSource } from "typeorm"
export default class Database {
    private connection: DataSource;

    constructor() {
        this.init();
    }

    public async init(): Promise<void> {
        const AppDataSource = new DataSource({
            type: 'sqlite',
            database: path.join(defaultStorageFolder, 'doc_app.sqlite'),
            entities: [Patient],
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

    public async insert({name , surname}: {name:string , surname:string}): Promise<Patient> {
        const patientRepository = this.connection.getRepository(Patient);
        const patient: Patient = { name: name, surname: surname };

        return patientRepository.save(patient);
    }

    public async fetchAll(): Promise<Patient[]> {
        const patientRepository = this.connection.getRepository(Patient);

        return patientRepository.find();
    }
}
