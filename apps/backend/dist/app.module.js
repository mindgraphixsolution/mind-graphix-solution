"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cache_manager_1 = require("@nestjs/cache-manager");
const auth_module_1 = require("./modules/auth/auth.module");
const health_module_1 = require("./modules/health/health.module");
const database_module_1 = require("./database/database.module");
const users_module_1 = require("./modules/users/users.module");
const pages_module_1 = require("./modules/pages/pages.module");
const media_module_1 = require("./modules/media/media.module");
const settings_module_1 = require("./modules/settings/settings.module");
const content_module_1 = require("./modules/content/content.module");
const integrations_module_1 = require("./modules/integrations/integrations.module");
const audit_module_1 = require("./modules/audit/audit.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            // Global modules
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
                cache: true,
            }),
            cache_manager_1.CacheModule.register({
                isGlobal: true,
                ttl: 300,
            }),
            database_module_1.DatabaseModule,
            audit_module_1.AuditModule,
            // Feature modules
            auth_module_1.AuthModule,
            health_module_1.HealthModule,
            users_module_1.UsersModule,
            pages_module_1.PagesModule,
            media_module_1.MediaModule,
            settings_module_1.SettingsModule,
            content_module_1.ContentModule,
            integrations_module_1.IntegrationsModule,
        ],
    })
], AppModule);
