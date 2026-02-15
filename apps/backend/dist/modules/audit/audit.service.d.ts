import { PrismaService } from 'src/database/prisma.service';
import { AuditAction } from '@prisma/client';
export declare class AuditService {
    private prisma;
    constructor(prisma: PrismaService);
    log(data: {
        action: AuditAction;
        resource: string;
        resourceId?: string;
        userId: string;
        changes?: any;
        ipAddress?: string;
        userAgent?: string;
    }): Promise<{
        id: string;
        action: import("@prisma/client").$Enums.AuditAction;
        resource: string;
        resourceId: string | null;
        changes: import("@prisma/client/runtime/library").JsonValue | null;
        ipAddress: string | null;
        userAgent: string | null;
        createdAt: Date;
        userId: string;
    }>;
    getLogs(filter: {
        userId?: string;
        resource?: string;
        action?: AuditAction;
    }): Promise<({
        user: {
            email: string;
            firstName: string;
            lastName: string;
        };
    } & {
        id: string;
        action: import("@prisma/client").$Enums.AuditAction;
        resource: string;
        resourceId: string | null;
        changes: import("@prisma/client/runtime/library").JsonValue | null;
        ipAddress: string | null;
        userAgent: string | null;
        createdAt: Date;
        userId: string;
    })[]>;
}
