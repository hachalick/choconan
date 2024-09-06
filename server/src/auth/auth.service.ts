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

  async createRole(role_name: string) {
    const exiRoleUser = await this.roleRepository.findOne({
      where: { role_name },
    });
    if (!exiRoleUser) {
      const newRole = this.roleRepository.create({
        role_name,
      });
      await this.roleRepository.save(newRole);
    }
  }

  async createUser({
    password,
    national_code,
    phone,
    role_name,
  }: {
    password: string;
    national_code: string;
    phone: string;
    role_name: string;
  }) {
    const exiAccount = await this.userRepository.findOne({
      where: {
        phone,
        national_code,
      },
    });
    if (!exiAccount) {
      // create a account
      const newAccount = this.userRepository.create({
        password,
        phone,
        national_code,
      });
      const account = await this.userRepository.save(newAccount);
    }
    const account = await this.userRepository.findOne({
      where: { phone, national_code },
    });
    // add role
    const role = await this.roleRepository.findOne({
      where: { role_name },
    });
    const exiRoleUser = await this.roleUserRepository.findOne({
      where: { user: account, role: role },
    });
    if (!exiRoleUser) {
      const newRoleUser = this.roleUserRepository.create({
        user: account,
        role: role,
      });
      await this.roleUserRepository.save(newRoleUser);
    }
  }

  async setDefaultDb() {
    const key = this.configService.get('App.token_hash_password');
    const password = hashPassword('1234', key);
    const national_code = '98';
    await this.createRole(ERoleUser.ADMIN);
    await this.createRole(ERoleUser.BLOGGER);
    await this.createRole(ERoleUser.WAITER);
    await this.createUser({
      national_code,
      password,
      phone: '9353790881',
      role_name: ERoleUser.ADMIN,
    });
    await this.createUser({
      national_code,
      password,
      phone: '9123790881',
      role_name: ERoleUser.ADMIN,
    });
    await this.createUser({
      national_code,
      password,
      phone: '9127017624',
      role_name: ERoleUser.WAITER,
    });
    return {
      initial: true,
    };
  }

  async getRole({ token }: { token: string }) {
    const prop = await this.jwtService.verifyAccessToken(token);
    const national_code = prop.national_code as string;
    const phone = prop.phone as string;
    const account = await this.userRepository.findOne({
      where: { phone, national_code },
      relations: { rolesUser: { role: true } },
    });
    const roles = account.rolesUser.map((role) => role.role.role_name);
    return roles;
  }

  async signupPassword({
    national_code,
    phone,
    password,
  }: {
    national_code: string;
    phone: string;
    password: string;
  }) {}

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

  async updatePassword({
    new_password,
    token,
  }: {
    new_password: string;
    token: string;
  }) {
    const key = this.configService.get('App.token_hash_password');
    const hashPass = hashPassword(new_password, key);
    try {
      const prop = await this.jwtService.verifyAccessToken(token);
      const national_code = prop.national_code as string | undefined;
      const phone = prop.phone as string | undefined;
      await this.userRepository.update(
        { phone, national_code },
        { password: hashPass },
      );
      return { update: true };
    } catch (error) {
      return { update: false };
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
