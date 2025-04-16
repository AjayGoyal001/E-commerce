import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { cart, priceSummary } from '../../data-type';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  imports: [NgFor, CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent {
  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delievery: 0,
    roundoff: 0,
    total: 0,
  };
  private productService = inject(ProductService);
  private router = inject(Router);

  cartSummary() {
    this.productService.currentCart().subscribe((result) => {
      // console.log(result);
      this.cartData = result;
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * +item.quantity;
        }
      });
      this.priceSummary.price = price;
      this.priceSummary.discount = price * 0.02;
      if (price >= 10000) {
        this.priceSummary.delievery = 0;
      } else if (price > 0 && price < 10000) {
        this.priceSummary.delievery = 50;
      }
      this.priceSummary.roundoff = 0;
      this.priceSummary.tax = price * 0.05;

      const roundOff =
        price +
        this.priceSummary.delievery +
        this.priceSummary.tax -
        this.priceSummary.discount;

      if (roundOff > 0) {
        const afterDecimal = +(roundOff % 1).toFixed(2);
        this.priceSummary.roundoff = 1 - afterDecimal;
      }

      this.priceSummary.total =
        price +
        this.priceSummary.delievery +
        this.priceSummary.tax -
        this.priceSummary.discount +
        this.priceSummary.roundoff;

      if (!this.cartData.length) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit() {
    this.cartSummary();
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }

  removeToCart(cartId: number | undefined) {
    cartId &&
      this.cartData &&
      this.productService.removeToCart(cartId).subscribe((result) => {
        this.cartSummary();
      });
  }
}
