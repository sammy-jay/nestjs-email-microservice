import { Controller } from '@nestjs/common';
import {
  EventPattern,
  GrpcMethod,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';

@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @GrpcMethod()
  async addSubscriber(@Payload() subscriber: CreateSubscriberDto) {
    return await this.subscribersService.addSubscriber(subscriber);
  }

  @GrpcMethod()
  async getAllSubscribers() {
    return await this.subscribersService.getAllSubscribers();
  }
}
