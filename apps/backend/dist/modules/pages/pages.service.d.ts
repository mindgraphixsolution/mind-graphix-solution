import { PrismaService } from 'src/database/prisma.service';
import { Page, PageStatus } from '@prisma/client';
export interface CreatePageDto {
    title: string;
    slug: string;
    description?: string;
    content: string;
    status?: PageStatus;
    blocks?: any;
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
}
export interface UpdatePageDto {
    title?: string;
    description?: string;
    content?: string;
    status?: PageStatus;
    blocks?: any;
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
}
export declare class PagesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePageDto, userId: string): Promise<Page>;
    findAll(skip?: number, take?: number): Promise<Page[]>;
    findBySlug(slug: string): Promise<Page>;
    findOne(id: string): Promise<Page>;
    update(id: string, dto: UpdatePageDto, userId: string): Promise<Page>;
    delete(id: string): Promise<Page>;
    publish(id: string, userId: string): Promise<Page>;
}
