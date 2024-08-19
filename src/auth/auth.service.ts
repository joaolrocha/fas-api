import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConsultorService } from '../consultor/consultor.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private consultorService: ConsultorService,
    private jwtService: JwtService,
  ) {}

  async validateConsultor(email: string, password: string): Promise<any> {
    this.logger.log(`Validando consultor com email: ${email}`);
    const consultor = await this.consultorService.findOneByEmail(email, true);
    
    if (consultor) {
      this.logger.log(`Hash de senha armazenado: ${consultor.password}`);
      const isPasswordValid = await bcrypt.compare(password, consultor.password);
      this.logger.log(`Senha válida: ${isPasswordValid}`);
      
      if (isPasswordValid) {
        this.logger.log(`Consultor validado com sucesso: ${consultor.nomeCompleto}`);
        const { password, ...result } = consultor;
        return result;
      } else {
        this.logger.warn(`Senha inválida para o consultor com email: ${email}`);
        throw new UnauthorizedException('Credenciais inválidas');
      }
    } else {
      this.logger.warn(`Falha na validação do consultor com email: ${email}`);
      throw new UnauthorizedException('Credenciais inválidas');
    }
  }
  
  async login(consultor: any) {
    this.logger.log(`Gerando token JWT para o consultor: ${consultor.email}`);
    const payload = { email: consultor.email, sub: consultor.id };
    const token = this.jwtService.sign(payload);
    this.logger.log(`Token JWT gerado com sucesso`);
    return {
      access_token: token,
    };
  }
}
