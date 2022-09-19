import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';

@Controller()
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @GrpcMethod()
  async addSubscriber(subscriber: CreateSubscriberDto) {
    return await this.subscribersService.addSubscriber(subscriber);
  }

  @GrpcMethod()
  async getAllSubscribers() {
    return await this.subscribersService.getAllSubscribers();
  }
}
