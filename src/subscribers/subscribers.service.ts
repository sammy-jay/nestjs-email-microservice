import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import Subscriber from './entities/subscriber.entity';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectRepository(Subscriber)
    private readonly subscribersRepository: Repository<Subscriber>,
  ) {}

  async getAllSubscribers() {
    return await this.subscribersRepository.find();
  }

  async addSubscriber(subscriber: CreateSubscriberDto) {
    try {
      const newSubscriber = await this.subscribersRepository.create(subscriber);
      await this.subscribersRepository.save(newSubscriber);
      return newSubscriber;
    } catch (error) {
      if (error?.code === '23505') {
        return new HttpException(
          'User with that email already exists.',
          HttpStatus.BAD_REQUEST,
        );
      }
      return new HttpException(
        'Something went wrong.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
