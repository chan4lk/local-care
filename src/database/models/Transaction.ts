import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import Auditable from './Auditable';

export enum TransactionStatus {
    Pending = "pending",
    Paid = "paid",
}

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
        enum: TransactionStatus,
        default: TransactionStatus.Pending,
    })
    status: TransactionStatus
}