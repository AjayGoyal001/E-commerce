import {
  CommonModule,
  NgFor,
  NgIf,
  NgSwitch,
  NgSwitchCase,
} from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { product } from '../../data-type';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf, NgSwitch, NgSwitchCase, CommonModule, NgFor],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';
  userName = '';
  searchResult: undefined | product[];
  cartItems = 0;

  private router = inject(Router);
  private product = inject(ProductService);

  ngOnInit() {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
          this.menuType = 'seller';
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
          this.product.getCartlist(userData.id);
        } else {
          this.menuType = 'default';
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }

    this.product.cartData.subscribe((items) => {
      this.cartItems = items.length;
    });
  }

  logOut() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }

  userLogout() {
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      // console.log(element.value);
      this.product.searchProducts(element.value).subscribe((result) => {
        if (result.length > 5) result.length = 5;
        this.searchResult = result;
      });
    }
  }

  hiddenSearch() {
    this.searchResult = undefined;
  }

  redirectToDetail(id: string) {
    this.router.navigate(['/details/' + id]);
  }

  submitSearch(val: string) {
    // console.log(val);
    this.router.navigate([`/search/${val}`]);
  }
}
