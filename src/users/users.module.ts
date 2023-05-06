import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PersistenceModule } from 'src/persistence/persistence.module';

@Module({
  imports: [PersistenceModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
