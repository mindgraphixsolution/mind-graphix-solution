import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../../database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwtService: JwtService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    session: {
      create: jest.fn(),
    },
  };

  const mockJwtService = {
    sign: jest.fn(),
    signAsync: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === 'JWT_ACCESS_SECRET') return 'access-secret';
      if (key === 'JWT_REFRESH_SECRET') return 'refresh-secret';
      return null;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should throw BadRequestException if user already exists', async () => {
      const dto = { email: 'test@example.com', password: 'password', firstName: 'John', lastName: 'Doe' };
      mockPrismaService.user.findUnique.mockResolvedValue({ id: '1', email: dto.email });

      await expect(service.register(dto)).rejects.toThrow(BadRequestException);
    });

    it('should create a new user and return user + tokens', async () => {
      const dto = { email: 'new@example.com', password: 'password', firstName: 'John', lastName: 'Doe' };
      const hashedPassword = 'hashedPassword';
      const user = { id: '1', email: dto.email, firstName: dto.firstName, lastName: dto.lastName, role: 'USER' };
      
      mockPrismaService.user.findUnique.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      mockPrismaService.user.create.mockResolvedValue(user);
      mockJwtService.sign.mockReturnValue('token');

      const result = await service.register(dto);

      expect(result.user).toEqual(user);
      expect(result.tokens).toBeDefined();
      expect(mockPrismaService.user.create).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should throw UnauthorizedException if user not found', async () => {
      const dto = { email: 'nonexistent@example.com', password: 'password' };
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password does not match', async () => {
      const dto = { email: 'test@example.com', password: 'wrongpassword' };
      const user = { id: '1', email: dto.email, passwordHash: 'hashedPassword' };
      
      mockPrismaService.user.findUnique.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
    });

    it('should return user and tokens on successful login', async () => {
      const dto = { email: 'test@example.com', password: 'password' };
      const user = { id: '1', email: dto.email, passwordHash: 'hashedPassword', firstName: 'John', lastName: 'Doe', role: 'USER' };
      
      mockPrismaService.user.findUnique.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockPrismaService.user.update.mockResolvedValue(user);
      mockJwtService.sign.mockReturnValue('token');

      const result = await service.login(dto);

      expect(result.user.email).toBe(user.email);
      expect(result.tokens).toBeDefined();
    });
  });
});
