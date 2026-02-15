export declare class CreateServiceDto {
    title: string;
    description: string;
    icon?: string;
    order?: number;
    isActive?: boolean;
}
export declare class CreateBlogPostDto {
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    category?: string;
    author?: string;
    image?: string;
    tags?: string[];
    published?: boolean;
}
export declare class CreateFAQDto {
    question: string;
    answer: string;
    order?: number;
    isActive?: boolean;
}
export declare class CreatePartnerDto {
    name: string;
    logo: string;
    link?: string;
    order?: number;
    isActive?: boolean;
}
export declare class CreateHeroSectionDto {
    titlePrefix: string;
    titleSpan: string;
    titleSuffix: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    isActive?: boolean;
}
export declare class CreateStatDto {
    label: string;
    value: number;
    order?: number;
    isActive?: boolean;
}
export declare class CreateTeamMemberDto {
    name: string;
    role: string;
    image?: string;
    bio?: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
    order?: number;
    isActive?: boolean;
}
export declare class CreatePortfolioItemDto {
    title: string;
    category: string;
    image: string;
    description?: string;
    link?: string;
    tags?: string[];
    order?: number;
    isActive?: boolean;
}
export declare class CreateTestimonialDto {
    name: string;
    role?: string;
    company?: string;
    content: string;
    avatar?: string;
    rating?: number;
    isActive?: boolean;
}
