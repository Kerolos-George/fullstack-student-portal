import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { QuizService } from './quiz.service';
import { CreateQuizDto, UpdateQuizDto } from './dto/quiz.dto';
import { Quiz } from './schemas/quiz.schema';

@ApiTags('quizzes')
@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new quiz' })
  @ApiBody({ type: CreateQuizDto })
  @ApiResponse({
    status: 201,
    description: 'The quiz has been successfully created.',
    type: Quiz,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createQuizDto: CreateQuizDto): Promise<Quiz> {
    return this.quizService.create(createQuizDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all quizzes' })
  @ApiQuery({
    name: 'course',
    required: false,
    description: 'Filter quizzes by course name',
  })
  @ApiQuery({
    name: 'upcoming',
    required: false,
    description: 'Get only upcoming quizzes',
    type: Boolean,
  })
  @ApiResponse({
    status: 200,
    description: 'List of quizzes',
    type: [Quiz],
  })
  async findAll(
    @Query('course') course?: string,
    @Query('upcoming') upcoming?: boolean,
  ): Promise<Quiz[]> {
    if (upcoming === true) {
      return this.quizService.findUpcoming();
    }
    if (course) {
      return this.quizService.findByCourse(course);
    }
    return this.quizService.findAll();
  }

  @Get('upcoming')
  @ApiOperation({ summary: 'Get upcoming quizzes' })
  @ApiResponse({
    status: 200,
    description: 'List of upcoming quizzes',
    type: [Quiz],
  })
  findUpcoming(): Promise<Quiz[]> {
    return this.quizService.findUpcoming();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a quiz by ID' })
  @ApiParam({ name: 'id', description: 'Quiz ID' })
  @ApiResponse({
    status: 200,
    description: 'The quiz with the specified ID',
    type: Quiz,
  })
  @ApiResponse({ status: 404, description: 'Quiz not found' })
  findOne(@Param('id') id: string): Promise<Quiz> {
    return this.quizService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a quiz' })
  @ApiParam({ name: 'id', description: 'Quiz ID' })
  @ApiBody({ type: UpdateQuizDto })
  @ApiResponse({
    status: 200,
    description: 'The quiz has been successfully updated.',
    type: Quiz,
  })
  @ApiResponse({ status: 404, description: 'Quiz not found' })
  update(
    @Param('id') id: string,
    @Body() updateQuizDto: UpdateQuizDto,
  ): Promise<Quiz> {
    return this.quizService.update(id, updateQuizDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a quiz' })
  @ApiParam({ name: 'id', description: 'Quiz ID' })
  @ApiResponse({
    status: 204,
    description: 'The quiz has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Quiz not found' })
  remove(@Param('id') id: string): Promise<void> {
    return this.quizService.remove(id);
  }
}