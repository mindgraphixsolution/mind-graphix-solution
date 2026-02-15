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
exports.PagesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const client_1 = require("@prisma/client");
let PagesService = class PagesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, userId) {
        // Check if slug already exists
        const existingPage = await this.prisma.page.findUnique({
            where: { slug: dto.slug },
        });
        if (existingPage) {
            throw new common_1.BadRequestException(`Page with slug "${dto.slug}" already exists`);
        }
        return this.prisma.page.create({
            data: {
                title: dto.title,
                slug: dto.slug,
                description: dto.description,
                content: dto.content,
                status: dto.status || client_1.PageStatus.DRAFT,
                blocks: dto.blocks,
                metaTitle: dto.metaTitle || dto.title,
                metaDescription: dto.metaDescription,
                metaKeywords: dto.metaKeywords,
                createdBy: userId,
            },
        });
    }
    async findAll(skip = 0, take = 10) {
        return this.prisma.page.findMany({
            skip,
            take,
            orderBy: { createdAt: 'desc' },
            include: {
                creator: {
                    select: { id: true, firstName: true, lastName: true, email: true },
                },
            },
        });
    }
    async findBySlug(slug) {
        const page = await this.prisma.page.findUnique({
            where: { slug },
            include: {
                creator: {
                    select: { id: true, firstName: true, lastName: true },
                },
            },
        });
        if (!page) {
            throw new common_1.NotFoundException(`Page with slug "${slug}" not found`);
        }
        // Increment view count
        await this.prisma.page.update({
            where: { id: page.id },
            data: { viewCount: { increment: 1 } },
        });
        return page;
    }
    async findOne(id) {
        const page = await this.prisma.page.findUnique({
            where: { id },
            include: {
                creator: {
                    select: { id: true, firstName: true, lastName: true, email: true },
                },
                versions: {
                    orderBy: { createdAt: 'desc' },
                    take: 5,
                },
            },
        });
        if (!page) {
            throw new common_1.NotFoundException(`Page with ID ${id} not found`);
        }
        return page;
    }
    async update(id, dto, userId) {
        await this.findOne(id);
        // Create version history before updating
        const currentPage = await this.prisma.page.findUnique({
            where: { id },
            select: { title: true, content: true, blocks: true },
        });
        const latestVersion = await this.prisma.pageVersion.findFirst({
            where: { pageId: id },
            orderBy: { versionNumber: 'desc' },
        });
        const nextVersionNumber = (latestVersion?.versionNumber || 0) + 1;
        await this.prisma.pageVersion.create({
            data: {
                pageId: id,
                title: currentPage.title,
                content: currentPage.content,
                blocks: currentPage.blocks ? currentPage.blocks : null,
                versionNumber: nextVersionNumber,
                createdBy: userId,
            },
        });
        // Update page
        return this.prisma.page.update({
            where: { id },
            data: {
                ...dto,
                updatedAt: new Date(),
            },
            include: {
                creator: {
                    select: { id: true, firstName: true, lastName: true },
                },
            },
        });
    }
    async delete(id) {
        await this.findOne(id);
        return this.prisma.page.update({
            where: { id },
            data: { status: client_1.PageStatus.ARCHIVED },
        });
    }
    async publish(id, userId) {
        await this.findOne(id);
        return this.prisma.page.update({
            where: { id },
            data: {
                status: client_1.PageStatus.PUBLISHED,
                publishedAt: new Date(),
                publishedBy: userId,
            },
        });
    }
};
exports.PagesService = PagesService;
exports.PagesService = PagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PagesService);
