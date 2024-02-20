import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { PrismaModule } from 'src/db/prisma/prisma.module';
import { RaceModule } from './race/race.module';

@Module({
  imports: [PrismaModule, RaceModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
