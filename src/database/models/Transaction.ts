import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Relation, JoinTable } from 'typeorm';
import Auditable from './Auditable';
import { ITransactionStatus, PaymentMethod } from '../../types/electron-api';
import Invoice from './Invoice';

@Entity()
export default class Transaction extends Auditable {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    description?: string;

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column({
        type: "simple-enum",
        enum: ITransactionStatus,
        default: ITransactionStatus.Pending,
    })
    status: ITransactionStatus

    @Column({
        type: "simple-enum",
        enum: PaymentMethod,
        default: PaymentMethod.cash,
    })
    paymentMethod: PaymentMethod
    

    @ManyToOne(() => Invoice, (invoice) => invoice.transactions)
    @JoinTable()
    invoice: Relation<Invoice>
}
