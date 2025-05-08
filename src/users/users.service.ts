import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) { }

  async findUserByEmail(email: string) {
    return await this.prismaService.user.findFirst({ where: { email } });
  }

  async updateUser(data: any, user_id: any) {
    return await this.prismaService.user.update(
      {
        where: {
          id: +user_id
        }, data: data
      })
  }

  async getMe(user_id: any) {
    return await this.prismaService.user.findFirst({
      where: {
        id: +user_id
      }
    })
  }

  async create(data: any) {
    return await this.prismaService.user.create({ data: data })
  }

}
