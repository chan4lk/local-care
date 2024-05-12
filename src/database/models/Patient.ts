import { Entity, Column, PrimaryGeneratedColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import Auditable from './Auditable';
import Invoice from './Invoice';

@Entity('Patient')
export default class Patient extends Auditable{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    @Index({fulltext: true})
    fullname: string;

    @Column()
    @Index({fulltext: true})
    mobile: string;

    @Column()
    treatment_type: string;

    @ManyToOne(() => Invoice, (invoice) => invoice.id)
    invoice: Invoice;
}
