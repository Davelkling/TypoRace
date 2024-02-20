import { Module } from '@nestjs/common';
import { PrismaModule } from './db/prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ParagraphsModule } from './paragraphs/paragraphs.module';

@Module({
  imports: [PrismaModule, UserModule, ParagraphsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
