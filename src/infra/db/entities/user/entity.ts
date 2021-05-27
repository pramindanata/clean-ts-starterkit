import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Table } from '../../constant';

@Entity({
  name: Table.User,
})
export class OrmUser {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id!: string;

  @Column({
    unique: true,
  })
  email!: string;

  @Column()
  password!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
