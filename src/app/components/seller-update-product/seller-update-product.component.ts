import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { product } from '../../data-type';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-seller-update-product',
  imports: [FormsModule, NgIf],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css',
})
export class SellerUpdateProductComponent {
  productData: undefined | product;
  productMessage = '';
  private product = inject(ProductService);
  private router = inject(Router);
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    let productId = this.route.snapshot.paramMap.get('id');
    // console.log(productId);
    productId &&
      this.product.getProduct(productId).subscribe((data) => {
        // console.log(data);
        this.productData = data;
      });
  }
  updateProduct(data: product) {
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product has Updated';
      }
    });
    setTimeout(() => {
      this.productMessage = '';
      this.router.navigate(['/seller-home']);
    }, 2000);
  }
}
