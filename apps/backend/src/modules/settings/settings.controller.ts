import { Controller, Get, Put, Body, UseGuards, Version } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SettingsService, UpdateSiteConfigDto } from './settings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Version('1')
  @Get('site-config')
  @ApiOperation({ summary: 'Get site configuration' })
  @ApiResponse({ status: 200, description: 'Return site configuration' })
  async getSiteConfig() {
    return this.settingsService.getSiteConfig();
  }

  @Version('1')
  @Put('site-config')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update site configuration' })
  @ApiResponse({ status: 200, description: 'Site configuration updated successfully' })
  async updateSiteConfig(@Body() dto: UpdateSiteConfigDto) {
    return this.settingsService.updateSiteConfig(dto);
  }

  @Version('1')
  @Get('public')
  @ApiOperation({ summary: 'Get all public settings' })
  @ApiResponse({ status: 200, description: 'Return all settings' })
  async getPublicSettings() {
    return this.settingsService.getAllSettings();
  }
}
