import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/entity/mysql/User.entity';
import { RoleEntity } from 'src/modules/entity/mysql/Role.entity';
import { RoleUserEntity } from 'src/modules/entity/mysql/RoleUser.entity';
import { JwtModule } from 'src/modules/jwt/jwt.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleUserEntity, RoleEntity]),
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
