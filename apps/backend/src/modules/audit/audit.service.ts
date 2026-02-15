import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { AuditAction } from '@prisma/client';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async log(data: {
    action: AuditAction;
    resource: string;
    resourceId?: string;
    userId: string;
    changes?: any;
    ipAddress?: string;
    userAgent?: string;
  }) {
    return this.prisma.auditLog.create({
      data: {
        action: data.action,
        resource: data.resource,
        resourceId: data.resourceId,
        userId: data.userId,
        changes: data.changes,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
      },
    });
  }

  async getLogs(filter: {
    userId?: string;
    resource?: string;
    action?: AuditAction;
  }) {
    return this.prisma.auditLog.findMany({
      where: {
        ...(filter.userId && { userId: filter.userId }),
        ...(filter.resource && { resource: filter.resource }),
        ...(filter.action && { action: filter.action }),
      },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }
}
