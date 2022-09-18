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

  async checkEmail(email: string) {
    const user = await this.subscribersRepository.findOneBy({
      email,
    });

    return user;
  }

  async getAllSubscribers() {
    return await this.subscribersRepository.find();
  }

  async addSubscriber(subscriber: CreateSubscriberDto) {
    const existing = await this.checkEmail(subscriber.email);

    if (!existing) {
      const newSubscriber = await this.subscribersRepository.create(subscriber);
      await this.subscribersRepository.save(newSubscriber);
      return newSubscriber;
    }
    return new HttpException(
      'User with that email is already subscribed.',
      HttpStatus.BAD_REQUEST,
    );
  }
}
