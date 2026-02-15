import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards, Req, Version } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { MediaService, CreateMediaDto, UpdateMediaDto } from './media.service';
import { MediaType } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Version('1')
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload/Register new media' })
  @ApiResponse({ status: 201, description: 'Media registered successfully' })
  async create(@Body() createMediaDto: CreateMediaDto, @Req() req: any) {
    return this.mediaService.create(createMediaDto, req.user.sub);
  }

  @Version('1')
  @Get()
  @ApiOperation({ summary: 'Get all media items' })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiQuery({ name: 'type', required: false, enum: MediaType })
  @ApiResponse({ status: 200, description: 'Return media list' })
  async findAll(
    @Query('skip') skip = 0,
    @Query('take') take = 10,
    @Query('type') type?: MediaType,
  ) {
    return this.mediaService.findAll(skip, take, type);
  }

  @Version('1')
  @Get('search')
  @ApiOperation({ summary: 'Search media by title or alt text' })
  @ApiQuery({ name: 'q', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Return search results' })
  async search(@Query('q') query: string) {
    if (!query || query.length < 2) {
      return [];
    }
    return this.mediaService.search(query);
  }

  @Version('1')
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific media item by ID' })
  @ApiResponse({ status: 200, description: 'Return media data' })
  async findOne(@Param('id') id: string) {
    return this.mediaService.findOne(id);
  }

  @Version('1')
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update media metadata' })
  @ApiResponse({ status: 200, description: 'Media updated successfully' })
  async update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediaService.update(id, updateMediaDto);
  }

  @Version('1')
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a media item' })
  @ApiResponse({ status: 200, description: 'Media deleted successfully' })
  async delete(@Param('id') id: string) {
    return this.mediaService.delete(id);
  }
}
