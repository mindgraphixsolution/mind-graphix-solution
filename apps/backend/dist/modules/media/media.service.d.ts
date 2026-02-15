import { PrismaService } from 'src/database/prisma.service';
import { Media, MediaType } from '@prisma/client';
export interface CreateMediaDto {
    name: string;
    type: MediaType;
    mimeType: string;
    url: string;
    thumbnailUrl?: string;
    bucket: string;
    key: string;
    size: number;
    width?: number;
    height?: number;
    duration?: number;
    tags?: string[];
    description?: string;
    altText?: string;
}
export interface UpdateMediaDto {
    name?: string;
    description?: string;
    altText?: string;
    tags?: string[];
}
export declare class MediaService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateMediaDto, userId: string): Promise<Media>;
    findAll(skip?: number, take?: number, type?: MediaType): Promise<Media[]>;
    findOne(id: string): Promise<Media>;
    update(id: string, dto: UpdateMediaDto): Promise<Media>;
    delete(id: string): Promise<Media>;
    search(query: string, take?: number): Promise<Media[]>;
}
