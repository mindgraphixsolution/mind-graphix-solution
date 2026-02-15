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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const integrations_service_1 = require("./integrations.service");
const dtos_1 = require("./dtos");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const client_1 = require("@prisma/client");
let IntegrationsController = class IntegrationsController {
    constructor(integrationService) {
        this.integrationService = integrationService;
    }
    async create(dto) {
        return this.integrationService.create(dto);
    }
    async findAll(type, isActive) {
        return this.integrationService.findAll({
            type,
            isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
        });
    }
    async findOne(id) {
        return this.integrationService.findOne(id);
    }
    async findByName(name) {
        return this.integrationService.findByName(name);
    }
    async update(id, dto) {
        return this.integrationService.update(id, dto);
    }
    async delete(id) {
        return this.integrationService.delete(id);
    }
    // ========================================================================
    // ACTIVATION & STATUS
    // ========================================================================
    async activate(id) {
        return this.integrationService.activate(id);
    }
    async deactivate(id) {
        return this.integrationService.deactivate(id);
    }
    async getStatus(id) {
        return this.integrationService.getStatus(id);
    }
    // ========================================================================
    // WEBHOOK MANAGEMENT
    // ========================================================================
    async registerWebhook(id, body) {
        return this.integrationService.registerWebhook(id, body.webhookUrl, body.webhookSecret);
    }
    async removeWebhook(id) {
        return this.integrationService.removeWebhook(id);
    }
    // ========================================================================
    // LOGGING
    // ========================================================================
    async getActionLogs(id, limit) {
        return this.integrationService.getActionLogs(id, limit || 50);
    }
    // ========================================================================
    // SYNC OPERATIONS
    // ========================================================================
    async syncStripe(id) {
        return this.integrationService.syncWithStripe(id);
    }
    async syncHubSpot(id) {
        return this.integrationService.syncWithHubSpot(id);
    }
    async syncMailchimp(id) {
        return this.integrationService.syncWithMailchimp(id);
    }
};
exports.IntegrationsController = IntegrationsController;
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new integration' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Integration created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateIntegrationDto]),
    __metadata("design:returntype", Promise)
], IntegrationsController.prototype, "create", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get all integrations' }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false, enum: client_1.IntegrationType }),
    (0, swagger_1.ApiQuery)({ name: 'isActive', required: false, type: Boolean }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return integrations list' }),
    __param(0, (0, common_1.Query)('type')),
    __param(1, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], IntegrationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get an integration by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return integration data' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IntegrationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)('by-name/:name'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get an integration by name' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return integration data' }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IntegrationsController.prototype, "findByName", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Update an integration' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Integration updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateIntegrationDto]),
    __metadata("design:returntype", Promise)
], IntegrationsController.prototype, "update", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an integration' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Integration deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IntegrationsController.prototype, "delete", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Post)(':id/activate'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Activate an integration' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Integration activated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IntegrationsController.prototype, "activate", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Post)(':id/deactivate'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Deactivate an integration' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Integration deactivated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IntegrationsController.prototype, "deactivate", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)(':id/status'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get the status of an integration' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return integration status' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IntegrationsController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Post)(':id/webhook'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], IntegrationsController.prototype, "registerWebhook", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Delete)(':id/webhook'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IntegrationsController.prototype, "removeWebhook", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)(':id/logs'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], IntegrationsController.prototype, "getActionLogs", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Post)(':id/sync/stripe'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IntegrationsController.prototype, "syncStripe", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Post)(':id/sync/hubspot'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IntegrationsController.prototype, "syncHubSpot", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Post)(':id/sync/mailchimp'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IntegrationsController.prototype, "syncMailchimp", null);
exports.IntegrationsController = IntegrationsController = __decorate([
    (0, swagger_1.ApiTags)('Integrations'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('integrations'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [integrations_service_1.IntegrationsService])
], IntegrationsController);
