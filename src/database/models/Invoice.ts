import { Entity, Column, PrimaryGeneratedColumn, Relation, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import Transaction from './Transaction';
import Auditable from './Auditable';
import Patient from './Patient';

@Entity()
export default class Invoice extends Auditable{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    description?: string;

    @OneToOne(() => Patient, (patient) => patient.invoice)
    @JoinColumn()
    patient: Relation<Patient>

    @Column('decimal', { precision: 10, scale: 2 })
    total: number;

    @OneToMany(() => Transaction, (transaction) => transaction.invoice)
    transactions: Relation<Transaction[]>;

    @Column()
    paymentMethod: string; 
}
