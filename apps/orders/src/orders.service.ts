import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create_order_request.dto';
import { OrdersRepository } from './order.repository';
import { ClientProxy } from '@nestjs/microservices';
import { BILLING_SERVICE } from './constants/services';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}

  async createOrder(request: CreateOrderRequest) {
    return this.ordersRepository.create(request);
  }

  async getOrders() {
    return this.ordersRepository.find({});
  }
}
