import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findUserByEmail(email);

    if (user?.password === password) {
      const { password, ...result } = user;
      
      const access_token = await this.jwtService.signAsync(result);

      return { access_token };
    }

    throw new UnauthorizedException();
  }

  async register(data: any) {
    const user: any = await this.usersService.findUserByEmail(data.email)

    if (user) {
      throw new BadRequestException('email is alredy exists')
    }
    const create: any = await this.usersService.create(data)
    const { password, ...result } = create
    
    const access_token = await this.jwtService.signAsync(result);
    
    return { access_token }
  }

  async getMe(id:number) {
    return await this.usersService.getMe(id)
  }

  async update(id: number,data:any) {
    return await this.usersService.updateUser(data,id)
  }
}
