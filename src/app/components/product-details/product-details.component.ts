import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { cart, product } from '../../data-type';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [NgIf],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  productData: undefined | product;
  productQuantity = 1;
  removeCart = false;
  cartData: product | undefined;
  constructor(private activeRoute: ActivatedRoute) {}
  private productService = inject(ProductService);

  ngOnInit() {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    // console.log(productId);
    productId &&
      this.productService.getProduct(productId).subscribe((result) => {
        // console.log(result);
        this.productData = result;

        let cartData = localStorage.getItem('localCart');
        if (productId && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter((item: product) => productId == item.id);
          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }

        let user = localStorage.getItem('user');
        if (user) {
          let userId = user && JSON.parse(user).id;
          this.productService.getCartlist(userId);
          this.productService.cartData.subscribe((result) => {
            let item = result.filter(
              (item: product) =>
                productId?.toString() === item.productId?.toString()
            );

            if (item.length) {
              this.cartData = item[0];
              this.removeCart = true;
            }
          });
        }
      });
  }

  handleButton(val: string) {
    if (val === 'min' && this.productQuantity > 1) {
      this.productQuantity -= 1;
    }
    if (val === 'max' && this.productQuantity < 20) {
      this.productQuantity += 1;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        // console.log(this.productData);
        this.productService.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        // console.log('User is logged in');
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: cart = {
          ...this.productData,
          productId: this.productData.id,
          userId,
          id: undefined,
        };
        delete cartData.id;
        // console.log(cartData);
        this.productService.addToCart(cartData).subscribe((result) => {
          // console.log(result);
          if (result) {
            // alert('User logged in');
            this.productService.getCartlist(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }

  removeToCart(productId: string | number) {
    if (!localStorage.getItem('user')) {
      this.productService.localRemoveToCart(String(productId));
    } else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      this.cartData &&
        this.productService
          .removeToCart(Number(this.cartData.id))
          .subscribe((result) => {
            this.productService.getCartlist(userId);
          });
    }
    this.removeCart = false;
  }
}
