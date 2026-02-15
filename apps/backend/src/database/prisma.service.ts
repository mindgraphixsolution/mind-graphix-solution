import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private connected = false;
  async onModuleInit() {
    try {
      await this.$connect();
      this.connected = true;
      console.log('✅ Database connected');
    } catch (e) {
      this.connected = false;
      console.error('❌ Database connection failed:', (e as any)?.message || e);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
