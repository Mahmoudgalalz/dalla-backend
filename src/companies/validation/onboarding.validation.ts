import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class OnboardingValidation {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsOptional()
  location: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  @IsOptional()
  areas: string[];

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  @IsOptional()
  goals: string[];

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  @IsOptional()
  targetIndustries: string[];

  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  website: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  headline: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  bio: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  logo: string;
}
