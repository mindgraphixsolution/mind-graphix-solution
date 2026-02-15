import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { IntegrationsService } from './integrations.service';
import { CreateIntegrationDto, UpdateIntegrationDto } from './dtos';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole, IntegrationType } from '@prisma/client';

@ApiTags('Integrations')
@ApiBearerAuth()
@Controller('integrations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class IntegrationsController {
  constructor(private integrationService: IntegrationsService) {}

  @Version('1')
  @Post()
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Create a new integration' })
  @ApiResponse({ status: 201, description: 'Integration created successfully' })
  async create(@Body() dto: CreateIntegrationDto) {
    return this.integrationService.create(dto);
  }

  @Version('1')
  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all integrations' })
  @ApiQuery({ name: 'type', required: false, enum: IntegrationType })
  @ApiQuery({ name: 'isActive', required: false, type: Boolean })
  @ApiResponse({ status: 200, description: 'Return integrations list' })
  async findAll(
    @Query('type') type?: IntegrationType,
    @Query('isActive') isActive?: string,
  ) {
    return this.integrationService.findAll({
      type,
      isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
    });
  }

  @Version('1')
  @Get(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({ summary: 'Get an integration by ID' })
  @ApiResponse({ status: 200, description: 'Return integration data' })
  async findOne(@Param('id') id: string) {
    return this.integrationService.findOne(id);
  }

  @Version('1')
  @Get('by-name/:name')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({ summary: 'Get an integration by name' })
  @ApiResponse({ status: 200, description: 'Return integration data' })
  async findByName(@Param('name') name: string) {
    return this.integrationService.findByName(name);
  }

  @Version('1')
  @Put(':id')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Update an integration' })
  @ApiResponse({ status: 200, description: 'Integration updated successfully' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateIntegrationDto,
  ) {
    return this.integrationService.update(id, dto);
  }

  @Version('1')
  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Delete an integration' })
  @ApiResponse({ status: 200, description: 'Integration deleted successfully' })
  async delete(@Param('id') id: string) {
    return this.integrationService.delete(id);
  }

  // ========================================================================
  // ACTIVATION & STATUS
  // ========================================================================

  @Version('1')
  @Post(':id/activate')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({ summary: 'Activate an integration' })
  @ApiResponse({ status: 200, description: 'Integration activated successfully' })
  async activate(@Param('id') id: string) {
    return this.integrationService.activate(id);
  }

  @Version('1')
  @Post(':id/deactivate')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({ summary: 'Deactivate an integration' })
  @ApiResponse({ status: 200, description: 'Integration deactivated successfully' })
  async deactivate(@Param('id') id: string) {
    return this.integrationService.deactivate(id);
  }

  @Version('1')
  @Get(':id/status')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({ summary: 'Get the status of an integration' })
  @ApiResponse({ status: 200, description: 'Return integration status' })
  async getStatus(@Param('id') id: string) {
    return this.integrationService.getStatus(id);
  }

  // ========================================================================
  // WEBHOOK MANAGEMENT
  // ========================================================================

  @Version('1')
  @Post(':id/webhook')
  @Roles(UserRole.SUPER_ADMIN)
  async registerWebhook(
    @Param('id') id: string,
    @Body() body: { webhookUrl: string; webhookSecret: string },
  ) {
    return this.integrationService.registerWebhook(
      id,
      body.webhookUrl,
      body.webhookSecret,
    );
  }

  @Version('1')
  @Delete(':id/webhook')
  @Roles(UserRole.SUPER_ADMIN)
  async removeWebhook(@Param('id') id: string) {
    return this.integrationService.removeWebhook(id);
  }

  // ========================================================================
  // LOGGING
  // ========================================================================

  @Version('1')
  @Get(':id/logs')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  async getActionLogs(
    @Param('id') id: string,
    @Query('limit') limit?: number,
  ) {
    return this.integrationService.getActionLogs(id, limit || 50);
  }

  // ========================================================================
  // SYNC OPERATIONS
  // ========================================================================

  @Version('1')
  @Post(':id/sync/stripe')
  @Roles(UserRole.SUPER_ADMIN)
  async syncStripe(@Param('id') id: string) {
    return this.integrationService.syncWithStripe(id);
  }

  @Version('1')
  @Post(':id/sync/hubspot')
  @Roles(UserRole.SUPER_ADMIN)
  async syncHubSpot(@Param('id') id: string) {
    return this.integrationService.syncWithHubSpot(id);
  }

  @Version('1')
  @Post(':id/sync/mailchimp')
  @Roles(UserRole.SUPER_ADMIN)
  async syncMailchimp(@Param('id') id: string) {
    return this.integrationService.syncWithMailchimp(id);
  }
}
