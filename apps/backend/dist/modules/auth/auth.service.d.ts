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
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/database/prisma.service';
import { AuditService } from '../audit/audit.service';
import { LoginDto, RegisterDto } from './dtos';
export declare class AuthService {
    private prisma;
    private jwtService;
    private configService;
    private auditService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService, auditService: AuditService);
    /**
     * Enregistrer un nouvel utilisateur
     * @param dto - Données d'enregistrement (email, password, firstName, lastName)
     * @returns Utilisateur créé + tokens JWT
     */
    register(dto: RegisterDto): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: import(".prisma/client").$Enums.UserRole;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: import(".prisma/client").$Enums.UserRole;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    generateTokens(userId: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshTokens(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: string, refreshToken: string): Promise<void>;
}
