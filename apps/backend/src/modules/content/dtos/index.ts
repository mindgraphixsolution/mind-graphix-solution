import { IsString, IsOptional, IsBoolean, IsInt, IsUrl, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsString()
  description!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  order?: number;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class CreateBlogPostDto {
  @ApiProperty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsString()
  slug!: string;

  @ApiProperty()
  @IsString()
  content!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  excerpt?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  author?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  image?: string;

  @ApiPropertyOptional()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  published?: boolean;
}

export class CreateFAQDto {
  @ApiProperty()
  @IsString()
  question!: string;

  @ApiProperty()
  @IsString()
  answer!: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  order?: number;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class CreatePartnerDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  logo!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  link?: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  order?: number;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class CreateHeroSectionDto {
  @ApiProperty()
  @IsString()
  titlePrefix!: string;

  @ApiProperty()
  @IsString()
  titleSpan!: string;

  @ApiProperty()
  @IsString()
  titleSuffix!: string;

  @ApiProperty()
  @IsString()
  description!: string;

  @ApiProperty()
  @IsString()
  ctaPrimary!: string;

  @ApiProperty()
  @IsString()
  ctaSecondary!: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class CreateStatDto {
  @ApiProperty()
  @IsString()
  label!: string;

  @ApiProperty()
  @IsInt()
  value!: number;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  order?: number;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class CreateTeamMemberDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  role!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  image?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  linkedin?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  twitter?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  github?: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  order?: number;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class CreatePortfolioItemDto {
  @ApiProperty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsString()
  category!: string;

  @ApiProperty()
  @IsString()
  image!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  link?: string;

  @ApiPropertyOptional()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  order?: number;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class CreateTestimonialDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  role?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  company?: string;

  @ApiProperty()
  @IsString()
  content!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  rating?: number;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
