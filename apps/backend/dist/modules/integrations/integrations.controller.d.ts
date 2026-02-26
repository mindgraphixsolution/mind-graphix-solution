import { IntegrationsService } from './integrations.service';
import { CreateIntegrationDto, UpdateIntegrationDto } from './dtos';
import { IntegrationType } from '@prisma/client';
export declare class IntegrationsController {
    private integrationService;
    constructor(integrationService: IntegrationsService);
    create(dto: CreateIntegrationDto): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.IntegrationType;
        isActive: boolean;
        apiKey: string | null;
        apiSecret: string | null;
        webhookUrl: string | null;
        webhookSecret: string | null;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        lastSyncAt: Date | null;
        syncError: string | null;
    }>;
    findAll(type?: IntegrationType, isActive?: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.IntegrationType;
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
        type: import(".prisma/client").$Enums.IntegrationType;
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
        type: import(".prisma/client").$Enums.IntegrationType;
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
        type: import(".prisma/client").$Enums.IntegrationType;
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
        type: import(".prisma/client").$Enums.IntegrationType;
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
        type: import(".prisma/client").$Enums.IntegrationType;
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
        type: import(".prisma/client").$Enums.IntegrationType;
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
        type: import(".prisma/client").$Enums.IntegrationType;
        isActive: boolean;
        lastSyncAt: Date | null;
        syncError: string | null;
    }>;
    registerWebhook(id: string, body: {
        webhookUrl: string;
        webhookSecret: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.IntegrationType;
        isActive: boolean;
        apiKey: string | null;
        apiSecret: string | null;
        webhookUrl: string | null;
        webhookSecret: string | null;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        lastSyncAt: Date | null;
        syncError: string | null;
    }>;
    removeWebhook(id: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.IntegrationType;
        isActive: boolean;
        apiKey: string | null;
        apiSecret: string | null;
        webhookUrl: string | null;
        webhookSecret: string | null;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        lastSyncAt: Date | null;
        syncError: string | null;
    }>;
    getActionLogs(id: string, limit?: number): Promise<{
        error: string | null;
        id: string;
        action: string;
        createdAt: Date;
        status: string;
        integrationId: string;
        payload: import("@prisma/client/runtime/library").JsonValue | null;
    }[]>;
    syncStripe(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    syncHubSpot(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    syncMailchimp(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
