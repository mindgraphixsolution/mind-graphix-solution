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
exports.ContentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const content_service_1 = require("./content.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const client_1 = require("@prisma/client");
const dtos_1 = require("./dtos");
let ContentController = class ContentController {
    constructor(contentService) {
        this.contentService = contentService;
    }
    // --- Hero Section ---
    async getHero() {
        return this.contentService.findHero();
    }
    async updateHero(dto) {
        return this.contentService.updateHero(dto);
    }
    // --- Stats ---
    async getAllStats() {
        return this.contentService.findAllStats();
    }
    async createStat(dto) {
        return this.contentService.createStat(dto);
    }
    // --- Services ---
    async getAllServices() {
        return this.contentService.findAllServices();
    }
    async createService(dto) {
        return this.contentService.createService(dto);
    }
    // --- Team Members ---
    async getAllTeamMembers() {
        return this.contentService.findAllTeamMembers();
    }
    async createTeamMember(dto) {
        return this.contentService.createTeamMember(dto);
    }
    // --- Portfolio ---
    async getAllPortfolioItems() {
        return this.contentService.findAllPortfolioItems();
    }
    async createPortfolioItem(dto) {
        return this.contentService.createPortfolioItem(dto);
    }
    // --- Testimonials ---
    async getAllTestimonials() {
        return this.contentService.findAllTestimonials();
    }
    async createTestimonial(dto) {
        return this.contentService.createTestimonial(dto);
    }
    // --- FAQ ---
    async getAllFAQs() {
        return this.contentService.findAllFAQs();
    }
    async createFAQ(dto) {
        return this.contentService.createFAQ(dto);
    }
    // --- Partners ---
    async getAllPartners() {
        return this.contentService.findAllPartners();
    }
    async createPartner(dto) {
        return this.contentService.createPartner(dto);
    }
    // --- Blog ---
    async getAllBlogPosts() {
        return this.contentService.findAllBlogPosts();
    }
    async createBlogPost(dto) {
        return this.contentService.createBlogPost(dto);
    }
};
exports.ContentController = ContentController;
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)('hero'),
    (0, swagger_1.ApiOperation)({ summary: 'Get hero section content' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return hero section data' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getHero", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Put)('hero'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update hero section content' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Hero section updated successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateHeroSectionDto]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "updateHero", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all stats' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getAllStats", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Post)('stats'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new statistic' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Stat created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateStatDto]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "createStat", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)('services'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all services' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all services' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getAllServices", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Post)('services'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new service' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Service created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateServiceDto]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "createService", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)('team'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all team members' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all team members' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getAllTeamMembers", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Post)('team'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Add a new team member' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Team member added successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateTeamMemberDto]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "createTeamMember", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)('portfolio'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all portfolio items' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all portfolio items' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getAllPortfolioItems", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Post)('portfolio'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Add a new portfolio item' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Portfolio item added successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreatePortfolioItemDto]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "createPortfolioItem", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)('testimonials'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all testimonials' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all testimonials' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getAllTestimonials", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Post)('testimonials'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Add a new testimonial' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Testimonial added successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateTestimonialDto]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "createTestimonial", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)('faq'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all FAQ items' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all FAQ items' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getAllFAQs", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Post)('faq'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Add a new FAQ item' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'FAQ item added successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateFAQDto]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "createFAQ", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)('partners'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all partners' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all partners' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getAllPartners", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Post)('partners'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Add a new partner' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Partner added successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreatePartnerDto]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "createPartner", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)('blog'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all blog posts' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all blog posts' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getAllBlogPosts", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Post)('blog'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN, client_1.UserRole.EDITOR),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new blog post' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Blog post created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateBlogPostDto]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "createBlogPost", null);
exports.ContentController = ContentController = __decorate([
    (0, swagger_1.ApiTags)('Content'),
    (0, common_1.Controller)('content'),
    __metadata("design:paramtypes", [content_service_1.ContentService])
], ContentController);
