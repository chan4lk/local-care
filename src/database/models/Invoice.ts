import { Entity, Column, JoinTable, PrimaryGeneratedColumn } from 'typeorm';
import Transaction from './Transaction';
import Auditable from './Auditable';

@Entity()
export default class Invoice extends Auditable{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    description?: string;

    @Column('decimal', { precision: 10, scale: 2 })
    total: number;

    @JoinTable({
        name: 'invoice_transactions',
        joinColumn: {
            name: 'invoice_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'transaction_id',
            referencedColumnName: 'id'
        }
    })
    transactions: Transaction[];
}
