import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuizDocument = Quiz & Document;

@Schema({ timestamps: true })
export class Quiz {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  course: string;

  @Prop({ required: true })
  topic: string;

  @Prop({ required: true, type: Date })
  dueDate: Date;
  
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);