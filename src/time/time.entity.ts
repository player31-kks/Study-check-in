import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Time {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public user: number;

  @Column()
  public startTime: number;

  @Column()
  public endTime: number;
}
