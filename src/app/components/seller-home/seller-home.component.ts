import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { product } from '../../data-type';
import { NgFor } from '@angular/common';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-seller-home',
  imports: [NgFor, RouterLink, FontAwesomeModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css',
})
export class SellerHomeComponent {
  productList: undefined | product[];
  private product = inject(ProductService);
  icon = faTrash;
  editIcon = faEdit;

  list() {
    this.product.productList().subscribe((result) => {
      // console.log(result);
      this.productList = result;
    });
  }

  ngOnInit() {
    this.list();
  }

  deleteProduct(id: string) {
    console.log(id);
    this.product.deleteProduct(id).subscribe(() => {
      // console.log('Product deleted');
      this.list();
    });
  }
}
