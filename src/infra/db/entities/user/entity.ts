import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TableName } from '../../constant';

@Entity({
  name: TableName.User,
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
