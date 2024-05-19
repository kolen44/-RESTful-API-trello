import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { User } from 'src/types/user.type';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async findOne(email: string) {
    if (!email) return new UnauthorizedException('Данный токен невалидный');
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user)
      throw new UnauthorizedException('Пользователь не найден с таким емайлом');
    return user;
  }

  async validateUser(email: string, password: string) {
    const user: any = await this.findOne(email);
    if (!user)
      return new UnauthorizedException('Данного пользователя не существует');
    const userPassword = user.password;
    const passwordIsMatch = await argon2.verify(userPassword, password);
    if (user && passwordIsMatch) {
      return user;
    }
    return new UnauthorizedException('Имя телефона или пароль неверны');
  }

  async findById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user)
      throw new NotFoundException('Пользователя с таким айди не найдено');
    const { password, ...other } = user;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return other;
  }

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (existUser)
      throw new BadRequestException(
        'Данный пользователь с таким номером телефона уже существует!',
      );

    const token = this.jwtService.sign({
      email: createUserDto.email,
    });
    const user = await this.userRepository.save({
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password),
    });

    return { ...user, token };
  }

  //Логин пароль не отдает в целях безопасности
  async login(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...other } = user;
    return {
      other,
      token: this.jwtService.sign({
        email: user.email,
      }),
    };
  }

  async delete(id: number) {
    const user: any = await this.findById(id);
    if (!user)
      return new UnauthorizedException(
        'Проверьте данные пользователя, так как сервер не может их найти',
      );
    return this.userRepository.delete(user.id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user: any = await this.findById(id);
    if (!user)
      return new UnauthorizedException(
        'Проверьте данные пользователя, так как сервер не может их найти',
      );
    return this.userRepository.update(user.id, updateUserDto);
  }
}
