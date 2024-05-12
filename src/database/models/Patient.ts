import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Patient')
export default class Patient {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    fullname: string;

    @Column()
    mobile: string;

    @Column()
    treatment_type: string;

    @Column({type: 'float'})
    total_amount: number;

    @Column({type: 'float'})
    paid_amount: number;
}
