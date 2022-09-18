import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubscribersController } from './subscribers.controller';
import { SubscribersService } from './subscribers.service';
import Subscriber from './entities/subscriber.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscriber])],
  providers: [SubscribersService],
  controllers: [SubscribersController],
})
export class SubscribersModule {}
