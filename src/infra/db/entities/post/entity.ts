import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Table } from '../../constant';

@Entity({
  name: Table.Post,
})
export class OrmPost {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id!: string;

  @Column()
  title!: string;

  @Column({
    type: 'text',
  })
  content!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
