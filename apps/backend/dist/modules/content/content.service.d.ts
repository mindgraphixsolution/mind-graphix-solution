import { PrismaService } from 'src/database/prisma.service';
import { CreateServiceDto, CreateTeamMemberDto, CreatePortfolioItemDto, CreateTestimonialDto, CreateHeroSectionDto, CreateStatDto, CreateFAQDto, CreatePartnerDto, CreateBlogPostDto } from './dtos';
export declare class ContentService {
    private prisma;
    constructor(prisma: PrismaService);
    findHero(): Promise<any>;
    updateHero(dto: CreateHeroSectionDto): Promise<any>;
    findAllStats(): Promise<any>;
    createStat(dto: CreateStatDto): Promise<any>;
    findAllServices(): Promise<any>;
    createService(dto: CreateServiceDto): Promise<any>;
    findAllTeamMembers(): Promise<any>;
    createTeamMember(dto: CreateTeamMemberDto): Promise<any>;
    findAllPortfolioItems(): Promise<any>;
    createPortfolioItem(dto: CreatePortfolioItemDto): Promise<any>;
    findAllTestimonials(): Promise<any>;
    createTestimonial(dto: CreateTestimonialDto): Promise<any>;
    findAllFAQs(): Promise<any>;
    createFAQ(dto: CreateFAQDto): Promise<any>;
    findAllPartners(): Promise<any>;
    createPartner(dto: CreatePartnerDto): Promise<any>;
    findAllBlogPosts(): Promise<any>;
    findBlogPostBySlug(slug: string): Promise<any>;
    createBlogPost(dto: CreateBlogPostDto): Promise<any>;
}
