import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParagraphDto } from './dto/create-paragraph.dto';
import { UpdateParagraphDto } from './dto/update-paragraph.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class ParagraphsService {
  constructor(private readonly prisma: PrismaService) {}

  // async create(createParagraphDto: CreateParagraphDto) {
  //   return 'This action adds a new paragraph';
  // }

  async findAll() {
    return await this.prisma.paragraph.findMany();
  }

  async findOne(id: number) {
    const paragraph = await this.prisma.paragraph.findUnique({where:{id}});
    if(!paragraph){
      throw new NotFoundException("Paragraph not found");
    }
    return paragraph;
  }

  // async update(id: number, updateParagraphDto: UpdateParagraphDto) {
  //   return `This action updates a #${id} paragraph`;
  // }

  // async remove(id: number) {
  //   return `This action removes a #${id} paragraph`;
  // }
}
