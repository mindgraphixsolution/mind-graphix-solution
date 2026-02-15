import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import {
  CreateServiceDto,
  CreateTeamMemberDto,
  CreatePortfolioItemDto,
  CreateTestimonialDto,
  CreateHeroSectionDto,
  CreateStatDto,
  CreateFAQDto,
  CreatePartnerDto,
  CreateBlogPostDto,
} from './dtos';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  // --- Hero Section ---
  async findHero() {
    return (this.prisma as any).heroSection.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateHero(dto: CreateHeroSectionDto) {
    const hero = await this.findHero();
    if (hero) {
      return (this.prisma as any).heroSection.update({
        where: { id: hero.id },
        data: dto,
      });
    }
    return (this.prisma as any).heroSection.create({ data: dto });
  }

  // --- Stats ---
  async findAllStats() {
    return (this.prisma as any).stat.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  async createStat(dto: CreateStatDto) {
    return (this.prisma as any).stat.create({ data: dto });
  }

  // --- Services ---
  async findAllServices() {
    return (this.prisma as any).service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  async createService(dto: CreateServiceDto) {
    return (this.prisma as any).service.create({ data: dto });
  }

  // --- Team Members ---
  async findAllTeamMembers() {
    return (this.prisma as any).teamMember.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  async createTeamMember(dto: CreateTeamMemberDto) {
    return (this.prisma as any).teamMember.create({ data: dto });
  }

  // --- Portfolio Items ---
  async findAllPortfolioItems() {
    return (this.prisma as any).portfolioItem.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  async createPortfolioItem(dto: CreatePortfolioItemDto) {
    return (this.prisma as any).portfolioItem.create({ data: dto });
  }

  // --- Testimonials ---
  async findAllTestimonials() {
    return (this.prisma as any).testimonial.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createTestimonial(dto: CreateTestimonialDto) {
    return (this.prisma as any).testimonial.create({ data: dto });
  }

  // --- FAQ ---
  async findAllFAQs() {
    return (this.prisma as any).fAQ.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  async createFAQ(dto: CreateFAQDto) {
    return (this.prisma as any).fAQ.create({ data: dto });
  }

  // --- Partners ---
  async findAllPartners() {
    return (this.prisma as any).partner.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  async createPartner(dto: CreatePartnerDto) {
    return (this.prisma as any).partner.create({ data: dto });
  }

  // --- Blog Posts ---
  async findAllBlogPosts() {
    return (this.prisma as any).blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findBlogPostBySlug(slug: string) {
    return (this.prisma as any).blogPost.findUnique({
      where: { slug },
    });
  }

  async createBlogPost(dto: CreateBlogPostDto) {
    return (this.prisma as any).blogPost.create({ data: dto });
  }
}
