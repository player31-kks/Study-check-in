import { User } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hours {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public date: string;

  @Column()
  public time: number;

  @ManyToOne(() => User, (user: User) => user.hours)
  @JoinColumn({ name: 'ref_userId' })
  public user: User
}
