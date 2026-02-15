import { ContentService } from './content.service';
import { CreateServiceDto, CreateTeamMemberDto, CreatePortfolioItemDto, CreateTestimonialDto, CreateHeroSectionDto, CreateStatDto, CreateFAQDto, CreatePartnerDto, CreateBlogPostDto } from './dtos';
export declare class ContentController {
    private readonly contentService;
    constructor(contentService: ContentService);
    getHero(): Promise<any>;
    updateHero(dto: CreateHeroSectionDto): Promise<any>;
    getAllStats(): Promise<any>;
    createStat(dto: CreateStatDto): Promise<any>;
    getAllServices(): Promise<any>;
    createService(dto: CreateServiceDto): Promise<any>;
    getAllTeamMembers(): Promise<any>;
    createTeamMember(dto: CreateTeamMemberDto): Promise<any>;
    getAllPortfolioItems(): Promise<any>;
    createPortfolioItem(dto: CreatePortfolioItemDto): Promise<any>;
    getAllTestimonials(): Promise<any>;
    createTestimonial(dto: CreateTestimonialDto): Promise<any>;
    getAllFAQs(): Promise<any>;
    createFAQ(dto: CreateFAQDto): Promise<any>;
    getAllPartners(): Promise<any>;
    createPartner(dto: CreatePartnerDto): Promise<any>;
    getAllBlogPosts(): Promise<any>;
    createBlogPost(dto: CreateBlogPostDto): Promise<any>;
}
