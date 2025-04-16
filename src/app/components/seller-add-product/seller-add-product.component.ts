import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { product } from '../../data-type';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  imports: [FormsModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css',
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined;
  private productService = inject(ProductService);
  addProduct(data: product) {
    this.productService.addProduct(data).subscribe((result) => {
      console.log(result);
      if (result) {
        this.addProductMessage = 'Product is successfully added';
      }
      setTimeout(() => (this.addProductMessage = undefined), 3000);
    });
  }
}
