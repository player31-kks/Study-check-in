import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, of, Observable } from 'rxjs';
import { User } from 'src/user/user.entity';
import { hash, compare } from 'bcrypt'

@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService) { }

  generateJWT(user: User): Observable<string> {
    return from(this.jwtService.signAsync({ name: user.name }))
  }

  hashPassword(password: string): Observable<string> {
    return from<string>(hash(password, 12))
  }

  comparePasswords(newPassword: string, passwordHash: string): Observable<any | boolean> {
    return from<any | boolean>(compare(newPassword, passwordHash))
  }
}
