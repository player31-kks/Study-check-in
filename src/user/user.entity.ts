import { Time } from 'src/time/time.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public password: string;

  @Column()
  public status: boolean;

  @Column()
  public createdAt: Date;

  @OneToMany(() => Time, (time: Time) => time.user)
  public time: Time[];
}
