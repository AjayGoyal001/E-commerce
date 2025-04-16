import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { cart, order, priceSummary } from '../../data-type';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  private productService = inject(ProductService);
  private router = inject(Router);
  cartData: cart[] | undefined;
  orderMsg: string | undefined;
  totalAmount: number | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delievery: 0,
    roundoff: 0,
    total: 0,
  };

  ngOnInit() {
    this.productService.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData = result;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * +item.quantity;
        }
      });
      this.priceSummary.price = price;
      this.priceSummary.discount = price * 0.02;
      if (price > 10000) {
        this.priceSummary.delievery = 0;
      } else {
        this.priceSummary.delievery = 50;
      }
      this.priceSummary.roundoff = 0;
      this.priceSummary.tax = price * 0.05;

      const roundOff =
        price +
        this.priceSummary.delievery +
        this.priceSummary.tax -
        this.priceSummary.discount;

      const afterDecimal = +(roundOff % 1).toFixed(2);

      this.priceSummary.roundoff = 1 - afterDecimal;
      this.totalAmount =
        price +
        this.priceSummary.delievery +
        this.priceSummary.tax -
        this.priceSummary.discount +
        this.priceSummary.roundoff;
    });
  }

  orderNow(data: { email: string; address: string; contact: string }) {
    // console.log(data);
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if (this.totalAmount) {
      let orderData: order = {
        ...data,
        totalAmount: this.totalAmount,
        userId,
        id: undefined,
      };

      this.cartData?.forEach((item) => {
        setTimeout(() => {
          if (item.id) {
            this.productService.deleteCartItems(item.id);
          }
        }, 600);
      });
      this.productService.orderNowService(orderData).subscribe((result) => {
        if (result) {
          // alert('Order has been placed');
          this.orderMsg = 'Your order has been placed';
          setTimeout(() => {
            this.router.navigate(['/my-orders']);
            this.orderMsg = '';
          }, 2000);
        }
      });
    }
  }
}
