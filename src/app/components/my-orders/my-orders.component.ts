import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { order } from '../../data-type';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  imports: [NgFor, CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css',
})
export class MyOrdersComponent {
  orderData: order[] | undefined;
  private productService = inject(ProductService);

  getOrderList() {
    this.productService.orderList().subscribe((result) => {
      this.orderData = result;
    });
  }

  ngOnInit() {
    this.getOrderList();
  }

  cancelOrder(orderId: number | undefined) {
    if (orderId) {
      this.productService.deleteOrder(orderId).subscribe((result) => {
        this.getOrderList();
      });
    }
  }
}
