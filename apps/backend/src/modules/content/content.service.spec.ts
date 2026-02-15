import { Test, TestingModule } from '@nestjs/testing';
import { ContentService } from './content.service';
import { PrismaService } from '../../database/prisma.service';

describe('ContentService', () => {
  let service: ContentService;
  let prisma: PrismaService;

  const mockPrismaService = {
    heroSection: {
      findFirst: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
    },
    stat: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
    service: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
    teamMember: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
    portfolioItem: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
    testimonial: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
    fAQ: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
    partner: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
    blogPost: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ContentService>(ContentService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findHero', () => {
    it('should call prisma.heroSection.findFirst', async () => {
      const mockHero = { id: '1', titlePrefix: 'Hello' };
      (mockPrismaService.heroSection.findFirst as jest.Mock).mockResolvedValue(mockHero);

      const result = await service.findHero();
      expect(result).toEqual(mockHero);
      expect(mockPrismaService.heroSection.findFirst).toHaveBeenCalledWith({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('findAllStats', () => {
    it('should call prisma.stat.findMany', async () => {
      const mockStats = [{ id: '1', label: 'Clients', value: 100 }];
      (mockPrismaService.stat.findMany as jest.Mock).mockResolvedValue(mockStats);

      const result = await service.findAllStats();
      expect(result).toEqual(mockStats);
      expect(mockPrismaService.stat.findMany).toHaveBeenCalledWith({
        where: { isActive: true },
        orderBy: { order: 'asc' },
      });
    });
  });

  describe('findBlogPostBySlug', () => {
    it('should call prisma.blogPost.findUnique', async () => {
      const mockPost = { id: '1', slug: 'test-post', title: 'Test' };
      (mockPrismaService.blogPost.findUnique as jest.Mock).mockResolvedValue(mockPost);

      const result = await service.findBlogPostBySlug('test-post');
      expect(result).toEqual(mockPost);
      expect(mockPrismaService.blogPost.findUnique).toHaveBeenCalledWith({
        where: { slug: 'test-post' },
      });
    });
  });
});
