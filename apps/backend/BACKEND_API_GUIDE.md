# 🚀 Mind Graphix Premium - Backend API Documentation

## Phase 1 Implementation Status

### ✅ Phase 1.1: NestJS Modular Architecture (COMPLETE)
- Core modules: Users, Pages, Media, Settings, Auth, Health, Integrations
- 20+ REST API endpoints with full CRUD operations
- Role-based access control (RBAC) with decorators and guards
- Global security middleware (Helmet, CORS, validation pipes)
- API versioning (/api/v1/...)
- Proper error handling and exception filters

### ✅ Phase 1.2: Prisma ORM & Database Schema (COMPLETE)
- Complete database schema with 13 entities
- User management with role and status tracking
- Page/CMS system with version history
- Media management with metadata and search
- Settings and site configuration
- Audit logging system
- Analytics event tracking
- Integration management (Stripe, HubSpot, Mailchimp, etc.)

### ✅ Phase 1.3: JWT Authentication (COMPLETE)
- JWT token generation and validation
- Refresh token mechanism with secure cookie storage
- Login/Register endpoints
- Password hashing with bcrypt
- Session management
- Passport JWT strategy integration

---

## 🔌 API Endpoints Overview

### Authentication (`/api/v1/auth`)
```
POST   /auth/register        - Register new user
POST   /auth/login           - Login user (returns JWT + refresh token)
POST   /auth/refresh         - Refresh access token
POST   /auth/logout          - Logout user
```

### Users (`/api/v1/users`)
```
POST   /users                - Create user (SUPER_ADMIN only)
GET    /users                - List users with pagination
GET    /users/:id            - Get user details
PUT    /users/:id            - Update user
DELETE /users/:id            - Soft delete user
```

### Pages (`/api/v1/pages`)
```
POST   /pages                - Create page
GET    /pages                - List all pages
GET    /pages/slug/:slug     - Get page by slug
GET    /pages/:id            - Get page by ID
PUT    /pages/:id            - Update page
POST   /pages/:id/publish    - Publish page
DELETE /pages/:id            - Archive page
```

### Media (`/api/v1/media`)
```
POST   /media                - Upload media
GET    /media                - List media (filterable by type)
GET    /media/search         - Search media by query
GET    /media/:id            - Get media details
PUT    /media/:id            - Update media metadata
DELETE /media/:id            - Delete media
```

### Settings (`/api/v1/settings`)
```
GET    /settings/site-config      - Get site configuration
PUT    /settings/site-config      - Update site config (SUPER_ADMIN only)
GET    /settings/public           - Get public settings only
```

### Integrations (`/api/v1/integrations`)
```
POST   /integrations                    - Create integration
GET    /integrations                    - List integrations
GET    /integrations/:id                - Get integration
PUT    /integrations/:id                - Update integration
DELETE /integrations/:id                - Delete integration
POST   /integrations/:id/activate       - Activate integration
POST   /integrations/:id/deactivate     - Deactivate integration
GET    /integrations/:id/status         - Get integration status
GET    /integrations/:id/logs           - Get integration logs
POST   /integrations/:id/webhook        - Register webhook
DELETE /integrations/:id/webhook        - Remove webhook
POST   /integrations/:id/sync/stripe    - Sync Stripe data
POST   /integrations/:id/sync/hubspot   - Sync HubSpot data
POST   /integrations/:id/sync/mailchimp - Sync Mailchimp data
```

### Content (`/api/v1/content`)
```
GET    /content/hero              - Get hero section data
PUT    /content/hero              - Update hero section (ADMIN only)
GET    /content/stats             - List all statistics
POST   /content/stats             - Create new statistic (ADMIN only)
GET    /content/services          - List all services
POST   /content/services          - Create new service (ADMIN only)
GET    /content/team              - List team members
POST   /content/team              - Add team member (ADMIN only)
GET    /content/portfolio         - List portfolio items
POST   /content/portfolio         - Add portfolio item (ADMIN only)
GET    /content/testimonials      - List testimonials
POST   /content/testimonials      - Add testimonial (ADMIN only)
GET    /content/blog              - List blog posts
GET    /content/blog/:slug        - Get blog post by slug
POST   /content/blog              - Create blog post (ADMIN only)
GET    /content/partners          - List partners
POST   /content/partners          - Add partner (ADMIN only)
GET    /content/faq               - List FAQ items
POST   /content/faq               - Add FAQ item (ADMIN only)
```

### Health (`/health`)
```
GET    /health               - Health check endpoint
```

---

## 🔐 Default Credentials

**After running `pnpm db:seed`, use these test accounts:**

| Role | Email | Password |
|------|-------|----------|
| SUPER_ADMIN | admin@mindgraphix.com | Admin@12345 |
| EDITOR | editor@mindgraphix.com | Editor@12345 |
| VIEWER | viewer@mindgraphix.com | Viewer@12345 |

---

## 🚀 Getting Started

### 1. Prerequisites
```bash
# Ensure you have these installed
Node.js 20.11+
npm 10+ or pnpm 8+
Docker & Docker Compose
PostgreSQL 15
Redis 7+
```

### 2. Setup Database & Services

```bash
# Start all services (PostgreSQL, Redis, Elasticsearch, etc.)
cd /apps/backend
docker-compose up -d

# Wait for services to be healthy (check logs)
docker-compose logs -f postgres redis
```

### 3. Install Dependencies
```bash
# From root directory
pnpm install

# Install backend dependencies specifically
cd apps/backend
pnpm install
```

### 4. Setup Environment
```bash
# Copy example to .env
cp .env.example .env

# Edit .env with your configuration (JWT_SECRET, etc.)
nano .env
```

### 5. Run Database Migrations & Seeding

```bash
# Generate Prisma client
pnpm prisma:generate

# Run migrations
pnpm db:migrate

# (Optional) Reset database and reseed
pnpm db:reset

# (Optional) View database in Prisma Studio
pnpm db:studio
```

### 6. Start Backend Server

```bash
# Development mode with hot-reload
pnpm dev:backend

# Or from root with all services
pnpm dev
```

The API will be available at: **http://localhost:3001**

---

## 📚 Testing Endpoints

### Using cURL

```bash
# Login
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@mindgraphix.com",
    "password": "Admin@12345"
  }'

# Get access token from response, then use it:

# List users
curl -X GET http://localhost:3001/api/v1/users \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Create page
curl -X POST http://localhost:3001/api/v1/pages \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Page",
    "slug": "my-first-page",
    "content": "<h1>Welcome</h1>"
  }'
```

### Using Postman

1. Import the API collection from Swagger UI: `http://localhost:3001/api/docs`
2. Create a new environment with variable `access_token`
3. After login, save the token to the environment variable
4. Use `{{access_token}}` in Authorization header for authenticated requests

---

## 🔑 Authentication Flow

### Login & Token Generation

```
1. User submits email + password → POST /auth/login
2. Server validates credentials
3. Server generates:
   - accessToken (JWT, 15 min expiry) - sent in response
   - refreshToken (JWT, 7 day expiry) - stored in HTTP-only cookie
4. Client stores accessToken in memory/state
5. Client sends accessToken in Authorization header for requests
```

### Token Refresh

```
1. AccessToken expires (15 min)
2. Client sends refreshToken → POST /auth/refresh
3. Server validates refreshToken
4. Server generates new accessToken + refreshToken
5. New refreshToken stored in HTTP-only cookie
6. Process repeats
```

### Logout

```
1. User clicks logout → POST /auth/logout
2. Server deletes refreshToken from database
3. Server clears HTTP-only cookie
4. Client removes accessToken from memory
5. User redirected to login page
```

---

## 📊 Database Schema

### Key Models

**User**
- id, email (unique), passwordHash, firstName, lastName
- role (SUPER_ADMIN, ADMIN, EDITOR, VIEWER, CLIENT)
- status (ACTIVE, INACTIVE, SUSPENDED, PENDING_VERIFICATION)
- 2FA support, audit trail

**Page**
- id, title, slug (unique), content, description
- status (DRAFT, PUBLISHED, ARCHIVED, SCHEDULED)
- visibility (PUBLIC, PRIVATE, PASSWORD_PROTECTED)
- SEO fields (metaTitle, metaDescription, metaKeywords, ogImage)
- Version history tracking
- View count analytics

**Media**
- id, name, type (IMAGE, VIDEO, DOCUMENT, AUDIO)
- url, thumbnailUrl, mimeType, size
- Metadata (width, height, duration, EXIF data)
- Tags and full-text search support

**Integration**
- id, name (unique), type (PAYMENT, CRM, EMAIL_MARKETING, etc.)
- apiKey, apiSecret, webhookUrl, webhookSecret (encrypted)
- isActive flag, sync status tracking
- Action logs for audit trail

**AuditLog**
- Records all system changes (CREATE, UPDATE, DELETE, PUBLISH, etc.)
- User, IP, User-Agent tracking
- Change payload for detailed auditing

---

## 🔐 Role-Based Access Control (RBAC)

### User Roles

| Role | Permissions |
|------|-------------|
| **SUPER_ADMIN** | Full system access, user management, integrations |
| **ADMIN** | Content + user management, integrations (read) |
| **EDITOR** | Create/edit pages and media only |
| **VIEWER** | Read-only access to analytics and reports |
| **CLIENT** | (Future) Customer portal, profile management |

### Using Roles in Controllers

```typescript
@Post('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
async createUser(@Body() dto: CreateUserDto) {
  // Only SUPER_ADMIN can access
}

@Get('pages')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.EDITOR)
async listPages() {
  // ADMIN and EDITOR can access
}
```

---

## 🔧 Configuration

### Environment Variables

```env
# Security
JWT_SECRET=your-32-character-minimum-secret-key
NODE_ENV=development|production

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/db

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:3001

# Integrations
STRIPE_API_KEY=sk_test_...
HUBSPOT_API_KEY=pat-...
MAILCHIMP_API_KEY=...
```

### Main Configuration Files

- `apps/backend/.env` - Environment variables
- `apps/backend/src/main.ts` - NestJS bootstrap
- `apps/backend/src/app.module.ts` - Root module configuration
- `apps/backend/prisma/schema.prisma` - Database schema

---

## 📈 Monitoring & Logging

### Available Endpoints

- Health Check: `GET /health`
- Swagger Docs: `http://localhost:3001/api/docs`

### Logging Setup

Configure in `.env`:
```env
LOG_LEVEL=debug|info|warn|error
```

### Database Monitoring

```bash
# View database in Prisma Studio
pnpm db:studio

# Check database directly
psql -U postgres -h localhost -d mindgraphix_dev
```

---

## 🚀 Deployment Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Generate strong `JWT_SECRET` (min 32 chars)
- [ ] Configure database backups
- [ ] Setup Redis persistence
- [ ] Configure email service (SendGrid/SMTP)
- [ ] Setup monitoring (Prometheus/Grafana)
- [ ] Configure logging (ELK Stack)
- [ ] Setup CI/CD pipeline
- [ ] Configure CDN (Cloudflare)
- [ ] Setup SSL/TLS certificates
- [ ] Configure rate limiting
- [ ] Setup DDoS protection

---

## 📞 Support & Documentation

- **Swagger UI**: http://localhost:3001/api/docs
- **Prisma Studio**: `pnpm db:studio`
- **NestJS Docs**: https://docs.nestjs.com
- **Prisma Docs**: https://www.prisma.io/docs
- **PostgreSQL Docs**: https://www.postgresql.org/docs

---

## 🎯 Next Phase (Phase 2: Frontend Integration)

After backend API is running:

1. **Connect frontend to backend**
   - Update API base URL in frontend .env
   - Setup axios/fetch interceptors for JWT tokens

2. **Implement authentication flow**
   - Login/Register pages
   - Token storage and refresh logic
   - Protected routes in Next.js

3. **Build CMS interface**
   - Page CRUD operations
   - Media upload and management
   - Settings configuration

4. **Test integrations**
   - Stripe payment processing
   - HubSpot CRM sync
   - Mailchimp newsletter

---

**Version**: 1.0.0  
**Last Updated**: January 24, 2026  
**Status**: ✅ Phase 1.3 Complete - Ready for Frontend Integration
