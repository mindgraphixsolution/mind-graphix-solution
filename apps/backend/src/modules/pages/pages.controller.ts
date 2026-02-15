import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards, Req, Version } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { PagesService, CreatePageDto, UpdatePageDto } from './pages.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Pages')
@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Version('1')
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new page' })
  @ApiResponse({ status: 201, description: 'Page created successfully' })
  async create(@Body() createPageDto: CreatePageDto, @Req() req: any) {
    return this.pagesService.create(createPageDto, req.user.sub);
  }

  @Version('1')
  @Get()
  @ApiOperation({ summary: 'Get all pages' })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Return all pages' })
  async findAll(@Query('skip') skip = 0, @Query('take') take = 10) {
    return this.pagesService.findAll(skip, take);
  }

  @Version('1')
  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get page by slug' })
  @ApiResponse({ status: 200, description: 'Return page by slug' })
  @ApiResponse({ status: 404, description: 'Page not found' })
  async findBySlug(@Param('slug') slug: string) {
    return this.pagesService.findBySlug(slug);
  }

  @Version('1')
  @Get(':id')
  @ApiOperation({ summary: 'Get page by ID' })
  @ApiResponse({ status: 200, description: 'Return page by ID' })
  @ApiResponse({ status: 404, description: 'Page not found' })
  async findOne(@Param('id') id: string) {
    return this.pagesService.findOne(id);
  }

  @Version('1')
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a page' })
  @ApiResponse({ status: 200, description: 'Page updated successfully' })
  async update(
    @Param('id') id: string,
    @Body() updatePageDto: UpdatePageDto,
    @Req() req: any,
  ) {
    return this.pagesService.update(id, updatePageDto, req.user.sub);
  }

  @Version('1')
  @Post(':id/publish')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Publish a page' })
  @ApiResponse({ status: 200, description: 'Page published successfully' })
  async publish(@Param('id') id: string, @Req() req: any) {
    return this.pagesService.publish(id, req.user.sub);
  }

  @Version('1')
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a page' })
  @ApiResponse({ status: 200, description: 'Page deleted successfully' })
  async delete(@Param('id') id: string) {
    return this.pagesService.delete(id);
  }
}
