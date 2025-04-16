import { Component, inject } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../services/product.service';
import { product } from '../../data-type';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NgbCarouselModule, NgFor, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  productsData: undefined | product[];
  trendyProduct: undefined | product[];

  private product = inject(ProductService);

  ngOnInit() {
    this.product.popularProducts().subscribe((data) => {
      this.productsData = data;
    });
    // Trendy Products
    this.product.trendyProducts().subscribe((data) => {
      this.trendyProduct = data;
    });
  }
}
