import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Time {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public startTime: Date;

  @Column()
  public endTime: Date;

  @ManyToOne(() => User, (user: User) => user.time)
  public user: User
}
