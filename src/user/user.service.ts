import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { from, throwError } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private authService: AuthService
  ) { }

  async createUser(userInfo: UserDto) {
    if (userInfo.name === '') throw new Error("이름을 작성해주세요.")
    const user = await this.userRepository.findOne({ name: userInfo.name })
    if (user) throw new Error("이미 존재하는 이름입니다. 이름을 살짝 바꿔주세요.")

    return this.authService.hashPassword(userInfo.password).pipe(
      switchMap((passwordHash: string) => {
        const curr_time = Date.now() + (1000 * 60 * 60 * 9)
        const newUser = new User()
        newUser.name = userInfo.name
        newUser.status = false
        newUser.createdAt = new Date(curr_time)
        newUser.password = passwordHash

        return from(this.userRepository.save(newUser)).pipe(
          map((user: User) => {
            const { password, ...result } = user
            return result
          }),
          catchError(err => throwError(err))
        )
      })
    )
    // const date = Date.now() + (1000 * 60 * 60 * 9)
    // const newUser = await this.userRepository.save({ ...userInfo, status: false, createdAt: new Date(date) });
    // return newUser;
  }

  validateUser(name: string, password: string) {
    return this.getUserByName(name).pipe(
      switchMap((user: User) => this.authService.comparePasswords(password, user.password).pipe(
        map((match: boolean) => {
          if (match) {
            const { password, ...result } = user
            return result
          } else {
            throw Error
          }
        })
      ))
    )
  }

  async login(userInfo: UserDto) {
    return (await this.validateUser(userInfo.name, userInfo.password)).pipe(
      switchMap((user: User) => {
        if (user) {
          return this.authService.generateJWT(user).pipe(map((jwt: string) => jwt))

        } else {
          return "Wrong Credentials"
        }
      })
    )
    // const user = await this.userRepository.findOne({ name: userInfo.name, password: userInfo.password })
    // if (!user) throw new Error("잘못된 이름이거나 비밀번호입니다.")

    // const token = this.jwtService.sign({ name: userInfo.name })
    // return token;
    // return true
  }

  async getUsers() {
    return from(this.userRepository.find()).pipe(
      map((users: User[]) => {
        users.forEach(function (v) { delete v.password })
        return users
      })
    )
    // const users = await this.userRepository.find()
    // return users;
  }

  getUserByName(name: string) {
    return from(this.userRepository.findOne({ name: name }))
  }

  async getUserById(id: string) {
    return from(this.userRepository.findOne(id)).pipe(
      map((user: User) => {
        const { password, ...result } = user
        return result
      })
    )
    // const user = await this.userRepository.findOne(id);
    // return user;
  }

}
