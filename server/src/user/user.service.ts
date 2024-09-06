import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/entity/mysql/User.entity';
import { JwtService } from 'src/modules/jwt/jwt.service';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAccount({ token }: { token: string }) {
    const prop = await this.jwtService.verifyAccessToken(token);
    const national_code = prop.national_code as string;
    const phone = prop.phone as string;
    const user = await this.userRepository.findOne({
      where: { phone, national_code },
      select: { name: true, family: true, profile: true },
    });
    return user;
  }
}
