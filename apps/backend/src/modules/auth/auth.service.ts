/**
 * ============================================================================
 * 🔐 SERVICE D'AUTHENTIFICATION UTILISATEUR
 * ============================================================================
 * 
 * Ce service gère:
 * - L'enregistrement des utilisateurs
 * - La connexion/déconnexion  
 * - La génération et validation des tokens JWT
 * - La gestion des refresh tokens sécurisés
 * 
 * @author Mind Graphix Premium
 * @version 1.0.0
 */

import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/database/prisma.service';
import { AuditService } from '../audit/audit.service';
import { AuditAction } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { LoginDto, RegisterDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private auditService: AuditService,
  ) {}

  /**
   * Enregistrer un nouvel utilisateur
   * @param dto - Données d'enregistrement (email, password, firstName, lastName)
   * @returns Utilisateur créé + tokens JWT
   */
  async register(dto: RegisterDto) {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });

    const tokens = await this.generateTokens(user.id);

    await this.auditService.log({
      action: AuditAction.CREATE,
      resource: 'User',
      resourceId: user.id,
      userId: user.id,
    });

    return {
      user,
      tokens,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const tokens = await this.generateTokens(user.id);

    await this.auditService.log({
      action: AuditAction.LOGIN,
      resource: 'Auth',
      userId: user.id,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      tokens,
    };
  }

  async generateTokens(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    const payload = { 
      sub: userId,
      role: user?.role || 'VIEWER',
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    await this.prisma.session.create({
      data: {
        userId,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return { accessToken, refreshToken };
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);

      const session = await this.prisma.session.findUnique({
        where: { token: refreshToken },
      });

      if (!session || session.expiresAt < new Date()) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return this.generateTokens(payload.sub);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string, refreshToken: string) {
    await this.prisma.session.deleteMany({
      where: { userId, token: refreshToken },
    });
  }
}
