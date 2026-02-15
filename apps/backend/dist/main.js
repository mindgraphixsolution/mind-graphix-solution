"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    // Security - Helmet middleware for HTTP headers
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: false,
        crossOriginResourcePolicy: { policy: 'cross-origin' },
    }));
    // Compression middleware
    app.use((0, compression_1.default)());
    // CORS configuration
    const corsOrigins = configService
        .get('CORS_ORIGINS', 'http://localhost:3000')
        .split(',');
    app.enableCors({
        origin: corsOrigins,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    // Global validation pipe
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    // API Versioning (e.g., /api/v1/...)
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        prefix: 'api/v',
    });
    // Swagger/OpenAPI documentation
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Mind Graphix API')
        .setDescription('Professional CMS & Site Builder API')
        .setVersion('1.0.0')
        .addBearerAuth()
        .addTag('Auth', 'Authentication endpoints')
        .addTag('Pages', 'Page management endpoints')
        .addTag('Media', 'Media management endpoints')
        .addTag('Users', 'User management endpoints')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = configService.get('PORT', 3001);
    await app.listen(port);
    console.log(`✅ Server running on http://localhost:${port}`);
    console.log(`📚 API Docs available at http://localhost:${port}/api/docs`);
}
bootstrap().catch(console.error);
