import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const consultor = await this.authService.validateConsultor(
      loginDto.email,
      loginDto.password,
    );
    return this.authService.login(consultor);
  }
}
