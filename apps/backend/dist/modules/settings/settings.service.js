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
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let SettingsService = class SettingsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSetting(key) {
        return this.prisma.setting.findUnique({
            where: { key },
        });
    }
    async updateSetting(key, dto) {
        return this.prisma.setting.upsert({
            where: { key },
            update: { value: dto.value },
            create: { key, value: dto.value },
        });
    }
    async getAllSettings() {
        return this.prisma.setting.findMany({
            where: { isPublic: true },
            orderBy: { key: 'asc' },
        });
    }
    async getSiteConfig() {
        const config = await this.prisma.siteConfig.findUnique({
            where: { id: 'default' },
        });
        if (!config) {
            // Create default config
            return this.prisma.siteConfig.create({
                data: {
                    id: 'default',
                    siteName: 'Mind Graphix',
                    siteUrl: process.env.SITE_URL || 'http://localhost:3000',
                },
            });
        }
        return config;
    }
    async updateSiteConfig(dto) {
        return this.prisma.siteConfig.upsert({
            where: { id: 'default' },
            update: dto,
            create: {
                id: 'default',
                siteName: dto.siteName || 'Mind Graphix',
                siteUrl: dto.siteUrl || process.env.SITE_URL || 'http://localhost:3000',
                ...dto,
            },
        });
    }
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SettingsService);
