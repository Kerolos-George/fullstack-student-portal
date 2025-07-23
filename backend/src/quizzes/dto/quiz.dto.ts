import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateQuizDto {
  @ApiProperty({
    description: 'The title of the quiz',
    example: 'Midterm Examination',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The course name',
    example: 'Computer Science 101',
  })
  @IsString()
  @IsNotEmpty()
  course: string;

  @ApiProperty({
    description: 'The topic of the quiz',
    example: 'Data Structures and Algorithms',
  })
  @IsString()
  @IsNotEmpty()
  topic: string;

  @ApiProperty({
    description: 'The due date of the quiz',
    example: '2024-12-15T23:59:59.000Z',
    type: String,
    format: 'date-time',
  })
  @IsDateString()
  dueDate: String;
}

export class UpdateQuizDto extends PartialType(CreateQuizDto) {
  @ApiProperty({
    description: 'The title of the quiz',
    example: 'Midterm Examination',
    required: false,
  })
  title?: string;

  @ApiProperty({
    description: 'The course name',
    example: 'Computer Science 101',
    required: false,
  })
  course?: string;

  @ApiProperty({
    description: 'The topic of the quiz',
    example: 'Data Structures and Algorithms',
    required: false,
  })
  topic?: string;

  @ApiProperty({
    description: 'The due date of the quiz',
    example: '2024-12-15T23:59:59.000Z',
    type: String,
    format: 'date-time',
    required: false,
  })
  dueDate?: String;
}