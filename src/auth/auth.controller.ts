import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { JwtGuard } from 'src/common/guard/jwt.guard';
import { updateDto } from './dto/update.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body);
  }

  @Post('/register')
  async register(@Body() body: registerDto) {
    return await this.authService.register(body)
  }

  @Get('/getMe')
  @UseGuards(JwtGuard)
  async getMe(@Req() request: Request) {
    //@ts-ignore
    const user_id: number = request.user.id
    return await this.authService.getMe(user_id)
  }

  @Put('/update') 
  @UseGuards(JwtGuard)
  async update(@Body() data: updateDto,@Req() request: Request) {
    //@ts-ignore
    const user_id: number = request.user.id
    return await this.authService.update(user_id,data)
  }
}
  