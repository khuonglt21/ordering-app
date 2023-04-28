import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class RmqService {
  constructor(private readonly configService: ConfigService) {}

  getOptions(queue: string, noAck = false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('RABBIT_MQ_URI')], // config uri of rabbitmq
        queue: this.configService.get<string>(`RABBIT_MQ_${queue}_QUEUE`), // config name of queue
        noAck, // false for handle message manual
        persistent: true,
      },
    };
  }

  // manual process message in queue (due to noAck : false)
  ack(context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
  }
}
