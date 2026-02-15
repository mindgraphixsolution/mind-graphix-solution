import { PrismaService } from 'src/database/prisma.service';
import { IntegrationType } from '@prisma/client';
import { CreateIntegrationDto, UpdateIntegrationDto } from './dtos';
export declare class IntegrationsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateIntegrationDto): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.IntegrationType;
        isActive: boolean;
        apiKey: string | null;
        apiSecret: string | null;
        webhookUrl: string | null;
        webhookSecret: string | null;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        lastSyncAt: Date | null;
        syncError: string | null;
    }>;
    findAll(filter?: {
        type?: IntegrationType;
        isActive?: boolean;
    }): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.IntegrationType;
        isActive: boolean;
        apiKey: string | null;
        apiSecret: string | null;
        webhookUrl: string | null;
        webhookSecret: string | null;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        lastSyncAt: Date | null;
        syncError: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.IntegrationType;
        isActive: boolean;
        apiKey: string | null;
        apiSecret: string | null;
        webhookUrl: string | null;
        webhookSecret: string | null;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        lastSyncAt: Date | null;
        syncError: string | null;
    }>;
    findByName(name: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.IntegrationType;
        isActive: boolean;
        apiKey: string | null;
        apiSecret: string | null;
        webhookUrl: string | null;
        webhookSecret: string | null;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        lastSyncAt: Date | null;
        syncError: string | null;
    }>;
    update(id: string, dto: UpdateIntegrationDto): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.IntegrationType;
        isActive: boolean;
        apiKey: string | null;
        apiSecret: string | null;
        webhookUrl: string | null;
        webhookSecret: string | null;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        lastSyncAt: Date | null;
        syncError: string | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.IntegrationType;
        isActive: boolean;
        apiKey: string | null;
        apiSecret: string | null;
        webhookUrl: string | null;
        webhookSecret: string | null;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        lastSyncAt: Date | null;
        syncError: string | null;
    }>;
    activate(id: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.IntegrationType;
        isActive: boolean;
        apiKey: string | null;
        apiSecret: string | null;
        webhookUrl: string | null;
        webhookSecret: string | null;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        lastSyncAt: Date | null;
        syncError: string | null;
    }>;
    deactivate(id: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.IntegrationType;
        isActive: boolean;
        apiKey: string | null;
        apiSecret: string | null;
        webhookUrl: string | null;
        webhookSecret: string | null;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        lastSyncAt: Date | null;
        syncError: string | null;
    }>;
    getStatus(id: string): Promise<{
        id: string;
        name: string;
        type: import("@prisma/client").$Enums.IntegrationType;
        isActive: boolean;
        lastSyncAt: Date | null;
        syncError: string | null;
    }>;
    registerWebhook(integrationId: string, webhookUrl: string, webhookSecret: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.IntegrationType;
        isActive: boolean;
        apiKey: string | null;
        apiSecret: string | null;
        webhookUrl: string | null;
        webhookSecret: string | null;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        lastSyncAt: Date | null;
        syncError: string | null;
    }>;
    removeWebhook(integrationId: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.IntegrationType;
        isActive: boolean;
        apiKey: string | null;
        apiSecret: string | null;
        webhookUrl: string | null;
        webhookSecret: string | null;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        lastSyncAt: Date | null;
        syncError: string | null;
    }>;
    logAction(integrationId: string, action: string, status: 'success' | 'failed' | 'pending', payload?: any, error?: string): Promise<{
        error: string | null;
        id: string;
        action: string;
        createdAt: Date;
        status: string;
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        integrationId: string;
    }>;
    getActionLogs(integrationId: string, limit?: number): Promise<{
        error: string | null;
        id: string;
        action: string;
        createdAt: Date;
        status: string;
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        integrationId: string;
    }[]>;
    syncWithStripe(integrationId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    syncWithHubSpot(integrationId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    syncWithMailchimp(integrationId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
