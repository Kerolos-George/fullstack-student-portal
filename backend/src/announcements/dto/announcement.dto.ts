import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class CreateAnnouncementDto {
  @ApiProperty({
    description: 'The name of the announcement author',
    example: 'John Smith',
  })
  @IsString()
  @IsNotEmpty()
  authorName: string;

  @ApiProperty({
    description: 'The role of the announcement author',
    example: 'Professor',
  })
  @IsString()
  @IsNotEmpty()
  authorRole: string;
 
  @ApiProperty({
    description: 'The course of the announcement author',
    example: 'Math',
    required: false,

  })
  @IsOptional()
  @IsString()
  course?: string;

  @ApiProperty({
    description: 'The announcement message content',
    example: 'Please note that the midterm exam has been rescheduled to next Friday.',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  message: string;
}

export class UpdateAnnouncementDto extends PartialType(CreateAnnouncementDto) {
  @ApiProperty({
    description: 'The name of the announcement author',
    example: 'John Smith',
    required: false,
  })
  authorName?: string;

  @ApiProperty({
    description: 'The role of the announcement author',
    example: 'Professor',
    required: false,
  })
  authorRole?: string;

  @ApiProperty({
    description: 'The course of the announcement author',
    example: 'Math',
        required: false,

  })
  @IsOptional()
  @IsString()
  course: string;

  @ApiProperty({
    description: 'The announcement message content',
    example: 'Please note that the midterm exam has been rescheduled to next Friday.',
    required: false,
  })
  message?: string;
}