import { Body, Controller, Get, Inject, Patch, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
@Controller('auth')
export class AuthController {
    constructor(
        @Inject(AuthService)
        private authService: AuthService
    ) { }

    @Post('register')
    async register(
        @Res({ passthrough: true }) response: Response,
        @Body() registerDto: RegisterDto
    ) {
        const result = await this.authService.register(registerDto)
        response.cookie('QUIZ_USER', result.token, { httpOnly: true })
        return { ...result.user }
    }

    @Post('login')
    async login(
        @Res({ passthrough: true }) response: Response,
        @Body() loginDto: LoginDto
    ) {
        const token = await this.authService.login(loginDto)
        response.cookie('QUIZ_USER', token, { httpOnly: true })
        return { token }
    }

    @Patch('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('QUIZ_USER')
        return
    }

    @Get('me')
    async getMe(@Req() request: Request) {
        const token = request.cookies['QUIZ_USER']
        if (!token) throw new UnauthorizedException();
        const me = await this.authService.getMe(token)
        return me
    }
}
