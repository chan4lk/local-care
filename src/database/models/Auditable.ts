import { BaseEntity, Column } from 'typeorm';

export default abstract class Auditable extends BaseEntity {
  @Column('datetime', {
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true
  })
  createdAt?: Date;

  @Column('datetime', {
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: true
  })
  updatedAt?: Date;
}