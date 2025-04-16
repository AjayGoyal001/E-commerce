import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { cart, login, product, SignUp } from '../../data-type';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-user-auth',
  imports: [FormsModule, NgIf],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent {
  showLogin = true;
  loginError = '';
  private userService = inject(UserService);
  private productService = inject(ProductService);

  ngOnInit() {
    this.userService.userAuthReload();
  }

  signUp(data: SignUp) {
    // console.log(data);
    this.userService.userSignUp(data);
  }

  login(data: login) {
    // console.log(data);
    this.userService.userLogin(data);
    this.userService.invalidUserAuth.subscribe((result) => {
      if (result) {
        this.loginError = 'Please enter a valid details.';
      } else {
        this.localToRemoveCart();
      }
    });
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
  }

  localToRemoveCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);
      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
          id: undefined,
        };

        delete cartData.id;
        setTimeout(() => {
          this.productService.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.log('items stored in db');
            }
          });
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      });
    }

    setTimeout(() => {
      this.productService.getCartlist(userId);
    }, 2000);
  }
}
