import { Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create_order_request.dto';
import { OrdersRepository } from './order.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}
  async createOrder(request: CreateOrderRequest) {
    return this.ordersRepository.create(request);
  }
}
