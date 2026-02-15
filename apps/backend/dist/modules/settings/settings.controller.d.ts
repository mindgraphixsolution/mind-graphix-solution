import { SettingsService, UpdateSiteConfigDto } from './settings.service';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    getSiteConfig(): Promise<{
        id: string;
        updatedAt: Date;
        siteName: string;
        siteDescription: string | null;
        favicon: string | null;
        logo: string | null;
        supportEmail: string | null;
        supportPhone: string | null;
        socialLinks: import("@prisma/client/runtime/library").JsonValue | null;
        supportedLanguages: string[];
        defaultLanguage: string;
        enableComments: boolean;
        enableSearch: boolean;
        enableAnalytics: boolean;
        siteUrl: string;
    }>;
    updateSiteConfig(dto: UpdateSiteConfigDto): Promise<{
        id: string;
        updatedAt: Date;
        siteName: string;
        siteDescription: string | null;
        favicon: string | null;
        logo: string | null;
        supportEmail: string | null;
        supportPhone: string | null;
        socialLinks: import("@prisma/client/runtime/library").JsonValue | null;
        supportedLanguages: string[];
        defaultLanguage: string;
        enableComments: boolean;
        enableSearch: boolean;
        enableAnalytics: boolean;
        siteUrl: string;
    }>;
    getPublicSettings(): Promise<{
        id: string;
        updatedAt: Date;
        type: string;
        description: string | null;
        key: string;
        value: string;
        isPublic: boolean;
    }[]>;
}
