import { User } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Time {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public status: boolean;

  @Column()
  public startTime: Date;

  @Column({ nullable: true })
  public endTime?: Date;

  @ManyToOne(() => User, (user: User) => user.time)
  @JoinColumn({ name: 'ref_userId' })
  public user: User
}
