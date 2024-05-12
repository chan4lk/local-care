import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('Patient')
export default class Patient {
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

    @Column({type: 'float'})
    total_amount: number;

    @Column({type: 'float'})
    paid_amount: number;
}
