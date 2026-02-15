import { Controller, Get, Post, Put, Body, UseGuards, Version } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ContentService } from './content.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { 
  CreateServiceDto, 
  CreateTeamMemberDto, 
  CreatePortfolioItemDto, 
  CreateTestimonialDto,
  CreateHeroSectionDto,
  CreateStatDto,
  CreateFAQDto,
  CreatePartnerDto,
  CreateBlogPostDto
} from './dtos';

@ApiTags('Content')
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  // --- Hero Section ---
  @Version('1')
  @Get('hero')
  @ApiOperation({ summary: 'Get hero section content' })
  @ApiResponse({ status: 200, description: 'Return hero section data' })
  async getHero() {
    return this.contentService.findHero();
  }

  @Version('1')
  @Put('hero')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update hero section content' })
  @ApiResponse({ status: 200, description: 'Hero section updated successfully' })
  async updateHero(@Body() dto: CreateHeroSectionDto) {
    return this.contentService.updateHero(dto);
  }

  // --- Stats ---
  @Version('1')
  @Get('stats')
  @ApiOperation({ summary: 'Get all statistics' })
  @ApiResponse({ status: 200, description: 'Return all stats' })
  async getAllStats() {
    return this.contentService.findAllStats();
  }

  @Version('1')
  @Post('stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new statistic' })
  @ApiResponse({ status: 201, description: 'Stat created successfully' })
  async createStat(@Body() dto: CreateStatDto) {
    return this.contentService.createStat(dto);
  }

  // --- Services ---
  @Version('1')
  @Get('services')
  @ApiOperation({ summary: 'Get all services' })
  @ApiResponse({ status: 200, description: 'Return all services' })
  async getAllServices() {
    return this.contentService.findAllServices();
  }

  @Version('1')
  @Post('services')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new service' })
  @ApiResponse({ status: 201, description: 'Service created successfully' })
  async createService(@Body() dto: CreateServiceDto) {
    return this.contentService.createService(dto);
  }

  // --- Team Members ---
  @Version('1')
  @Get('team')
  @ApiOperation({ summary: 'Get all team members' })
  @ApiResponse({ status: 200, description: 'Return all team members' })
  async getAllTeamMembers() {
    return this.contentService.findAllTeamMembers();
  }

  @Version('1')
  @Post('team')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a new team member' })
  @ApiResponse({ status: 201, description: 'Team member added successfully' })
  async createTeamMember(@Body() dto: CreateTeamMemberDto) {
    return this.contentService.createTeamMember(dto);
  }

  // --- Portfolio ---
  @Version('1')
  @Get('portfolio')
  @ApiOperation({ summary: 'Get all portfolio items' })
  @ApiResponse({ status: 200, description: 'Return all portfolio items' })
  async getAllPortfolioItems() {
    return this.contentService.findAllPortfolioItems();
  }

  @Version('1')
  @Post('portfolio')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a new portfolio item' })
  @ApiResponse({ status: 201, description: 'Portfolio item added successfully' })
  async createPortfolioItem(@Body() dto: CreatePortfolioItemDto) {
    return this.contentService.createPortfolioItem(dto);
  }

  // --- Testimonials ---
  @Version('1')
  @Get('testimonials')
  @ApiOperation({ summary: 'Get all testimonials' })
  @ApiResponse({ status: 200, description: 'Return all testimonials' })
  async getAllTestimonials() {
    return this.contentService.findAllTestimonials();
  }

  @Version('1')
  @Post('testimonials')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a new testimonial' })
  @ApiResponse({ status: 201, description: 'Testimonial added successfully' })
  async createTestimonial(@Body() dto: CreateTestimonialDto) {
    return this.contentService.createTestimonial(dto);
  }

  // --- FAQ ---
  @Version('1')
  @Get('faq')
  @ApiOperation({ summary: 'Get all FAQ items' })
  @ApiResponse({ status: 200, description: 'Return all FAQ items' })
  async getAllFAQs() {
    return this.contentService.findAllFAQs();
  }

  @Version('1')
  @Post('faq')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a new FAQ item' })
  @ApiResponse({ status: 201, description: 'FAQ item added successfully' })
  async createFAQ(@Body() dto: CreateFAQDto) {
    return this.contentService.createFAQ(dto);
  }

  // --- Partners ---
  @Version('1')
  @Get('partners')
  @ApiOperation({ summary: 'Get all partners' })
  @ApiResponse({ status: 200, description: 'Return all partners' })
  async getAllPartners() {
    return this.contentService.findAllPartners();
  }

  @Version('1')
  @Post('partners')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a new partner' })
  @ApiResponse({ status: 201, description: 'Partner added successfully' })
  async createPartner(@Body() dto: CreatePartnerDto) {
    return this.contentService.createPartner(dto);
  }

  // --- Blog ---
  @Version('1')
  @Get('blog')
  @ApiOperation({ summary: 'Get all blog posts' })
  @ApiResponse({ status: 200, description: 'Return all blog posts' })
  async getAllBlogPosts() {
    return this.contentService.findAllBlogPosts();
  }

  @Version('1')
  @Post('blog')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new blog post' })
  @ApiResponse({ status: 201, description: 'Blog post created successfully' })
  async createBlogPost(@Body() dto: CreateBlogPostDto) {
    return this.contentService.createBlogPost(dto);
  }
}
