import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AnnouncementDocument = Announcement & Document;

@Schema({ timestamps: true })
export class Announcement {
  @Prop({ required: true })
  authorName: string;

  @Prop({ required: true })
  authorRole: string;
   
  @Prop()
  course: string;

  @Prop({ required: true })
  message: string;
}

export const AnnouncementSchema = SchemaFactory.createForClass(Announcement);