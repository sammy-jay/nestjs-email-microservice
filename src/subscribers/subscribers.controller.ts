import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';

@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @MessagePattern({ cmd: 'add-subscriber' })
  async addSubscriber(@Payload() subscriber: CreateSubscriberDto) {
    console.log('Add Sub called...');
    return await this.subscribersService.addSubscriber(subscriber);
  }

  // @EventPattern({ cmd: 'add-subscriber' })
  // async addSubscriber(@Payload() subscriber: CreateSubscriberDto) {
  //   console.log('Add Sub called...');
  //   return await this.subscribersService.addSubscriber(subscriber);
  // }

  @MessagePattern({ cmd: 'get-all-subscribers' })
  async getAllSubscribers() {
    console.log('Get All Subs called...');
    return await this.subscribersService.getAllSubscribers();
  }
}
