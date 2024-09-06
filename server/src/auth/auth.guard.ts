import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { UserEntity } from 'src/modules/entity/mysql/User.entity';
import { EMessageHttpException } from 'src/modules/enum/message-http-exception.enum';
import { ERoleUser } from 'src/modules/enum/role-user.enum';
import { JwtService } from 'src/modules/jwt/jwt.service';
import { hashPassword } from 'src/modules/utils/hash';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}

@Injectable()
export class SignUpGuard implements CanActivate {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { national_code, phone }: { national_code: string; phone: string } =
      request.body;
    if (national_code === undefined && phone === undefined) {
      return true;
    }
    const find = await this.userRepository.findOne({
      where: { national_code, phone },
    });
    if (find) {
      throw new HttpException(
        EMessageHttpException.USER_FOUND,
        HttpStatus.BAD_GATEWAY,
      );
    }
    return true;
  }
}

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { national_code, phone }: { national_code: string; phone: string } =
      request.body;
    const find = await this.userRepository.findOne({
      where: { national_code, phone },
    });
    if (national_code === undefined && phone === undefined) {
      return true;
    }
    if (!find) {
      throw new HttpException(
        EMessageHttpException.USER_NOT_FOUND,
        HttpStatus.BAD_GATEWAY,
      );
    }
    return true;
  }
}

@Injectable()
export class ResetPasswordGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const {
      old_password,
      new_password,
    }: {
      old_password: string;
      new_password: string;
    } = request.body;
    const { token }: { token?: string } = request.query;
    if (new_password === undefined && old_password === undefined) {
      return true;
    }
    const prop = await this.jwtService.verifyAccessToken(token);
    const national_code = prop.national_code as string | undefined;
    const phone = prop.phone as string | undefined;
    const find = await this.userRepository.findOne({
      where: { national_code, phone },
    });
    if (!find) {
      throw new HttpException(
        EMessageHttpException.USER_NOT_FOUND,
        HttpStatus.BAD_GATEWAY,
      );
    }
    const key = this.configService.get('App.token_hash_password');
    const hashPass = hashPassword(old_password, key);
    if (hashPass !== find.password) {
      throw new HttpException(
        EMessageHttpException.PASSWORD_INCORRECT,
        HttpStatus.BAD_GATEWAY,
      );
    }
    return true;
  }
}

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { token }: { token?: string } = request.params;
    if (!token)
      throw new HttpException(
        EMessageHttpException.TOKEN_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    else {
      try {
        await this.jwtService.verifyRefreshToken(token);
      } catch (error) {
        throw new HttpException(
          EMessageHttpException.LOGIN_AGAIN,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return true;
  }
}

@Injectable()
export class CheckIsExpiresTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { token }: { token?: string } = request.query;
    if (!token)
      throw new HttpException(
        EMessageHttpException.TOKEN_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    else {
      try {
        await this.jwtService.verifyAccessToken(token);
        throw new HttpException(
          EMessageHttpException.TOKEN_IS_NOT_EXPIRES,
          HttpStatus.BAD_REQUEST,
        );
      } catch (error) {
        return true;
      }
    }
  }
}

@Injectable()
export class CheckNotExpiresTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { token }: { token?: string } = request.query;
    if (!token)
      throw new HttpException(
        EMessageHttpException.TOKEN_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    else {
      try {
        await this.jwtService.verifyAccessToken(token);
      } catch (error) {
        throw new HttpException(
          EMessageHttpException.LOGIN_AGAIN,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return true;
  }
}

@Injectable()
export class CheckAdminGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { token }: { token?: string } = request.query;
    const prop = await this.jwtService.verifyAccessToken(token);
    const national_code = prop.national_code as string | undefined;
    const phone = prop.phone as string | undefined;
    if (!national_code && !phone) {
      throw new HttpException(
        EMessageHttpException.LOGIN_AGAIN,
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userRepository.findOne({
      where: { phone, national_code },
      relations: { rolesUser: { role: true } },
    });
    if (!user) {
      throw new HttpException(
        EMessageHttpException.USER_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const roleUser = user.rolesUser.find(
        (a) => a.role.role_name === ERoleUser.ADMIN,
      );
      if (!roleUser) {
        throw new HttpException(
          EMessageHttpException.ACCESS_DENIED,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return true;
  }
}

@Injectable()
export class CheckWaiterGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { token }: { token?: string } = request.query;
    const prop = await this.jwtService.verifyAccessToken(token);
    const national_code = prop.national_code as string | undefined;
    const phone = prop.phone as string | undefined;
    if (!national_code && !phone) {
      throw new HttpException(
        EMessageHttpException.LOGIN_AGAIN,
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userRepository.findOne({
      where: { phone, national_code },
      relations: { rolesUser: { role: true } },
    });
    if (!user) {
      throw new HttpException(
        EMessageHttpException.USER_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const roleUser = user.rolesUser.find(
        (a) =>
          a.role.role_name === ERoleUser.ADMIN ||
          a.role.role_name === ERoleUser.WAITER,
      );
      if (!roleUser) {
        throw new HttpException(
          EMessageHttpException.ACCESS_DENIED,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return true;
  }
}

@Injectable()
export class CheckExistAccountGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { token }: { token?: string } = request.query;
    const prop = await this.jwtService.verifyAccessToken(token);
    const national_code = prop.national_code as string | undefined;
    const phone = prop.phone as string | undefined;
    if (!national_code && !phone) {
      throw new HttpException(
        EMessageHttpException.LOGIN_AGAIN,
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userRepository.findOne({
      where: { phone, national_code },
    });
    if (!user) {
      throw new HttpException(
        EMessageHttpException.USER_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }
}
