import { PrismaService } from 'src/database/prisma.service';
import { Setting, SiteConfig } from '@prisma/client';
export interface UpdateSettingDto {
    value: string;
}
export interface UpdateSiteConfigDto {
    siteName?: string;
    siteDescription?: string;
    favicon?: string;
    logo?: string;
    supportEmail?: string;
    supportPhone?: string;
    siteUrl?: string;
    socialLinks?: any;
    enableComments?: boolean;
    enableSearch?: boolean;
    enableAnalytics?: boolean;
    enableNewsletter?: boolean;
}
export declare class SettingsService {
    private prisma;
    constructor(prisma: PrismaService);
    getSetting(key: string): Promise<Setting | null>;
    updateSetting(key: string, dto: UpdateSettingDto): Promise<Setting>;
    getAllSettings(): Promise<Setting[]>;
    getSiteConfig(): Promise<SiteConfig>;
    updateSiteConfig(dto: UpdateSiteConfigDto): Promise<SiteConfig>;
}
