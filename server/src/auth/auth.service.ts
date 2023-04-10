import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { LoginDto, RegisterDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        @Inject(JwtService)
        private jwtService: JwtService
    ) { }

    async register(registerDto: RegisterDto): Promise<{ token: string, user: Pick<User, 'id' | 'username'> }> {
        const { username, password } = registerDto
        const existingUser = await this.userRepo.findOneBy({ username })
        if (existingUser) throw new HttpException({ auth: `${username} already exists` }, HttpStatus.CONFLICT)

        const newUser = new User()
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        Object.assign(newUser, { username, password: hashedPassword })

        const user = await this.userRepo.save(newUser)
        const token = await this.jwtService.signAsync({ user: { id: user.id, username: user.username } })
        return { token, user }
    }

    async login(loginDto: LoginDto): Promise<string> {
        const { username, password } = loginDto

        const user = await this.userRepo.findOneBy({ username });
        const isAuthorized = await bcrypt.compare(password, user.password)
        if (!isAuthorized) throw new UnauthorizedException()

        return await this.jwtService.signAsync({ user: { id: user.id, username: user.username } })
    }

    async getMe(jwt: string): Promise<Pick<User, 'id' | 'username'>> {
        const user = await this.jwtService.decode(jwt);
        return user as any
    }
}
