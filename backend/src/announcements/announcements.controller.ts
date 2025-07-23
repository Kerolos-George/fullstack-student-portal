import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { AnnouncementService } from './announcements.service';
import { CreateAnnouncementDto, UpdateAnnouncementDto } from './dto/announcement.dto';
import { Announcement } from './schemas/announcement.schema';

@ApiTags('announcements')
@Controller('announcements')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new announcement' })
  @ApiBody({ type: CreateAnnouncementDto })
  @ApiResponse({
    status: 201,
    description: 'The announcement has been successfully created.',
    type: Announcement,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createAnnouncementDto: CreateAnnouncementDto): Promise<Announcement> {
    return this.announcementService.create(createAnnouncementDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all announcements' })
  @ApiResponse({
    status: 200,
    description: 'List of all announcements',
    type: [Announcement],
  })
  findAll(): Promise<Announcement[]> {
    return this.announcementService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an announcement by ID' })
  @ApiParam({ name: 'id', description: 'Announcement ID' })
  @ApiResponse({
    status: 200,
    description: 'The announcement with the specified ID',
    type: Announcement,
  })
  @ApiResponse({ status: 404, description: 'Announcement not found' })
  findOne(@Param('id') id: string): Promise<Announcement> {
    return this.announcementService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an announcement' })
  @ApiParam({ name: 'id', description: 'Announcement ID' })
  @ApiBody({ type: UpdateAnnouncementDto })
  @ApiResponse({
    status: 200,
    description: 'The announcement has been successfully updated.',
    type: Announcement,
  })
  @ApiResponse({ status: 404, description: 'Announcement not found' })
  update(
    @Param('id') id: string,
    @Body() updateAnnouncementDto: UpdateAnnouncementDto,
  ): Promise<Announcement> {
    return this.announcementService.update(id, updateAnnouncementDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an announcement' })
  @ApiParam({ name: 'id', description: 'Announcement ID' })
  @ApiResponse({
    status: 204,
    description: 'The announcement has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Announcement not found' })
  remove(@Param('id') id: string): Promise<void> {
    return this.announcementService.remove(id);
  }
}