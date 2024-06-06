import { Entity, Column, PrimaryGeneratedColumn, Relation, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import Transaction from './Transaction';
import Auditable from './Auditable';
import Patient from './Patient';

@Entity()
export default class Invoice extends Auditable {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    description?: string;

    @OneToOne(() => Patient, (patient) => patient.invoice)
    @JoinColumn()
    patient: Relation<Patient>;

    @Column('decimal', { precision: 10, scale: 2 })
    total: number;

    @OneToMany(() => Transaction, (transaction) => transaction.invoice)
    transactions: Relation<Transaction[]>;

    static GenerateReferenceNumber(): string {
        const now = new Date();
        const random = Math.floor(Math.random() * 100);
        const referenceNumber = `REF-${now.getFullYear().toString().slice(-2)}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}${now.getMilliseconds().toString().padStart(2, '0')}${random}`;
        return referenceNumber;
    }
}
