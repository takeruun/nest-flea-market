import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { genSalt, hash, compare } from 'bcrypt';
import { CredentialsDto } from './dto/credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, status } = createUserDto;
    const salt = await genSalt();
    const hashPassword = await hash(password, salt);
    const user = this.usersRepository.create({
      username,
      password: hashPassword,
      status,
    });

    await this.usersRepository.save(user);

    return user;
  }

  async signIn(credentials: CredentialsDto): Promise<{
    accessToken: string;
  }> {
    const { username, password } = credentials;
    const user = await this.usersRepository.findOneBy({ username });

    if (user && (await compare(password, user.password))) {
      const payload = { id: user.id, username: user.username };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    }
    throw new UnauthorizedException('認証情報間違ってるで');
  }
}
