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
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let MediaService = class MediaService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, userId) {
        return this.prisma.media.create({
            data: {
                name: dto.name,
                type: dto.type,
                mimeType: dto.mimeType,
                url: dto.url,
                thumbnailUrl: dto.thumbnailUrl,
                bucket: dto.bucket,
                key: dto.key,
                size: dto.size,
                width: dto.width,
                height: dto.height,
                duration: dto.duration,
                tags: dto.tags || [],
                description: dto.description,
                altText: dto.altText,
                uploadedBy: userId,
            },
        });
    }
    async findAll(skip = 0, take = 10, type) {
        return this.prisma.media.findMany({
            skip,
            take,
            where: type ? { type } : {},
            orderBy: { createdAt: 'desc' },
            include: {
                uploader: {
                    select: { id: true, firstName: true, lastName: true },
                },
            },
        });
    }
    async findOne(id) {
        const media = await this.prisma.media.findUnique({
            where: { id },
            include: {
                uploader: {
                    select: { id: true, firstName: true, lastName: true, email: true },
                },
            },
        });
        if (!media) {
            throw new common_1.NotFoundException(`Media with ID ${id} not found`);
        }
        return media;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.media.update({
            where: { id },
            data: {
                name: dto.name,
                description: dto.description,
                altText: dto.altText,
                tags: dto.tags,
            },
        });
    }
    async delete(id) {
        await this.findOne(id);
        return this.prisma.media.delete({
            where: { id },
        });
    }
    async search(query, take = 10) {
        return this.prisma.media.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } },
                    { tags: { hasSome: [query] } },
                ],
            },
            take,
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MediaService);
