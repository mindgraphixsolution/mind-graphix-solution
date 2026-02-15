import { PrismaService } from 'src/database/prisma.service';
import { User, UserRole, UserStatus } from '@prisma/client';
export interface CreateUserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: UserRole;
}
export interface UpdateUserDto {
    email?: string;
    firstName?: string;
    lastName?: string;
    role?: UserRole;
    status?: UserStatus;
    avatar?: string;
    phone?: string;
    bio?: string;
}
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateUserDto): Promise<{
        id: string;
        createdAt: Date;
        email: string;
        firstName: string;
        lastName: string;
        role: import("@prisma/client").$Enums.UserRole;
        status: import("@prisma/client").$Enums.UserStatus;
    }>;
    findAll(skip?: number, take?: number): Promise<{
        id: string;
        createdAt: Date;
        email: string;
        firstName: string;
        lastName: string;
        role: import("@prisma/client").$Enums.UserRole;
        status: import("@prisma/client").$Enums.UserStatus;
        lastLoginAt: Date | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        email: string;
        firstName: string;
        lastName: string;
        role: import("@prisma/client").$Enums.UserRole;
        status: import("@prisma/client").$Enums.UserStatus;
        avatar: string | null;
        phone: string | null;
        bio: string | null;
        twoFactorEnabled: boolean;
        lastLoginAt: Date | null;
        updatedAt: Date;
    }>;
    update(id: string, dto: UpdateUserDto): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: import("@prisma/client").$Enums.UserRole;
        status: import("@prisma/client").$Enums.UserStatus;
        updatedAt: Date;
    }>;
    delete(id: string): Promise<{
        id: string;
        email: string;
        deletedAt: Date | null;
    }>;
    findByEmail(email: string): Promise<User | null>;
    updatePassword(userId: string, oldPassword: string, newPassword: string): Promise<void>;
}
