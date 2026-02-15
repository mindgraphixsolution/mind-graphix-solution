"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let IntegrationsService = class IntegrationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    // ========================================================================
    // INTEGRATION MANAGEMENT
    // ========================================================================
    async create(dto) {
        const existingIntegration = await this.prisma.integration.findUnique({
            where: { name: dto.name },
        });
        if (existingIntegration) {
            throw new common_1.BadRequestException(`Integration '${dto.name}' already exists`);
        }
        return this.prisma.integration.create({
            data: dto,
        });
    }
    async findAll(filter) {
        return this.prisma.integration.findMany({
            where: {
                ...(filter?.type && { type: filter.type }),
                ...(filter?.isActive !== undefined && { isActive: filter.isActive }),
            },
        });
    }
    async findOne(id) {
        const integration = await this.prisma.integration.findUnique({
            where: { id },
        });
        if (!integration) {
            throw new common_1.NotFoundException(`Integration with ID '${id}' not found`);
        }
        return integration;
    }
    async findByName(name) {
        const integration = await this.prisma.integration.findUnique({
            where: { name },
        });
        if (!integration) {
            throw new common_1.NotFoundException(`Integration '${name}' not found`);
        }
        return integration;
    }
    async update(id, dto) {
        const integration = await this.findOne(id);
        return this.prisma.integration.update({
            where: { id },
            data: dto,
        });
    }
    async delete(id) {
        await this.findOne(id);
        return this.prisma.integration.delete({
            where: { id },
        });
    }
    // ========================================================================
    // ACTIVATION & STATUS
    // ========================================================================
    async activate(id) {
        const integration = await this.findOne(id);
        if (!integration.apiKey || !integration.apiSecret) {
            throw new common_1.BadRequestException('API credentials are required before activation');
        }
        return this.prisma.integration.update({
            where: { id },
            data: { isActive: true },
        });
    }
    async deactivate(id) {
        await this.findOne(id);
        return this.prisma.integration.update({
            where: { id },
            data: { isActive: false },
        });
    }
    async getStatus(id) {
        const integration = await this.findOne(id);
        return {
            id: integration.id,
            name: integration.name,
            type: integration.type,
            isActive: integration.isActive,
            lastSyncAt: integration.lastSyncAt,
            syncError: integration.syncError,
        };
    }
    // ========================================================================
    // WEBHOOK MANAGEMENT
    // ========================================================================
    async registerWebhook(integrationId, webhookUrl, webhookSecret) {
        await this.findOne(integrationId);
        return this.prisma.integration.update({
            where: { id: integrationId },
            data: {
                webhookUrl,
                webhookSecret,
            },
        });
    }
    async removeWebhook(integrationId) {
        await this.findOne(integrationId);
        return this.prisma.integration.update({
            where: { id: integrationId },
            data: {
                webhookUrl: null,
                webhookSecret: null,
            },
        });
    }
    // ========================================================================
    // LOGGING
    // ========================================================================
    async logAction(integrationId, action, status, payload, error) {
        await this.findOne(integrationId);
        const log = await this.prisma.integrationLog.create({
            data: {
                integrationId,
                action,
                status,
                payload: payload || null,
                error: error || null,
            },
        });
        // Update integration sync timestamp on success
        if (status === 'success') {
            await this.prisma.integration.update({
                where: { id: integrationId },
                data: {
                    lastSyncAt: new Date(),
                    syncError: null,
                },
            });
        }
        else if (status === 'failed') {
            await this.prisma.integration.update({
                where: { id: integrationId },
                data: {
                    syncError: error || 'Unknown error',
                },
            });
        }
        return log;
    }
    async getActionLogs(integrationId, limit = 50) {
        await this.findOne(integrationId);
        return this.prisma.integrationLog.findMany({
            where: { integrationId },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });
    }
    // ========================================================================
    // INTEGRATION PROVIDERS (Stripe, HubSpot, Mailchimp, etc.)
    // ========================================================================
    async syncWithStripe(integrationId) {
        try {
            const integration = await this.findOne(integrationId);
            if (integration.name !== 'stripe') {
                throw new common_1.BadRequestException('This method is for Stripe only');
            }
            // TODO: Implement actual Stripe sync logic
            await this.logAction(integrationId, 'sync', 'success', { syncedAt: new Date() });
            return { success: true, message: 'Stripe sync completed' };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            await this.logAction(integrationId, 'sync', 'failed', null, errorMessage);
            throw error;
        }
    }
    async syncWithHubSpot(integrationId) {
        try {
            const integration = await this.findOne(integrationId);
            if (integration.name !== 'hubspot') {
                throw new common_1.BadRequestException('This method is for HubSpot only');
            }
            // TODO: Implémenter la logique de sync réelle avec HubSpot
            await this.logAction(integrationId, 'sync', 'success', { syncedAt: new Date() });
            return { success: true, message: 'HubSpot sync completed' };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            await this.logAction(integrationId, 'sync', 'failed', null, errorMessage);
            throw error;
        }
    }
    async syncWithMailchimp(integrationId) {
        try {
            const integration = await this.findOne(integrationId);
            if (integration.name !== 'mailchimp') {
                throw new common_1.BadRequestException('This method is for Mailchimp only');
            }
            // TODO: Implémenter la logique de sync réelle avec Mailchimp
            await this.logAction(integrationId, 'sync', 'success', { syncedAt: new Date() });
            return { success: true, message: 'Mailchimp sync completed' };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            await this.logAction(integrationId, 'sync', 'failed', null, errorMessage);
            throw error;
        }
    }
};
exports.IntegrationsService = IntegrationsService;
exports.IntegrationsService = IntegrationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], IntegrationsService);
