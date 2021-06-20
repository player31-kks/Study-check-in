import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Time } from './time.entity';

@Injectable()
export class TimeService {
  constructor(
    @InjectRepository(Time) private timeRepository: Repository<Time>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }

  async checkIn(headers: any) {
    console.log(headers)
    const user = await this.userRepository.findOne({ name: headers.user.name })
    console.log(user)
    if (!user) throw new Error("로그인 정보가 잘못되었습니다. 다시 로그인해주세요.")
    if (user.status === true) throw new Error("이미 체크인되어 있습니다.")
    user.status = true
    await this.userRepository.save(user)

    const newTime = new Time()
    const date = Date.now() + (1000 * 60 * 60 * 9)
    newTime.user = user
    newTime.status = true
    newTime.startTime = new Date(date)
    const time = await this.timeRepository.save(newTime)
    console.log(time)
    return time
  }

  async checkOut(headers: any) {
    const user = await this.userRepository.findOne({ name: headers.user.name })
    if (!user) throw new Error("로그인 정보가 잘못되었습니다. 다시 로그인해주세요.")
    if (user.status === false) throw new Error("이미 체크아웃되어 있습니다.")
    user.status = false
    await this.userRepository.save(user)

    const time = await this.timeRepository.findOne({ user: user, status: true })
    if (!time) throw new Error("체크인 정보가 DB에 생성되지않았습니다. 관리자에게 문의해주세요.")

    const date = Date.now() + (1000 * 60 * 60 * 9)
    time.endTime = new Date(date)
    time.status = false
    await this.timeRepository.save(time)
    return time
  }
}
