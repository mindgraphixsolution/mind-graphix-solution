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
exports.ContentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let ContentService = class ContentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    // --- Hero Section ---
    async findHero() {
        return this.prisma.heroSection.findFirst({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateHero(dto) {
        const hero = await this.findHero();
        if (hero) {
            return this.prisma.heroSection.update({
                where: { id: hero.id },
                data: dto,
            });
        }
        return this.prisma.heroSection.create({ data: dto });
    }
    // --- Stats ---
    async findAllStats() {
        return this.prisma.stat.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' },
        });
    }
    async createStat(dto) {
        return this.prisma.stat.create({ data: dto });
    }
    // --- Services ---
    async findAllServices() {
        return this.prisma.service.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' },
        });
    }
    async createService(dto) {
        return this.prisma.service.create({ data: dto });
    }
    // --- Team Members ---
    async findAllTeamMembers() {
        return this.prisma.teamMember.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' },
        });
    }
    async createTeamMember(dto) {
        return this.prisma.teamMember.create({ data: dto });
    }
    // --- Portfolio Items ---
    async findAllPortfolioItems() {
        return this.prisma.portfolioItem.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' },
        });
    }
    async createPortfolioItem(dto) {
        return this.prisma.portfolioItem.create({ data: dto });
    }
    // --- Testimonials ---
    async findAllTestimonials() {
        return this.prisma.testimonial.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async createTestimonial(dto) {
        return this.prisma.testimonial.create({ data: dto });
    }
    // --- FAQ ---
    async findAllFAQs() {
        return this.prisma.fAQ.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' },
        });
    }
    async createFAQ(dto) {
        return this.prisma.fAQ.create({ data: dto });
    }
    // --- Partners ---
    async findAllPartners() {
        return this.prisma.partner.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' },
        });
    }
    async createPartner(dto) {
        return this.prisma.partner.create({ data: dto });
    }
    // --- Blog Posts ---
    async findAllBlogPosts() {
        return this.prisma.blogPost.findMany({
            where: { published: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findBlogPostBySlug(slug) {
        return this.prisma.blogPost.findUnique({
            where: { slug },
        });
    }
    async createBlogPost(dto) {
        return this.prisma.blogPost.create({ data: dto });
    }
};
exports.ContentService = ContentService;
exports.ContentService = ContentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContentService);
