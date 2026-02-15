import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { PagesModule } from './modules/pages/pages.module';
import { MediaModule } from './modules/media/media.module';
import { SettingsModule } from './modules/settings/settings.module';
import { ContentModule } from './modules/content/content.module';
import { IntegrationsModule } from './modules/integrations/integrations.module';
import { AuditModule } from './modules/audit/audit.module';

@Module({
  imports: [
    // Global modules
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: true,
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 300,
    }),
    DatabaseModule,
    AuditModule,

    // Feature modules
    AuthModule,
    HealthModule,
    UsersModule,
    PagesModule,
    MediaModule,
    SettingsModule,
    ContentModule,
    IntegrationsModule,
  ],
})
export class AppModule {}
