import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/modules/entity/mysql/Role.entity';
import { RoleUserEntity } from 'src/modules/entity/mysql/RoleUser.entity';
import { UserEntity } from 'src/modules/entity/mysql/User.entity';
import { ERoleUser } from 'src/modules/enum/role-user.enum';
import { JwtService } from 'src/modules/jwt/jwt.service';
import { hashPassword } from 'src/modules/utils/hash';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(RoleUserEntity)
    private readonly roleUserRepository: Repository<RoleUserEntity>,
  ) {}

  async setDefaultDb() {
    const roleAdmin = await this.roleRepository.findOne({
      where: { role_name: ERoleUser.ADMIN },
    });
    if (!roleAdmin) {
      const role = this.roleRepository.create({
        role_name: ERoleUser.ADMIN,
      });
      await this.roleRepository.save(role);
    }
    const roleBlogger = await this.roleRepository.findOne({
      where: { role_name: ERoleUser.BLOGGER },
    });
    if (!roleBlogger) {
      const role = this.roleRepository.create({
        role_name: ERoleUser.BLOGGER,
      });
      await this.roleRepository.save(role);
    }
    const roleWaiter = await this.roleRepository.findOne({
      where: { role_name: ERoleUser.WAITER },
    });
    if (!roleWaiter) {
      const role = this.roleRepository.create({
        role_name: ERoleUser.WAITER,
      });
      await this.roleRepository.save(role);
    }
    const key = this.configService.get('App.token_hash_password');
    const newPass = hashPassword('1234', key);
    const phone = '9353790881';
    const national_code = '98';
    const exiAccount = await this.userRepository.findOne({
      where: {
        phone,
        national_code,
      },
    });
    if (!exiAccount) {
      // create a account admin
      const newAccount = this.userRepository.create({
        password: newPass,
        phone,
        national_code,
      });
      const account = await this.userRepository.save(newAccount);
      // add role admin
      const roleAdmin = await this.roleRepository.findOne({
        where: { role_name: ERoleUser.ADMIN },
      });
      const newRoleUser = await this.roleUserRepository.create({
        user: account,
        role: roleAdmin,
      });
      await this.roleUserRepository.save(newRoleUser);
    }
    return {
      initial: true,
    };
  }

  async loginPassword({
    national_code,
    phone,
    password,
  }: {
    national_code: string;
    phone: string;
    password: string;
  }) {
    const key = this.configService.get('App.token_hash_password');
    const hashPass = hashPassword(password, key);
    const account = await this.userRepository.findOne({
      where: { phone, national_code },
      relations: { rolesUser: true },
    });
    if (account.password === hashPass) {
      const access_token = await this.jwtService.createAccessToken({
        phone,
        national_code,
        process: account.rolesUser.length,
      });
      const refresh_token = await this.jwtService.createRefreshToken({
        phone,
        national_code,
      });
      return { login: true, access_token, refresh_token };
    } else {
      return { login: false };
    }
  }

  async refreshToken({ token }: { token: string }) {
    const payload = await this.jwtService.verifyRefreshToken(token);
    const phone = payload.phone as string;
    const national_code = payload.national_code as string;
    const account = await this.userRepository.findOne({
      where: { phone, national_code },
      relations: { rolesUser: true },
    });
    const access_token = await this.jwtService.createAccessToken({
      phone,
      national_code,
      process: account.rolesUser.length,
    });
    const refresh_token = await this.jwtService.createRefreshToken({
      phone,
      national_code,
    });
    return { refresh: true, access_token, refresh_token };
  }
}
