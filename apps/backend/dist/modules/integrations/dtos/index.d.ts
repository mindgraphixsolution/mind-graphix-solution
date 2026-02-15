import { IntegrationType } from '@prisma/client';
export declare class CreateIntegrationDto {
    name: string;
    type: IntegrationType;
    apiKey?: string;
    apiSecret?: string;
    webhookUrl?: string;
    webhookSecret?: string;
    isActive?: boolean;
    config?: any;
}
export declare class UpdateIntegrationDto {
    apiKey?: string;
    apiSecret?: string;
    webhookUrl?: string;
    webhookSecret?: string;
    isActive?: boolean;
    config?: any;
}
