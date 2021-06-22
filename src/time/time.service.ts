import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Hours } from './hours.entity';
import { Time } from './time.entity';

@Injectable()
export class TimeService {
  constructor(
    @InjectRepository(Time) private timeRepository: Repository<Time>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Hours) private hoursRepository: Repository<Hours>
  ) { }

  async checkIn(headers: any, name: string) {
    if (headers.user.name !== name) throw new Error("다른 사람은 체크인할 수 없습니다.")
    const user = await this.userRepository.findOne({ name: headers.user.name })
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
    return time
  }

  async checkOut(headers: any, name: string) {
    if (headers.user.name !== name) throw new Error("다른 사람은 체크아웃할 수 없습니다.")
    const user = await this.userRepository.findOne({ name: headers.user.name })
    if (!user) throw new Error("로그인 정보가 잘못되었습니다. 다시 로그인해주세요.")
    if (user.status === false) throw new Error("이미 체크아웃되어 있습니다.")
    user.status = false
    await this.userRepository.save(user)

    const time = await this.timeRepository.findOne({ user: user, status: true })
    if (!time) throw new Error("체크인 정보가 DB에 생성되지않았습니다. 관리자에게 문의해주세요.")

    const curr_time = Date.now() + (1000 * 60 * 60 * 9)
    time.endTime = new Date(curr_time)
    time.status = false
    await this.timeRepository.save(time)

    const date = time.endTime.toDateString()

    const hours = await this.hoursRepository.findOne({ user: user, date: date })
    if (!hours) {
      const newHours = new Hours()
      newHours.date = date
      newHours.time = time.endTime.getTime() - time.startTime.getTime()
      newHours.user = user
      await this.hoursRepository.save(newHours)
    } else {
      hours.time += (time.endTime.getTime() - time.startTime.getTime())
      await this.hoursRepository.save(hours)
    }
    return time
  }

  async getTotalTime() {
    // 요청할때마다 계산하지말고 나중에 스케쥴러로 돌려서 테이블에 따로 저장하는거 만들기
    const users = await this.userRepository.find({ relations: ["hours"] })
    const hours = await this.hoursRepository.find()

    const now = new Date().getTime() + (1000 * 60 * 60 * 9)
    const oneDay = new Date(now - (1000 * 60 * 60 * 24)).toDateString()
    const twoDays = new Date(now - (1000 * 60 * 60 * 24 * 2)).toDateString()
    const threeDays = new Date(now - (1000 * 60 * 60 * 24 * 3)).toDateString()
    const fourDays = new Date(now - (1000 * 60 * 60 * 24 * 4)).toDateString()
    const fiveDays = new Date(now - (1000 * 60 * 60 * 24 * 5)).toDateString()
    const sixDays = new Date(now - (1000 * 60 * 60 * 24 * 6)).toDateString()
    const sevenDays = new Date(now - (1000 * 60 * 60 * 24 * 7)).toDateString()

    const result = []
    for (let i = 0; i < users.length; i++) {
      let temp = [users[i].name, 0, 0, 0, 0, 0, 0, 0]
      for (let j = 0; j < users[i].hours.length; j++) {
        if (users[i].hours[j].date === oneDay) { temp[1] = users[i].hours[j].time }
        else if (users[i].hours[j].date === twoDays) { temp[2] = users[i].hours[j].time }
        else if (users[i].hours[j].date === threeDays) { temp[3] = users[i].hours[j].time }
        else if (users[i].hours[j].date === fourDays) { temp[4] = users[i].hours[j].time }
        else if (users[i].hours[j].date === fiveDays) { temp[5] = users[i].hours[j].time }
        else if (users[i].hours[j].date === sixDays) { temp[6] = users[i].hours[j].time }
        else if (users[i].hours[j].date === sevenDays) { temp[7] = users[i].hours[j].time }
      }
      result.push(temp)
    }
    return result
  }
}
