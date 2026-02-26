import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dtos';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
    login(dto: LoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
    refresh(refreshToken: string, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(body: {
        userId: string;
        refreshToken: string;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
}
